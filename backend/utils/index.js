import jwt from "jsonwebtoken";


export const genereteToken = (user) => {
    return jwt.sign(  {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    }, process.env.JWTPASS || "", {
        expiresIn: '1d',
    });
}