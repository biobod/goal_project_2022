const typeDefs = `#graphql
    type Personage {
        id: ID!
        name: String!
        wins: Int
        defeats: Int
        battles: Int
        characterId: ID!
        userId: ID!
    }
    type Statistic {
        userId: ID!
        level: Int!
        current_points: Int!
        id: ID!
    }
    type User {
        email: String!
        nickname: String!
        id: ID!
        statistic: Statistic
        personages: [Personage]
    }
    type Query {
        getUser(id: ID!): User
        loginUser(email: String!, password: String!): User
        verifyToken: User
        logoutUser: String
    }
    type Mutation {
        createUser(nickname: String!, email:String!, password:String!): User
        createPersonage(name: String!, type: String!, userId: String!): Personage
    }
`

module.exports = { typeDefs }
