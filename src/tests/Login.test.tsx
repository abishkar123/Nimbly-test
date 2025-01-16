import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'; 
import { loginUser } from '../helper/axios';
import '@testing-library/jest-dom';
import Login from '../pages/Login';

jest.mock('../helper/axios'); 

describe('Login Component', () => {
  test('should render username, password fields and login button', () => {
    render(
      <BrowserRouter> 
        <Login/>
      </BrowserRouter>
    );

    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
  });

  test('should call login API and navigate on successful login', async () => {
    loginUser.mockResolvedValue({ accessToken: 'mockToken' });

    render(
      <BrowserRouter> 
        <Login />
      </BrowserRouter>
    );

  
    fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'testUser' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'testPassword' } });

    fireEvent.click(screen.getByRole('button', { name: /Login/i }));

    await waitFor(() => {
      expect(loginUser).toHaveBeenCalledWith({
        username: 'testUser',
        password: 'testPassword',
        expiresInMins: 30,
      });
    });
  });
});
