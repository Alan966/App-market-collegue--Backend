import { IProduct } from "../product.Interface";

export interface IProductOutift extends IProduct {
  size: string;
  color: string;
  brand: string;
  material: string;
  garden: string;
  style: string;
  season: string;
  range: string;
  female: string;
}

export enum FemaleOptions {
  MENS = "mens",
  WOMENS = "womens",
  UNISEX = "unisex",
}
export enum RangeOptions {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
}
export enum SeasonOptions {
  WINTER = "winter",
  SUMMER = "summer",
  AUTUMN = "autumn",
  SPRING = "spring",
}
export enum StyleOptions {
  CASUAL = "casual",
  FORMAL = "formal",
  SPORT = "sport",
  URBAN = "urban",
}
export enum GardenOptions {
  INDOOR = "indoor",
  OUTDOOR = "outdoor",
}
export enum CategoryOptions {
  SHIRT = "shirt",
  PANTS = "pants",
  SHOES = "shoes",
  SOCKS = "socks",
  UNDERWEAR = "underwear",
  JACKET = "jacket",
  SWEATER = "sweater",
  HAT = "hat",
  BELT = "belt",
  WATCH = "watch",
  GLASSES = "glasses",
  SCARF = "scarf",
  GLOVES = "gloves",
  BAG = "bag",
  BACKPACK = "backpack",
  JEWELRY = "jewelry",
  OTHER = "other",
}
export enum SizeOptions {
  XS = "xs",
  S = "s",
  M = "m",
  L = "l",
  XL = "xl",
  XXL = "xxl",
  XXXL = "xxxl",
}
