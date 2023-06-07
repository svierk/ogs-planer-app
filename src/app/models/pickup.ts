import { ActivityTypes } from './activity-types';

export interface Pickup {
  name: ActivityTypes.Pickup;
  type: 'Wird abgeholt' | 'Alleine losschicken';
  time: string;
  note?: string;
}
