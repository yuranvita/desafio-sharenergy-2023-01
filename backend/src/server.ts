import cors from "cors";
import "dotenv/config";
import express from "express";
import "express-async-errors";
import { ensureAppError } from "./middleware/ensureAppError.middleware";

import route from "./routes";
import { UserService } from "./services/user.service";

const app = express();
const port = process.env.PORT || 80;

const userService = new UserService();
const root = {
  username: process.env.USER_ADMIN!,
  password: process.env.PASSWORD_ADMIN!,
};
app.use(cors());
app.use(express.json());
app.use(route);
app.use(ensureAppError);

app.listen(port, () => {
  userService.create(root);
  console.log("listening on port " + port);
});
