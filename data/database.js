import mongoose from "mongoose";


export const connectdb =()=> {
    mongoose
    .connect(process.env.MONGO_URI ,{
        dbName: "backendApi",
    })
    .then(()=>console.log("db Connected"))
    .catch((e)=>console.log("DB connection Error: ", e))
}