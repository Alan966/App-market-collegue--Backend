import { NextFunction, Request, Response, Router } from "express";
const router = Router();
import { ProductController } from "../controllers/Controllers.Products";
import { MiddleImage } from "../middlewares/image.midleware";
import { CustomRequest } from "../interfaces/req.interface";
import { MiddleUsers } from "../middlewares/users.middleware";
router.post(
  "/create-product",
  MiddleUsers.isVendor,
  MiddleImage.beginMulter.single("product_picture"),
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    await ProductController.createProduct(req, res, next);
  }
);
router.post(
  "/get-products-by-category",
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    await ProductController.getProducts(req, res, next);
  }
);
router.get(
  "/get-all-products",
  async (req: Request, res: Response, next: NextFunction) => {
    await ProductController.getAllProducts(req, res, next);
  }
);
router.post(
  "/get-products-vendor-by-category",
  MiddleUsers.isVendor,
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    await ProductController.getProductsByUser(req, res, next);
  }
);
router.put(
  "/update-product-vendor-by-id",
  MiddleUsers.isVendor,
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    await ProductController.updateProduct(req, res, next);
  }
);
export { router };
