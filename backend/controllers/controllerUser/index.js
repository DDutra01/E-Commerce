import data from "../../data.js";
import { BadRequestError, NotFoundError } from "../../helpers/erros.js";
import User from "../../models/users/index.js";
import bcrypt from "bcryptjs";
import { genereteToken } from "../../utils/GenerateToken/index.js";

export class UserController {
    async create(req, res) {
        const { name, email, password } = req.body.user;
        const verifyUniqueUser = await User.findOne({ email });
        if (verifyUniqueUser == null) {
            const newUser = new User({
                name,
                email,
                password,
            });

            const user = await newUser.save();
            res.json({
                _id: user.id,
                name: user.name,
                emails: user.email,
                isAdmin: user.isAdmin,
                token: genereteToken(user),
                available: true,
            });
            return;
        }
        if (verifyUniqueUser) {
            res.json({
                message: "Exist this user with email",
                available: false,
            });
        }
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
                    token: genereteToken(user),
                });
                return;
            }
        }

        throw new NotFoundError("Invalid user or password!");
    }

    async update(req, res) {
        console.log(req.body)

        const { password, name, email } = req.body;
        if (!password || password === "" || password === null) {
            throw new NotFoundError("Your password is invalid");
        }
        if (!name || name === "" || name === null) {
            throw new NotFoundError("Your dada is invalid");
        }
        if (!email || email === "" || email === null) {
            throw new NotFoundError("Your dada is invalid");
        }

        const userOld = await User.findById(req.user._id);
        if (!userOld) {
            throw new NotFoundError("User not found");
        }

        userOld.name = name || userOld.name;
        userOld.email = email || userOld.email;

        userOld.password = bcrypt.hashSync(password);
        await userOld.save();

        const user = {
            _id: userOld._id,
            name: userOld.name,
            email: userOld.email,
            isAdmin: userOld.isAdmin,
            token: genereteToken(userOld),
        };
        console.log('enviei isso:', user);
        res.status(200).send({
            success: true,
            user
        });
    }
    async delete(req, res) {}
}
