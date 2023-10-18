import { User } from "./User.repository";
import { v4 as uuidv4 } from "uuid";
export class Buyer extends User {
  constructor(
    public name: string,
    public email: string,
    public password: string
  ) {
    super(uuidv4(), "buyer", name, email, password);
  }
}
