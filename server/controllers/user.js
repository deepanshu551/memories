import UserModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
export const signin = async(req, res) => {

    const {
        email,
        password
    } = req.body;
    try {
        const existingUser = await UserModel.findOne({
            email
        });
        if (!existingUser) return res.status(404).json({
            message: "User Doesn't exist."
        })
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) return res.status(400).json({
            message: "invalid credentials"
        })
        const token = jwt.sign({
            email: existingUser.email,
            id: existingUser._id
        }, 'test', {
            expiresIn: "1h"
        })
        res.status(200).json({
            result: existingUser,
            token: token
        })
    } catch (error) {

        res.status(500).json({
            message: "Something went wrong"
        })
    }
}
export const signup = async(req, res) => {
    console.log("in signup")
    console.log(req.body);
    const {
        firstName,
        lastName,
        password,
        confirmPassword,
        email
    } = req.body;
    try {
        const existingUser = await UserModel.findOne({
            email: email
        })
        if (existingUser) return res.status(400).json({
            message: "User already exists"
        })
        if (password !== confirmPassword) return res.status(400).json({
            message: "Password not matched"
        })
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await UserModel.create({
            email,
            password: hashedPassword,
            name: `${firstName} ${lastName}`
        });
        const token = jwt.sign({
            email: user.email,
            id: user._id
        }, 'test', {
            expiresIn: "1h"
        });
        console.log("data", user, token);
        res.status(200).json({
            result: user,
            token
        });
        const newUser = new UserModel({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: bcrypt.hash(data.password, "SALT", () => {})
        })
    } catch (error) {

        res.status(500).send({
            message: "Something went wrong"
        })
    }
}