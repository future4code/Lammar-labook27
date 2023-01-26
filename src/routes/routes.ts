import express from "express"
import { app } from "../app"
import { LabookCT } from "../controller/LabookCT";

export const userRouter = express.Router()
export const postRouter = express.Router()

const labookCT = new LabookCT()

//teste
app.get('/ping', labookCT.ping)

userRouter.post('/create' , labookCT.createUser)
userRouter.post('/friend/', labookCT.makeFriends)
userRouter.delete('/friend/:id', labookCT.unFriend)
userRouter.get('/feed/:id', labookCT.getFeedByFriends)

postRouter.post('/create', labookCT.createPost)
postRouter.get('/:id', labookCT.getPostById)