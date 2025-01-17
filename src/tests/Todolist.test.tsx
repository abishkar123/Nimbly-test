import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { getTodos } from '../helper/axios';
import {useAuth} from '../hooks/useAuth';
import TodoList from '../pages/Todolist/Todolist';
import '@testing-library/jest-dom';

// Make sure all required providers are available
const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

// Mock the modules
jest.mock('../helper/axios');
jest.mock('../hooks/useAuth');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

// Mock data
const mockTodos = [
  { todo: 'Test todo 1', completed: true },
  { todo: 'Test todo 2', completed: false },
];

const mockResponse = {
  todos: mockTodos,
  total: 2,
};

describe('TodoList Component', () => {
  beforeEach(() => {
    // Mock localStorage
    const mockUserData = { name: 'Test User' };
    Storage.prototype.getItem = jest.fn(() => JSON.stringify(mockUserData));
    
    // Mock useAuth
    (useAuth as jest.Mock).mockReturnValue({ auth: true });
    
    // Mock getTodos
    (getTodos as jest.Mock).mockResolvedValue(mockResponse);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

 
  //   // Mock todos response
  //   const mockTodos = [
  //     { id: 1, todo: 'Test todo 1', completed: true },
  //     { id: 2, todo: 'Test todo 2', completed: false },
  //   ];
  
  //   // Mock getTodos response
  //   (getTodos as jest.Mock).mockResolvedValueOnce({
  //     todos: mockTodos,
  //     total: mockTodos.length,
  //   });
  
  //   renderWithProviders(<TodoList />); // Ensure the component is rendered with the todos
  
  //   await waitFor(() => {
  //     // Ensure the table is rendered
  //     const todoTable = screen.getByRole('table');
  //     expect(todoTable).toBeInTheDocument();
  
  //     // Ensure the text "Test todo 1" is rendered
  //     const todoItem = screen.getByText(/Test todo 1/i);
  //     expect(todoItem).toBeInTheDocument();
  //   });
  // });
  
  
  

  test('shows "No todos found" message when no todos are available', async () => {
    (getTodos as jest.Mock).mockResolvedValueOnce({
      todos: [],
      total: 0,
    });

    renderWithProviders(<TodoList />);

    await waitFor(() => {
      expect(screen.getByText('No todos found.')).toBeInTheDocument();
    });
  });

  test('redirects to home when not authenticated', () => {
    // Mock useAuth to return no auth
    (useAuth as jest.Mock).mockReturnValueOnce({ auth: false });
    const mockNavigate = jest.fn();
    jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(mockNavigate);

    renderWithProviders(<TodoList />);

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
