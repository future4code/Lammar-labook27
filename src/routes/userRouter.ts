import { Router }from "express";
import { UserController } from "../controller/userController";

const userController = new UserController();

export const userRouter = Router();

userRouter.post("/create", userController.createUser);
userRouter.post("/login", userController.login);
userRouter.post('/friend/', userController.makeFriends);
userRouter.delete('/friend/:id', userController.unFriend)
userRouter.get('/feed/:id', userController.getFeedByFriends)


