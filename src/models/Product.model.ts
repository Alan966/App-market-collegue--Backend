import { IProduct } from "../interfaces/product.Interface";
import { Schema, model } from "mongoose";
export interface IProductModel extends IProduct, Document {}
// model mongoose
export type ProductType = "comestible" | "no_comestible";
const ProductSchema = new Schema<IProductModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      data: Buffer,
      contentType: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const ProductModel = model<IProductModel>("Product", ProductSchema);
