import { packageType } from "../interfaces/ProductsL1/comestibles.interface";
import { ProductDiscount } from "../interfaces/product.Interface";
import {
  IProductModelEdible,
  ProductModelEdible,
} from "../models/Product.model.edible";
import { Product } from "./fathers/product.repository";

export class ProductEdible extends Product {
  constructor(
    public id: string,
    public name: string,
    public category: string,
    public price: number,
    public image: { data: Buffer; contentType: string },
    public quantity: number,
    public package_type: packageType,
    public create_date: string,
    public expired_date: string,
    public ingredients: string,
    public preparation_instructions: string,
    public type: string,
    public size: string,
    public brand: string
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
  createProduct(): Promise<IProductModelEdible> {
    return new Promise((resolve, reject) => {
      const product_data = {
        id: this.id,
        name: this.name,
        category: this.category,
        price: this.price,
        image: this.image,
        quantity: this.quantity,
        package_type: this.package_type,
        create_date: this.create_date,
        expired_date: this.expired_date,
        ingredients: this.ingredients,
        preparation_instructions: this.preparation_instructions,
        type: this.type,
        size: this.size,
        brand: this.brand,
      };
      ProductModelEdible.create(product_data)
        .then((product) => resolve(product))
        .catch((err) => reject(err));
    });
  }
}
