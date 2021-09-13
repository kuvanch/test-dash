enum ActionType{
    GET_DATA = 'GET_DATA',
    GET_DATA_SUCCESS = 'GET_DATA_SUCCESS',
    GET_DATA_ERROR = 'GET_DATA_ERROR'
}


type TypeState = {
    isLoading: boolean;
    error: string;
    data?: any ;
    total: number
}
type authActionType = {
    type: string;
    payload?: any;
}
const initialState:TypeState = {
    isLoading: false,
    error: '',
    data: [],
    total: 0
}

const dataReducer = (state=initialState, action:authActionType):TypeState => {
    switch (action.type) {
        case ActionType.GET_DATA:
            return {isLoading: true, error: '', data: [],total: 0}
        case ActionType.GET_DATA_SUCCESS:
            return {isLoading: false, error: 'loooooo', data: action.payload.items,total: action.payload.total_count}
        case ActionType.GET_DATA_ERROR:
            return {isLoading: false, error: 'Error get data', data: [],total: 0}
        default:
            return state;
    }
}
export default dataReducer

export const getData = (payload?:any) => ({type:ActionType.GET_DATA,payload})
export const getDataSuccess = (payload?:any) => ({type:ActionType.GET_DATA_SUCCESS,payload})
export const getDataError = (payload?:any) => ({type:ActionType.GET_DATA_ERROR,payload})