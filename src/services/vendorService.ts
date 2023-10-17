import { returnError } from "../errors/handleErrors";
import { IVendor } from "../interfaces/Vendorinterface";
import { Return_Error } from "../interfaces/error.interface";
import { VendorRepository } from "../repositories/vendorRepository";
import { Bcrypt } from "../utils/bcrypt.handle";
export class VendorService {
  static async createVendorService(
    name: string,
    password: string,
    email: string
  ): Promise<IVendor | Return_Error> {
    const checkUser = await VendorRepository.getVendor(email);
    if ("email" in checkUser) {
      const error = returnError(
        500,
        "USER_ALREADY_EXIST",
        "That email has been used yet"
      );
      return {
        success: false,
        error: error.error,
        error_code: error.error_code,
      };
    }
    const passHash = await Bcrypt.getEncrypt(password);
    return VendorRepository.setVendor(name, passHash, email);
  }
}
