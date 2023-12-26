import { IProductComestible } from "../interfaces/ProductsL1/comestibles.interface";
import { Schema, model } from "mongoose";
export interface IProductModelEdible extends IProductComestible, Document {}
// model mongoose
const ProductSchemaEdible = new Schema<IProductModelEdible>(
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
    package_type: {
      type: String,
    },
    create_date: {
      type: String,
    },
    expired_date: {
      type: String,
    },
    ingredients: {
      type: [String],
    },
    preparation_instructions: {
      type: String,
    },
    type: {
      type: String,
    },
    size: {
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

export const ProductModelEdible = model<IProductModelEdible>(
  "ProductEdible",
  ProductSchemaEdible
);
