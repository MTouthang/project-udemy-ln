import asyncHandler from "@/middlewares/asynHandler.middleware";
import { Request, Response, NextFunction } from "express";

// cookie Properties value
const cookieOptions = {
  secure: process.env.NODE_ENV === " production" ? true : false,
  httpOnly: true,
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

/**
 * @REGISTER
 * @ROUTE @POST {{URL}}/api/v1/auth/user
 * @return Create user successfully with cookie and access token
 * @ACCESS Public
 */

// export const registerUser = asyncHandler (async (req: Request, res: Response, next: NextFunction) => {

//     const {firstName, lastName, email, password, role, avatar: {
//         secure_url: "put default url"
//     }} = req.body
// })
