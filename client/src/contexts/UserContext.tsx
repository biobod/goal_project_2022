import {createContext} from "react";

export type User = {
    nickname: string
    email: string
    id: string
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
