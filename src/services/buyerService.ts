import { returnError } from "../errors/handleErrors";
import { IBuyer, IBuyerToken } from "../interfaces/BuyerInterface";
import { Return_Error } from "../interfaces/error.interface";
import { BuyerRepository } from "../repositories/buyerRepository";
import { Bcrypt } from "../utils/bcrypt.handle";
import { JWT } from "../utils/jwt.handle";
export class BuyerService {
  static async createBuyerService(
    name: string,
    password: string,
    email: string
  ): Promise<IBuyer | Return_Error> {
    const checkUser = await BuyerRepository.getBuyer(email);
    if ("email" in checkUser) {
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
    const passHash = await Bcrypt.getEncrypt(password);
    return BuyerRepository.setBuyer(name, passHash, email);
  }
  static async getEntry(
    password: string,
    email: string
  ): Promise<IBuyerToken | Return_Error> {
    const checkUser = await BuyerRepository.getBuyer(email);
    console.log(checkUser);
    if (!("email" in checkUser)) {
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
    const verify = await Bcrypt.verified(password, checkUser.password);
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
    const token = JWT.generateToken({ user: checkUser.email }, "30d");
    return {
      id: checkUser.id,
      name: checkUser.name,
      email: checkUser.email,
      token: token,
    };
  }
}
