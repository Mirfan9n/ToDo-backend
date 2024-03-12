import { app } from "./app.js"
import { connectdb } from "./data/database.js";

connectdb();


app.listen(process.env.PORT, (req, res)=>{
    console.log(`server is working on ${process.env.PORT} on ${process.env.NODE_ENV} mode`);
})