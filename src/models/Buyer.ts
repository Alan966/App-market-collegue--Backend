import { IBuyer } from "../interfaces/BuyerInterface";
import { Schema, model } from "mongoose";
export interface IBuyerModel extends IBuyer, Document {}
export class Buyer {
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
  public static model = model<IBuyerModel>("Buyer", Buyer.schema);
}
