import { Roles } from "../Enum/roles";

export interface User {
  FirstName: string;
  LastName: string;
  Email: string;
  Password: string;
  ConfirmPassword: string;
  Role? : Roles;
}
