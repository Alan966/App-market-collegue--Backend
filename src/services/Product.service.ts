import { CustomRequest } from "../interfaces/req.interface";
import sharp, { Metadata } from "sharp";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import { ProductEdible } from "../repositories/product.edible.respository";
import { responseError, returnError } from "../errors/handleErrors";
export class ProductEdibleService {
  static async createProduct({ file, body }: CustomRequest) {
    const { name, category, price } = body;
    if (file) {
      const image_buffer = await this.uploadImage(file);
      // image_buffer
      const product = new ProductEdible(
        uuidv4(),
        name,
        category,
        parseFloat(price),
        { data: image_buffer, contentType: file.mimetype }
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
