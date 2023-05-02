import express from "express";
import cors from 'cors'
import mongoose from "mongoose";
import dotenv from 'dotenv'
import data from "./data.js";
import logger from 'morgan'
import ("express-async-errors");
import { middleErrors } from "./middlewares/erros/index.js";
import routesProduct from "./routes/Products/index.js";
import routesUser from "./routes/Users/index.js";

const app = express();
dotenv.config()

// mongoose.Promise = global.Promise
mongoose.set('strictQuery', false)
mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
        console.log("databe network");
    })
    .catch((error) => console.log(error));

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use(logger("dev"));

app.use("/products", routesProduct);
app.use("/user", routesUser);

app.use(middleErrors);
const port = process.env.PORT || 4001;
app.listen(port, () => {
    console.log(`server at http://localhost:${port} `);
});
