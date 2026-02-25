export interface EarlyCare {
  id?: number;
  childId: number;
  day: string;
  participation: 0 | 1;
  start: '1. Stunde' | '2. Stunde';
  note?: string;
}
