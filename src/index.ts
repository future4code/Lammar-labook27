import { userRouter, postRouter } from "./routes/routes"
import { app } from "./app"

app.use('/user', userRouter)
app.use('/post', postRouter)

app.listen(3003, () => {
      console.log('Server is running in http://localhost:3003')
   })


