export interface Lunch {
  id?: number;
  childId: number;
  lunchParticipationMonday: 0 | 1;
  lunchParticipationTuesday: 0 | 1;
  lunchParticipationWednesday: 0 | 1;
  lunchParticipationThursday: 0 | 1;
  lunchParticipationFriday: 0 | 1;
  lunchNoteMonday?: string;
  lunchNoteTuesday?: string;
  lunchNoteWednesday?: string;
  lunchNoteThursday?: string;
  lunchNoteFriday?: string;
}
