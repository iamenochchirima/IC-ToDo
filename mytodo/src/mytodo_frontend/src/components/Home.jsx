import React, { useState, useEffect } from "react";
import Header from "./Header";
import Task from "./Task";
import CreateTask from "./CreateTask";
import { Actor, HttpAgent } from "@dfinity/agent";
import { idlFactory } from "../../../declarations/mytodo_backend/index";
import { mytodo_backend } from "../../../declarations/mytodo_backend/index";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const localHost = "http://127.0.0.1:8080/";
  const canister_id = "jz3aw-xqaaa-aaaal-qbyna-cai";
  const host = "https://icp0.io";
  const agent = new HttpAgent({ host: host });

  async function addTodo(newTodo) {
    const todoActor = await Actor.createActor(idlFactory, {
      agent,
      canisterId: canister_id,
    });
    setTodos((prevTodos) => {
      todoActor.createTodo(newTodo.content);
      return [newTodo, ...prevTodos];
    });
  }

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const todoActor = await Actor.createActor(idlFactory, {
      agent,
      canisterId: canister_id,
    });
    const todosArray = await todoActor.readTodos();
    setTodos(todosArray);
  }

  async function deleteTodo(id) {
    const todoActor = await Actor.createActor(idlFactory, {
      agent,
      canisterId: canister_id,
    });
    setTodos((prevTodos) => {
      todoActor.removeTodo(id);
      return prevTodos.filter((todoItem, index) => {
        return index !== id;
      });
    });
  }

  async function updateTodo(id, updatedContent) {
    const todoActor = await Actor.createActor(idlFactory, {
      agent,
      canisterId: canister_id,
    });
    setTodos((prevTodos) => {
      todoActor.updateTodo(id, updatedContent);
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
      <Header />
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

export default Home;
