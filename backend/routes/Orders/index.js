import { Router } from "express";
import { handlerErros } from "../../helpers/adpterErros.js";
import { OrderController } from "../../controllers/controllerOrder/index.js";
import {isAuth} from"../../utils/Auth/index.js"

const routesOrder = Router();

routesOrder.post(
    "/payment",
    isAuth,
    handlerErros(new OrderController().payment)
);
routesOrder.get(
    "/:id",
    isAuth,
    handlerErros(new OrderController().order)
);

export default routesOrder;
