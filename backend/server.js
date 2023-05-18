import express from "express";
import cors from 'cors'
import mongoose from "mongoose";
import dotenv from 'dotenv'
//import data from "./data.js";
import path from 'path';
import logger from 'morgan'
import ("express-async-errors");
import { middleErrors } from "./middlewares/erros/index.js";
import routesProduct from "./routes/Products/index.js";
import routesUser from "./routes/Users/index.js";
import routesOrder from "./routes/Orders/index.js";
import routesPayment from "./routes/Payment/index.js";

dotenv.config()
const app = express();

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


app.use("/payment", routesPayment);
app.use("/products", routesProduct);
app.use("/user", routesUser);
app.use("/order", routesOrder);
app.use("/history", routesOrder);


const __dirname = path.resolve();
app.use(express.static(path.join(__dirname,'/frontend/build')))
app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'frontend/build/index.html')));
app.use(middleErrors);


const port = process.env.PORT || 4001;
app.listen(port, () => {
    console.log(`server at http://localhost:${port} `);
});
