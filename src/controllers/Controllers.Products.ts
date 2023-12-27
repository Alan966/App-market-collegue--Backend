import { NextFunction, Request, Response, response } from "express";
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
      const response_products: any = await ProductFactory.getProducts(req);
      if (response_products && !response_products.success) {
        res.status(response_products.error_code).json({
          success: false,
          error: response_products.error,
        });
        return;
      }
      res.status(200).json(response_products);
    } catch (query_error) {
      const error = returnError(500, "ERR_GET_PRODUCTS", `${query_error}`);
      res.status(error.error_code).json({
        success: false,
        error: error.error,
      });
    }
  }
  static async getAllProducts(
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const products = await ProductFactory.getAllProducts();
      if (products && !products.success) {
        res.status(500).json({
          success: false,
          error: products,
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
