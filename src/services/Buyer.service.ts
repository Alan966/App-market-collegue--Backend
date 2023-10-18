import { returnError } from "../errors/handleErrors";
import { IUser, IUserToken } from "../interfaces/User.interface";
import { Return_Error } from "../interfaces/error.interface";
import { Buyer } from "../repositories/Buyer.repository";
import { Bcrypt } from "../utils/bcrypt.handle";
import { JWT } from "../utils/jwt.handle";
export class BuyerService {
  static async createBuyer(
    name: string,
    email: string,
    password: string
  ): Promise<IUser | Return_Error> {
    const passHash = await Bcrypt.getEncrypt(password);
    const newBuyer = new Buyer(name, email, passHash);
    console.log(await Buyer.getUser(email));
    if ((await Buyer.getUser(email)) !== null) {
      const error = returnError(
        400,
        "USER_ALREADY_EXIST",
        "That  email has been used yet"
      );
      return {
        success: false,
        error: error.error,
        error_code: error.error_code,
      };
    }
    return newBuyer.createUser();
  }
  static async getEntry(
    password: string,
    email: string
  ): Promise<IUserToken | Return_Error> {
    const buyerExist = await Buyer.getUser(email);
    if (buyerExist === null) {
      const error = returnError(
        401,
        "USER_NOT_EXIST",
        "This email hasn't been register yet"
      );
      return {
        success: false,
        error: error.error,
        error_code: error.error_code,
      };
    }
    const verify = await Bcrypt.verified(password, buyerExist.password);
    if (!verify) {
      const error = returnError(
        401,
        "WRONG_PASSWORD",
        "Need to use the correct password"
      );
      return {
        success: false,
        error: error.error,
        error_code: error.error_code,
      };
    }
    const token = JWT.generateToken({ user: buyerExist.email }, "30d");
    return {
      id: buyerExist.id,
      name: buyerExist.name,
      email: buyerExist.email,
      token: token,
    };
  }
}
