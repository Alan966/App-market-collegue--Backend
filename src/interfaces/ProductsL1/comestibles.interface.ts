import { IProductModelEdible } from "../../models/Product.model.edible";
import { IProduct } from "../product.Interface";
import { SuccessResponse } from "../success.response.interface";
export enum packageType {
  BOX = "box",
  PLASTIC_BAG = "plastic_bag",
  CAN = "can",
  PLASTIC_BOTTLE = "plastic_bottle",
  NAPKIN = "napkin",
  WITHOUT_PACKAGE = "without_package",
  DISH = "dish",
}
export enum CategoryComestibles {
  // CATEGORIES OF COMESTIBLES IN A COLLEGUE
  BEBIDAS = "bebidas",
  SNACKS = "snacks",
  FAST_FOOD = "fast_food",
  BAKERY_PRODUCTS = "bakery_products",
  DAITY_PRODUCTS = "daity_products",
  HOT_EAT = "hot_eat",
  HEALTY_FOOD = "healty_food",
  SWEETS_AND_CANDIES = "sweets_and_candies",
  ICE_PRODUCTS = "ice_products",
  SPECIAL_PRODUCTS = "special_products",
}
export interface IProductComestible extends IProduct {
  quantity: number;
  package_type: packageType;
  create_date: string;
  expired_date: string;
  ingredients: string[];
  preparation_instructions: string;
  type: string;
  size: string;
  brand: string;
}
export interface IGetProductsResponse extends Omit<SuccessResponse, "data"> {
  products: IProductModelEdible[];
}
