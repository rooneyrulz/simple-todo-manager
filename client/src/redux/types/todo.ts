import types from "redux/actions/types";

export interface ITodo {
  _id?: string;
  title: string;
  checked?: boolean;
  expires?: any;
  created_at?: any;
  updated_at?: any;
}

export interface ITodoState {
  loading: boolean;
  todos: ITodo[];
}

interface IGetTodo {
  type: typeof types.GET_TODO;
  payload: ITodo[];
}

interface IAddTodo {
  type: typeof types.ADD_TODO;
  payload: ITodo;
}

interface IUpdateTodo {
  type: typeof types.UPDATE_TODO;
  payload: { id: string | undefined, data: ITodo };
}

interface IReOrderTodo {
  type: typeof types.REORDER_TODO;
  payload: ITodo[];
}

interface IDeleteTodo {
  type: typeof types.DELETE_TODO;
  payload: string | undefined;
}

export type TodoActions = IGetTodo | IAddTodo | IUpdateTodo | IReOrderTodo | IDeleteTodo;
