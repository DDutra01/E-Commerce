import { Router } from "express";
import { handlerErros } from "../../helpers/adpterErros.js";
import { PaymentController } from "../../controllers/payment/index.js";
import { isAuth } from "../../utils/Auth/index.js";

const routesPayment = Router();

routesPayment.get("/payment",isAuth, handlerErros(new PaymentController().paypal));

routesPayment.get(
    "/:id/pay",
    isAuth,
    handlerErros(new PaymentController().pay)
);

export default routesPayment;
