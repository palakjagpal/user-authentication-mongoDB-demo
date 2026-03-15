// Import dependencies
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

// Import routes
import authRoutes from "./routes/route.js";  // adjust path if needed

dotenv.config(); // Load environment variables

const app = express();

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing

app.use(express.json()); // Parse incoming JSON

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Routes
app.use("/api/auth", authRoutes); // Prefix all routes with /api/auth

// Root route
app.get("/", (req, res) => {
    res.send("🚀 Auth API is running...");
});

// Port configuration
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
