import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@mui/material/List";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

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
  const [key, setKey] = React.useState("");
  const [data, setData] = React.useState<ITodo[]>([]);
  const todo = useSelector((state: RootState) => state.todo);

  const sortByDateASC = (arr: ITodo[], key: string): ITodo[] => {
    return arr?.sort((a: any, b: any) => {
      var dateA = new Date(a[key]).getTime();
      var dateB = new Date(b[key]).getTime();
      return dateA > dateB ? 1 : -1;
    });
  };

  const sortByDateDSC = (arr: ITodo[], key: string): ITodo[] => {
    return arr?.sort((a: any, b: any) => {
      var dateA = new Date(a[key]).getTime();
      var dateB = new Date(b[key]).getTime();
      return dateA < dateB ? 1 : -1;
    });
  };

  const handleChange = (event: SelectChangeEvent) => {
    setKey(event.target.value);
    if (event.target.value === "EXP_ASC") {
      const sorted = sortByDateASC(data, "expires");
      setData(sorted);
    } else if (event.target.value === "EXP_DSC") {
      const sorted = sortByDateDSC(data, "expires");
      setData(sorted);
    } else if (event.target.value === "INST_DSC") {
      const sorted = sortByDateDSC(data, "created_at");
      setData(sorted);
    } else {
      const sorted = sortByDateASC(data, "created_at");
      setData(sorted);
    }
  };

  React.useEffect(() => {
    setData(todo.todos);
  }, [todo.todos]);

  return (
    <List className={classes.root}>
      <FormControl variant='standard' sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id='simple-select-label'>Sort By</InputLabel>
        <Select
          labelId='simple-select-label'
          id='simple-select'
          value={key}
          onChange={handleChange}
          label='key'
        >
          <MenuItem value='INST_ASC'>Insertion (asc)</MenuItem>
          <MenuItem value='INST_DSC'>Insertion (dsc)</MenuItem>
          <MenuItem value='EXP_ASC'>Expiration (asc)</MenuItem>
          <MenuItem value='EXP_DSC'>Expiration (dsc)</MenuItem>
        </Select>
      </FormControl>
      {todo.loading ? (
        <AppLoader />
      ) : data?.length === 0 ? (
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
