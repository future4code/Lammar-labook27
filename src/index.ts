import { userRouter, postRouter } from "./routes/routes"
import { app } from "./app"

app.use('/user', userRouter)
app.use('/post', postRouter)




