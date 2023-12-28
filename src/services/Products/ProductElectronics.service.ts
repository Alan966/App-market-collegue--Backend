import { CustomRequest } from "../../interfaces/req.interface";
import { ProductElectronic } from "../../repositories/product.electronic.repository";
import { v4 as uuidv4 } from "uuid";
import { returnError } from "../../errors/handleErrors";
import { MiddleImage } from "../../middlewares/image.midleware";
import {
  CategoryElectronicOptions,
  SizeElectronicOptions,
} from "../../interfaces/ProductsL1/electronic.interface";
export class ProductElectronicService {
  static async createProductElectronic({
    file,
    body,
    username,
  }: CustomRequest) {
    const {
      name,
      category,
      price,
      quantity,
      size,
      color,
      brand,
      material,
      voltage,
      power,
      screen_size,
      processor,
      memory,
      storage,
      connectivity,
    } = body;
    if (
      !name ||
      !category ||
      !price ||
      !quantity ||
      !size ||
      !color ||
      !brand ||
      !material
    ) {
      const error = returnError(
        500,
        "MISSING_DATA",
        "Need to send all data of product"
      );
      return error;
    }
    if (file && username) {
      if (!this.isCategory(category)) {
        const error = returnError(
          500,
          "MISSING_DATA",
          "Need to send a correct category"
        );
        return error;
      }
      if (!this.isSize(size)) {
        const error = returnError(
          500,
          "MISSING_DATA",
          "Need to send a correct size"
        );
        return error;
      }
      // image_buffer
      const image_buffer = await MiddleImage.resizeImage(file.path);
      const product = new ProductElectronic(
        uuidv4(),
        name,
        category,
        parseFloat(price),
        { data: image_buffer, contentType: file.mimetype },
        username,
        quantity,
        size,
        color,
        brand,
        material,
        voltage,
        power,
        screen_size,
        processor,
        memory,
        storage,
        connectivity
      );
      // delete file
      MiddleImage.deleteFile(file.path);
      return product.createProduct();
    } else {
      const error = returnError(
        500,
        "MISSING_DATA",
        "Need to send product_picture file"
      );
      return error;
    }
  }
  static async getProductsElectronic(find_by: any, avoid: any) {
    try {
      return ProductElectronic.getProducts(find_by, avoid);
    } catch (error) {
      const err = returnError(500, "ERROR_GETTING_PRODUCTS", `${error}`);
      return err;
    }
  }
  private static isCategory(category: CategoryElectronicOptions) {
    return Object.values(CategoryElectronicOptions).includes(category);
  }
  private static isSize(size: SizeElectronicOptions) {
    return Object.values(SizeElectronicOptions).includes(size);
  }
}
