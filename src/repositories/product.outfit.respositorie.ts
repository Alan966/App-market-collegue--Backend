import { ProductDiscount } from "../interfaces/product.Interface";
import { Product } from "./fathers/product.repository";

export class ProductOutfit extends Product {
  constructor(
    public id: string,
    public name: string,
    public category: string,
    public price: number,
    public image: { data: Buffer; contentType: string },
    public size: string,
    public color: string,
    public brand: string
  ) {
    super(id, name, category, price, image);
  }
  description(): string {
    return (
      "Este es un producto vestimenta nombre " +
      this.getName() +
      " de la categoria " +
      this.getCategory() +
      " y con un precio de $" +
      this.getPrice() +
      " de marca " +
      this.getBrand() +
      " de color " +
      this.getColor() +
      " y de talle " +
      this.getSize()
    );
  }
  getDiscount(): number {
    return this.price * ProductDiscount.VESTIMENTA;
  }
  getBrand(): string {
    return this.brand;
  }
  getColor(): string {
    return this.color;
  }
  getSize(): string {
    return this.size;
  }
}
