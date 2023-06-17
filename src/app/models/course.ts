import { Days } from './days';

export interface Course {
  id?: number;
  name: string;
  teacher: string;
  day: Days;
  time: string;
  note?: string;
}
