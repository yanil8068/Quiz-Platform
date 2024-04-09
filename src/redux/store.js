import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { rootReducer } from "./rootReducer";
export const store = createStore(rootReducer, applyMiddleware(thunk)); //to apply thunk i just changed in store.js and operations.js
