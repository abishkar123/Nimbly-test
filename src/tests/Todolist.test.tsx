import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { getTodos } from '../helper/axios';
import {useAuth} from '../hooks/useAuth';
import TodoList from '../pages/Todolist/Todolist';
import '@testing-library/jest-dom';

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

jest.mock('../helper/axios');
jest.mock('../hooks/useAuth');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));


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
   
    const mockUserData = { name: 'Test User' };
    Storage.prototype.getItem = jest.fn(() => JSON.stringify(mockUserData));
    
    (useAuth as jest.Mock).mockReturnValue({ auth: true });
    
    (getTodos as jest.Mock).mockResolvedValue(mockResponse);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });


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
    (useAuth as jest.Mock).mockReturnValueOnce({ auth: false });
    const mockNavigate = jest.fn();
    jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(mockNavigate);

    renderWithProviders(<TodoList />);

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
