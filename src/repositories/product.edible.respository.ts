import { ProductDiscount } from "../interfaces/product.Interface";
import { Product } from "./fathers/product.repository";

export class ProductEdible extends Product {
  constructor(
    public id: string,
    public name: string,
    public category: string,
    public price: number,
    public image: { data: Buffer; contentType: string },
    public quantity: number,
    public package_type: string,
    public create_date: string,
    public expired_date: string,
    public ingredients: string,
    public preparation_instructions: string,
    public type: string
  ) {
    super(
      id,
      name,
      category,
      price,
      image,
      quantity,
      package_type,
      create_date,
      expired_date,
      ingredients,
      preparation_instructions,
      type
    );
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
