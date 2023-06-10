import { Activity } from './activity';

export interface Child {
  id?: number;
  firstName: string;
  lastName: string;
  phone?: string;
  classId?: string;
  activities?: Activity[];
}
