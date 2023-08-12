import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import { IUser } from "@/types";
import ROLE_LIST from "@/configs/roleList.configs";

const userSchema = new Schema<IUser>(
  {
    firstName: {
      type: String,
      required: [true, "First Name is required"],
      minlength: [5, "First Name must be at-least 5 characters long"],
      maxlength: [20, "first Name cannot be more than 20 characters long"],
      trim: true,
    },
    lastName: {
      type: String,
      minlength: [6, "Last Name must be at-least 6 characters long"],
      maxlength: [20, "Last Name cannot be more than 20 characters"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please fill in a valid email address",
      ],
    },

    password: {
      type: String,
      required: [true, "Password is Required"],
      minlength: [8, "Password length should be at-least 8 characters"],
      select: false,
    },
    role: {
      type: String,
      enum: [ROLE_LIST.admin, ROLE_LIST.user],
    },
    avatar: {
      public_id: {
        type: String,
        required: true,
      },
      secure_url: {
        type: String,
        required: true,
      },
    },
    resetPasswordToken: String,
    resetPasswordExpiry: Date,
  },
  {
    timestamps: true,
  },
);

// encrypt password before save
userSchema.pre("save", async function (next) {
  // Check for modified or unmodified
  if (!this.isModified("password")) {
    return next();
  }

  // encrypt password using bcrypt.js
  this.password = await bcrypt.hash(this.password as string, 10);
});

userSchema.methods = {
  comparePassword: async function (plainPassword: string) {
    return bcrypt.compare(plainPassword, this.password);
  },
};

const User = model<IUser>("User", userSchema);
export default User;
