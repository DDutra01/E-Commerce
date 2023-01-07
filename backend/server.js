import express from "express";
import data from "./data.js";

const app = express();

app.get("/api/products", (req, res) => {
    res.send(data.products);
});

app.get("/api/products/slug/:slug", (req, res) => {
   
    try {
        const product = data.products.find((x) => x.slug === req.params.slug);
        if (product) {
            res.send(product);
        } else {
            res.status(404).send({ message: "Product not found" });
        }        
    } catch (error) {
        res.status(404).send({ message: "Interval error" });
    }
   
   
});
app.get("/api/products/:_id", (req, res) => {
    const { _id } = req.params
    console.log(_id)
    try {
        const product = data.products.find((x) => x._id === req.params._id);
        if (product) {
            res.send(product);
        } else {
            res.status(404).send({ message: "Product not found" });
        }        
    } catch (error) {
        res.status(500).send({ message: "Interval error" });
    }
   
   
});

const port = process.env.PORT || 4001;
app.listen(port, () => {
    console.log(`server at http://localhost:${port} `);
});
