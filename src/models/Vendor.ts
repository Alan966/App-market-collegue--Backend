import { IVendor } from "../interfaces/Vendorinterface";
import { Schema, model } from "mongoose";
export interface IVendorModel extends IVendor, Document {}
export class Vendor {
  public static schema = new Schema(
    {
      id: {
        type: String,
        require: true,
        unique: true,
      },
      name: {
        type: String,
        require: true,
      },
      password: {
        type: String,
        require: true,
      },
      email: {
        type: String,
        require: true,
      },
    },
    {
      timestamps: true,
      versionKey: false,
    }
  );
  public static model = model<IVendorModel>("Vendor", Vendor.schema);
}
