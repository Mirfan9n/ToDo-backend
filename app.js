import express  from "express";
import userRouer from "./routes/user.js"
import taskRouter from "./routes/task.js"
import { config } from "dotenv"; 
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/error.js";
import cors from "cors"

export const app = new express();

config({
    path: "./config.env"
})

//middlewares
app.use(express.json());
app.use(cookieParser())  //we can access cookies using cookie parser
app.use(cors({
    origin:[process.env.FRONT_END_URL],
    methods:["GET", "PUT", "POST", "DELETE"],
    credentials: true,
}))

//routes
app.use("/api/users" ,userRouer);
app.use("/api/task", taskRouter);




app.get("/", (req, res)=>{
    res.send("NOICE")
})

//using error middleware
app.use(errorHandler)
  

