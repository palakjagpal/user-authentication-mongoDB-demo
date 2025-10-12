import { protectedRoute, publicRoute, signin, signup } from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import express from "express";

const router = express.Router();

// Routes
router.post("/signup", signup);
router.post("/signin", signin); 
router.get("/public", publicRoute);
router.get("/protected", authMiddleware, protectedRoute); 

export default router;
