const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.use("/api/auth", authRoute);

app.listen("5000", () => {
  console.log("Backend is running");
});
