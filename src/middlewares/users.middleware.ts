import { NextFunction, Request, Response } from "express";
import { returnError } from "../errors/handleErrors";
import { JWT } from "../utils/jwt.handle";
import { IUserToken } from "../interfaces/User.interface";
import { CustomRequest } from "../interfaces/req.interface";

export class MiddleUsers {
  static async isVendor(req: CustomRequest, res: Response, next: NextFunction) {
    const token =
      req.headers.authorization && req.headers.authorization.split(" ")[1];
    if (!token) {
      const error = returnError(500, "ERR_TOKEN_NOT_FOUND", "Token not found");
      return res.status(error.error_code).json({
        success: false,
        error: error.error,
      });
    }
    const decode_token = JWT.decodeToken(token);
    if (!decode_token) {
      const error = returnError(500, "ERR_TOKEN_INVALID", "Token invalid");
      return res.status(error.error_code).json({
        success: false,
        error: error.error,
      });
    }
    if (decode_token.is_expired && decode_token.payload === null) {
      const error = returnError(500, "ERR_TOKEN_EXPIRED", "Token expired");
      return res.status(error.error_code).json({
        success: false,
        error: error.error,
      });
    }
    const payload = <IUserToken>decode_token.payload;
    const type = payload.type;
    if (type !== "vendor") {
      const error = returnError(
        403,
        "ERR_USER_NOT_AUTHORIZED",
        "User not authorized"
      );
      return res.status(error.error_code).json({
        success: false,
        error: error.error,
      });
    }
    req.username = payload.name;
    next();
  }
}
