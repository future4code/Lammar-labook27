// import express from "express"
// import { app } from "../app"
// import { LabookBS } from "../business/LabookBS";
// import { LabookCT } from "../controller/LabookCT";
// import { LabookDB } from "../database/LabookDB";

// export const userRouter = express.Router()
// export const postRouter = express.Router()

import { Router }from "express";
import { UserController } from "../controller/userController";

const userController = new UserController();

export const userRouter = Router();

userRouter.post("/create", userController.createUser);
userRouter.post('/friend/', userController.makeFriends);
userRouter.delete('/friend/:id', userController.unFriend)
userRouter.get('/feed/:id', userController.getFeedByFriends)


