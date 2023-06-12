import { ClassSlot } from './class-slot';

export interface Class {
  id: string;
  name: string;
  slots?: ClassSlot[];
}
