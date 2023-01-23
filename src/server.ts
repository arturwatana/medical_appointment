import "dotenv/config";
import express from "express";
import { userRouter } from "./routes/user.routes";

const app = express();
const port = 8080;

app.use(express.json());

app.use(userRouter);

app.listen(port, () => {
  console.log("Server is listening on " + port);
});
