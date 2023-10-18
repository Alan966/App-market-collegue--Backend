import { IUser } from "../interfaces/User.interface";
import { Schema, model } from "mongoose";
export interface IUserModel extends IUser, Document {}
//model mongoose
const UserSchema = new Schema<IUserModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    type: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const UserModel = model<IUserModel>("User", UserSchema);
