import { IBuyer } from "../interfaces/BuyerInterface";
import { Return_Error } from "../interfaces/error.interface";
import { Buyer } from "../models/Buyer";
import { returnError } from "../errors/handleErrors";
export class BuyerRepository {
  static async setBuyer(
    name: string,
    password: string,
    email: string
  ): Promise<IBuyer> {
    const user = await Buyer.model.create({
      name: name,
      password: password,
      email: email,
    });
    return user;
  }
  static async getBuyer(email: string): Promise<IBuyer | Return_Error> {
    const user = await Buyer.model.findOne({ email });
    if (!user) {
      const error = returnError(
        500,
        "USER_NOT_FOUND",
        "Not was posible to find a buyer"
      );
      return {
        success: false,
        error: error.error,
        error_code: error.error_code,
      };
    }
    return user;
  }
}
