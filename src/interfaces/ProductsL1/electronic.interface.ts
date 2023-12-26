import { IProduct } from "../product.Interface";

export interface IProductElectronic extends IProduct {
  quantity: number;
  size: string;
  color: string;
  brand: string;
  material: string;
  voltage?: string;
  power?: string;
  screen_size?: string;
  processor?: string;
  memory?: string;
  storage?: string;
  connectivity?: string;
}

export enum CategoryElectronicOptions {
  TV = "tv",
  Laptop = "laptop",
  Smartphone = "smartphone",
  Tablet = "tablet",
  Smartwatch = "smartwatch",
  Headphones = "headphones",
  Camera = "camera",
  Console = "console",
  Printer = "printer",
  Monitor = "monitor",
  Mouse = "mouse",
  Keyboard = "keyboard",
  Projector = "projector",
  Drone = "drone",
  Other = "other",
}

export enum SizeElectronicOptions {
  Small = "small",
  Medium = "medium",
  Large = "large",
}
