require("dotenv").config();
const express = require("express");
var cors = require("cors");
const mongoose = require("mongoose");

const studentRoute = require("./routes/studentRoute");

const app = express();

app.use(cors());

app.use(express.json());

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_UI);
    console.log("MongoDB connected!");
  } catch (error) {
    console.log(error.message);
  }
};

connectDB();

app.use("/api/student", studentRoute);

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
