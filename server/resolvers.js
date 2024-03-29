/* eslint-disable @typescript-eslint/no-var-requires */
const models = require('./db/models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { config } = require('./config/auth')

const saltRounds = 10

const getMainUserData = ({ id, email, nickname }) => ({ id, email, nickname })

const setToken = ({ user, context }) => {
    const token = jwt.sign(getMainUserData(user), config.secret, {
        expiresIn: '24h',
    })
    context.res.cookie('token', token, { httpOnly: true, maxAge: 60000 * 1000 })
}

// (parent, args, context, info)
const resolvers = {
    User: {
        statistic: async (obj) =>
            models.Statistic.findOne({
                where: { userId: obj.id },
            }),
        personages: async (obj) =>
            models.Personage.findAll({
                where: { userId: obj.id },
            }),
    },
    Query: {
        async getUser(parent, { id }) {
            return models.User.findByPk(id)
        },
        async verifyToken(parent, args, { req }) {
            const { token } = req.cookies
            return jwt.verify(token, config.secret)
        },
        async loginUser(parent, { email, password }, context) {
            const user = await models.User.findOne({
                where: { email },
            })
            if (!user) {
                return new Error('User Not found.')
            }
            const passwordIsValid = bcrypt.compareSync(password, user.passwordHash)
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
        async getCharacter(obj, args, context, info) {
            return models.Character.findByPk(args.id)
        },
        async getCharacters() {
            return models.Character.findAll()
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
            await models.Statistic.create({
                current_points: 0,
                level: 1,
                userId: user.id,
            })
            setToken({ user, context })
            return user
        },
        async createPersonage(parent, args, context, info) {
            const { name, type, userId } = args
            const data = await models.Character.findOne({
                where: { name: type },
            })
            const { id: characterId } = data

            const personage = await models.Personage.create({
                name,
                characterId,
                userId,
                wins: 0,
                defeats: 0,
                battles: 0,
            })

            return personage
        },
        async updateBattleData(parent, args, context, info) {
            const { personageId, wins, defeats, battles, level, current_points, userId } = args

            await models.Personage.update(
                { wins, defeats, battles },
                {
                    where: {
                        id: personageId,
                    },
                }
            )
            await models.Statistic.update(
                { level, current_points },
                {
                    where: { userId },
                }
            )

            return models.User.findByPk(userId)
        },
    },
}

module.exports = { resolvers }
