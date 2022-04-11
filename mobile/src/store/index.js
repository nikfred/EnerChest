import {createStore, combineReducers, applyMiddleware} from "redux";
import {productReducer} from "./productReducer";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    product: productReducer
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))