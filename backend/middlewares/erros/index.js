import { ApiError } from "../../helpers/erros.js";

export const middleErrors = (error, req, res, next) => {
    if (error && error.statusCode) {
        res.status(error.statusCode).json({
            message: error.message,
            statusCode: error.statusCode,
        });
    } else {
        res.status(500).json({ message: "Internal error" });
    }

    next();
};
