export interface Pickup {
  id?: number;
  childId: number;
  pickupTimeMonday?: string;
  pickupTimeTuesday?: string;
  pickupTimeWednesday?: string;
  pickupTimeThursday?: string;
  pickupTimeFriday?: string;
  pickupTypeMonday: 'Wird abgeholt' | 'Alleine losschicken';
  pickupTypeTuesday: 'Wird abgeholt' | 'Alleine losschicken';
  pickupTypeWednesday: 'Wird abgeholt' | 'Alleine losschicken';
  pickupTypeThursday: 'Wird abgeholt' | 'Alleine losschicken';
  pickupTypeFriday: 'Wird abgeholt' | 'Alleine losschicken';
  pickupNoteMonday?: string;
  pickupNoteTuesday?: string;
  pickupNoteWednesday?: string;
  pickupNoteThursday?: string;
  pickupNoteFriday?: string;
}
