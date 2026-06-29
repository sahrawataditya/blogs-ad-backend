import express from "express";
import connectDB from "./db.js";
import authRouter from './routes/auth.routes.js'
import postRouter from './routes/post.routes.js'
import userRouter from './routes/user.routes.js'
import morgan from "morgan";
import cors from 'cors'

const app = express();

app.use(express.json())
app.use(cors({ origin: "*", methods: ["GET", "POST", "PUT", "DELETE"] }))
app.use(morgan('dev'))

app.use('/auth', authRouter)
app.use('/users', userRouter)
app.use('/post', postRouter)

app.get("/", (req, res) => {
    res.status(200).json({ message: "Server is running!" })
})


app.listen(3443, async () => {
    console.log(`Server is connected !`)
    await connectDB()
})
