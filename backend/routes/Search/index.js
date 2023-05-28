import { Router } from "express";
import { handlerErros } from "../../helpers/adpterErros.js";
import { SearchController } from "../../controllers/controllerSearch/index.js";

const routesSearch = Router();

routesSearch.get("/search", handlerErros(new SearchController().search));
routesSearch.get("/find", handlerErros(new SearchController().find));

export default routesSearch;
