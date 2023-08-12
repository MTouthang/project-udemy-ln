import express from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
config();

const app = express();

// built-in middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// third-party middleware
app.use(cors());
app.use(cookieParser());
app.use(morgan("dev"));

export default app;
