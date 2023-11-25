import { v4 as uuidv4 } from "uuid";
import { User } from "./fathers/User.repository";
import { UserType } from "../interfaces/User.interface";

export class Vendor extends User {
  constructor(
    public name: string,
    public email: string,
    public password: string
  ) {
    super(uuidv4(), UserType.VENDOR, name, email, password);
  }
}
