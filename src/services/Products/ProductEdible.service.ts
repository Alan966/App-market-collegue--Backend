import { CustomRequest } from "../../interfaces/req.interface";
import sharp, { Metadata } from "sharp";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import { ProductEdible } from "../../repositories/product.edible.respository";
import { returnError } from "../../errors/handleErrors";
import {
  CategoryComestibles,
  IProductEdible,
} from "../../interfaces/ProductsL1/comestibles.interface";
export class ProductEdibleService {
  static async createProductEdible({ file, body }: CustomRequest) {
    const {
      name,
      category,
      price,
      package_type,
      expired_date,
      ingredients,
      preparation_instructions,
    } = body;
    if (
      !name ||
      !category ||
      !price ||
      !package_type ||
      !expired_date ||
      !ingredients ||
      !preparation_instructions
    ) {
    }
    if (file) {
      // image_buffer
      const image_buffer = await this.uploadImage(file);
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
      if (!create) {
        const error = returnError(
          500,
          "CATEGORY_NOT_FOUND",
          "Category not found"
        );
        return error;
      }
      const product = new ProductEdible(
        uuidv4(),
        name,
        category,
        parseFloat(price),
        { data: image_buffer, contentType: file.mimetype },
        package_type,
        expired_date,
        ingredients,
        preparation_instructions
      );
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
  static async uploadImage(file: Express.Multer.File) {
    const image = sharp(file.path);
    const image_buffer = await image
      .metadata()
      .then(function (metadata: Metadata): Promise<Buffer> {
        if (metadata.width !== undefined && metadata.width > 1800) {
          return image.resize({ width: 1800 }).toBuffer();
        } else {
          return image.toBuffer();
        }
      })
      .then(async function (image_buffer: Buffer) {
        fs.rmSync(file.path, { force: true });
        return image_buffer;
      });
    return image_buffer;
  }
}
