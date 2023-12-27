import { IProductModelEdible } from "../../models/Product.model.edible";
import { IProductModelElectronic } from "../../models/Product.model.electronic";
import { IProductModelOutfit } from "../../models/Product.model.outfit";

export abstract class Product {
  constructor(
    public id: string,
    public name: string,
    public category: string,
    public price: number,
    public image: { data: Buffer; contentType: string },
    public user: string
  ) {}
  abstract createProduct(): Promise<
    IProductModelEdible | IProductModelOutfit | IProductModelElectronic
  >;
  abstract description(): string;
  abstract getDiscount(): number;
  public getName(): string {
    return this.name;
  }
  public getCategory(): string {
    return this.category;
  }
  public getPrice(): number {
    return this.price;
  }
  public getImage(): { data: Buffer; contentType: string } {
    return this.image;
  }
}
