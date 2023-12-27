import { NextFunction, Request, Response } from "express";
import { ProductFactory } from "../factories/productFactory";
import { CustomRequest } from "../interfaces/req.interface";
import { returnError } from "../errors/handleErrors";
export class ProductController {
  static async createProduct(
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const product = await ProductFactory.createProduct(req);
      if ("success" in product) {
        res.status(product.error_code).json({
          success: false,
          error: product.error,
        });
        return;
      }
      res.status(200).json({
        success: true,
        product: product,
      });
    } catch (query_error) {
      const error = returnError(500, "ERR_CREATE_PRODUCT", `${query_error}`);
      res.status(error.error_code).json({
        success: false,
        error: error.error,
      });
    }
  }
  static async getProducts(
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const products = await ProductFactory.getProducts(req);
      if (products && "success" in products) {
        res.status(products.error_code).json({
          success: false,
          error: products.error,
        });
        return;
      }
      res.status(200).json({
        success: true,
        products: products,
      });
    } catch (query_error) {
      const error = returnError(500, "ERR_GET_PRODUCTS", `${query_error}`);
      res.status(error.error_code).json({
        success: false,
        error: error.error,
      });
    }
  }
}
