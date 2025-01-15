import { render, screen, fireEvent } from '@testing-library/react';
import Login from '../pages/Login';
import { loginUser } from '../helper/axios';

// Mocking the API
jest.mock('../helper/axios', () => ({
  loginUser: jest.fn(),
}));

describe('Login Component - Username, Password, and Button', () => {
  test('should render username and password input fields', () => {
    render(<Login />);

    // Check if Username and Password fields are present
    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  });

  test('should update username and password input values on change', () => {
    render(<Login />);

    // Simulate user input
    fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'testUser' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password123' } });

    // Check if the input values are updated correctly
    expect(screen.getByLabelText(/Username/i).value).toBe('testUser');
    expect(screen.getByLabelText(/Password/i).value).toBe('password123');
  });

  test('should disable the login button when loading', async () => {
    render(<Login />);

    // Simulate user input
    fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'testUser' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password123' } });

    // Mock the loginUser function to simulate loading state
    loginUser.mockImplementation(() => new Promise((resolve) => setTimeout(resolve, 1000)));

    // Click the login button
    fireEvent.click(screen.getByRole('button', { name: /Login/i }));

    // Check if the button is disabled during loading
    expect(screen.getByRole('button', { name: /Login/i })).toBeDisabled();

    // Wait for the loading state to finish
    await loginUser();

    // Check if the button is enabled after loading
    expect(screen.getByRole('button', { name: /Login/i })).not.toBeDisabled();
  });

  test('should enable the login button when inputs are provided', () => {
    render(<Login />);

    // Simulate user input
    fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'testUser' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password123' } });

    // Check if the button is enabled when inputs are filled
    expect(screen.getByRole('button', { name: /Login/i })).not.toBeDisabled();
  });
});
