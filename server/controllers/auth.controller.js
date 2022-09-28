const db = require("../db/models/index");
const {config} = require("../config/auth");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const User = db.User;

exports.signup = async (req, res) => {
    // Save User to Database
    try {
        const user = await User.create({
            nickname: req.body.nickname,
            email: req.body.email,
            passwordHash: bcrypt.hashSync(req.body.password, saltRounds),
        });
        if (user) {
            res.send({ message: "User registered successfully!" });
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
exports.signin = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                email: req.body.email,
            },
        });
        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }
        const passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.passwordHash
        );
        if (!passwordIsValid) {
            return res.status(401).send({
                message: "Invalid Password!",
            });
        }
        const token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: '24h'
        });
        // TODO need to think about token
        // req.session.token = token;
        return res.status(200).send({
            id: user.id,
            nickname: user.nickname,
            email: user.email,
            token
        });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
};
exports.signout = async (req, res) => {
    try {
        req.session = null;
        return res.status(200).send({
            message: "You've been signed out!"
        });
    } catch (err) {
        this.next(err);
    }
};