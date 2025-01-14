import axios from 'axios';

const rootUrl = 'https://dummyjson.com';

const clientApi = `${rootUrl}/auth`;
const todoApi = `${rootUrl}/todos`;


export const loginUser = async (userData: { username: string, password: string }) => {
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

// Get to-do list with pagination (if the API supports pagination)
export const getTodos = async (page: number) => {
  try {
    const { data } = await axios.get(`${todoApi}?page=${page}&limit=10`);
    return data;
  } catch (error) {
    console.log("Error to display the", error)
    return {
      status: 'error',
      message: error.message,
    };
  }
};
