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
            <button className="task-edit" onClick={handleEdit}>
              <FaEdit className="task-icon" />
            </button>
            <button className="task-delete" onClick={handleDelete}>
              <FaTrash className="task-icon" />
            </button>
          </div>
        </>
      ) : (
        <>
          <textarea
            className="task-edit-input"
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

