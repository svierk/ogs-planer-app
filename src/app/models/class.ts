import { ClassSchedule } from './class-schedule';

export interface Class {
  id?: number;
  name: string;
  teacher?: string;
  schedule?: ClassSchedule[];
}
