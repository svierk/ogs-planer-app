// Export file names are built from user input (class names, child names), and
// Win32 is far stricter about them than macOS: a class called "1/2 a" or
// "Gruppe: Blau" produces a name that saves fine on a Mac and fails on Windows.
// Sanitize centrally so every export goes through the same rules.

// Characters Win32 refuses outright, plus the C0 control range.
// eslint-disable-next-line no-control-regex
const FORBIDDEN_CHARACTERS = /[<>:"/\\|?*\u0000-\u001F]/g;

// Legacy DOS device names. Windows still refuses them as file names, with or
// without an extension - so this is checked against the name without one.
const RESERVED_NAMES = /^(CON|PRN|AUX|NUL|COM\d|LPT\d)$/i;

// Windows' default MAX_PATH is 260 characters for the *whole* path. Leaving the
// name well under that keeps room for a deep target directory.
const MAX_LENGTH = 120;

// Windows silently drops trailing dots and spaces, which turns "1a." into "1a"
// and can leave an empty name behind.
const TRAILING_DOTS_AND_SPACES = /[. ]+$/;

/**
 * Makes a file name (without extension) safe to write on Windows, macOS and
 * Linux alike. Returns `fallback` if nothing usable is left.
 */
export function sanitizeFileName(name: string, fallback = 'Liste'): string {
  const cleaned = (name ?? '')
    .replace(FORBIDDEN_CHARACTERS, '_')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(TRAILING_DOTS_AND_SPACES, '')
    .slice(0, MAX_LENGTH)
    // Truncating can expose a fresh trailing dot or space.
    .replace(TRAILING_DOTS_AND_SPACES, '');

  return !cleaned || RESERVED_NAMES.test(cleaned) ? fallback : cleaned;
}
