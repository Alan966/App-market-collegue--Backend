import { IComestibles } from "../ProductsL1/comestibles.interface";
export enum DrinkType {
  COFFEE = "coffee",
  SODA = "soda",
  WATER = "water",
  JUICE = "juice",
  SMOOTHIE = "smoothie",
  ENERGY_DRINK = "energy_drink",
}
enum DrinkSize {
  SMALL = "small",
  MID = "mid",
  MID_BIG = "mid_big",
  BIG = "big",
  SO_BIG = "so_big",
}
export interface IBebidas extends IComestibles {
  drink_type: DrinkType;
  drink_size: DrinkSize;
}
