import dotenv from 'dotenv';
dotenv.config()
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/authRoutes.js";
import connectDB from "./config/db.js";
import errorHandler from "./middleware/errorHandler.js"; // ✅ NEW
import userRouter from './routes/userRoutes.js';


const app = express();
const port = process.env.PORT || 4000;


// Middlewares
app.use(express.json());
app.use(cookieParser());



const allowedOrigins = [
  'http://localhost:5173',
  'https://mern-authentication-frontend-6mtq.onrender.com'
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin like Postman
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));




// Routes
app.get("/", (req, res) => {
  res.send("✅ Hello from Express backend");
});
app.use("/api/auth", authRouter);  
app.use("/api/user", userRouter);



// ✅ Global Error Handler
app.use(errorHandler);

// Connect DB & Start server
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`🚀 Server started on port ${port}`);
  });
});
