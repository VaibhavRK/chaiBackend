import dotenv from "dotenv";
import express from "express";
import connectDB from "./db/connectDB.js";

const app = express();

dotenv.config({
  path: "./env",
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 4001, () => {
      console.log(`Server is serving at http://localhost:${process.env.PORT}/`);
    });
  })
  .catch((err) => {
    console.log("DB connection Failed !!!", err);
  });
