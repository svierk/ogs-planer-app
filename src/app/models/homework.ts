export interface Homework {
  id?: number;
  childId: number;
  day: string;
  participation: 0 | 1;
  note?: string;
}
