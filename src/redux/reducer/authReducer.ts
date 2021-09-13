enum ActionType{
    AUTH = 'AUTH',
    AUTH_SUCCESS = 'AUTH_SUCCESS',
    AUTH_ERROR = 'AUTH_ERROR'
}

interface IData {
    token?: string;
    lifetime?: number;
    expires_at?: Date | null;
}
type TypeState = {
    isLoading: boolean;
    error: string;
    data?: IData ;
}
type authActionType = {
    type: string;
    payload?: any;
}
const initialState:TypeState = {
    isLoading: false,
    error: '',
    data: {
        token: '',
        lifetime: 0,
        expires_at: null 
    }
}

const authReducer = (state=initialState, action:authActionType):TypeState => {
    switch (action.type) {
        case ActionType.AUTH:
            return {isLoading: true, error: '', data: {}}
        case ActionType.AUTH_SUCCESS:
            return {isLoading: false, error: '', data: action.payload.token}
        case ActionType.AUTH_ERROR:
            return {isLoading: false, error: 'Error auth', data: {}}
        default:
            return state;
    }
}
export default authReducer

export const auth = (payload?:any) => ({type:ActionType.AUTH,payload})
export const authSuccess = (payload?:any) => ({type:ActionType.AUTH_SUCCESS,payload})
export const authError = (payload?:any) => ({type:ActionType.AUTH_ERROR,payload})