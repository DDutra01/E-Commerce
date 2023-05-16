import Order from "../../models/orders/index.js";
import { NotFoundError } from "../../helpers/erros.js";
import { BadRequestError } from "../../helpers/erros.js";

export class OrderController {
    async payment(req, res) {
        const newOrderPayment = new Order({
            orderItems: req.body.orderItems.map((item) => ({
                ...item,
                product: item._id,
            })),
            shippingAddress: req.body.shippingAddress,
            paymentMethod: req.body.paymentMethod,
            itemsPrice: req.body.itemsPrice,
            shippingPrice: req.body.shippingPrice,
            taxPrice: req.body.taxPrice,
            totalPrice: req.body.totalPrice,
            user: req.user._id,
        });
        const orderPayment = await newOrderPayment
            .save()
            .then((order) => {
                console.log("New order salved");
                if (order !== null && order !== "") {
                    console.log("Enviei", order);
                    res.send({
                        success: "ok",
                        message: "Order saved",
                        order,
                    });
                }
            })
            .catch((err) => {
                console.log(err);
                res.send({
                    message: "Error in save order!",
                    error: err,
                });
            });

        if (!orderPayment) {
            throw new BadRequestError("Problem in new Created order");
           /*  res.status(401).send({
                message: "Problem in new Created order",
            }); */
        }
    }

    async order(req, res) {
        const order = await Order.findById(req.params.id)
            .then((order) => {                
                if (order !== null && order !== "") {                   
                    res.status(200).send({
                        success: "ok",
                        message: "Order finded",
                        order,
                    });
                    return;
                }
            }).catch((err) => {                
                res.send({
                    message: "Error in find order!",
                    error: err,
                });
            });

        if (!order) {
            throw new NotFoundError("Order not found!");
        }
    }
}
