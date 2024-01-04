import { CustomRequest } from "../../interfaces/req.interface";
import { ProductOutfit } from "../../repositories/product.outfit.respositorie";
import { v4 as uuidv4 } from "uuid";
import { returnError } from "../../errors/handleErrors";
import { MiddleImage } from "../../middlewares/image.midleware";
import {
  CategoryOptions,
  FemaleOptions,
  GardenOptions,
  RangeOptions,
  SeasonOptions,
  SizeOptions,
  StyleOptions,
} from "../../interfaces/ProductsL1/outift.interface";

export class ProductOutfitService {
  static async createProductOutfit({ file, body, username }: CustomRequest) {
    const {
      name,
      category,
      price,
      size,
      color,
      brand,
      material,
      garden,
      style,
      season,
      range,
      female,
    } = body;
    if (
      !name ||
      !category ||
      !price ||
      !size ||
      !color ||
      !brand ||
      !material ||
      !garden ||
      !style ||
      !season ||
      !range ||
      !female
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
          400,
          "CATEGORY_NOT_FOUND",
          "Category not found"
        );
        return error;
      } else if (!this.FemaleOptions(female)) {
        const error = returnError(400, "FAMELE_NOT_FOUND", "Famele not found");
        return error;
      } else if (!this.isRangeOptions(range)) {
        const error = returnError(400, "RANGE_NOT_FOUND", "Range not found");
        return error;
      } else if (!this.isSeasonOptions(season)) {
        const error = returnError(400, "SEASON_NOT_FOUND", "Season not found");
        return error;
      } else if (!this.isStyleOptions(style)) {
        const error = returnError(400, "STYLE_NOT_FOUND", "Style not found");
        return error;
      } else if (!this.isGardenOptions(garden)) {
        const error = returnError(400, "GARDEN_NOT_FOUND", "Garden not found");
        return error;
      } else if (!this.isSizeOptions(size)) {
        const error = returnError(400, "SIZE_NOT_FOUND", "Size not found");
        return error;
      }

      const image_bufer = await MiddleImage.resizeImage(file.path);
      //   image_buffer
      const product = new ProductOutfit(
        uuidv4(),
        name,
        category,
        parseFloat(price),
        { data: image_bufer, contentType: file.mimetype },
        username,
        size,
        color,
        brand,
        material,
        garden,
        style,
        season,
        range,
        female
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
  static async getProductsOutfit(find_by: any, avoid: any) {
    try {
      return ProductOutfit.getProducts(find_by, avoid);
    } catch (error) {
      const err = returnError(500, "ERROR_GET_PRODUCTS", `${error}`);
      return err;
    }
  }
  static async updateProductOutfit({ body }: CustomRequest) {
    if (!body.id) {
      const error = returnError(500, "MISSING_DATA", "Need to send product id");
      return error;
    }
    const id = body.id;
    delete body.type;
    delete body.id;
    try {
      return ProductOutfit.updateProduct({ id }, body);
    } catch (error) {
      const err = returnError(500, "ERROR_UPDATING_PRODUCT", `${error}`);
      return err;
    }
  }
  private static FemaleOptions(female: FemaleOptions): boolean {
    return Object.values(FemaleOptions).includes(female);
  }
  private static isCategory(category: CategoryOptions): boolean {
    return Object.values(CategoryOptions).includes(category);
  }
  private static isRangeOptions(range: RangeOptions): boolean {
    return Object.values(RangeOptions).includes(range);
  }
  private static isSeasonOptions(season: SeasonOptions): boolean {
    return Object.values(SeasonOptions).includes(season);
  }
  private static isStyleOptions(style: StyleOptions): boolean {
    return Object.values(StyleOptions).includes(style);
  }
  private static isGardenOptions(garden: GardenOptions): boolean {
    return Object.values(GardenOptions).includes(garden);
  }
  private static isSizeOptions(size: SizeOptions): boolean {
    return Object.values(SizeOptions).includes(size);
  }
}
