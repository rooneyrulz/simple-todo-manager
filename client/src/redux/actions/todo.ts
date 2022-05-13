import axios from "axios";
import { Dispatch } from "redux";
import { setAlert } from "./alert";
import { TodoActions } from "redux/types/todo";
import { AlertActions } from "redux/types/alert";
import types from "./types";

const BASE_URI = "http://localhost:5000/api/v1/todo";
const config: any = {
  header: {
    "Content-Type": "application/json",
  },
};

// GET TODOS
export const getTodos =
  () => async (dispatch: Dispatch<TodoActions | AlertActions>) => {
    try {
      const { data } = await axios.get(BASE_URI, config);

      dispatch({ type: types.GET_TODO, payload: data });
    } catch (error) {
      console.log(error);
    }
  };

// ADD TODO
export const addTodo =
  (body: any) => async (dispatch: Dispatch<TodoActions | AlertActions>) => {
    try {
      const { data } = await axios.post(BASE_URI, body, config);
      dispatch({
        type: types.ADD_TODO,
        payload: data,
      });
      dispatch<any>(
        setAlert({
          msg: "New todo created!",
          status: 200,
          alertType: "success",
        })
      );
    } catch (error: any) {
      dispatch<any>(
        setAlert({
          msg: "Something went wrong",
          status: 500,
          alertType: "error",
        })
      );
    }
  };

// UPDATE TODO
export const updateTodo =
  (body: any, id: string | undefined) =>
  async (dispatch: Dispatch<TodoActions | AlertActions>) => {
    try {
      const { data } = await axios.put(`${BASE_URI}/${id}`, body, config);
      dispatch({
        type: types.UPDATE_TODO,
        payload: { id, data },
      });
      dispatch<any>(
        setAlert({
          msg: "Status updated!",
          status: 200,
          alertType: "success",
        })
      );
    } catch (error: any) {
      dispatch<any>(
        setAlert({
          msg: "Something went wrong!",
          status: 500,
          alertType: "error",
        })
      );
    }
  };

// DELETE TODO
export const deleteTodo =
  (id: string | undefined) => async (dispatch: Dispatch<TodoActions | AlertActions>) => {
    try {
      await axios.delete(`${BASE_URI}/${id}`, config);
      dispatch({ type: types.DELETE_TODO, payload: id });
      dispatch<any>(
        setAlert({
          msg: "Todo has been deleted!",
          status: 200,
          alertType: "success",
        })
      );
    } catch (error: any) {
      dispatch<any>(
        setAlert({
          msg: "Something went wrong!",
          status: 500,
          alertType: "error",
        })
      );
    }
  };
