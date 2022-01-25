import { Router } from "express";
import UsersController from "./controllers/UsersController";
import RepositoriesController from "./controllers/RepositoriesController";
import SessionsController from "./controllers/SessionsController";
import auth from "./middlewares/auth";

const routes = new Router();

routes.post("/sessions", SessionsController.create);

routes.use(auth);

routes.get("/users", UsersController.index);
routes.post("/users", UsersController.create);
routes.get("/users/:id", UsersController.read);
routes.put("/users/:id", UsersController.update);
routes.delete("/users/:id", UsersController.delete);

routes.get("/users/:user_id/repositories", RepositoriesController.index);
routes.post("/users/:user_id/repositories", RepositoriesController.create);
routes.get("/users/:user_id/:repository_id/repositories", RepositoriesController.read);
routes.put("/users/:user_id/:repository_id/repositories", RepositoriesController.update);
routes.delete("/users/:user_id/:repository_id/repositories", RepositoriesController.delete);

export default routes;