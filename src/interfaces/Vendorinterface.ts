export interface IVendor {
  id: string;
  name: String;
  password: string;
  email: string;
}

export interface IVendorToken extends IVendor {
  token: string;
}
