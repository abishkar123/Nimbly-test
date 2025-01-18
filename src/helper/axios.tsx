import axios, { AxiosError } from 'axios';
import { toast } from "react-toastify";

const rootUrl = 'https://dummyjson.com';

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
    const message = (err.response?.data as any)?.message || err.message || 'Login failed. Please try again.';
    toast.error(message);

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
): Promise<TodosResponse | { status: string; message: string}> => {
  try {
    const skip = (page - 1) * limit;
    const queryParams = new URLSearchParams({ skip: skip.toString(), limit: limit.toString(), completed: completed.toString() }).toString();
    const { data } = await axios.get<TodosResponse>(`${todoApi}/${userId}?${queryParams}`);

    return data;
  } catch (error) {
    const err = error as AxiosError;
    console.error('Error fetching todos:', err);
    const message = (err.response?.data as any)?.message || err.message || 'Error fetching todos. Please try again.';

    return {
      status: 'error',
      message: err.message,
    };
  }
};
