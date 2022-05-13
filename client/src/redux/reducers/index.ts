import { combineReducers } from "redux";
import todo from "./todo";
import alert from "./alert";

const rootReducer = combineReducers({
  todo,
  alert,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
