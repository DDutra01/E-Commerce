import data from "../../data.js";
import { BadRequestError, NotFoundError } from "../../helpers/erros.js";

export class ProductController {
    async creact(req, res) {
        throw new BadRequestError("erro enviado por mim");
    }
    async getAllProducts(req, res) {
        if (!data.products) {
            throw new NotFoundError('Not found products')
        }
        res.send(data.products);
    }
    async getSlugProducts(req, res) {
        const product = data.products.find(
            (slugItem) => slugItem.slug === req.params.slug
        );

        if (!product) {
            throw new NotFoundError("Product not found!");
        }
       
        res.setHeader("Content-Type", "text/plain").send(product);            
       

        // throw new BadRequestError("Problem in get product!");         

        // try {
        //     const product = data.products.find(
        //         (x) => x.slug === req.params.slug
        //     );
        //     if (product) {
        //         res.send(product);
        //     } else {
        //         res.status(404).send({ message: "Product not found" });
        //     }
        // } catch (error) {
        //     res.status(404).send({ message: "Interval error" });
        // }
    }
    async getIdProducts(req, res) {
        const { _id } = req.params;

        const product = data.products.find((idItem) => idItem._id === _id);

        if (!product) {
            throw new NotFoundError("Product not found!");
        }
       
        res.setHeader("Content-Type", "text/plain").send(product)         
        
        // throw new BadRequestError("Problem in get product!");
        /*   
        try {
            const product = data.products.find((x) => x._id === req.params._id);
            if (product) {
                res.send(product);
            } else {
                res.status(404).send({ message: "Product not found" });
            }
        } catch (error) {
            res.status(500).send({ message: "Interval error" });
        } */
    }
    async update(req, res) {}
    async delete(req, res) {}
}
