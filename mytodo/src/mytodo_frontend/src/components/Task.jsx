import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const Task = ({ id, content, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedContent, setUpdatedContent] = useState(content);

  const handleDelete = () => {
    onDelete(id);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onUpdate(id, updatedContent);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setUpdatedContent(content);
    setIsEditing(false);
  };

  const handleInputChange = (event) => {
    setUpdatedContent(event.target.value);
  };

  return (
    <div className="taskcontainer">
      <div className="task-card">
        {!isEditing ? (
          <>
            <div className="task-content">{content}</div>
            <div className="task-buttons">
              <button
                className="bg-white border-none rounded mr-5 py-1 px-2"
                onClick={handleEdit}
              >
                <FaEdit size={18} className="text-gray-900" />
              </button>
              <button
                className="bg-white border-none rounded mr-5 py-1 px-2"
                onClick={handleDelete}
              >
                <FaTrash size={18} className="text-gray-900" />
              </button>
            </div>
          </>
        ) : (
          <>
            <textarea
              className="border-black rounded mt-2 p-1 w-full text-black"
              value={updatedContent}
              onChange={handleInputChange}
            />
            <div className="task-buttons">
              <button className="task-save" onClick={handleSave}>
                Save
              </button>
              <button className="task-cancel" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Task;
