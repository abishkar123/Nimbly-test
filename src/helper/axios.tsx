import axios from 'axios';

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
    const {data} = await axios.post(`${clientApi}/login`, userData)
   return data
  }catch (error){
  console.log("Error logging user", error)
  return {
    status: 'error',
    message: error.message,
  };
}
}

export const getTodos = async (
  userId: number,
  page: number,
  limit: number
): Promise<TodosResponse | { status: string; message: string }> => {
  try {
    const skip = (page - 1) * limit; // Calculate items to skip
    const { data } = await axios.get<TodosResponse>(
      `${todoApi}/${userId}?skip=${skip}&limit=${limit}`
    );
    console.log('API Response:', data);
    return data;
  } catch (error: any) {
    console.error('Error fetching todos:', error);
    return {
      status: 'error',
      message: error.response?.data?.message || error.message,
    };
  }
};
