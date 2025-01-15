import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import useAuth from './hooks/useAuth';
import Login from './pages/Login';
import TodoList from './pages/Todolist';
import { ToastContainer } from 'react-toastify'; 

import './App.css'
const App: React.FC = () => {
  const { auth } = useAuth(); 
 

  return (
    <>
      <Router>
        <Routes>
          <Route 
            path="/" 
            element={auth ? <Navigate to="/todolist" /> : <Login />} 
          />
          <Route 
            path="/todolist" 
            element={auth ? <TodoList /> : <Navigate to="/" />} 
          />

        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
};

export default App;
