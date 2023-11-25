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
