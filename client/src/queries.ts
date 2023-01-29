import { gql } from '@apollo/client'
export const CREATE_USER = gql`
    mutation createUser($email: String!, $password: String!, $nickname: String!) {
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
export const CREATE_PERSONAGE = gql`
    mutation createPersonage($name: String!, $type: String!, $userId: String!) {
        createPersonage(name: $name, type: $type, userId: $userId) {
            id
            name
            battles
            wins
            defeats
            characterId
        }
    }
`

export const UPDATE_BATTLE_DATA = gql`
    mutation updateBattleData(
        $userId: String!
        $personageId: String!
        $wins: Int
        $defeats: Int
        $battles: Int
        $level: Int
        $current_points: Int
    ) {
        updateBattleData(
            userId: $userId
            personageId: $personageId
            wins: $wins
            defeats: $defeats
            battles: $battles
            level: $level
            current_points: $current_points
        ) {
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
