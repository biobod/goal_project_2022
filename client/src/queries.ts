import {gql} from "@apollo/client";
export const CREATE_USER = gql`
    mutation createUser(
        $email: String!
        $password: String!
        $nickname: String!
    ) {
        createUser(email: $email, password: $password, nickname: $nickname) {
            id
            nickname
        }
    }
`
export const GET_USER_BY_TOKEN = gql`
    query verifyToken {
        verifyToken {
            id
            nickname
            statistic {
                level
                current_points
            }
            personages {
                id
                name
                battles
                wins
                defeats
                characterId
            }
        }
    }
`
export const LOGIN_USER = gql`
    query loginUser($email: String!, $password: String!) {
        loginUser(email: $email, password: $password) {
            id
            nickname
            statistic {
                level
                current_points
            }
            personages {
                id
                name
                battles
                wins
                defeats
                characterId
            }
        }
    }
`

// WIP
export const GET_CHARACTERS = gql`
    query getCharacters {
        getCharacters {
            id
            name
            physical_defence
            magical_defence
            life_points
            accuracy
            evasion
            critical_chance
            hit_power
        }
    }
`
