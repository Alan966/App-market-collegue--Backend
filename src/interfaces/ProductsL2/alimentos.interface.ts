import { IComestibles } from "../ProductsL1/comestibles.interface";
export enum FoodType {
  VEGETARIAN = "vegetarian",
  MEAT = "meat",
  MIXED = "midex",
  FAST_FOOD = "fast_food",
  FRUIT = "fruit",
  WITH_BREAD = "with_bread",
}
export enum ServiceSize {
  SMALL = "small",
  MID = "mid",
  MID_BIG = "mid_big",
  BIG = "big",
  SO_BIG = "so_big",
}
export enum RATING {
  LEVEL_ONE = "level_one",
  LEVEL_TWO = "level_two",
  LEVEL_THREE = "level_three",
  LEVEL_FOUR = "level_four",
  LEVEL_FIVE = "level_five",
}
export interface IAlimentos extends IComestibles {
  food_type: FoodType;
  main_ingredient: string;
  serving_size: ServiceSize;
  name: string;
  rating: RATING;
  promotion: boolean;
  name_promotion: string;
  percentage_promotion: number;
}
