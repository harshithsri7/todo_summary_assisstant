import React, { useState } from 'react';
import './TodoItem.css';

function TodoItem({ todo, onToggleComplete, onDelete, onEdit, isLoading }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const [editedDescription, setEditedDescription] = useState(todo.description || '');

  const handleSave = () => {
    if (editedTitle.trim()) {
      onEdit(todo.id, { 
        ...todo, 
        title: editedTitle.trim(),
        description: editedDescription.trim()
      });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditedTitle(todo.title);
    setEditedDescription(todo.description || '');
    setIsEditing(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-left">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggleComplete(todo.id, todo.completed)}
          disabled={isLoading || isEditing}
        />
        <div className="todo-content">
          {isEditing ? (
            <div className="edit-form">
              <input
                className="edit-input title-input"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Task title"
                autoFocus
              />
              <input
                className="edit-input description-input"
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Task description (optional)"
              />
            </div>
          ) : (
            <>
              <div className="todo-title">{todo.title}</div>
              {todo.description && (
                <div className="todo-description">{todo.description}</div>
              )}
            </>
          )}
        </div>
      </div>

      <div className="todo-actions">
        {isEditing ? (
          <>
            <button 
              className="save-btn"
              onClick={handleSave}
              disabled={isLoading || !editedTitle.trim()}
              title="Save changes"
            >
              ✅
            </button>
            <button 
              className="cancel-btn"
              onClick={handleCancel}
              disabled={isLoading}
              title="Cancel editing"
            >
              ❌
            </button>
          </>
        ) : (
          <>
            <button 
              className="edit-btn"
              onClick={() => setIsEditing(true)}
              disabled={isLoading}
              title="Edit task"
            >
              ✏️
            </button>
            <button 
              className="delete-btn"
              onClick={() => onDelete(todo.id)}
              disabled={isLoading}
              title="Delete task"
            >
              🗑️
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default TodoItem;