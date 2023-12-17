import dotenv from "dotenv";
import express from "express";
import connectDB from "./db/connectDB.js";

dotenv.config({
  path: "./env",
});

const app = express();

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 4001, () => {
      console.log(`Server is serving at http://localhost:${process.env.PORT}/`);
    });
  })
  .catch((err) => {
    console.log("DB connection Failed !!!", err);
  });
