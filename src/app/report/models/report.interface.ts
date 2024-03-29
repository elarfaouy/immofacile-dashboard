import {PropertyInterface} from "../../property/models/Property.interface";
import {UserAuthInterface} from "../../user/models/user-auth.interface";

export interface ReportInterface {
  id: number;
  status: string;
  reason: string;
  reasonDetail: string;
  property: PropertyInterface;
  reporter: UserAuthInterface;
}
