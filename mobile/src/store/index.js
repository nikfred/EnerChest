import {createStore, combineReducers, applyMiddleware} from "redux";
import {productReducer} from "./productReducer";
import {userReducer} from "./userReducer";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from 'redux-thunk'
import basketReducer from "./basketReducer";

const rootReducer = combineReducers({
    product: productReducer,
    user: userReducer,
    basket: basketReducer,
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))