import { userRouter } from "./routes/userRouter"
import express from "express"
import cors from "cors"

const app = express()

app.use(express.json())
app.use(cors())

app.use('/user', userRouter)
// app.use('/post', postRouter)

app.listen(3003, () => {
    console.log("Server started on port 3003")
})
