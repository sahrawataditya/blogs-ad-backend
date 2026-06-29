import User from '../models/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const salt_rounds = process.env.SALT_ROUNDS;
const token_secret = process.env.JSON_TOKEN_SECRET;

//Register user
export const registerUser = async (req, res) => {
    try {
        const { email, name, password } = req.body;
        if (!email || !name || !password) {
            return res.status(400).json({ error: "missing fields" })
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User already registered !" })
        }
        const hashed_pass = await bcrypt.hash(password, Number(salt_rounds) || 10)

        const newUser = new User({
            name,
            email,
            password: hashed_pass
        })
        await newUser.save()

        return res.status(201).json({ message: "user registered successfully!" })
    } catch (error) {
        console.error(error || "Someting went wrong")
        return res.status(500).json({ error: "Internal Server error" })
    }
}

//Login user
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "missing fields" })
        }
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ error: "User not found!" })
        }
        const isValidUser = await bcrypt.compare(password, existingUser.password)

        if (!isValidUser) {
            return res.status(400).json({ error: "invalid credentials" })
        }
        const token = jwt.sign({ _id: existingUser?._id.toString(), role: existingUser.role }, token_secret, {
            expiresIn: "1 day",
        })

        return res.status(200).json({ message: "user logged in !", token, role: existingUser?.role })
    } catch (error) {
        console.error(error || "Someting went wrong")
        return res.status(500).json({ error: "Internal Server error" })
    }
}

//Get all users 
export const allUsers = async (req, res) => {
    try {

        const users = await User.find({ role: 'user' });
        if (!Array.isArray(users) || users?.length <= 0) {
            return res.status(400).json({ error: "Users not found!" })
        }

        return res.status(200).json({ message: "users found", users })
    } catch (error) {
        console.error(error || "Someting went wrong")
        return res.status(500).json({ error: "Internal Server error" })
    }
}

//Get user by id  
export const getUserbyId = async (req, res) => {
    try {
        const { id } = req?.params
        if (!id) {
            return res.status(400).json({ error: "id is missing" })
        }
        const user = await User.findById(id);
        if (!user) {
            return res.status(400).json({ error: "User not found!" })
        }

        return res.status(200).json({ message: "user found", user })
    } catch (error) {
        console.error(error || "Someting went wrong")
        return res.status(500).json({ error: "Internal Server error" })
    }
}


//delete user by id  
export const deleteUserById = async (req, res) => {
    try {
        const { id } = req?.params
        if (!id) {
            return res.status(400).json({ error: "id is missing" })
        }
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(400).json({ error: "User not found!" })
        }

        return res.status(200).json({ message: "user deleted!" })
    } catch (error) {
        console.error(error || "Someting went wrong")
        return res.status(500).json({ error: "Internal Server error" })
    }
}

//Update user by id  
export const updateUserById = async (req, res) => {
    try {
        const { id } = req?.params
        if (!id) {
            return res.status(400).json({ error: "id is missing" })
        }

        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ error: "missing fields" })
        }
        const user = await User.findByIdAndUpdate(id, {
            name
        }, {
            new: true
        });
        if (!user) {
            return res.status(400).json({ error: "User not found!" })
        }

        return res.status(200).json({ message: "user updated!", user })
    } catch (error) {
        console.error(error || "Someting went wrong")
        return res.status(500).json({ error: "Internal Server error" })
    }
}