import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import userRouter from "./routes/user.route.js"
import authRouter from "./routes/auth.route.js"
import cors from "cors"
import cookieParser from "cookie-parser"
dotenv.config()

mongoose.connect(process.env.MONGO).then(()=>{
    console.log("Connected to MongoDB")
}).catch(error=>{
    console.log("Error while connecting MongoDB", error.message)
})

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors())

app.listen(3000, ()=>{
    console.log("server is running on port 3000")
})

app.use("/api/user",userRouter)
app.use("/api/auth",authRouter)

app.use((err, req, res, next)=>{
    const statusCode= err.statusCode || 500
    const message= err.message || "Internal Server Error"
    console.log(err)
    return res.status(statusCode).send({
        success:false,
        statusCode,
        message
    })
})