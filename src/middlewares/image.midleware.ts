import multer, { FileFilterCallback } from "multer";
import { CustomRequest } from "../interfaces/req.interface";
import fs from "fs";
import sharp, { Metadata } from "sharp";
interface CustomMulterFile extends Express.Multer.File {
  extension?: string;
}
export class MiddleImage {
  static beginMulter = multer({
    limits: { fileSize: 10 * 1000 * 1000 }, // 10MB max file size
    fileFilter: function (
      req: CustomRequest,
      file: CustomMulterFile,
      callback: FileFilterCallback
    ): void {
      const file_extension = file.originalname.split(".").pop();
      const permit_extends = ["png", "jpg", "jpeg"];
      if (!permit_extends.indexOf(file_extension ? file_extension : "")) {
        return callback(null, false);
      }
      file.extension = file_extension?.replace(/jpeg/i, "jpg");
      callback(null, true);
    },
    storage: multer.diskStorage({
      destination: "/tmp",
      filename: function (
        req: CustomRequest,
        file: CustomMulterFile,
        cb: (error: Error | null, filename: string) => void
      ) {
        cb(null, `${req.username}-${Date.now().toString()}.${file.extension}`);
      },
    }),
  });
  static async resizeImage(file: string) {
    const image_buffer = await sharp(file)
      .metadata()
      .then(function (metadata: Metadata) {
        if (metadata.width !== undefined && metadata.width > 1800) {
          return sharp(file).resize({ width: 1800 }).toBuffer();
        } else {
          return sharp(file).toBuffer();
        }
      });
    return image_buffer;
  }
  static deleteFile(file: string) {
    fs.rmSync(file, { force: true });
  }
}
