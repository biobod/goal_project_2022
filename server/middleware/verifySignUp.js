const db = require("../db/models/index");

const User = db.User;

const checkDuplicateEmail = async (req, res, next) => {
    try {
        let user = await User.findOne({
            where: {
                email: req.body.email
            }
        });
        if (user) {
            return res.status(400).send({
                message: "Failed! Email is already in use!"
            });
        }
        next();
    } catch (error) {
        return res.status(500).send({
            message: error.message
        });
    }
};

module.exports = { checkDuplicateEmail }