import data from "../../data.js";
import { BadRequestError, NotFoundError } from "../../helpers/erros.js";
import Product from "../../models/products/index.js";

export class ProductController {
    async create(req, res) {
        await Product.remove({})
        const products = await Product.insertMany(data.products)
        res.send(products)
      
    }
    async getAllProducts(req, res) {

        const products = await Product.find()
        if (!products) {
            throw new NotFoundError('Not found products')
        }
        console.log(products)
        res.send(products);
    }
    async getSlugProducts(req, res) {
        const isProduct = await Product.findOne({slug : req.params.slug});

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
}
