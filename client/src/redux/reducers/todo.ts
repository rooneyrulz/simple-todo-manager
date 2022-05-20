import types from "redux/actions/types";
import { ITodo, ITodoState, TodoActions } from "../types/todo";

const initialState: ITodoState = {
  loading: true,
  todos: [] as ITodo[],
};

const todoReducer = (state = initialState, action: TodoActions): ITodoState => {
  switch (action.type) {
    case types.GET_TODO:
      return {
        ...state,
        loading: false,
        todos: action.payload,
      };

    case types.REORDER_TODO:
      return {
        ...state,
        todos: action.payload,
      };

    case types.ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };

    case types.UPDATE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo._id === action.payload.id ? { ...action.payload.data } : todo
        ),
      };

    case types.DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo._id !== action.payload),
      };

    default:
      return state;
  }
};

export default todoReducer;
