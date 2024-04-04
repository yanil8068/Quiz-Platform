import { combineReducers } from "redux";
import { operationsReducer } from "./todoapp/reducers/operations";
import { usersReducer } from "./todoapp/reducers/operations";

export const rootReducer = combineReducers({
  operationsReducer,
  usersReducer,
  //more reducers con be added here
});
