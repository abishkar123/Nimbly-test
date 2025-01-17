import axios, { AxiosError } from 'axios';
import { toast } from "react-toastify";

const rootUrl = import.meta.env.MODE === 'production'
  ? import.meta.env.VITE_ROOT_API
  : 'https://dummyjson.com';

// const rootUrl = 'https://dummyjson.com';

const clientApi = `${rootUrl}/auth`;
const todoApi = `${rootUrl}/todos/user`;

export interface Todo {
  id: number;
  todo: string;
  completed: boolean;
}

export interface TodosResponse {
  todos: Todo[];
  total: number;
  page: number;
  limit: number;
}

export const loginUser = async (
  userData: { username: string; password: string }
) => {
  try {
    const { data } = await axios.post(`${clientApi}/login`, userData);

    if (data?.accessToken) {
      toast.success('Login successful!');
    }

    return data;
  } catch (error) {
    const err = error as AxiosError;
    toast.error(err?.response?.data?.message || 'Login failed. Please try again.');

    return {
      status: 'error',
      message: err.message,
    };
  }
};

export const getTodos = async (
  userId: number,
  page: number,
  limit: number,
  completed: boolean
): Promise<TodosResponse | { status: string; message: string }> => {
  try {
    const skip = (page - 1) * limit;
    const queryParams = new URLSearchParams({ skip: skip.toString(), limit: limit.toString(), completed: completed.toString() }).toString();
    const { data } = await axios.get<TodosResponse>(`${todoApi}/${userId}?${queryParams}`);

    return data;
  } catch (error) {
    const err = error as AxiosError;
    console.error('Error fetching todos:', err);

    toast.error(err?.response?.data?.message || 'Error fetching todos. Please try again.');

    return {
      status: 'error',
      message: err.message,
    };
  }
};
