import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { loginUser } from '../helper/axios';
import { useNavigate } from 'react-router-dom';
import useAuth, { userinfo } from '../hooks/useAuth';
import Login from '../pages/Login';

jest.mock('../helper/axios');
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

jest.mock('../hooks/useAuth', () => ({
  useAuth: jest.fn(),
  userinfo: jest.fn(),
}));

describe('Login Component', () => {
  const mockSetAuth = jest.fn();
  const mockSetUserData = jest.fn();
  const mockNavigate = jest.fn();

  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({ setAuth: mockSetAuth });
    (userinfo as jest.Mock).mockReturnValue({ setuserData: mockSetUserData });
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  it('should render the login form', () => {
    render(<Login />);
    
    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
  });

  it('should update form values on input change', () => {
    render(<Login />);

    const usernameInput = screen.getByLabelText(/Username/i) as HTMLInputElement;
    const passwordInput = screen.getByLabelText(/Password/i) as HTMLInputElement;

    fireEvent.change(usernameInput, { target: { value: 'testUser' } });
    fireEvent.change(passwordInput, { target: { value: 'testPassword' } });

    expect(usernameInput.value).toBe('testUser');
    expect(passwordInput.value).toBe('testPassword');
  });

  it('should call loginUser and setAuth on form submit with valid credentials', async () => {
    const mockLoginResponse = {
      accessToken: 'mockAccessToken',
      userData: { username: 'testUser', email: 'test@user.com' },
    };
    
    (loginUser as jest.Mock).mockResolvedValue(mockLoginResponse);
    
    render(<Login />);

    const usernameInput = screen.getByLabelText(/Username/i) as HTMLInputElement;
    const passwordInput = screen.getByLabelText(/Password/i) as HTMLInputElement;
    const submitButton = screen.getByRole('button', { name: /Login/i });

    fireEvent.change(usernameInput, { target: { value: 'testUser' } });
    fireEvent.change(passwordInput, { target: { value: 'testPassword' } });
    fireEvent.click(submitButton);

    await waitFor(() => expect(loginUser).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(mockSetAuth).toHaveBeenCalledWith(mockLoginResponse));
    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/todolist'));
  });

  it('should display an error message when login fails', async () => {
    const mockError = { response: { data: { message: 'Invalid login credentials.' } } };
    
    (loginUser as jest.Mock).mockRejectedValue(mockError);
    
    render(<Login />);

    const usernameInput = screen.getByLabelText(/Username/i) as HTMLInputElement;
    const passwordInput = screen.getByLabelText(/Password/i) as HTMLInputElement;
    const submitButton = screen.getByRole('button', { name: /Login/i });

    fireEvent.change(usernameInput, { target: { value: 'testUser' } });
    fireEvent.change(passwordInput, { target: { value: 'testPassword' } });
    fireEvent.click(submitButton);

    await waitFor(() => expect(screen.getByText('Invalid login credentials.')).toBeInTheDocument());
  });

  it('should show loading spinner when submitting', () => {
    render(<Login />);

    const usernameInput = screen.getByLabelText(/Username/i) as HTMLInputElement;
    const passwordInput = screen.getByLabelText(/Password/i) as HTMLInputElement;
    const submitButton = screen.getByRole('button', { name: /Login/i });

    fireEvent.change(usernameInput, { target: { value: 'testUser' } });
    fireEvent.change(passwordInput, { target: { value: 'testPassword' } });
    fireEvent.click(submitButton);

    expect(screen.getByRole('status')).toBeInTheDocument();
  });
});
