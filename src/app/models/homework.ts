export interface Homework {
  id?: number;
  childId: number;
  homeworkParticipationMonday: 0 | 1;
  homeworkParticipationTuesday: 0 | 1;
  homeworkParticipationWednesday: 0 | 1;
  homeworkParticipationThursday: 0 | 1;
  homeworkParticipationFriday: 0 | 1;
  homeworkNoteMonday?: string;
  homeworkNoteTuesday?: string;
  homeworkNoteWednesday?: string;
  homeworkNoteThursday?: string;
  homeworkNoteFriday?: string;
}
