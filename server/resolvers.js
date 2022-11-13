/* eslint-disable @typescript-eslint/no-var-requires */
const models = require('./db/models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { config } = require('./config/auth')

const saltRounds = 10

const getMainUserData = ({ id, email, nickname }) => ({ id, email, nickname });

const setToken = ({ user, context }) => {
    const token = jwt.sign(getMainUserData(user), config.secret, {
        expiresIn: '24h',
    })
    context.res.cookie('token', token, { httpOnly: true, maxAge: 60000 * 1000 })
}

// (parent, args, context, info)
const resolvers = {
    Query: {
        async getUser(parent, { id }) {
            return models.User.findByPk(id)
        },
        async verifyToken(parent, args, { req }) {
            const { token } = req.cookies
            return  jwt.verify(token, config.secret)
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
            setToken({ user, context })

            return user
        },
        async logoutUser(parent, args, { res }) {
            res.clearCookie('token')
            return "You've been signed out!"
        },
    },
    Mutation: {
        async createUser(parent, args, context, info) {
            const { nickname, email, password } = args
            const emailInUse = await models.User.findOne({
                where: { email },
            })
            if (emailInUse) {
                return new Error('This email is already used')
            }
            const user = await models.User.create({
                nickname,
                email,
                passwordHash: bcrypt.hashSync(password, saltRounds),
            })
            // await models.Statistic.create({
            //     current_points: 0,
            //     level: 1,
            //     userId: user.id
            // });
            setToken({ user, context })
            return user
        },
    },
}

module.exports = { resolvers }
