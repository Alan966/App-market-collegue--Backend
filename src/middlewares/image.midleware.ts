import multer, { FileFilterCallback } from "multer";
import { Request } from "express";
import { CustomRequest } from "../interfaces/req.interface";
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
      const file_extension = file.originalname
        .split(".")
        [file.originalname.split(".").length - 1].toLowerCase();
      if (["png", "jpg", "jpeg"].indexOf(file_extension) === -1) {
        return callback(null, false);
      }
      file.extension = file_extension.replace(/jpeg/i, "jpg");
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
}
