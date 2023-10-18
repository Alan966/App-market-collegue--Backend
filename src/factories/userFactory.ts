import { BuyerService } from "../services/Buyer.service";
import { Return_Error } from "../interfaces/error.interface";
import { VendorService } from "../services/Vendor.service";
import { returnError } from "../errors/handleErrors";
import { IUser, IUserToken, UserType } from "../interfaces/User.interface";
type createUser = {
  type: UserType;
  name: string;
  password: string;
  email: string;
};
type Signin = {
  type: UserType;
  email: string;
  password: string;
};
export class UserFactory {
  static async createUser({
    type,
    name,
    email,
    password,
  }: createUser): Promise<IUser | Return_Error> {
    switch (type) {
      case "buyer":
        return await BuyerService.createBuyer(name, email, password);
      case "vendor":
        return await VendorService.createVendor(name, email, password);
      default:
        const error = returnError(
          500,
          "TYPE_USER_NOT_FOUND",
          "That isn't a type of user"
        );
        return error;
    }
  }
  static async getEntry({
    type,
    password,
    email,
  }: Signin): Promise<IUserToken | Return_Error> {
    switch (type) {
      case "buyer":
        return await BuyerService.getEntry(password, email);
      case "vendor":
        return await VendorService.getEntry(password, email);
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
