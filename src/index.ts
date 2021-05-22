import dotenv from "dotenv";
import express from "express";
import indexRoutes from "./routes/index";
import dbConnect from "./utils/dbConnect";
import morgan from "morgan";

import cors from "cors";
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}
const port = process.env.PORT || 4000;
const app = express();
const mongoUri = process.env.MONGO_URI;

dbConnect(mongoUri);

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use("/", indexRoutes);

app.listen(port, () => {
  console.log(`server on port ${port} :D`);
});
