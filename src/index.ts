import { app } from "./app"
import { userRouter, postRouter } from "./routes/routes"

app.use('/user', userRouter)
app.use('/post', postRouter)
