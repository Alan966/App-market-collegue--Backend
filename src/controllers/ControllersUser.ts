import { Request, Response } from "express";
import { UserFactory } from "../factories/userFactory";
import { returnError } from "../errors/handleErrors";

export class UserController {
  static async createUser({ body }: Request, res: Response): Promise<void> {
    try {
      const user = await UserFactory.createUser(body);
      if ("success" in user) {
        res.status(user.error_code).json({
          success: false,
          error: user.error,
        });
        return;
      }
      res.status(200).json({
        success: true,
        user,
      });
    } catch (an_error) {
      const error = returnError(500, "ERR_CREATE_USER", `${an_error}`);
      res.status(error.error_code).json({
        success: false,
        error: error.error,
      });
    }
  }
  static async getEntry({ body }: Request, res: Response): Promise<void> {
    try {
      const user_access = await UserFactory.getEntry(body);
      if ("success" in user_access) {
        res.status(user_access.error_code).json({
          success: false,
          error: user_access.error
        });
        return;
      }
      res.status(200).json({
        success: true,
        user: user_access
      })
    } catch (query_error) {
      const error = returnError(500, "ERR_GET_ACCESS", `${query_error}`)
      res.status(error.error_code).json({
        success: false,
        error: error.error
      })
    }
  }
}
