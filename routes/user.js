import { getMyProfile, getallusers, login, logout, register } from "../controllers/user.js";
import express from "express";
import  Authenticated  from "../middlewares/auth.js";

const router = express.Router();

router.get("/all", getallusers)

router.post("/new", register)

router.post("/login", login)

router.post("/logout", Authenticated, logout)
 
router.get("/me",  Authenticated, getMyProfile)


export default router;