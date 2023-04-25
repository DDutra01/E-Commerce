import { Router } from "express";
import data from "../../data.js";
import {ProductController} from "../../controllers/controllerProduct/index.js"
import { handlerErros } from "../../helpers/adpterErros.js";



const routesProduct = Router()
routesProduct.get("/products",handlerErros(new ProductController().getAllProducts));
routesProduct.get("/create",handlerErros(new ProductController().create));
routesProduct.get("/slug/:slug",handlerErros(new ProductController().getSlugProducts));
routesProduct.get("/:_id",handlerErros( new ProductController().getIdProducts));

export default routesProduct;