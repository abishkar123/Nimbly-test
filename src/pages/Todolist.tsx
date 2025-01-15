import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { getTodos } from '../helper/axios';
import ReactPaginate from 'react-paginate';
import { Header } from '../components/Header/Header';
import { Container, Table } from 'react-bootstrap';

interface Todo {
  id: number;
  todo: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
  const { auth, setAuth } = useAuth();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]); // State for filtered todos
  const [page, setPage] = useState(1); 
  const [limit] = useState(10); 
  const [totalPages, setTotalPages] = useState(1); 
  const [completedFilter, setCompletedFilter] = useState<string>('true'); // Added filter state
  const Navigate = useNavigate();

  const [userdetails, setUserDetails] = useState(() => {
    const storedUserData = localStorage.getItem('userdata');
    return storedUserData ? JSON.parse(storedUserData) : null;
  });
  const userId = userdetails?.id;


  const filterTodos = (todos: Todo[], filter: string) => {
    return todos.filter(todo => String(todo.completed) === filter);
  };

  useEffect(() => {
    if (!auth || !userdetails) {
      Navigate('/');
      return;
    }

    const fetchTodos = async () => {
      if (!userId) return;

      try {
        const response = await getTodos(userId, page, limit, completedFilter); // Pass filter to API
        if ('todos' in response) {
          const fetchedTodos = response.todos || [];
          setTodos(fetchedTodos);
          setTotalPages(Math.ceil(response.total / limit)); 
          setFilteredTodos(filterTodos(fetchedTodos, completedFilter)); // Apply filter after fetching
        } else {
          console.error(response.message);
        }
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    fetchTodos();
  }, [auth, page, userdetails, userId, completedFilter]); 

  const handlePageClick = ({ selected }: { selected: number }) => {
    setPage(selected + 1); 
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCompletedFilter(e.target.value); // Update filter state
  };

  return (
    <div className='font-nunito w-full h-full text-sm'>
      <Header />
      <Container>
        <p className='text-xl font-semibold d-flex justify-center mt-3'>My To-Do-List</p>
  
        <div className="mt-4">
          <label>
            Task Completed:
            <select value={completedFilter} onChange={handleFilterChange} className="form-select">
              <option value="true">Completed</option>
              <option value="false">Not Completed</option>
            </select>
          </label>
        </div>

        <div className='table-responsive'>
        <Table className='mt-4'>
          <thead>
            <tr>
              <th>#</th>
              <th>Todo</th>
              <th>Completed</th>
            </tr>
          </thead>
          <tbody>
            {filteredTodos.length > 0 ? (
              filteredTodos.map((todo, index) => (
                <tr key={todo.id}>
                  <td>{index + 1}</td>
                  <td>{todo.todo}</td>
                  <td>{todo.completed ? 'Yes' : 'No'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3}>No todos found.</td>
              </tr>
            )}
            </tbody>
        </Table>


        <div className=" mt-5 ">
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
       

      </Container>
    </div>
  );
};

export default TodoList;
