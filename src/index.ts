import dotenv from "dotenv";
import express from "express";
import indexRoutes from "./routes/index";
import dbConnect from "./utils/dbConnect";
import morgan from "morgan";

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
app.use(morgan("dev"));
app.use(express.json());
app.use(
  express.urlencoded(
    {
      extended: false,
    })
);

// ==================== Routes ====================
app.use("/", indexRoutes);

// ==================== Server Initialization ====================

app.listen(port, () => {
  console.log(`> server on port ${port} :D`);
});
