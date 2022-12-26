import {createContext} from "react";

export type Personage = {
    id: string,
    name: string,
    wins: number|string
    defeats: number|string
    battles: number|string
    characterId: string
}
export type Statistic = {
    current_points: number|string
    level: number|string
}
export type User = {
    nickname: string
    email: string
    id: string
    statistic: Statistic
    personages: Personage[]|[]
}
export type UserContextType = {
    user: User|null
    updateUser:(u: any) => void
}

export const defaultUserState = {
    user: null,
    updateUser: (u: object|null) => u
}
const UserContext = createContext<UserContextType>(defaultUserState);

export default UserContext
