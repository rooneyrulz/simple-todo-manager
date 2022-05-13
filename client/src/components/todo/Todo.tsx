import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@mui/material/List";

import { useSelector } from "react-redux";
import { RootState } from "redux/reducers";
import { ITodo } from "redux/types/todo";

import TodoItem from "./TodoItem";
import AppLoader from "../AppLoader";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "600px",
    margin: "auto !important",
  },
}));

const Todo: React.FC = (): JSX.Element => {
  const classes = useStyles();
  const todo = useSelector((state: RootState) => state.todo);

  return (
    <List className={classes.root}>
      {todo.loading ? (
        <AppLoader />
      ) : todo.todos.length === 0 ? (
        <p>No todos found!</p>
      ) : (
        todo.todos?.map((todo: ITodo) => {
          return <TodoItem todo={todo} key={todo._id} />;
        })
      )}
    </List>
  );
};

export default Todo;
