export interface IBuyer {
  id: string;
  name: string;
  password: string;
  email: string;
}
export interface IBuyerToken extends Omit<IBuyer, "password"> {
  token: string;
}
