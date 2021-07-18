import { combineReducers } from 'redux';
import { saveToken,clearToken } from '../utils/dataProvider';
export const ACTION_AUTH_REQUEST = 'USER_AUTH_REQUEST';
export const ACTION_AUTH_SUCCESS = 'USER_AUTH_SUCCESS';
export const ACTION_AUTH_FAILURE = 'USER_AUTH_FAILURE';

export const ACTION_LOGIN_REQUEST = 'USER_LOGIN_REQUEST';
export const ACTION_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const ACTION_LOGIN_FAILURE = 'USER_LOGIN_FAILURE';

export const ACTION_LOGOUT_REQUEST = 'USER_LOGOUT_REQUEST';
export const ACTION_LOGOUT_SUCCESS = 'USER_LOGOUT_SUCCESS';
export const ACTION_LOGOUT_FAILURE = 'USER_LOGOUT_FAILURE';

export const ACTION_SETUSER_REQUEST = 'USER_SETUSER_REQUEST';
export const ACTION_GETUSER_REQUEST = 'USER_GETUSER_REQUEST';
export const ACTION_GETUSER_SUCCESS = 'USER_GETUSER_SUCCESS';
export const ACTION_GETUSER_FAULURE = 'USER_GETUSER_FAILURE';
export interface AuthState {
    user?: UserInfo;
    token?: TokenInfo;
    error?: any;
}
export interface UserInfo {
    id?: string;
    firstName?: string;
    lastName?: string;
    roleName?: string;
    username?: string;
    companyId?:number,
    type?:number,
    permission?: Array<any>
}
export interface TokenInfo {
    access_token: string;
    refresh_token?: string;
    expires_in?: number;
}
export interface LoginData {
    username: string;
    password: string;
    rememberMe: boolean;
    client_id?: string;
    client_secret?: string;
    grant_type?: string;
}
export const actions = {
    authSuccess: (tokenInfo: TokenInfo) => ({
        type: ACTION_AUTH_SUCCESS,
        payload: tokenInfo,
    }),
    login: (data: LoginData) => ({
        type: ACTION_LOGIN_REQUEST,
        payload: data,
    }),
    loginSuccess: (response: TokenInfo) => {
        var res = {
            type: ACTION_LOGIN_SUCCESS,
            payload: response,
        };
        saveToken(response.access_token);
        return res;
    },
    loginFailure: (error: any) => ({
        type: ACTION_LOGIN_FAILURE,
        payload: error,
    }),
    getUserInfo: (accessToken: string) => ({
        type: ACTION_GETUSER_REQUEST,
        payload: accessToken,
    }),
    setUserInfo: (userData: UserInfo) => ({
        type: ACTION_SETUSER_REQUEST,
        payload: userData,
    }),
    getUserInfoSuccess: (userInfo: UserInfo) => ({
        type: ACTION_GETUSER_SUCCESS,
        payload: userInfo,
    }),
    logout: () => {
        var res = {
            type: ACTION_LOGOUT_REQUEST,
        };
        clearToken();
        return res;
    }
};

const Auth = (state: AuthState = {}, action: any): AuthState => {

    switch (action.type) {
        case ACTION_AUTH_SUCCESS:
            return {
                ...state,
                token: action.payload,
            };

        case ACTION_LOGIN_REQUEST:
            return { ...state };
        case ACTION_LOGIN_SUCCESS:
            return {
                ...state,
                token: action.payload,
            };
        case ACTION_GETUSER_SUCCESS:
            return {
                ...state,
                user: action.payload,
            };
        case ACTION_SETUSER_REQUEST:
            return {
                ...state,
                user: action.payload,
            };
        case ACTION_LOGOUT_SUCCESS:
            return { ...state, user: undefined, token: undefined };

        default:
            return state;
    }
}

export const getAuth = (state: any) => state.Auth;

export default combineReducers({
    Auth
});
