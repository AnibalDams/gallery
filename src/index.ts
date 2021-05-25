// ==================== Imports ====================


import dotenv from "dotenv";
import express, { Express,NextFunction } from "express";
import indexRoutes from "./routes/index";
import dbConnect from "./utils/dbConnect";
import morgan from "morgan";
import cloudinary from "cloudinary";

import cors from "cors";

// ==================== Initializations ====================

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}
const port = process.env.PORT || 4000;
const app = express();
const mongoUri: string | undefined = process.env.MONGO_URI;
dbConnect(mongoUri);

// ==================== Middlewares ====================

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded(
    {
      extended: false,
    })
);
app.use('*', (req:express.Request, res:express.Response, next)=>{
  cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  })
  next()
});

app.use(morgan("dev"));


// ==================== Routes ====================

app.use("/", indexRoutes);

// ==================== Server Initialization ====================

app.listen(port, () => {
  console.log(`> server on port ${port} :D`);
});
