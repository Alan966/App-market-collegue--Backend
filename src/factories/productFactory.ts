import { ProductType } from "../models/Product.model";
import { ProductEdibleService } from "../services/Product.service";
import { CustomRequest } from "../interfaces/req.interface";
import { returnError } from "../errors/handleErrors";

export class ProductFactory {
  static async createProduct(req: CustomRequest) {
    const type: ProductType = req.body.type;
    switch (type) {
      case "comestible":
        return await ProductEdibleService.createProduct(req);
      default:
        const error = returnError(
          500,
          "TYPE_PRODUCT_NOT_FOUND",
          "That isn't a type of product"
        );
        return error;
    }
  }
}
