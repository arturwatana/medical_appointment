import { Router } from "express";
import { createUserController } from "../models/users/useCases/createUser";

const userRouter = Router();

userRouter.post("/users", createUserController.handle);

export { userRouter };
