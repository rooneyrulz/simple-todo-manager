import * as React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { makeStyles } from "@material-ui/core/styles";
import List from "@mui/material/List";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "redux/reducers";
import { reOrderTodos } from "redux/actions/todo";
import { ITodo } from "redux/types/todo";

import SortingSelect from "./SortingSelect";
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
  const dispatch = useDispatch();
  const todo = useSelector((state: RootState) => state.todo);
  const [data, setData] = React.useState<ITodo[]>([]);

  const setSortedData = (sortedData: ITodo[]) => setData(() => [...sortedData]);

  React.useEffect(() => {
    setData(todo.todos);
  }, [todo.todos]);

  return (
    <div className={classes.root}>
      <SortingSelect data={data} setSortedData={setSortedData} />
      <br />
      <DragDropContext
        onDragEnd={(result) => dispatch(reOrderTodos(data, result))}
      >
        <Droppable droppableId='todo'>
          {(provided) => (
            <List
              className='todo'
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {todo.loading ? (
                <AppLoader />
              ) : todo.todos?.length === 0 ? (
                <p>No todos found!</p>
              ) : (
                data?.map((todo: ITodo, index) => {
                  return (
                    <Draggable
                      key={todo._id}
                      draggableId={index.toString()}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <TodoItem todo={todo} />
                        </div>
                      )}
                    </Draggable>
                  );
                })
              )}
              {provided.placeholder}
            </List>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default Todo;
