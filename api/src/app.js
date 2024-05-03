import express from "express"
import userRouter from "./routes/user.routes.js"
import entryRouter from "./routes/entry.routes.js"
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/entry", entryRouter);

export {app};