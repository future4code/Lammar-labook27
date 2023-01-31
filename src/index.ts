import express from "express"
import cors from "cors"
import { postRouter } from "./routes/postRouter"
import { userRouter } from "./routes/userRouter"

export const app = express()

app.use(express.json())
app.use(cors())

app.use('/user', userRouter)
app.use('/post', postRouter)
