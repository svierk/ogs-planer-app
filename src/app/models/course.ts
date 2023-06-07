import { Days } from './days';

export interface Course {
  name: string;
  teacher: string;
  day: Days;
  time: string;
  note?: string;
}
