import { hash, compare } from "bcryptjs";
import { IBuyer } from "../interfaces/BuyerInterface";
type password = string;
export class Bcrypt {
  public static async getEncrypt(pass: password): Promise<password> {
    const passHash = await hash(pass, 8);
    return passHash;
  }
  public static async verified(
    pass: password,
    passHash: password
  ): Promise<boolean> {
    const isCorrer = await compare(pass, passHash);
    return isCorrer;
  }
}
