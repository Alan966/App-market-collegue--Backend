import { IProduct, ProductType } from "../interfaces/product.Interface";
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
  static getProducts(req: CustomRequest) {
    const type: ProductType = req.body.type;
    const avoid_image = {
      image: 0,
    };
    switch (type) {
      case ProductType.COMESTIBLE:
        console.log("entro");
        return ProductEdibleService.getProductsEdible({}, avoid_image);
      case ProductType.VESTIMENTA:
        return ProductOutfitService.getProductsOutfit({}, avoid_image);
      case ProductType.ELECTRONICA:
        return ProductElectronicService.getProductsElectronic({}, avoid_image);
      default:
        const error = returnError(
          500,
          "TYPE_PRODUCT_NOT_FOUND",
          "That isn't a type of product"
        );
        return error;
    }
  }
  static async getAllProducts() {
    let all_products: any[] = [];
    const include_body = {
      _id: 1,
      name: 1,
      category: 1,
      price: 1,
      user: 1,
    };
    await Promise.all([
      ProductEdibleService.getProductsEdible({}, include_body),
      ProductOutfitService.getProductsOutfit({}, include_body),
      ProductElectronicService.getProductsElectronic({}, include_body),
    ]).then((values: any) => {
      values.forEach((value: any) => {
        if (value.success) {
          all_products = [...all_products, ...value.products];
        } else {
          return value;
        }
      });
    });
    return {
      success: true,
      products: all_products,
    };
  }
  static async getProductsByUser(req: CustomRequest) {
    const type: ProductType = req.body.type;
    const user = req.username;
    const avoid_image = {
      image: 0,
    };
    switch (type) {
      case ProductType.COMESTIBLE:
        return ProductEdibleService.getProductsEdible({ user }, avoid_image);
      case ProductType.VESTIMENTA:
        return ProductOutfitService.getProductsOutfit({ user }, avoid_image);
      case ProductType.ELECTRONICA:
        return ProductElectronicService.getProductsElectronic(
          { user },
          avoid_image
        );
      default:
        const error = returnError(
          500,
          "TYPE_PRODUCT_NOT_FOUND",
          "That isn't a type of product"
        );
        return error;
    }
  }
  static async updateProduct(req: CustomRequest) {
    const type: ProductType = req.body.type;
    switch (type) {
      case ProductType.COMESTIBLE:
        return ProductEdibleService.updateProductEdible(req);
      case ProductType.VESTIMENTA:
        return ProductOutfitService.updateProductOutfit(req);
      case ProductType.ELECTRONICA:
        return ProductElectronicService.updateProductElectronic(req);
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
