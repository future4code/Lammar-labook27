import express from "express"
import { app } from "../app"
import { LabookBS } from "../business/LabookBS";
import { LabookCT } from "../controller/LabookCT";
import { LabookDB } from "../database/LabookDB";

export const userRouter = express.Router()
export const postRouter = express.Router()

const labookDB = new LabookDB()
const labookBS = new LabookBS(labookDB)
const labookCT = new LabookCT(labookBS)

//teste
app.get('/ping', (req, res) => labookCT.ping(req, res))

userRouter.post('/create', (req, res) => labookCT.createUser(req, res))
userRouter.post('/friend/', (req, res) => labookCT.makeFriends(req, res))
userRouter.delete('/friend/:id', (req, res) => labookCT.unFriend(req, res))
userRouter.get('/feed/:id', (req, res) => labookCT.getFeedByFriends(req, res))

postRouter.post('/create', (req, res) => labookCT.createPost(req, res))
postRouter.get('/:id', (req, res) => labookCT.getPostById(req, res))
postRouter.get('/type/:type', (req, res) => labookCT.getPostsByType(req, res))
postRouter.post('/like', (req, res) => labookCT.likePost(req, res))
postRouter.delete('/deslike/:id', (req, res) => labookCT.unlikePost(req, res))
postRouter.post('/comment', (req, res) => labookCT.commentPost(req, res))
