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
routesOrder.get("/", isAuth, handlerErros(new OrderController().history));
routesOrder.get("/:isPaid", isAuth, handlerErros(new OrderController().filterOrders));

export default routesOrder;
