import { Router } from "express";
import data from "../../data.js";
import { handlerErros } from "../../helpers/adpterErros.js";
import { UserController } from "../../controllers/controllerUser/index.js";

const routesUser = Router();
routesUser.get("/create", handlerErros(new UserController().create));
routesUser.get("/signin", handlerErros(new UserController().signin));



export default routesUser;
