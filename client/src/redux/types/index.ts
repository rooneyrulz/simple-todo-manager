import { ITodoState, TodoActions } from "./todo";
import { IAlertState, AlertActions } from "./alert";

export type AppState = ITodoState | IAlertState;
export type AppActions = TodoActions | AlertActions;
