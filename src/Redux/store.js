import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axiosClient from "../api/axiosClient";
import rootReducer from "./rootReducer";


const store = createStore(rootReducer, applyMiddleware(thunk.withExtraArgument(axiosClient)))

export default store;