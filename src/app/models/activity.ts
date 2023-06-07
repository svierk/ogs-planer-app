import { Course } from './course';
import { Days } from './days';
import { EarlyCare } from './early-care';
import { Homework } from './homework';
import { Lunch } from './lunch';
import { Pickup } from './pickup';

export interface Activity {
  type: EarlyCare | Homework | Lunch | Course | Pickup;
  days: Days[];
}
