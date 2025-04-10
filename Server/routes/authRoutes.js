import express from "express";
import { register, login, logout, sendVerifyOtp, verifyEmail, isAuthenticated, resetPassword, resetPasswordOtp } from "../controllers/authController.js";
import userAuth from "../middleware/userAuth.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.post('/sendVerifyOtp', userAuth, sendVerifyOtp);
authRouter.post('/verifyEmail', userAuth, verifyEmail);
authRouter.get('/isAuth', userAuth, isAuthenticated );
authRouter.post('/sendResetOtp',resetPasswordOtp  );
authRouter.post('/resetPassword', resetPassword  );



export default authRouter;
