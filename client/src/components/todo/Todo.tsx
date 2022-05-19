import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@mui/material/List";

import { useSelector } from "react-redux";
import { RootState } from "redux/reducers";
import { ITodo } from "redux/types/todo";

import SortingSelect, { sortByDateASC } from "./SortingSelect";
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
  const [data, setData] = React.useState<ITodo[]>([]);
  const todo = useSelector((state: RootState) => state.todo);

  const setSortedData = (sortedData: ITodo[]) => setData(() => [...sortedData]);

  React.useEffect(() => {
    const sorted = sortByDateASC(todo.todos, "created_at");
    setData(sorted);
  }, [todo.todos]);

  return (
    <List className={classes.root}>
      <SortingSelect data={data} setSortedData={setSortedData} />
      {todo.loading ? (
        <AppLoader />
      ) : todo.todos?.length === 0 ? (
        <p>No todos found!</p>
      ) : (
        data?.map((todo: ITodo) => {
          return <TodoItem todo={todo} key={todo._id} />;
        })
      )}
    </List>
  );
};

export default Todo;
