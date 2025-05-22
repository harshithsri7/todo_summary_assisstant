import  React from 'react';
import TodoItem from './TodoItem';

function TodoList({ todos, onDelete, onToggleComplete, onEdit, isLoading }) {
  const pendingTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);

  if (todos.length === 0) {
    return (
      <div className="no-todos">
        <p>No todos yet. Add some tasks to get started!</p>
      </div>
    );
  }

  return (
    <div className="todo-list">
      <h2>Pending Tasks ({pendingTodos.length})</h2>
      {pendingTodos.length === 0 ? (
        <p className="empty-section">No pending tasks. Great job!</p>
      ) : (
        <div className="todos-section">
          {pendingTodos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onDelete={onDelete}
              onToggleComplete={onToggleComplete}
              onEdit={onEdit}
              isLoading={isLoading}
            />
          ))}
        </div>
      )}
      
      {completedTodos.length > 0 && (
        <>
          <h2>Completed Tasks ({completedTodos.length})</h2>
          <div className="todos-section">
            {completedTodos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onDelete={onDelete}
                onToggleComplete={onToggleComplete}
                onEdit={onEdit}
                isLoading={isLoading}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default TodoList;