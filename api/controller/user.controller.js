import Listing from "../models/listing.model.js";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcrypt from "bcryptjs"

export const test= (req, res)=>{
    res.send("Hello world")
}
export const updateUser= async(req, res, next)=>{
    if(req.user.id !== req.params.id){
        return next(errorHandler(401, "You can only update your own account"))
    }
    try {
        if(req.body.password){
            req.body.password= await bcrypt.hash(req.body.password, 10)
        }
        const updatedUser= await User.findByIdAndUpdate(req.params.id,{
            $set: {
                username:req.body.username,
                email:req.body.email,
                password:req.body.password,
                avatar:req.body.avatar
            }
        },{new:true})
        const {password, ...userData}= updatedUser._doc
        return res.status(200).send({success:true,userData})
    } catch (error) {
        next(error)
    }
}
export const deleteUser=async(req, res, next)=>{
    if(req.user.id!== req.params.id){
        return next(errorHandler(401, "You can only delete your own account"))
    }
    try {
        await User.findByIdAndDelete(req.params.id)
        return res.clearCookie("access_token").status(200).send({
            success:true,
            message:"User has been deleted"
        })
    } catch (error) {
        next(error)
    }
}

export const getUserListings= async(req, res, next)=>{
    if(req.user.id === req.params.id){
        try {
        const listings= await Listing.find({userRef:req.params.id})
        return res.status(200).json({success:true,listings})
        } catch (error) {
            next(error)
        }
    }else{
        return next(errorHandler(401, "You can only view your own listings!"))
    }
    
}

export const getUser= async(req, res, next)=>{
    try {
        const user= await User.findById(req.params.id)
        if(!user){
            return next(errorHandler(404, "User not found!"))
        }
        const {password:pass, ...userData}= user._doc
    return res.status(200).send({success:true,
    userData})
    } catch (error) {
        next(error)
    }
}