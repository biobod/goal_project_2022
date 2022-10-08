const db = require("../db/models/index");
const {config} = require("../config/auth");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const User = db.User;

const getMainUserData = user => {
    const { id, email, nickname }= user
    return ({
        id, email, nickname
    })
};

exports.signup = async (req, res) => {
    // Save User to Database
    try {
        const user = await User.create({
            nickname: req.body.nickname,
            email: req.body.email,
            passwordHash: bcrypt.hashSync(req.body.password, saltRounds),
        });
        if (user) {
            const userData = getMainUserData(user)
            const token = jwt.sign(userData, config.secret, {
                expiresIn: '24h'
            });

            res.cookie("token", token, { maxAge: 60000 * 1000 })
            res.send(userData);
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
        const userData = getMainUserData(user)

        const token = jwt.sign(userData, config.secret, {
            expiresIn: '24h'
        });

        res.cookie("token", token, { maxAge: 60000 * 1000 })

        return res.status(200).send({
            id: user.id,
            nickname: user.nickname,
            email: user.email,
        });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
};

exports.signout = async (req, res) => {
    try {
        res.clearCookie("token")

        return res.status(200).send({
            message: "You've been signed out!"
        });
    } catch (err) {
        this.next(err);
    }
};

exports.verifyToken = (req, res) => {
    const token = req.cookies.token
    try {
        res.send(jwt.verify(token, config.secret))
    } catch (e) {
        res.status(401).send({ message: 'User unauthorized'});
    }
}
