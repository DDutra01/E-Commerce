import data from "../../data.js";
import { BadRequestError, NotFoundError } from "../../helpers/erros.js";
import User from "../../models/users/index.js";
import bcrypt from "bcryptjs";
import { genereteToken } from "../../utils/GenerateToken/index.js";

export class UserController {
    async create(req, res) {
        User.deleteMany({});
        const users = await User.insertMany(data.users);
        res.send(users);
    }
    async signin(req, res) {       
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                res.json({
                    _id: user.id,
                    name: user.name,
                    emails: user.email,
                    isAdmin: user.isAdmin,
                    token: genereteToken(user)
                });
                return;
            }
        }

        throw new NotFoundError("Invalid user or password!");
    }

    async update(req, res) {}
    async delete(req, res) {}
}
