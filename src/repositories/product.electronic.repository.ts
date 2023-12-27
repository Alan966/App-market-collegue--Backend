import { ProductDiscount } from "../interfaces/product.Interface";
import {
  IProductModelElectronic,
  ProductModelElectronic,
} from "../models/Product.model.electronic";
import { Product } from "./fathers/product.repository";

export class ProductElectronic extends Product {
  constructor(
    public id: string,
    public name: string,
    public category: string,
    public price: number,
    public image: { data: Buffer; contentType: string },
    public user: string,
    public quantity: number,
    public size: string,
    public color: string,
    public brand: string,
    public material: string,
    public voltage: string,
    public power: string,
    public screen_size: string,
    public processor: string,
    public memory: string,
    public storage: string,
    public connectivity: string
  ) {
    super(id, name, category, price, image, user);
  }
  getQuantity() {
    return this.quantity;
  }
  createProduct(): Promise<IProductModelElectronic> {
    return new Promise((resolve, reject) => {
      const product_data = {
        id: this.id,
        name: this.name,
        category: this.category,
        price: this.price,
        image: this.image,
        user: this.user,
        quantity: this.quantity,
        size: this.size,
        color: this.color,
        brand: this.brand,
        material: this.material,
        voltage: this.voltage,
        power: this.power,
        screen_size: this.screen_size,
        processor: this.processor,
        memory: this.memory,
        storage: this.storage,
        connectivity: this.connectivity,
      };
      ProductModelElectronic.create(product_data)
        .then((product) => resolve(product))
        .catch((err) => reject(err));
    });
  }
  static getProducts(object: any) {
    return new Promise((resolve, reject) => {
      ProductModelElectronic.find({}, object)
        .then((products) =>
          resolve({
            success: true,
            products: products,
          })
        )
        .catch((err) =>
          reject({
            success: false,
            error: {
              code: "ERROR_GET_PRODUCTS",
              status: err,
            },
            error_code: 500,
          })
        );
    });
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
