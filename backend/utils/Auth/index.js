import jwt from "jsonwebtoken";

export const isAuth = (req, res, next) => {
    
    const authorization  = req.headers.authorization;
   
    if (authorization) {
        const token = authorization.slice(7, authorization.lenght); //bearer xxxx    
        console.log(token)
        jwt.verify(token, process.env.JWTPASS,
            (err, decode) => {
            if (err) {
                res.status(401).send({ message: "Invalid token" });
            }
            req.user = decode;
            next();
        });
    } else {
        res.status(401).send({ message: "No token" });
    }
}