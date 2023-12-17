import express, { urlencoded } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();

var corsOptions = {
  origin: "http://localhost:3000/",
  Credential: true,
};
app.use(cors(corsOptions));
app.use(express.json({ limit: "16kb" }));
app.use(urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

// routes import
import userRoutes from "./routes/user.route.js";

// routes added
app.use("/api/v1", userRoutes);

export default app;
