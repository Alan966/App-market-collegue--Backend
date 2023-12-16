import { IProductModel, ProductModel } from "../../models/Product.model";

export abstract class Product {
  constructor(
    public id: string,
    public name: string,
    public category: string,
    public price: number,
    public image: { data: Buffer; contentType: string },
    public quantity?: number,
    public package_type?: string,
    public create_date?: string,
    public expired_date?: string,
    public ingredients?: string,
    public preparation_instructions?: string,
    public type?: string,
    public size?: string,
    public color?: string,
    public brand?: string
  ) {}
  public async createProduct(): Promise<IProductModel> {
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
      color: this.color,
      brand: this.brand,
    };
    return await ProductModel.create(product_data);
  }
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
