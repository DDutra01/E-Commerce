import { query } from "express";
import { BadRequestError, NotFoundError } from "../../helpers/erros.js";
import Product from "../../models/products/index.js";

export class ProductController {
    async create(req, res) {
        /* await Product.remove({})
        const products = await Product.insertMany(data.products)
        res.send(products) */
    }

    async getAllProducts(req, res) {
        const products = await Product.find();
        if (!products) {
            throw new NotFoundError("Not found products");
        }
        res.status(200).send({
            success: true,
            data: products,
        });
    }

    async getSlugProducts(req, res) {
        const isProduct = await Product.findOne({ slug: req.params.slug });

        if (!isProduct) {
            throw new NotFoundError("Product not found!");
        }

        res.setHeader("Content-Type", "text/plain").send(isProduct);
    }

    async getIdProducts(req, res) {
        const isProduct = await Product.findById(req.params);

        if (!isProduct) {
            throw new NotFoundError("Product not found!");
        }

        res.setHeader("Content-Type", "text/plain").send(isProduct);
    }
    async update(req, res) {}
    async delete(req, res) {}

    async getAllCategories(req, res) {
        try {
            const categories = await Product.find().distinct("category");
            if (!categories) {
                throw new NotFoundError("Categories not found!");
            }           
            res.status(200).send({
                success: true,
                data: categories,
            });
        } catch (error) {
            console.log(error);
        }
    }

    
}
