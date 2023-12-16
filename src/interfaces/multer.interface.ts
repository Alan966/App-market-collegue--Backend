import { FileFilterCallback } from "multer";

export interface CustomFileMulter extends Express.Multer.File {
  extension: string | undefined;
}

export interface CustomFileCallback extends FileFilterCallback {
  (error: string | null, acceptFile: boolean): void;
}
