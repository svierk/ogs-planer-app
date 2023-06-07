import { ActivityTypes } from './activity-types';

export interface EarlyCare {
  name: ActivityTypes.EarlyCare;
  start?: '1. Stunde' | '2. Stunde';
}
