import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { FormControl, TextField } from "@material-ui/core";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import Button from "@mui/material/Button";

import { useDispatch } from "react-redux";
import { addTodo } from "redux/actions/todo";
import { setAlert } from "redux/actions/alert";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "400px",
    margin: theme.spacing(4, "auto", 5),
    padding: theme.spacing(4),
    boxShadow: "1px 1px 8px #222",
    borderRadius: ".25rem",
  },
  btn: {
    marginTop: "1rem",
  },
}));

const AddTodo: React.FC = (): JSX.Element => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [formData, setFormData] = React.useState<{
    title: string | null;
    expires: Date | null;
  }>({
    title: "",
    expires: new Date(),
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleDateChange = (value: Date | null) =>
    setFormData({ ...formData, expires: value });

  const handleSubmit = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    if (!formData.title) {
      dispatch(
        setAlert({ msg: "Add a title", status: 400, alertType: "error" })
      );
    } else {
      dispatch(addTodo(formData));
      setFormData((state) => ({...state, title: "", expires: new Date()}))
    }
  };

  return (
    <div className={classes.root}>
      <form onSubmit={(e) => handleSubmit(e)}>
        <FormControl fullWidth>
          <TextField
            fullWidth
            name='title'
            value={formData.title}
            onChange={(e) => handleChange(e)}
            placeholder='Title'
          />
        </FormControl>
        <br />
        <br />
        <FormControl fullWidth>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              label='Expires-in'
              value={formData.expires}
              onChange={handleDateChange}
              renderInput={(params: any) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </FormControl>
        <FormControl fullWidth className={classes.btn}>
          <Button type='submit' variant='contained'>
            ADD
          </Button>
        </FormControl>
      </form>
    </div>
  );
};

export default AddTodo;
