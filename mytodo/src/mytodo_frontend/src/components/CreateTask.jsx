import React, { useState } from 'react';

const CreateTask = (props) => {
  const [todo, setTodo] = useState({
    content: ""
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setTodo(prevTodo => {
      return {
        ...prevTodo,
        [name]: value
      };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (todo.content !== "" ) {
      props.onAdd(todo);
    setTodo({
      content: ""
    });
    }
  };

  return (
   <div className="create-container">
     <form className="createtask" onSubmit={handleSubmit}>
      <textarea
        name="content"
        value={todo.content}
        onChange={handleInputChange}
        placeholder="Enter a new task..."
        rows={4}
        className="border-black rounded p-2 mb-4 text-lg text-black"
      />
      <button type="submit" className="createtask-button">
        Save
      </button>
    </form>
   </div>
  );
};

export default CreateTask;
