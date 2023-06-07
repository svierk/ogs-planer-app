import { Activity } from './activity';

export interface Child {
  firstName: string;
  lastName: string;
  phone?: string;
  classId: string;
  activities?: Activity[];
}
