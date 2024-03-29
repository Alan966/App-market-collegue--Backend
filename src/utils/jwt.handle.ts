import "dotenv/config";
import { JwtPayload, TokenExpiredError, sign, verify } from "jsonwebtoken";
import { IUserToken } from "../interfaces/User.interface";
type token = string;
type responseToken = {
  is_expired: boolean;
  payload: null | string | JwtPayload;
};
export class JWT {
  static decodeToken(token: token): responseToken | null {
    try {
      const payload = verify(token, <string>process.env.JWT_SECRET);
      return { is_expired: false, payload: payload };
    } catch (decode_error) {
      console.log(decode_error);
      if (decode_error instanceof TokenExpiredError) {
        return { is_expired: true, payload: null };
      }
      return null;
    }
  }
  static generateToken(payload: Object, duration: string): token {
    return sign(payload, <string>process.env.JWT_SECRET, {
      expiresIn: duration,
    });
  }
}
