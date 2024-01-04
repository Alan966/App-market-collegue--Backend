import { ProductDiscount } from "../interfaces/product.Interface";
import {
  IProductModelOutfit,
  ProductModelOutfit,
} from "../models/Product.model.outfit";
import { Product } from "./fathers/product.repository";

export class ProductOutfit extends Product {
  constructor(
    public id: string,
    public name: string,
    public category: string,
    public price: number,
    public image: { data: Buffer; contentType: string },
    public user: string,
    public size: string,
    public color: string,
    public brand: string,
    public material: string,
    public garden: string,
    public style: string,
    public season: string,
    public range: string,
    public female: string
  ) {
    super(id, name, category, price, image, user);
  }
  async createProduct(): Promise<IProductModelOutfit> {
    return new Promise((resolve, reject) => {
      const product_data = {
        id: this.id,
        name: this.name,
        category: this.category,
        price: this.price,
        image: this.image,
        user: this.user,
        size: this.size,
        color: this.color,
        brand: this.brand,
        material: this.material,
        garden: this.garden,
        style: this.style,
        season: this.season,
        range: this.range,
        female: this.female,
      };
      ProductModelOutfit.create(product_data)
        .then((product) => resolve(product))
        .catch((err) => reject(err));
    });
  }
  static getProducts(find_by: any, object: any) {
    return new Promise((resolve, reject) => {
      ProductModelOutfit.find(find_by, object)
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
  static updateProduct(find_by: any, update: any) {
    return new Promise((resolve, reject) => {
      ProductModelOutfit.findOneAndUpdate(find_by, update)
        .then((product) => {
          resolve({
            success: true,
            product: product,
          });
        })
        .catch((err) => {
          reject({
            success: false,
            error: {
              code: "ERROR_UPDATING_PRODUCT",
              status: `${err}`,
            },
            error_code: 500,
          });
        });
    });
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
