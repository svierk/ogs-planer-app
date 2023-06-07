import { ClassSlot } from './class-slot';

export interface Class {
  id: string;
  name: string;
  mascot?: string;
  teacher?: string;
  slots?: ClassSlot[];
}
