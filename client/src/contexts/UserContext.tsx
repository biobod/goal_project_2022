import {createContext} from "react";

export const defaultUserState = {
    user: null,
    updateUser: (u: any) => u
}
const UserContext = createContext(defaultUserState);

export default UserContext