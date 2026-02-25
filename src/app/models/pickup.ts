export interface Pickup {
  id?: number;
  childId: number;
  day: string;
  pickupTime?: string;
  pickupType: 'Wird abgeholt' | 'Alleine losschicken';
  note?: string;
}
