import { Router } from "express";
import { handlerErros } from "../../helpers/adpterErros.js";
import { UserController } from "../../controllers/controllerUser/index.js";

const routesUser = Router();
routesUser.post("/create", handlerErros(new UserController().create));
routesUser.post("/signin", handlerErros(new UserController().signin));



export default routesUser;
