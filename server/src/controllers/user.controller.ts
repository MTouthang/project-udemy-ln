import asyncHandler from "@/middlewares/asynHandler.middleware";
import User from "@/models/user.model";
import AppError from "@/utils/AppError.util";
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

export const registerUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // const {firstName, lastName, email, password, role, avatar: {
    //     public_id: email,
    //     secure_url: "https://res.cloudinary.com/ddvlwqjuy/image/upload/v1692032956/project-udemy/profile_lzadwv.png"
    // }} = req.body

    const { firstName, lastName, email, password } = req.body();

    const isUserExist = await User.findOne({ email }).lean();

    if (isUserExist) {
      return next(
        new AppError("User with the given email already registered!", 409),
      );
    }

    const user = await User.create({
      email,
      firstName,
      lastName,
      password,
      avatar: {
        public_id: email,
        secure_url:
          "https://res.cloudinary.com/ddvlwqjuy/image/upload/v1692032956/project-udemy/profile_lzadwv.png",
      },
    });

    if (!user) {
      return next(
        new AppError("User Registration failed, please try again", 400),
      );
    }

    //TODO: send mail after registered

    // const accessToken = await user.generateAccessToken()
    // const refreshToken = await user.generateRefreshToken()
  },
);
