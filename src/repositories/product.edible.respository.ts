import { ProductDiscount } from "../interfaces/product.Interface";
import { Product } from "./fathers/product.repository";

export class ProductEdible extends Product {
  constructor(
    public id: string,
    public name: string,
    public category: string,
    public price: number,
    public image: { data: Buffer; contentType: string },
    public package_type: string,
    public expired_date: string,
    public ingredients: Array<string>,
    public preparation_instructions: string
  ) {
    super(id, name, category, price, image);
  }
  description(): string {
    return (
      "Este es un producto comestible nombre " +
      this.getName() +
      " de la categoria " +
      this.getCategory() +
      " y con un precio de $" +
      this.getPrice()
    );
  }
  getDiscount(): number {
    return this.getPrice() * ProductDiscount.COMESTIBLE;
  }
}
