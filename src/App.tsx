import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import TodoList from './pages/Todolist';
import useAuth from './hooks/useAuth';

const App: React.FC = () => {
  const { auth } = useAuth()

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/todolist" element={<TodoList/>}/>
    
      </Routes>
    </Router>
  );
};

export default App;
