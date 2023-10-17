import { Router } from "express";
import { UserController } from "../controllers/ControllersUser";
const router = Router();
router.post("/signin", UserController.getEntry);
router.post("/signup", UserController.createUser);
export { router };
