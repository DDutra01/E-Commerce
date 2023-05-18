import { Router } from "express";
import { handlerErros } from "../../helpers/adpterErros.js";
import { PaymentController } from "../../controllers/payment/index.js";
import { isAuth } from "../../utils/Auth/index.js";

const routesPayment = Router();

routesPayment.get("/",isAuth, handlerErros(new PaymentController().paypal));

routesPayment.put(
    "/:id/pay",
    isAuth,
    handlerErros(new PaymentController().pay)
);

export default routesPayment;
