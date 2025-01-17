import axios from 'axios';
import { toast } from "react-toastify";
import { loginUser, getTodos, TodosResponse } from '../helper/axios';
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(() => {
  jest.restoreAllMocks();
});

describe('API Functions', () => {
  describe('loginUser', () => {
    it('should return data on successful login', async () => {
      const mockResponse = { data: { accessToken: 'test-token' } };
      mockedAxios.post.mockResolvedValue(mockResponse);

      const userData = { username: 'testuser', password: 'password123' };
      const result = await loginUser(userData);

      expect(mockedAxios.post).toHaveBeenCalledWith(
        'https://dummyjson.com/auth/login',
        userData
      );
      expect(toast.success).toHaveBeenCalledWith('Login successful!');
      expect(result).toEqual(mockResponse.data);
    });

    it('should handle login error', async () => {
      const mockError = {
        response: { data: { message: 'Invalid credentials' } },
        message: 'Request failed',
      };
      mockedAxios.post.mockRejectedValue(mockError);

      const userData = { username: 'testuser', password: 'wrongpassword' };
      const result = await loginUser(userData);

      expect(mockedAxios.post).toHaveBeenCalledWith(
        'https://dummyjson.com/auth/login',
        userData
      );
      expect(toast.error).toHaveBeenCalledWith('Invalid credentials');
      expect(result).toEqual({
        status: 'error',
        message: mockError.message,
      });
    });
  });

  describe('getTodos', () => {
    it('should return todos on successful fetch', async () => {
      const mockTodosResponse: TodosResponse = {
        todos: [
          { id: 1, todo: 'Test Todo 1', completed: false },
          { id: 2, todo: 'Test Todo 2', completed: true },
        ],
        total: 2,
        page: 1,
        limit: 10,
      };
      mockedAxios.get.mockResolvedValue({ data: mockTodosResponse });

      const userId = 1;
      const page = 1;
      const limit = 10;
      const completed = false;
      const result = await getTodos(userId, page, limit, completed);

      expect(mockedAxios.get).toHaveBeenCalledWith(
        `https://dummyjson.com/todos/user/${userId}?skip=0&limit=${limit}&completed=${completed}`
      );
      expect(result).toEqual(mockTodosResponse);
    });

    it('should handle fetch error', async () => {
      const mockError = {
        response: { data: { message: 'Error fetching todos' } },
        message: 'Request failed',
      };
      mockedAxios.get.mockRejectedValue(mockError);

      const userId = 1;
      const page = 1;
      const limit = 10;
      const completed = false;
      const result = await getTodos(userId, page, limit, completed);

      expect(mockedAxios.get).toHaveBeenCalledWith(
        `https://dummyjson.com/todos/user/${userId}?skip=0&limit=${limit}&completed=${completed}`
      );
      expect(toast.error).toHaveBeenCalledWith('Error fetching todos');
      expect(result).toEqual({
        status: 'error',
        message: mockError.message,
      });
    });
  });
});
