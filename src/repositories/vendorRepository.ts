import { returnError } from "../errors/handleErrors";
import { IVendor } from "../interfaces/Vendorinterface";
import { Return_Error } from "../interfaces/error.interface";
import { Vendor } from "../models/Vendor";
import { v4 as uuidv4 } from "uuid";

export class VendorRepository {
  static async setVendor(
    name: string,
    password: string,
    email: string
  ): Promise<IVendor> {
    const user = await Vendor.model.create({
      id: uuidv4(),
      name: name,
      password: password,
      email: email,
    });
    return user;
  }
  static async getVendor(email: string): Promise<IVendor | Return_Error> {
    const user = await Vendor.model.findOne({ email });
    if (!user) {
      const error = returnError(
        500,
        "USER_NOT_FOUND",
        "Not was posible to find a vendor"
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
