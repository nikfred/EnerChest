import {createStore, combineReducers, applyMiddleware} from "redux";
import {productReducer} from "./productReducer";
import {userReducer} from "./userReducer";
import {composeWithDevTools} from "redux-devtools-extension";

const rootReducer = combineReducers({
    product: productReducer,
    user: userReducer,
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware()))