import { Router } from "express";
import { UserController } from "../controllers/ControllersUser";
import { MiddleUsers } from "../middlewares/users.middleware";
const router = Router();
router.post("/signin", UserController.getEntry);
router.post("/signup", UserController.createUser);
export { router };
