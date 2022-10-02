const { checkDuplicateEmail } = require("../middleware/verifySignUp");
const controller = require("../controllers/auth.controller");
const bodyParser = require("body-parser");
const {ORIGIN} = require("../constants");
const jsonParser = bodyParser.json()

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header('Access-Control-Allow-Origin', ORIGIN);
        res.header('Access-Control-Allow-Credentials', true);
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });
    app.post(
        "/api/auth/signup",
        [jsonParser, checkDuplicateEmail],
        controller.signup
    );
    app.post("/api/auth/signin", [jsonParser, controller.checkToken], controller.signin);
    app.post("/api/auth/signout", controller.signout);
};