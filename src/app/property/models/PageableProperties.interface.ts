import {PropertyInterface} from "./Property.interface";

export interface PageablePropertiesInterface {
  content: Array<PropertyInterface>;
  totalPages: number;
  totalElements: number;
  numberOfElements: number;
  size: number;
  number: number;
  empty: boolean;
  first: boolean;
  last: boolean;
}
