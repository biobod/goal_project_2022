import {createContext} from "react";

export type Personage = {
    id: string,
    name: string,
    wins: number|string
    defeats: number|string
    battles: number|string
    characterId: string
}
export type UserData = {
    wins: number|string
    defeats: number|string
    points: number|string
    level: number|string
    personages: Personage[]|[]
}
export type UserDataContextType = {
    userData: UserData|null
    updateUserData:(u: any) => void
}

export const defaultUserDataState = {
    userData: null,
    updateUserData: (u: object|null) => u
}
const UserDataContext = createContext<UserDataContextType>(defaultUserDataState);

export default UserDataContext
