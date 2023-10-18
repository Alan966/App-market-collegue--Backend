import { IUser, UserType } from "../interfaces/User.interface";
import { IUserModel, UserModel } from "../models/Users.model";

export abstract class User implements IUser {
  constructor(
    public id: string,
    public type: UserType,
    public name: string,
    public email: string,
    public password: string
  ) {}
  public async createUser(): Promise<IUserModel> {
    const user_data = {
      id: this.id,
      type: this.type,
      name: this.name,
      email: this.email,
      password: this.password,
    };
    return await UserModel.create(user_data);
  }
  public static async getUser(email: string): Promise<IUserModel | null> {
    return await UserModel.findOne({ email: email });
  }
}
