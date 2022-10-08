const { checkDuplicateEmail } = require('../middleware/verifySignUp')
const controller = require('../controllers/auth.controller')
const bodyParser = require('body-parser')
const { ORIGIN } = require('../../common/serverConstants')
const { API_AUTH_PATH, AUTH_ROUTES } = require('../../common/authUrls')

const { SIGN_OUT, SIGN_UP, SIGN_IN, TOKEN } = AUTH_ROUTES
const jsonParser = bodyParser.json()

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header('Access-Control-Allow-Origin', ORIGIN)
        res.header('Access-Control-Allow-Credentials', true)
        res.header(
            'Access-Control-Allow-Methods',
            'GET, POST, OPTIONS, PUT, PATCH, DELETE'
        )

        res.header(
            'Access-Control-Allow-Headers',
            'Origin, Content-Type, Accept'
        )
        next()
    })
    app.get(`/${API_AUTH_PATH}${TOKEN}`, controller.verifyToken)
    app.post(
        `/${API_AUTH_PATH}${SIGN_UP}`,
        [jsonParser, checkDuplicateEmail],
        controller.signup
    )
    app.post(`/${API_AUTH_PATH}${SIGN_IN}`, [jsonParser], controller.signin)
    app.post(`/${API_AUTH_PATH}${SIGN_OUT}`, controller.signout)
}
