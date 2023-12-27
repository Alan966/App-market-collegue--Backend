import { IProductElectronic } from "../interfaces/ProductsL1/electronic.interface";
import { Schema, model } from "mongoose";
export interface IProductModelElectronic extends IProductElectronic, Document {}
// model mongoose
const ProductSchemaEdible = new Schema(
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
    user: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    material: {
      type: String,
      required: true,
    },
    voltage: {
      type: String,
    },
    power: {
      type: String,
    },
    screen_size: {
      type: String,
    },
    processor: {
      type: String,
    },
    memory: {
      type: String,
    },
    storage: {
      type: String,
    },
    connectivity: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const ProductModelElectronic = model<IProductModelElectronic>(
  "ProductElectronic",
  ProductSchemaEdible
);
