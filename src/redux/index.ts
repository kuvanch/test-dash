import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import authReducer from "./reducer/authReducer";
import dataReducer from "./reducer/dataReducer";


const rootReducer = combineReducers({
    auth: authReducer,
    data: dataReducer
})
export type RootState = ReturnType<typeof rootReducer>


export const store = createStore(rootReducer,applyMiddleware(thunk))