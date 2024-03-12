import mongoose from "mongoose";


export const connectdb =()=> {
    mongoose
    .connect(process.env.MONGO_URI ,{
        dbName: "backendApi",
    })
    .then((c)=>console.log(`db Connected on ${c.Connection.host}`))
    .catch((e)=>console.log("DB connection Error: ", e))
}