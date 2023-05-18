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
        const orderPayment = await newOrderPayment.save();

        if (!orderPayment) {
            throw new BadRequestError("Problem in new Created order");
        }

        res.status(200).send({
            success: true,
            orderPayment,
        });
    }

    async order(req, res) {
        const order = await Order.findById(req.params.id);

        if (!order) {
            throw new NotFoundError("Order not found!");
        }

        res.status(200).send({
            success: true,
            order,
        });
    }

    async filterOrders(req, res) {       

       const isPaid = req.params.isPaid;
        console.log("chegou", isPaid);
     
        if (isDelivered === null || isDelivered === '' || !isDelivered) {
            isDelivered = false
        }
       /*  if (isPaid === null || isPaid === '' || !isPaid) {
            isPaid = false
        }   */      


        const result = await Order.find({
           isPaid
            //$or: [{ isPaid }, { isDelivered }],
        });
        console.log("enviei isso", result);

        if (!result) {
            throw NotFoundError('Not found order with this filters')
        }

        res.status(200).send({
            success: true,
            orders:result
        }) 
    }

  async history(req, res) {    

        const orders = await Order.find({
            user: req.user._id,        
        })               
      
            
        if (orders) {
            res.status(200).send({
                success: "ok",
                orders,
            });
        }

        if (!orders) {
            throw new NotFoundError("Order not found!");
        }
    } 
}
