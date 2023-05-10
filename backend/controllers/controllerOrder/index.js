import Order from "../../models/orders/index.js";
import { NotFoundError } from "../../helpers/erros.js";

export class OrderController {
    async payment(req, res) {
        const { shippingAddress } = req.body;
        const { fullName, address, country, postalCode, city } =
            shippingAddress;
        console.log(fullname);
        const newOrderPayment = new Order({
            orderItems: req.body.orderItems.map((item) => ({
                ...item,
                product: item._id,
            })),
            shippingAddress: {
                fullName,
                address,
                city,
                postalCode,
                country,
            },
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
                    res.status(200).send({
                        success: "ok",
                        message: "Order saved",
                        order,
                    });
                    return;
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
            res.status(401).send({
                message: "Problem in new Created order",
            });
        }
    }

    async order(req, res) {
        const order = await Order.findById(req.params.id)
            .then((order) => {
                console.log("Finded");
                if (order !== null && order !== "") {
                    console.log("Enviei", order);
                    res.status(200).send({
                        success: "ok",
                        message: "Order finded",
                        order,
                    });
                    return;
                }
            })
            .catch((err) => {
                console.log(err);
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
