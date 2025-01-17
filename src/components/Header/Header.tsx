import React, { useState } from 'react'
// import './Header.css'
import {useAuth} from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


export const Header = () => {
    const {setAuth} = useAuth()
    const navigate = useNavigate();

    const [userdetails, setUserDetails] = useState(() => {
    const storedUserData = localStorage.getItem('userdata');
        return storedUserData ? JSON.parse(storedUserData) : null;
      });
      const username= userdetails.username

     const handleLogout = () => {
        try {
          setAuth(null);
          localStorage.removeItem('authToken');
          localStorage.removeItem('userdata');
      
          toast.success('You have been logged out successfully!');
      
          navigate("/");
        } catch (error) {
          toast.error('Failed to log out. Please try again.');
        }
      };

      
  return (
    <div className='Container'>
     <div className='parent-container'>
        <div className='child-container'>
        <span className='text-2xl font-semibold'>ThingToDo</span>
        
        <div className='account'>Hi,{username}</div>
        <div className='logout'> 
            <button onClick={handleLogout}>
            <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="36px" fill="#0000F5">  <title>Logout</title><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"/></svg>
            </button>
        </div>
       
        </div>
        

     </div>
    </div>
  )
}