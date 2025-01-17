import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useAuth } from './hooks/useAuth';
import PrivateRoute from './components/Private-route/Private-route';
import Login from './pages/Login/Login';
import TodoList from './pages/Todolist/Todolist';
import './App.css';


const App: React.FC = () => {
  const { auth } = useAuth();

  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={auth ? <Navigate to="/todolist" replace /> : <Login/>}
          />

          <Route
            path="/todolist"
            element={
              <PrivateRoute>
                <TodoList/>
              </PrivateRoute>
            }
          />
          
        </Routes>
      </Router>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </>
  );
};

export default App;
