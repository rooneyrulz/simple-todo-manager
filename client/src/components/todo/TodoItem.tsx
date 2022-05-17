import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

import { useDispatch } from "react-redux";
import { deleteTodo, updateTodo } from "redux/actions/todo";
import { ITodo } from "redux/types/todo";

type Props = {
  todo: ITodo;
  key: string | number | undefined;
};

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1, 'auto'),
    boxShadow: "1px 3px 8px #222",
    borderRadius: ".25rem"
  },
  btn: {
    cursor: "pointer",
  },
}));

const TodoItem: React.FC<Props> = ({ todo }): JSX.Element => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [checked, setChecked] = React.useState<boolean>(todo?.checked ?? false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, id: string | undefined) => {
    setChecked(e.target.checked);
    dispatch(
      updateTodo(
        {
          title: todo.title,
          expires: todo.expires,
          checked: e.target.checked,
        },
        id
      )
    );
  };

  const handleDelete = (id: string | undefined) => {
    dispatch(deleteTodo(id));
  };

  return (
    <ListItem className={classes.root}>
      <Checkbox
        checked={checked}
        onChange={(e) => handleChange(e, todo._id)}
        inputProps={{ "aria-label": "controlled" }}
      />
      <ListItemText primary={todo.title} />
      <AccessTimeFilledIcon color={`${new Date(todo.expires) > new Date() ? "success" : "inherit"}`} />
      <ListItemText primary={""} />
      <ListItemText primary={""} />
      <ListItemText primary={new Date(todo.expires)?.toUTCString()} />
      <RemoveCircleIcon
        color='error'
        className={classes.btn}
        onClick={(e) => handleDelete(todo._id)}
      />
    </ListItem>
  );
};

export default TodoItem;
