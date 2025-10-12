import UserModelAuth from "../models/UserModelAuth.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

// SIGN UP
export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const exist = await UserModelAuth.findOne({ email });

        if (exist)
            return res.status(400).json({ msg: "User already exists" });

        const hashed = await bcrypt.hash(password, 10);
        const user = new UserModelAuth({ name, email, password: hashed });
        await user.save(); 

        res.status(201).json({ msg: "User registered successfully" });
    } catch (e) {
        res.status(500).json({ msg: e.message });
    }
};

// SIGN IN
export const signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModelAuth.findOne({ email });

        if (!user) return res.status(400).json({ msg: "User not found" });

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return res.status(400).json({ msg: "Invalid credentials" });

        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({ msg: "Login successful", token }); 
    } catch (e) {
        res.status(500).json({ msg: e.message });
    }
};

// PROTECTED ROUTE
export const protectedRoute = (req, res) => {
    res.json({ msg: `Hello ${req.user.email}, you accessed a protected route!` });
};

// PUBLIC ROUTE
export const publicRoute = (req, res) => {
    res.json({ msg: "This is a public route, accessible to everyone." });
};
