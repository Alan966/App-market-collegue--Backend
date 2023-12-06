import { IProduct } from "../product.Interface";
export enum packageType {
  BOX = "box",
  PLASTIC_BAG = "plastic_bag",
  CAN = "can",
  PLASTIC_BOTTLE = "plastic_bottle",
  NAPKIN = "napkin",
  WITHOUT_PACKAGE = "without_package",
  DISH = "dish",
}
export interface IComestibles extends IProduct {
  expired_date: String;
  ingredients: Array<string>;
  preparation_instructions: string;
  package_type: packageType;
  description: string;
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

export interface IProductEdible extends IProduct {
  package_type: string;
  expired_date: string;
  ingredients: Array<string>;
  preparation_instructions: string;
}
