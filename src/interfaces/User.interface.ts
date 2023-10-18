export type UserType = "buyer" | "vendor";
export interface IUser {
  id: string;
  type: UserType;
  name: string;
  email: string;
  password: string;
}

export interface IUserToken extends Omit<IUser, "password" | "type"> {
  token: string;
}
