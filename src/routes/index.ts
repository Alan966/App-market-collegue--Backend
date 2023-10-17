import { Router } from "express";
import { readdirSync } from "fs";
const PATH_ROUTER = `${__dirname}`;
const router = Router();
type filename = string;

const cleanFileName = (fileName: filename) => {
  const file = fileName.split(".").shift();
  return file;
};

readdirSync(PATH_ROUTER).filter((fileName: filename): void => {
  const cleanName = cleanFileName(fileName);
  if (cleanName !== "index") {
    import(`./${cleanName}`).then((moduleRouter) => {
      router.use(`/${cleanName}`, moduleRouter.router);
    });
  }
});

export { router };
