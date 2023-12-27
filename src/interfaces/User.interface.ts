export enum UserType {
  BUYER = "buyer",
  VENDOR = "vendor",
}
export interface IUser {
  id: string;
  type: UserType;
  name: string;
  email: string;
  password: string;
  profits?: number;
}

export interface IUserToken extends Omit<IUser, "password"> {
  token: string;
  type: UserType;
}
