import { Schema, model } from "mongoose";
import { IProductOutift } from "../interfaces/ProductsL1/outift.interface";

export interface IProductModelOutfit extends IProductOutift, Document {}
const ProductSchemaOutfit = new Schema<IProductModelOutfit>({
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
  garden: {
    type: String,
    required: true,
  },
  style: {
    type: String,
    required: true,
  },
  season: {
    type: String,
    required: true,
  },
  range: {
    type: String,
    required: true,
  },
  female: {
    type: String,
    required: true,
  },
});

export const ProductModelOutfit = model<IProductModelOutfit>(
  "ProductOutfit",
  ProductSchemaOutfit
);
