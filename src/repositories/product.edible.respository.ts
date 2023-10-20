import { Product } from "./product.repository";

export class ProductEdible extends Product {
  constructor(
    public id: string,
    public name: string,
    public category: string,
    public price: number,
    public image: { data: Buffer; contentType: string }
  ) {
    super(id, name, category, price, image);
  }
  description(): string {
    return (
      "Este es un producto comestible nombre " +
      this.name +
      " de la categoria " +
      this.category +
      " y con un precio de $" +
      this.price
    );
  }
}
