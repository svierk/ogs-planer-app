# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/).

> **Note:** The entries for versions 1.0.0 through 2.0.0 were reconstructed retroactively from
> the commit history. The release date of each version is the date of the commit that raised the
> version in `package.json`.

## [Unreleased]

## [2.0.0] - 2026-08-15

### Added

- Windows distributables: Squirrel setup installer plus an installation-free ZIP variant, built on a dedicated Windows runner ([#194](https://github.com/svierk/ogs-planer-app/pull/194))
- Application icons for Windows, macOS and Linux
- README documentation of the available application packages per operating system

### Changed

- **Breaking:** the SQLite database is no longer stored inside the application directory but in the operating system's user data directory, so data now survives an app update or reinstall. Existing databases have to be moved to the new location once, manually.
- Dashboard extended with hints and actions around the new storage location

### Fixed

- Removed super-linear backtracking in the Excel export's file name sanitizer
- Provided Squirrel's 7-Zip helper on the Windows runner

## [1.5.1] - 2026-08-14

### Fixed

- Toast notifications are centered horizontally at the top again

## [1.5.0] - 2026-08-14

### Added

- Auto-merge workflow for Dependabot updates

### Changed

- Normalized the database schema and reworked it holistically ([#126](https://github.com/svierk/ogs-planer-app/pull/126))
- Upgraded to Angular 22, TypeScript 6 and the ESLint 10 flat config (in steps via Angular 19, 20 and 21)
- Upgraded to npm 11 and Electron 41
- Hardened the CI workflows: least-privilege permissions, actions pinned to exact release tags
- Numerous dependency updates, including security-relevant transitive dependencies

### Fixed

- Resolved open Sonar reliability and maintainability findings ([#132](https://github.com/svierk/ogs-planer-app/pull/132))
- Use `globalThis` instead of `window`

## [1.4.0] - 2025-02-04

### Added

- Notes field for early care

## [1.3.3] - 2024-10-19

### Fixed

- Corrected the tabindex order in the dashboard

## [1.3.2] - 2024-10-19

### Changed

- Improved accessibility and code quality based on Sonar findings

## [1.3.1] - 2024-10-19

### Fixed

- Removed a failing unit test from the dashboard list dialog

## [1.3.0] - 2024-10-19

### Added

- Maintenance of allergies and pickup authorizations per child

### Changed

- Upgraded to Node 20, Electron 27/28 and TypeScript 5.5
- Renamed the CI pipeline (`validation` → `build`) and enabled manual triggering
- Dependabot configuration groups updates and runs monthly
- Added a CODEOWNERS file

## [1.2.2] - 2023-09-06

### Fixed

- Increased the content width to prevent table display issues

## [1.2.1] - 2023-09-06

### Fixed

- Corrected display issues in the generated activities list
- Error toast for a missing class assignment

## [1.2.0] - 2023-09-05

### Added

- Export of the child activities list

## [1.1.0] - 2023-09-04

### Added

- Export of a list with emergency contacts
- Early care and pickup lists can be exported per class
- Project description and setup instructions in the README

### Changed

- Unified file name and heading generation for exports

### Fixed

- The last course assigned to a child can be removed again
- Electron downgrade fixes application loading issues

## [1.0.3] - 2023-07-17

### Fixed

- Increased the default column width in the Excel export

## [1.0.2] - 2023-07-17

### Fixed

- The Excel export no longer fails when no activities are configured for a child

## [1.0.1] - 2023-07-17

### Added

- Toast notifications in all dialogs
- Search, sorting and scrolling for all tables
- Columns for mobile phone and emergency contact in the child master data

### Fixed

- Error toast when the generated Excel sheet contains no items
- Corrected the children selection for the lunch and homework export

## [1.0.0] - 2023-07-04

First release of the application.

### Added

- Angular frontend with a Node.js backend, packaged as a desktop application via Electron
- Local SQLite database including an export function
- Master data maintenance for children, classes and courses (create, update, delete)
- Recording of activities per child: early care, lunch, homework supervision, courses and pickup
- Class management with time slots for lunch and homework supervision
- Excel export for early care, lunch, homework, pickup, courses and children lists — including header styling and automatic column widths
- Toast service for user notifications
- Angular Material theme, Bootstrap grid and locally shipped Google and Material icon fonts
- Content Security Policy

[Unreleased]: https://github.com/svierk/ogs-planer-app/compare/v2.0.0...HEAD
[2.0.0]: https://github.com/svierk/ogs-planer-app/compare/v1.5.1...v2.0.0
[1.5.1]: https://github.com/svierk/ogs-planer-app/compare/v1.5.0...v1.5.1
[1.5.0]: https://github.com/svierk/ogs-planer-app/compare/v1.4.0...v1.5.0
[1.4.0]: https://github.com/svierk/ogs-planer-app/compare/v1.3.3...v1.4.0
[1.3.3]: https://github.com/svierk/ogs-planer-app/compare/v1.3.2...v1.3.3
[1.3.2]: https://github.com/svierk/ogs-planer-app/compare/v1.3.1...v1.3.2
[1.3.1]: https://github.com/svierk/ogs-planer-app/compare/v1.3.0...v1.3.1
[1.3.0]: https://github.com/svierk/ogs-planer-app/compare/v1.2.2...v1.3.0
[1.2.2]: https://github.com/svierk/ogs-planer-app/compare/v1.2.1...v1.2.2
[1.2.1]: https://github.com/svierk/ogs-planer-app/compare/v1.2.0...v1.2.1
[1.2.0]: https://github.com/svierk/ogs-planer-app/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/svierk/ogs-planer-app/compare/v1.0.3...v1.1.0
[1.0.3]: https://github.com/svierk/ogs-planer-app/compare/v1.0.2...v1.0.3
[1.0.2]: https://github.com/svierk/ogs-planer-app/compare/v1.0.1...v1.0.2
[1.0.1]: https://github.com/svierk/ogs-planer-app/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/svierk/ogs-planer-app/releases/tag/v1.0.0
