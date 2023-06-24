export interface EarlyCare {
  id?: number;
  childId: number;
  earlyCareParticipationMonday: 0 | 1;
  earlyCareParticipationTuesday: 0 | 1;
  earlyCareParticipationWednesday: 0 | 1;
  earlyCareParticipationThursday: 0 | 1;
  earlyCareParticipationFriday: 0 | 1;
  earlyCareStartMonday: '1. Stunde' | '2. Stunde';
  earlyCareStartTuesday: '1. Stunde' | '2. Stunde';
  earlyCareStartWednesday: '1. Stunde' | '2. Stunde';
  earlyCareStartThursday: '1. Stunde' | '2. Stunde';
  earlyCareStartFriday: '1. Stunde' | '2. Stunde';
}
