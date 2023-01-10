import express from "express";
import cors from 'cors'
import data from "./data.js";
import logger from 'morgan'
import ("express-async-errors");
import { middleErrors } from "./middlewares/erros/index.js";
import routes from "./routes/index.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(logger("dev"));

app.use("/", routes);

app.use(middleErrors);
const port = process.env.PORT || 4001;
app.listen(port, () => {
    console.log(`server at http://localhost:${port} `);
});
