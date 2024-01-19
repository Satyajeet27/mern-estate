import User from "../models/user.model.js";
import bcrypt from "bcryptjs"
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken"

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = new User({ username, email, password: hashedPassword })
    try {
        await newUser.save()
        res.status(201).send({
            success: true,
            message: "user created succesfully"
        })
    } catch (error) {
        next(error)
    }

}

export const signin = async (req, res, next) => {
    const { email, password } = req.body
    try {
        const validUser = await User.findOne({ email })
        if (!validUser) {
            return next(errorHandler(404, "Wrong credentials"))
        }
        const validPassword = await bcrypt.compare(password, validUser.password)
        if (!validPassword) {
            return next(errorHandler(404, "Wrong credentials"))
        }
        const { password: pass, ...userData } = validUser._doc
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET)
        return res.cookie('access_token', token, {
            httpOnly: true
        }).status(200).send({ success: true, userData })

    } catch (error) {
        next(error)
    }

}

export const google = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
            const { password: pass, ...userData } = user._doc
            return res.cookie("access_token", token, { httpOnly: true }).status(200).send(userData)
        }
        const generatePassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)
        const hashedPassword = await bcrypt.hash(generatePassword, 10)
        const newUser = new User({ username: req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4), email: req.body.email, password: hashedPassword, avatar:req.body.photo })
        await newUser.save()
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
            const { password: pass, ...userData } = user._doc
            return res.cookie("access_token", token, { httpOnly: true }).status(200).send(userData)
    } catch (error) {
        next(error)
    }
}