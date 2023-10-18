import { returnError } from "../errors/handleErrors";
import { IUser, IUserToken } from "../interfaces/User.interface";
import { Return_Error } from "../interfaces/error.interface";
import { Vendor } from "../repositories/Vendor.repository";
import { Bcrypt } from "../utils/bcrypt.handle";
import { JWT } from "../utils/jwt.handle";
export class VendorService {
  static async createVendor(
    name: string,
    email: string,
    password: string
  ): Promise<IUser | Return_Error> {
    const passHash = await Bcrypt.getEncrypt(password);
    const newVendor = new Vendor(name, email, passHash);
    if ((await Vendor.getUser(email)) !== null) {
      const error = returnError(
        400,
        "USER_ALREADY_EXIST",
        "That email has been used yet"
      );
      return {
        success: false,
        error: error.error,
        error_code: error.error_code,
      };
    }
    return newVendor.createUser();
  }
  static async getEntry(
    password: string,
    email: string
  ): Promise<IUserToken | Return_Error> {
    const vendorExist = await Vendor.getUser(email);
    if (vendorExist === null) {
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
    const verify = await Bcrypt.verified(password, vendorExist.password);
    if (!verify) {
      const error = returnError(
        401,
        "WRONG_PASSWORD",
        "NEED to use the correct password"
      );
      return {
        success: false,
        error: error.error,
        error_code: error.error_code,
      };
    }

    const token = JWT.generateToken({ user: vendorExist.email }, "30d");
    return {
      id: vendorExist.id,
      name: vendorExist.name,
      email: vendorExist.email,
      token: token,
    };
  }
}
