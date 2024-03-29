import { Router } from "express";
import { handlerErros } from "../../helpers/adpterErros.js";
import { UserController } from "../../controllers/controllerUser/index.js";
import { isAuth } from "../../utils/Auth/index.js";

const routesUser = Router();
//routesUser.post("/create", handlerErros(new UserController().create));
routesUser.post("/signin", handlerErros(new UserController().signin));
routesUser.post("/signup", handlerErros(new UserController().create));
routesUser.put("/update",isAuth, handlerErros(new UserController().update));



export default routesUser;
