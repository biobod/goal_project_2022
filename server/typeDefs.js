const typeDefs = `#graphql
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
    }
    type Query {
        getUser(id: ID!): User
        loginUser(email: String!, password: String!): User
        verifyToken: User
        logoutUser: String
    }
    type Mutation {
        createUser(nickname: String!, email:String!, password:String!): User
    }
`

module.exports = { typeDefs }
