const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const cookiesParser = require("cookie-parser");
const attributeRouter = require('./routes/attribute.js');
const authRouter = require('./routes/login');

dotenv.config()
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookiesParser())

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
app.use("/api/v1/auth", authRouter);

app.listen("8000", () => console.log("Boom!"));
