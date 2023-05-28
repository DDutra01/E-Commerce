import Product from "../../models/products/index.js";
import { NotFoundError } from "../../helpers/erros.js";
import { BadRequestError } from "../../helpers/erros.js";

export class SearchController {
    async find(req, res) {
        const PAGE_SIZE = 3;
        const all = "";
        const { query } = req;
        const pageSize = query.pageSize || PAGE_SIZE;
        const page = query.page || 1;
        const searchQuery = query.query || "";
        const category = query.category || "";
        const price = query.price || "";
        const [minPrice, maxPrice] = price.split("-").map((value) => {
            const parsedValue = parseInt(value);
            return isNaN(parsedValue) ? 0 : parsedValue;
        });
        const rating = query.rating || "";
        const order = query.order || "";
        console.log(query);

        const filter = {};
        filter.name =
            searchQuery && searchQuery !== "all" && searchQuery !== ""
                ? {
                      $regex: searchQuery,
                      $options: "i",
                  }
                : {
                      $regex: all,
                  };

        filter.category =
            category && category !== "all" && category !== "" ? category : all;

        filter.price =
            price && price !== "all" && price !== ""
                ? {
                      $gte: minPrice,
                      $lte: maxPrice,
                  }
                : "";

        filter.rating =
            rating && rating !== "all" && rating !== "" ? { $gte: rating } : "";

        const sortOrder =
            order === "featured"
                ? { featured: -1 }
                : order === "lowest"
                ? { price: 1 }
                : order === "highest"
                ? { price: -1 }
                : order === "toprated"
                ? { rating: -1 }
                : order === "newest"
                ? { createdAt: -1 }
                : { _id: -1 };

        console.log(filter);

        if (
            query.query ||
            query.category ||
            query.price ||
            query.rating !== ""
        ) {
            const query = Product.find({ name: filter.name })
                .sort(sortOrder)
                .skip((page - 1) * pageSize)
                .limit(pageSize);

            if (filter.name) {
                query.where("name").equals(filter.name);
            }
            if (filter.category) {
                query.where("category").equals(filter.category);
            }

            if (filter.price) {
                query.where("price").equals(filter.price);
            }

            if (filter.rating) {
                query.where("rating").equals(filter.rating);
            }

            const finded = await query.exec();

            const countProducts = await Product.countDocuments({
                name: filter.name,
            });

            if (finded) {
                console.log("respondi", finded);
                res.status(200).send({
                    success: true,
                    products:finded,
                    countProducts: finded.length,
                    page,
                    pages: Math.ceil(countProducts / pageSize),
                });
            }
        } else {
            const findAll = await Product.find().catch((e) => {
                res.send({
                    message: "Failed find products",
                    type: "err",
                    e,
                });
            });

            if (findAll) {
                res.send({
                    products: findAll,
                });
                console.log("enviei:", findAll);
            }
        }
    }
}
