import sharp, { Metadata } from "sharp";
import { CustomRequest } from "../../interfaces/req.interface";
import fs from "fs";
import { ProductElectronic } from "../../repositories/product.electronic.repository";
import { v4 as uuidv4 } from "uuid";
import { returnError } from "../../errors/handleErrors";
export class ProductElectronicService {
  static async createProductElectronic({ file, body }: CustomRequest) {
    const { name, category, price, quantity, createData } = body;
    if (file) {
      const image_buffer = await this.uploadImage(file);
      // image_buffer
      const product = new ProductElectronic(
        uuidv4(),
        name,
        category,
        parseFloat(price),
        { data: image_buffer, contentType: file.mimetype },
        quantity,
        createData
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