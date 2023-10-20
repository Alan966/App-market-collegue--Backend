import { IProductModel, ProductModel } from "../models/Product.model";

export abstract class Product {
  constructor(
    public id: string,
    public name: string,
    public category: string,
    public price: number,
    public image: { data: Buffer; contentType: string }
  ) {}
  public async createProduct(): Promise<IProductModel> {
    const product_data = {
      id: this.id,
      name: this.name,
      category: this.category,
      price: this.price,
      image: this.image,
    };
    return await ProductModel.create(product_data);
  }
  abstract description(): string;
  public getName() {
    return this.name;
  }
  public getCategory() {
    return this.category;
  }
  public getPrice() {
    return this.price;
  }
  public static getImage() {}
}
