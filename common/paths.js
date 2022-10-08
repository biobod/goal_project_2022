import { HOST, PORT } from './serverConstants'
import { API_AUTH_PATH, AUTH_ROUTES }  from './authUrls'

const { TOKEN, SIGN_IN, SIGN_OUT, SIGN_UP} = AUTH_ROUTES;

const PATHS = {
    TOKEN: `${HOST}:${PORT}/${API_AUTH_PATH}${TOKEN}`,
    LOGIN: `${HOST}:${PORT}/${API_AUTH_PATH}${SIGN_IN}`,
    SIGNUP: `${HOST}:${PORT}/${API_AUTH_PATH}${SIGN_UP}`,
    SIGNOUT: `${HOST}:${PORT}/${API_AUTH_PATH}${SIGN_OUT}`,
}
export default PATHS
