import { sanitizeFileName } from './file-name';

describe('sanitizeFileName', () => {
  it('should keep a harmless name unchanged', () => {
    expect(sanitizeFileName('Frühbetreuung_2026_Juli_Montag_1a')).toBe('Frühbetreuung_2026_Juli_Montag_1a');
  });

  it('should replace characters Windows forbids', () => {
    expect(sanitizeFileName('Mittagessen_1/2 a')).toBe('Mittagessen_1_2 a');
    expect(sanitizeFileName('Gruppe: Blau')).toBe('Gruppe_ Blau');
    expect(sanitizeFileName('a<b>c"d\\e|f?g*h')).toBe('a_b_c_d_e_f_g_h');
  });

  it('should strip control characters', () => {
    const withControlChars = `Liste${String.fromCharCode(9)}${String.fromCharCode(1)}a`;

    expect(sanitizeFileName(withControlChars)).toBe('Liste__a');
  });

  it('should collapse whitespace and trim', () => {
    expect(sanitizeFileName('  Kurse   Montag  ')).toBe('Kurse Montag');
  });

  it('should drop trailing dots and spaces', () => {
    expect(sanitizeFileName('Klasse 1a.')).toBe('Klasse 1a');
    expect(sanitizeFileName('Klasse 1a...  ')).toBe('Klasse 1a');
  });

  it('should fall back for reserved DOS device names', () => {
    expect(sanitizeFileName('CON')).toBe('Liste');
    expect(sanitizeFileName('com1')).toBe('Liste');
    expect(sanitizeFileName('LPT9')).toBe('Liste');
  });

  it('should not treat a reserved name with a suffix as reserved', () => {
    expect(sanitizeFileName('CONTACT')).toBe('CONTACT');
  });

  it('should fall back when nothing usable is left', () => {
    expect(sanitizeFileName('')).toBe('Liste');
    expect(sanitizeFileName('   ')).toBe('Liste');
    expect(sanitizeFileName('...')).toBe('Liste');
  });

  it('should honour a custom fallback', () => {
    expect(sanitizeFileName('', 'Aktivitäten')).toBe('Aktivitäten');
  });

  it('should truncate long names without leaving a trailing separator', () => {
    const result = sanitizeFileName(`${'a'.repeat(119)}. tail`);

    expect(result.length).toBe(119);
    expect(result.endsWith('a')).toBeTrue();
  });
});
