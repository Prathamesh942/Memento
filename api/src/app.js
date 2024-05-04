import express from "express"
import userRouter from "./routes/user.routes.js"
import entryRouter from "./routes/entry.routes.js"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser";
import cors from "cors"

const app = express();

const corsOptions = {
  origin: process.env.CLIENT_URL, // Change to your frontend URL in production
  credentials: true,
  exposedHeaders: ['Set-Cookie'] // Correct case for 'Set-Cookie'
};
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
  }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/entry", entryRouter);

export {app};