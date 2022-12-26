const typeDefs = `#graphql
    type Character {
        id: ID!
        name: String!
        physical_defence: Int
        magical_defence: Int
        life_points: Int
        accuracy: Int
        evasion: Int
        critical_chance: Int
        hit_power: Int
    }
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
        getCharacter(id: ID!): Character
        getCharacters: [Character]
    }
    type Mutation {
        createUser(nickname: String!, email:String!, password:String!): User
        createPersonage(name: String!, type: String!, userId: String!): Personage
    }
`

module.exports = { typeDefs }
