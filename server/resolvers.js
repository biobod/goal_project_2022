/* eslint-disable @typescript-eslint/no-var-requires */
const models = require('./db/models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { config } = require('./config/auth')

const getMainUserData = (user) => {
    const { id, email, nickname } = user
    return {
        id,
        email,
        nickname,
    }
}

const saltRounds = 10

// (parent, args, context, info)
const resolvers = {
    Query: {
        async getUser(parent, { id }) {
            return models.User.findByPk(id)
        },
        async verifyToken(parent, args, { req }) {
            const {token} = req.cookies
            const user = jwt.verify(token, config.secret)

            return user
        },
        async loginUser(parent, { email, password }, context) {
            const user = await models.User.findOne({
                where: { email },
            })
            if (!user) {
                return new Error('User Not found.')
            }
            const passwordIsValid = bcrypt.compareSync(
                password,
                user.passwordHash
            )
            if (!passwordIsValid) {
                return new Error('Invalid Password!')
            }
            const token = jwt.sign(getMainUserData(user), config.secret, {
                expiresIn: '24h'
            });
            context.res.cookie("token", token, { httpOnly: true, maxAge: 60000 * 1000 })

            return user
        },
        async logoutUser(parent, args, { res }) {
            res.clearCookie("token")
            return "You've been signed out!"
        },
    },
    Mutation: {
        async createUser(parent, args, context, info) {
            const { nickname, email, password } = args
            const user = await models.User.create({
                nickname,
                email,
                passwordHash: bcrypt.hashSync(password, saltRounds),
            })
            return user
        },
    },
}

module.exports = { resolvers }
