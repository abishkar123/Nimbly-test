import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import TodoList from './pages/Todolist'
import { ToastContainer } from 'react-toastify';

const App: React.FC = () => {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/todolist" element={<TodoList/>}/>
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
};

export default App;
