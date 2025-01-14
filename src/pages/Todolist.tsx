import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { getTodos } from '../helper/axios';


const TodoList: React.FC = () => {
  const { auth, setAuth } = useAuth()
  const [todos, setTodos] = useState<any[]>([]);
  const [ page, setPage] = useState(1);
  const Navigate = useNavigate()

  useEffect(() => {
    if (!auth) {
      Navigate('/');
    }

    const fetchTodos = async () => {
      try {
        const response = await getTodos( page);
        setTodos(response.todos);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    fetchTodos();
  }, [auth, page]);

  const handleLogout = () => {
    setAuth(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('userdata');
    Navigate('/');
  };

  return (
    <div>
      <h2>Your To-Do List</h2>
      <button onClick={handleLogout}>Logout</button>
      <ul>
        {todos.map((todo: any) => (
          <li key={todo.id}>{todo.todo}</li>
        ))}
      </ul>
      <div>
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Previous
        </button>
        <button onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
};

export default TodoList;
