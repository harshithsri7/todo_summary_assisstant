import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import Notification from './components/Notification';
import api from './services/api';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  const [summaryText, setSummaryText] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setIsLoading(true);
      const response = await api.getAllTodos();
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
      toast.error('Failed to load todos');
    } finally {
      setIsLoading(false);
    }
  };

  //adding task
  const addTodo = async (todo) => {
    try {
      setIsLoading(true);
      const response = await api.createTodo(todo);
      setTodos([response.data, ...todos]);
      toast.success('Todo added successfully!');
    } catch (error) {
      console.error('Error adding todo:', error);
      toast.error('Failed to add todo');
    } finally {
      setIsLoading(false);
    }
  };

  //deleting task
  const deleteTodo = async (id) => {
    try {
      setIsLoading(true);
      await api.deleteTodo(id);
      setTodos(todos.filter(todo => todo.id !== id));
      toast.success('Todo deleted successfully!');
    } catch (error) {
      console.error('Error deleting todo:', error);
      toast.error('Failed to delete todo');
    } finally {
      setIsLoading(false);
    }
  };

  //checkboox
  const toggleComplete = async (id, completed) => {
    try {
      const todoToUpdate = todos.find(todo => todo.id === id);
      const updatedTodo = { ...todoToUpdate, completed: !completed };
      
      setIsLoading(true);
      const response = await api.updateTodo(id, updatedTodo);
      
      setTodos(todos.map(todo => 
        todo.id === id ? response.data : todo
      ));
    } catch (error) {
      console.error('Error updating todo:', error);
      toast.error('Failed to update todo');
    } finally {
      setIsLoading(false);
    }
  };

  //edit
  const updateTodo = async (id, updatedTodo) => {
    try {
      setIsLoading(true);
      const response = await api.updateTodo(id, updatedTodo);
      
      setTodos(todos.map(todo => 
        todo.id === id ? response.data : todo
      ));
      toast.success('Todo updated successfully!');
    } catch (error) {
      console.error('Error updating todo:', error);
      toast.error('Failed to update todo');
    } finally {
      setIsLoading(false);
    }
  };

  //summary
  const summarizeAndSend = async () => {
    try {
      setIsLoading(true);
      const response = await api.summarizeTodos();
      
      if (response.data.slackResult.success) {
        setNotification({
          type: 'success',
          message: 'Summary sent to Slack successfully!'
        });
      } else {
        setNotification({
          type: 'error',
          message: `Failed to send to Slack: ${response.data.slackResult.error}`
        });
      }
      
      setSummaryText(response.data.summary || '');
      toast.success('Summary generated successfully!');
    } catch (error) {
      console.error('Error summarizing todos:', error);
      setNotification({
        type: 'error',
        message: 'Failed to generate summary'
      });
      toast.error('Failed to summarize todos');
    } finally {
      setIsLoading(false);
    }
  };

  const clearNotification = () => {
    setNotification(null);
  };

  return (
    <div className="container">
      <ToastContainer position="top-right" autoClose={3000} />
      <h1>Todo Summary Assistant</h1>
      
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={clearNotification}
        />
      )}
      
      <TodoForm onAddTodo={addTodo} />
      
      <div className="summary-section">
        <button 
          className="btn btn-primary summarize-btn"
          onClick={summarizeAndSend}
          disabled={isLoading || todos.filter(t => !t.completed).length === 0}
        >
          {isLoading ? 'Processing...' : 'Summarize & Send to Slack'}
        </button>
        
        {summaryText && (
          <div className="todo-summary-display" style={{
            marginTop: '1rem', 
            padding: '1rem',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            border: '1px solid #e9ecef',
            whiteSpace: 'pre-wrap'
          }}>
            <h3 style={{ marginTop: 0, color: '#495057' }}>Generated Summary:</h3>
            <p style={{ margin: 0, lineHeight: '1.5' }}>{summaryText}</p>
          </div>
        )}
      </div>
      
      <TodoList
        todos={todos}
        onDelete={deleteTodo}
        onToggleComplete={toggleComplete}
        onEdit={updateTodo}
        isLoading={isLoading}
      />

      <footer style={{ marginTop: '3rem', textAlign: 'center', color: '#6c757d' }}>
  built by <a href="https://github.com/harshithsri7" target="_blank" rel="noopener noreferrer">Harshith Sri</a>
</footer>

    </div>
  );
}

export default App;