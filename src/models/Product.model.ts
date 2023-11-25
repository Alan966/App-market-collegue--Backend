import { IProduct } from "../interfaces/product.Interface";
import { Schema, model } from "mongoose";
export interface IProductModel extends IProduct, Document {}
// model mongoose
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
    quantity: {
      type: Number,
    },
    createDate: {
      type: String,
    },
    size: {
      type: String,
    },
    color: {
      type: String,
    },
    brand: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const ProductModel = model<IProductModel>("Product", ProductSchema);
