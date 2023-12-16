import sharp, { Metadata } from "sharp";
import { CustomRequest } from "../../interfaces/req.interface";
import fs from "fs";
import { ProductElectronic } from "../../repositories/product.electronic.repository";
import { v4 as uuidv4 } from "uuid";
import { returnError } from "../../errors/handleErrors";
import { MiddleImage } from "../../middlewares/image.midleware";
export class ProductElectronicService {
  static async createProductElectronic({ file, body }: CustomRequest) {
    const { name, category, price, quantity, createData } = body;
    if (file) {
      // image_buffer
      const image_buffer = await MiddleImage.resizeImage(file.path);
      const product = new ProductElectronic(
        uuidv4(),
        name,
        category,
        parseFloat(price),
        { data: image_buffer, contentType: file.mimetype },
        quantity,
        createData
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
}
