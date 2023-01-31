import { userRouter } from "./routes/userRouter"
import express from "express"
import cors from "cors"

export const app = express()

app.use(express.json())
app.use(cors())

app.use('/user', userRouter)
// app.use('/post', postRouter)
