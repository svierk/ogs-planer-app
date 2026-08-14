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

/**
 * Windows silently drops trailing dots and spaces, which turns "1a." into "1a"
 * and can leave an empty name behind - so they are removed up front.
 *
 * Deliberately not a regular expression: an end-anchored `/[. ]+$/` retries
 * from every position on a long run of dots, which is quadratic on input that
 * comes from a text field.
 */
function trimTrailingDotsAndSpaces(value: string): string {
  let end = value.length;
  while (end > 0 && (value[end - 1] === '.' || value[end - 1] === ' ')) end--;
  return value.slice(0, end);
}

/**
 * Makes a file name (without extension) safe to write on Windows, macOS and
 * Linux alike. Returns `fallback` if nothing usable is left.
 */
export function sanitizeFileName(name: string, fallback = 'Liste'): string {
  const collapsed = trimTrailingDotsAndSpaces(
    (name ?? '').replace(FORBIDDEN_CHARACTERS, '_').replace(/\s+/g, ' ').trim()
  );

  // Truncating can expose a fresh trailing dot or space.
  const cleaned = trimTrailingDotsAndSpaces(collapsed.slice(0, MAX_LENGTH));

  return !cleaned || RESERVED_NAMES.test(cleaned) ? fallback : cleaned;
}
