const typeDefs = `#graphql
    type User {
        email: String!
        nickname: String!
        id: ID!
    }
    type Statistic {
        userId: ID!
        level: Int!
        current_points: Int!
        id: ID!
    }
        type Query {
            getUser(id: ID!): User
            loginUser(email: String!, password: String!): User
            verifyToken: User
        }
    type Mutation {
        createUser(nickname: String!, email:String!, password:String!): User
    }


`
module.exports = { typeDefs }
