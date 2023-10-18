import { v4 as uuidv4 } from "uuid";
import { User } from "./User.repository";

export class Vendor extends User {
  constructor(
    public name: string,
    public email: string,
    public password: string
  ) {
    super(uuidv4(), "vendor", name, email, password);
  }
}
