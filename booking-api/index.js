import express from "express";
import dotenv from "dotenv"
import mongoose from "mongoose"
import authRouter from "./routes/auth.js"
import hotelsRouter from "./routes/hotels.js";
import usersRouter from "./routes/users.js";
import roomsRouter from "./routes/rooms.js"
import cookieParser from "cookie-parser";
import cors from "cors"

dotenv.config();

const connect = async() => {

    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("connected to DB")
    } catch (error) {
        throw error;
    }
}

//middleware
const app = express();
app.use(cookieParser())
app.use(cors());


app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/hotels", hotelsRouter);
app.use("/api/users", usersRouter);
app.use("/api/rooms", roomsRouter);


app.use((err, req, res, next) => {
    const errorStatus  = err.status || 500
    const errorMessage = err.message || "something went wrong"
  return res.status(errorStatus).json({
    success:false,
    status:errorStatus,
    message:errorMessage
  })
})


app.listen(8800, () => {
    connect();
    console.log("connected to backend")
})

