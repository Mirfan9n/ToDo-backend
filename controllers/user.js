import { User } from "../models/user.js"
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";
import jwt from "jsonwebtoken";
import Errorclass from "../middlewares/error.js";

export const getallusers =  async(req, res)=>{
    
}

export const login=async(req, res, next)=>{

    const {email, password} = req.body;
    const user = await User.findOne({email}).select("+password")

     if(!user) return next(new Errorclass("Invalid ID OR PASSWORD", 404 ));

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch) return next(new Errorclass("Invalid ID OR PASSWORD", 404 ));


    sendCookie(user, res, `WelcomeBack, ${user.name}`, 200)
 
}

export const register =  async(req, res)=>{      

    const {name, email, password} = req.body;
    let user = await User.findOne({email});

    if(user) return next(new Errorclass("USER ALREADY EXIST", 404 ));


    const hashedPass = await bcrypt.hash(password, 10)
    user = await User.create({name, email, password: hashedPass})

    sendCookie(user, res, "Succesfully Registered", 201);

}

export const getMyProfile= (req, res)=>{
    
    res
    .status(201)
    .json({
        succes: true,
        user: req.user,
    });
   
}

export const logout = async(req, res)=>{
    res
    .cookie("token", "", {
        expires: new Date(Date.now()),
        sameSite: process.env.NODE_ENV=== "development"? "lax" :"none",
        secure: process.env.NODE_ENV=== "development"? false :true,
    })
    .json({
        succces: true,
        msg: "Succesfully Loged out"
    })
    
}