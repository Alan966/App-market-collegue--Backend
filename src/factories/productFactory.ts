import { ProductType } from "../interfaces/product.Interface";
import { ProductEdibleService } from "../services/Products/ProductEdible.service";
import { CustomRequest } from "../interfaces/req.interface";
import { returnError } from "../errors/handleErrors";
import { ProductOutfitService } from "../services/Products/ProductOutfit.service";
import { ProductElectronicService } from "../services/Products/ProductElectronics.service";

export class ProductFactory {
  static async createProduct(req: CustomRequest) {
    const type: ProductType = req.body.type;
    switch (type) {
      case ProductType.COMESTIBLE:
        return await ProductEdibleService.createProductEdible(req);
      case ProductType.VESTIMENTA:
        return await ProductOutfitService.createProductOutfit(req);
      case ProductType.ELECTRONICA:
        return await ProductElectronicService.createProductElectronic(req);
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
