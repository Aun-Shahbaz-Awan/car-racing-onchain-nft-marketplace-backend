import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import attributeRouter from "./routes/attribute.js";

dotenv.config()
const app = express();
app.use(cors());
app.use(express.json());

// DB connection
var MONGODB_URL = process.env.MONGODB_URL;
mongoose
  .connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    //don't show the log when it is test
    if (process.env.NODE_ENV !== "test") {
      console.log("Connected to %s", MONGODB_URL);
      console.log("App is running ... \n");
      console.log("Press CTRL + C to stop the process. \n");
    }
  })
  .catch((err) => {
    console.error("App starting error:", err.message);
    process.exit(1);
  });
var db = mongoose.connection;
console.log("DB:", db);

app.use("/api/v1/attribute", attributeRouter);

app.listen(3030, () => console.log("Boom!"));