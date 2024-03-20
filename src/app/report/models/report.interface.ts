import {PropertyInterface} from "../../property/models/Property.interface";
import {UserInterface} from "../../user/models/user.interface";

export interface ReportInterface {
  id: number;
  status: string;
  reason: string;
  reasonDetail: string;
  property: PropertyInterface;
  reporter: UserInterface;
}
