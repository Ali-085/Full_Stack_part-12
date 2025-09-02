// src/components/TodoList.jsx
import React from "react";
import Todo from "./Todo";

const TodoList = ({ todos, deleteTodo, completeTodo }) => {
  return (
    <>
      {Array.isArray(todos) &&
        todos.map((todo, index) => (
          <React.Fragment key={todo._id || todo.id || index}>
            <Todo
              todo={todo}
              deleteTodo={deleteTodo}
              completeTodo={completeTodo}
            />
            {index < todos.length - 1 && <hr />}
          </React.Fragment>
        ))}
    </>
  );
};

export default TodoList;
