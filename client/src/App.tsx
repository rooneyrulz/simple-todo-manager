import React from "react";
import { useDispatch } from "react-redux";
import { getTodos } from "redux/actions/todo";

import AddTodo from "components/todo/AddTodo";
import Todo from "components/todo/Todo";
import Alert from "components/alert/Alert";

const App: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);

  return (
    <div className='app'>
      <div className='container'>
        <AddTodo />
        <Todo />
      </div>
      <Alert />
    </div>
  );
};

export default App;
