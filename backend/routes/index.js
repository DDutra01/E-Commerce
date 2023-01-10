import { Router } from "express";
import data from "../data.js";
import {ProductController} from "../controllers/controllerProduct/index.js"
import { handlerErros } from "../helpers/adpterErros.js";



 const routes = Router()

routes.get("/api/products",handlerErros(new ProductController().getAllProducts));
routes.get("/api/products/slug/:slug",handlerErros(new ProductController().getSlugProducts));
routes.get("/api/products/:_id",handlerErros( new ProductController().getIdProducts));

export default routes