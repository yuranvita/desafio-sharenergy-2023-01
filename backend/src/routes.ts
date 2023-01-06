import routes, { Request, Response } from "express";
import { ClientController } from "./controllers/client.controller";
import { SessionController } from "./controllers/session.controller";
import { UserController } from "./controllers/user.controller";
import { ensureAuthenticated } from "./middleware/ensureAuth.middleware";

const route = routes();

const userController = new UserController();
const sessionController = new SessionController();
const clientController = new ClientController();

route.get("/", (req: Request, res: Response) => {
  res.json({ message: "olá, eu sou yuran!" });
});

//post
route.post("/users", userController.create);
route.post("/session", sessionController.execute);

route.post("/client", ensureAuthenticated, clientController.create);

//get
route.get("/client", ensureAuthenticated, clientController.listAll);
route.get("/client/:id", ensureAuthenticated, clientController.findFirst);

//delete
route.delete("/client/:id", ensureAuthenticated, clientController.delete);

//patch
route.patch("/client/:id", ensureAuthenticated, clientController.update);

export default route;
