import React, { useState, useEffect } from "react";
import Header from "./Header";
import Task from "./Task";
import CreateTask from "./CreateTask";
import { mytodo_backend } from "../../../declarations/mytodo_backend/index";

const App = () => {
  const [todos, setTodos] = useState([]);

  function addTodo(newTodo) {
    setTodos((prevTodos) => {
      mytodo_backend.createTodo(newTodo.content);
      return [newTodo, ...prevTodos];
    });
  }

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const todosArray = await mytodo_backend.readTodos();
    setTodos(todosArray);
  }

  function deleteTodo(id) {
    setTodos(prevTodos => {
      mytodo_backend.removeTodo(id)
      return prevTodos.filter((todoItem, index) => {
        return index !== id;
      });
    });
  }

  function updateTodo(id, updatedContent) {
    setTodos((prevTodos) => {
      mytodo_backend.updateTodo(id, updatedContent)
      return prevTodos.map((todoItem, index) => {
        if (index === id) {
          return {
            ...todoItem,
            content: updatedContent
          };
        } else {
          return todoItem;
        }
      });
    });
  }

  return (
    <div>
      <Header />
      <CreateTask onAdd={addTodo}/>
      {todos.map((todoItem, index) => {
        return (
          <Task
            key={index}
            id={index}
            content={todoItem.content}
            onDelete={deleteTodo}
            onUpdate={updateTodo}
          />
        );
      })}
    </div>
  );
};

export default App;
