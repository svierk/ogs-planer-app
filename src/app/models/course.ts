import { Days } from './days';

export interface Course {
  id?: number;
  name: string;
  teacher: string;
  day: Days;
  start: string;
  end: string;
  note?: string;
}
