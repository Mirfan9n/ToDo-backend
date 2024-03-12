import jwt from "jsonwebtoken";
import { User } from "../models/user.js";

const isAuthenticated = async(req, res, next)=>{
    const {token} = req.cookies 

    if(!token){
        return res.status(404).json({
           succces: false,
           msg: "User Not Loged In" 
        })
    }

    const decodedId = jwt.verify(token, process.env.JWT_SECRET)

    req.user = await User.findById(decodedId._id);
    next();
}
export default isAuthenticated