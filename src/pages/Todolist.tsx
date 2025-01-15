import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { getTodos } from '../helper/axios';
import ReactPaginate from 'react-paginate';

interface Todo {
  id: number;
  todo: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
  const { auth, setAuth } = useAuth();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [page, setPage] = useState(1); // Current page number
  const [limit] = useState(3); // Items per page
  const [totalPages, setTotalPages] = useState(1); // Total number of pages
  const Navigate = useNavigate();

  const [userdetails, setUserDetails] = useState(() => {
    const storedUserData = localStorage.getItem('userdata');
    return storedUserData ? JSON.parse(storedUserData) : null;
  });
  const userId = userdetails?.id;

  useEffect(() => {
    if (!auth || !userdetails) {
      Navigate('/');
      return;
    }

    const fetchTodos = async () => {
      if (!userId) return;

      try {
        const response = await getTodos(userId, page, limit); // Pass page and limit
        if ('todos' in response) {
          setTodos(response.todos || []);
          setTotalPages(Math.ceil(response.total / limit)); // Calculate total pages
        } else {
          console.error(response.message);
        }
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    fetchTodos();
  }, [auth, page, userdetails, userId]);

  const handleLogout = () => {
    setAuth(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('userdata');
    Navigate('/');
  };

  const handlePageClick = ({ selected }: { selected: number }) => {
    setPage(selected + 1); // ReactPaginate uses zero-based index for pages
  };

  return (
    <div>
      <h2>Your To-Do List</h2>
      <button onClick={handleLogout}>Logout</button>
      <ul>
        {todos.length > 0 ? (
          todos.map((todo) => <li key={todo.id}>{todo.todo}</li>)
        ) : (
          <p>No todos found.</p>
        )}
      </ul>
      <div className="pagination">
        <ReactPaginate
          breakLabel="..."
          nextLabel="Next"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={totalPages}
          previousLabel="Previous"
          marginPagesDisplayed={2}
          containerClassName="pagination justify-content-center"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          activeClassName="active"
        />
      </div>
    </div>
  );
};

export default TodoList;
