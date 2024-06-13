import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
// Routes
import authRoute from './routes/auth.js';
import userRoute from './routes/user.js'
// Database(MongoDB)
import connectMongoDB from './db/connectMongoDB.js';

// Load environment variables from .env file
dotenv.config();

// Create Express app
const app = express();
const port = process.env.PORT || 8000;

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Use routes imported
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);

// Start server and connect to database
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    connectMongoDB();
});
