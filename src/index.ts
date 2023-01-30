import { app } from "./app"
import { userRouter, postRouter } from "./routes/routes"
import { AddressInfo } from "net"

app.use('/user', userRouter)
app.use('/post', postRouter)

const server = app.listen(process.env.PORT || 3003, () => {
    if (server) {
       const address = server.address() as AddressInfo;
       console.log(`Server is running in http://localhost:${address.port}`);
    } else {
       console.error(`Failure upon starting server.`);
    }
 });