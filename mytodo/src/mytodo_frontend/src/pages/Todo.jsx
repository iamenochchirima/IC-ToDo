import React, { useState, useEffect } from "react";
import Task from "../components/Task";
import CreateTask from "../components/CreateTask";
import { backendActor } from "../config";

const Todo = () => {
  const [todos, setTodos] = useState([]);

  async function addTodo(newTodo) {
    setTodos((prevTodos) => {
      backendActor.createTodo(newTodo.content);
      return [newTodo, ...prevTodos];
    });
  }

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const todosArray = await backendActor.readTodos();
    setTodos(todosArray);
  }

  async function deleteTodo(id) {
    setTodos((prevTodos) => {
      backendActor.removeTodo(id);
      return prevTodos.filter((todoItem, index) => {
        return index !== id;
      });
    });
  }

  async function updateTodo(id, updatedContent) {
    setTodos((prevTodos) => {
      backendActor.updateTodo(id, updatedContent);
      return prevTodos.map((todoItem, index) => {
        if (index === id) {
          return {
            ...todoItem,
            content: updatedContent,
          };
        } else {
          return todoItem;
        }
      });
    });
  }
  return (
    <div>
      <CreateTask onAdd={addTodo} />
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

export default Todo;
