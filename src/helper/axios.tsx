import axios from 'axios';
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
  userData: { username: string, password: string }
) => {
  try {
    const { data } = await axios.post(`${clientApi}/login`, userData);

    if (data?.accessToken) {
      toast.success('Login successful!');
    }

    return data;
  } catch (error) { 
    toast.error(error?.response?.data?.message || 'Login failed. Please try again.');
    
    return {
      status: 'error',
      message: error.message,
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
    const { data } = await axios.get<TodosResponse>(
      `${todoApi}/${userId}?skip=${skip}&limit=${limit}&completed=${completed}`
    );
    return data;
  } catch (error: any) {
    console.error('Error fetching todos:', error);

    toast.error(error?.response?.data?.message || 'Error fetching todos. Please try again.');
    
    return {
      status: 'error',
      message: error.message,
    };
  }
};

