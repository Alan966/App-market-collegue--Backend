import { NextFunction, Response, Router } from "express";
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
    ProductController.createProduct(req, res, next);
  }
);
export { router };
