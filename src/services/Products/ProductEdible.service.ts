import { CustomRequest } from "../../interfaces/req.interface";
import { v4 as uuidv4 } from "uuid";
import { ProductEdible } from "../../repositories/product.edible.respository";
import { returnError } from "../../errors/handleErrors";
import {
  CategoryComestibles,
  packageType,
} from "../../interfaces/ProductsL1/comestibles.interface";
import { MiddleImage } from "../../middlewares/image.midleware";
export class ProductEdibleService {
  static async createProductEdible({ file, body, username }: CustomRequest) {
    const {
      name,
      category,
      price,
      quantity,
      package_type,
      create_date,
      expired_date,
      ingredients,
      preparation_instructions,
      type,
      size,
      brand,
    } = body;
    if (
      !name ||
      !category ||
      !price ||
      !quantity ||
      !package_type ||
      !create_date ||
      !expired_date ||
      !ingredients ||
      !preparation_instructions ||
      !type ||
      !size ||
      !brand
    ) {
      const error = returnError(
        500,
        "MISSING_DATA",
        "Need to send all data of product"
      );
      return error;
    }
    if (!this.isPackageType(package_type)) {
      const error = returnError(
        500,
        "PACKAGE_TYPE_NOT_FOUND",
        "Package type not found"
      );
      return error;
    }
    if (file && username) {
      if (!this.isCategory(category)) {
        const error = returnError(
          500,
          "CATEGORY_NOT_FOUND",
          "Category not found"
        );
        return error;
      }
      const image_buffer = await MiddleImage.resizeImage(file.path);
      const product = new ProductEdible(
        uuidv4(),
        name,
        category,
        parseFloat(price),
        { data: image_buffer, contentType: file.mimetype },
        username,
        quantity,
        package_type,
        create_date,
        expired_date,
        ingredients,
        preparation_instructions,
        type,
        size,
        brand
      );
      // delete image
      MiddleImage.deleteFile(file.path);
      await product.createProduct();
      return product;
    } else {
      const error = returnError(
        500,
        "MISSING_DATA",
        "Need to send product_picture file"
      );
      return error;
    }
  }
  static getProductsEdible() {
    try {
      return ProductEdible.getProducts();
    } catch (error) {
      const err = returnError(
        500,
        "ERROR_GETTING_PRODUCTS",
        "Error getting products"
      );
      return err;
    }
  }
  private static isPackageType(package_type: string): boolean {
    let isPackageType = false;
    switch (package_type) {
      case packageType.BOX:
        isPackageType = true;
        break;
      case packageType.PLASTIC_BAG:
        isPackageType = true;
        break;
      case packageType.CAN:
        isPackageType = true;
        break;
      case packageType.PLASTIC_BOTTLE:
        isPackageType = true;
        break;
      case packageType.NAPKIN:
        isPackageType = true;
        break;
      case packageType.WITHOUT_PACKAGE:
        isPackageType = true;
        break;
      case packageType.DISH:
        isPackageType = true;
        break;
      default:
        isPackageType = false;
        break;
    }
    return isPackageType;
  }
  private static isCategory(category: string): boolean {
    let create = false;
    switch (category) {
      case CategoryComestibles.BEBIDAS:
        create = true;
        break;
      case CategoryComestibles.SNACKS:
        create = true;
        break;
      case CategoryComestibles.FAST_FOOD:
        create = true;
        break;
      case CategoryComestibles.BAKERY_PRODUCTS:
        create = true;
        break;
      case CategoryComestibles.DAITY_PRODUCTS:
        create = true;
        break;
      case CategoryComestibles.HOT_EAT:
        create = true;
        break;
      case CategoryComestibles.HEALTY_FOOD:
        create = true;
        break;
      case CategoryComestibles.SWEETS_AND_CANDIES:
        create = true;
        break;
      case CategoryComestibles.ICE_PRODUCTS:
        create = true;
        break;
      case CategoryComestibles.SPECIAL_PRODUCTS:
        create = true;
        break;
      default:
        create = false;
        break;
    }
    return create;
  }
}
