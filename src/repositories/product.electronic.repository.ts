import { ProductDiscount } from "../interfaces/product.Interface";
import { Product } from "./fathers/product.repository";

export class ProductElectronic extends Product {
  constructor(
    public id: string,
    public name: string,
    public category: string,
    public price: number,
    public image: { data: Buffer; contentType: string },
    public quantity: number,
    public createDate: string
  ) {
    super(id, name, category, price, image);
  }
  getQuantity() {
    return this.quantity;
  }
  description(): string {
    return (
      "Este es un producto electronico nombre " +
      this.getName() +
      " de la categoria " +
      this.getCategory() +
      " y con un precio de $" +
      this.getPrice() +
      " y con una cantidad de " +
      this.getQuantity()
    );
  }
  getDiscount(): number {
    return this.getPrice() * ProductDiscount.ELECTRONICA;
  }
}
