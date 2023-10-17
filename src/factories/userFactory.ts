import { IBuyer } from "../interfaces/BuyerInterface";
import { IVendor } from "../interfaces/Vendorinterface";
import { BuyerService } from "../services/buyerService";
import { Return_Error } from "../interfaces/error.interface";
import { VendorService } from "../services/vendorService";
import { returnError } from "../errors/handleErrors";
type UserType = "buyer" | "vendor";
type createUser = {
  type: UserType;
  name: string;
  password: string;
  email: string;
};
export class UserFactory {
  static async createUser({
    type,
    name,
    password,
    email,
  }: createUser): Promise<IBuyer | IVendor | Return_Error> {
    switch (type) {
      case "buyer":
        return await BuyerService.createBuyerService(name, password, email);
      case "vendor":
        return await VendorService.createVendorService(name, password, email);
      default:
        const error = returnError(
          500,
          "TYPE_USER_NOT_FOUND",
          "That isn't a type of user"
        );
        return error;
    }
  }
}
