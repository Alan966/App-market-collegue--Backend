import { returnError } from "../errors/handleErrors";
import { IBuyer } from "../interfaces/BuyerInterface";
import { Return_Error } from "../interfaces/error.interface";
import { BuyerRepository } from "../repositories/buyerRepository";
import { Bcrypt } from "../utils/bcrypt.handle";
export class BuyerService {
  static async createBuyerService(
    name: string,
    password: string,
    email: string
  ): Promise<IBuyer | Return_Error> {
    const checkUser = await BuyerRepository.getBuyer(email);
    if ("email" in checkUser) {
      const error = returnError(
        500,
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
}
