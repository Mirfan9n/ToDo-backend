import Errorclass from "../middlewares/error.js"
import { Task } from "../models/task.js"

export const newtask= async(req, res, next)=>{
    const {tittle, description} = req.body

    await Task.create({
        tittle, 
        description,
        user: req.user
    })
    res
    .status(201)
    .json({
        succes: true,
        message: "Task Added Succesfully"
    })
}  

export const getMyTask = async(req, res)=>{
    const userId  = req.user._id
    
    const tasks = await Task.find({user: userId})

    return res
    .status(201)
    .json({
        succes: true,
        tasks,
    })
}

export const updateTask = async(req, res, next)=>{
   
    const task = await Task.findById(req.params.id)

    if(!task){
        return next(new Errorclass("Invalid ID cant UPDATE", 404 ));

    }

    task.isCompleted = !task.isCompleted;

    await task.save()

    return res
    .status(201)
    .json({
        succes: true,
        message: "Task Updated"
    })
}

export const deleteTask = async(req, res, next)=>{
    const task = await Task.findById(req.params.id)
    
    if(!task){
       return next(new Errorclass("Invalid ID Cant DELETE" ));
    }
   
    await task.deleteOne();
    
    return res
    .status(201)
    .json({
        succes: true,
        message: "Task Deleted"
    }) 
} 