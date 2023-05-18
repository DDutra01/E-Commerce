import { NotFoundError } from "../../helpers/erros.js";
import { BadRequestError } from "../../helpers/erros.js";
import Order from "../../models/orders/index.js";

export class PaymentController {
    async paypal(req, res) {
        res.send(process.env.PAYPLA_CLIENT_ID || "sb");
    }

    async pay(req, res) {
        const order = await Order.findById(req.params.id);
        if (order) {
            order.isPaid = true;
            order.paidAt = Data.now();
            order.paymentResult = {
                id: req.body.id,
                status: req.body.status,
                update_time: req.body.update_time,
                email_address: req.body.email_address,
            };
        }

        if (!order) {
            throw NotFoundError('Not found Order')
            return;
        }

        const updateOrder = await order
            .save()
            .then((isOrder) => {
                console.log("Pay saved");
                res.send({
                    success: true,
                    message: "payment completed",
                    order: isOrder,
                });
            })
            .catch((err) => {
                console.log("Fail payment", err);
                res.send({
                    message: "Fail payment",
                    error: err,
                });
            });

        if (!updateOrder) {
            throw BadRequestError("Problems in processing paymente");
            return;
        }
    }
}
