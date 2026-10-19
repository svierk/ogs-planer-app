// Electron Forge only runs the makers whose platform matches the *host*, so the
// release workflow builds every target on its own runner (see
// .github/workflows/release.yml). Windows gets two artifacts on purpose:
//
//   * the Squirrel installer, for machines where the user may install software
//   * a plain .zip, for locked-down school machines where they may not - unpack
//     it anywhere and run ogs-planer-app.exe
const fs = require('fs');
const path = require('path');

// Forge appends the platform-specific extension (.ico / .icns) to this path.
const ICON = path.join(__dirname, 'build', 'icons', 'icon');

// better-sqlite3 ships a prebuilt Node-API binary for every platform and picks
// prebuilds/<platform>-<arch>.node (or linuxmusl-<arch>.node) at runtime. Only
// the target's binaries belong in the package: the others are dead weight, and
// rpmbuild's strip step aborts on the arm64 ELF files of an x64 build.
function pruneForeignSqlitePrebuilds(buildPath, platform, arch) {
  const prebuilds = path.join(buildPath, 'node_modules', 'better-sqlite3', 'prebuilds');
  if (!fs.existsSync(prebuilds)) return;
  for (const file of fs.readdirSync(prebuilds)) {
    const [target, binaryArch] = path.basename(file, '.node').split('-');
    const matchesPlatform = target === platform || (platform === 'linux' && target === 'linuxmusl');
    if (!matchesPlatform || binaryArch !== arch) {
      fs.rmSync(path.join(prebuilds, file));
    }
  }
}

module.exports = {
  packagerConfig: {
    icon: ICON,
    appCopyright: `Copyright (C) ${new Date().getFullYear()} Sebastiano Schwarz`,
    // The user-facing name comes from `productName` in package.json ("OGS
    // Planer") - that is what the window, the Start menu entry and the macOS
    // bundle are called. The binary itself keeps the hyphenated name so no
    // Windows shortcut or Squirrel command line has to deal with a space in the
    // executable path.
    executableName: 'ogs-planer-app',

    // Bundling the app into a single archive cuts the file count massively,
    // which on Windows is what makes installation and Defender's first scan
    // slow. The native SQLite binding has to stay outside the archive: Windows
    // cannot load a DLL that isn't a real file on disk.
    //
    // Forge builds each platform on its own runner, so the host platform is
    // also the target platform here.
    asar: process.platform === 'win32' ? { unpack: '**/*.node' } : false,
  },
  rebuildConfig: {},
  hooks: {
    packageAfterPrune: async (_config, buildPath, _electronVersion, platform, arch) =>
      pruneForeignSqlitePrebuilds(buildPath, platform, arch),
  },
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        // Icon baked into setup.exe and the shortcuts it creates.
        setupIcon: `${ICON}.ico`,
        // Squirrel fetches this for the "Apps & features" entry at install
        // time; without it Windows shows a generic placeholder. It has to be a
        // publicly reachable URL, not a local path.
        iconUrl: 'https://raw.githubusercontent.com/svierk/ogs-planer-app/main/build/icons/icon.ico',
      },
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin', 'win32'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {
        options: {
          icon: `${ICON}.png`,
        },
      },
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {
        options: {
          icon: `${ICON}.png`,
        },
      },
    },
  ],
};
