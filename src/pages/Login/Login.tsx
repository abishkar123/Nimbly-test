import React, { useState } from 'react';
import { useAuth, userinfo } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../helper/axios';
import { Form, Spinner, Button } from 'react-bootstrap';

interface FormState {
  username: string;
  password: string;
  expiresInMins?: number;
}

interface FocusedFields {
  username: boolean;
  password: boolean;
}

const Login: React.FC = () => {
  const {setAuth } = useAuth();
  const {setuserData } = userinfo();
  const [form, setForm] = useState<FormState>({ username: '', password: '' });
  const [focusedFields, setFocusedFields] = useState<FocusedFields>({
    username: false,
    password: false,
  });
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<{ status?: string; message?: string }>({});
  const navigate = useNavigate();


  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleFocus = (field: keyof FocusedFields) => {
    setFocusedFields((prevFields) => ({ ...prevFields, [field]: true }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>, field: keyof FocusedFields) => {
    setFocusedFields((prevFields) => ({
      ...prevFields,
      [field]: e.target.value.trim() !== '',
    }));
  };

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setResponse({});

    try {
      const userData = await loginUser({ ...form, expiresInMins: 30 } as { username: string; password: string; expiresInMins: number });

      if (userData?.accessToken) {
        localStorage.setItem('userdata', JSON.stringify(userData));
        localStorage.setItem('authToken', userData.accessToken);

        setAuth(userData);
        setuserData(userData);
        
        navigate("/todolist");
      } else {
        setError('Invalid login credentials.');
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-form">
      <p className="text-2xl font-semibold text-center p-3">Things ToDo!</p>
      <Form className="mt-3 p-5" onSubmit={handleOnSubmit}>
       
        <div className="mb-6 relative">
          <input
            type="text"
            id="username"
            name="username"
            value={form.username}
            onChange={handleOnChange}
            onFocus={() => handleFocus('username')}
            onBlur={(e) => handleBlur(e, 'username')}
            className="p-3 custom-form rounded-lg focus:outline-none"
            required
          />
          <label
            htmlFor="username"
            className={`absolute left-3 top-4 transition-all duration-200 ease-in-out ${
              focusedFields.username ? 'top-0 text-xs text-gray-600' : 'top-4 text-gray-600'
            }`}
          >
            Username
          </label>
        </div>

        <div className="mb-6 relative">
          <input
            type="password"
            id="password"
            name="password"
            value={form.password}
            onChange={handleOnChange}
            onFocus={() => handleFocus('password')}
            onBlur={(e) => handleBlur(e, 'password')}
            className="p-3 custom-form rounded-lg focus:outline-none"
            required
          />
          <label
            htmlFor="password"
            className={`absolute left-3 top-4 transition-all duration-200 ease-in-out ${
              focusedFields.password ? 'top-0 text-xs text-gray-600' : 'top-4 text-gray-600'
            }`}
          >
            Password
          </label>
        </div>

        <div className="mb-7">
          <Button className="p-2.5 Custom-button" type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Spinner animation="border" role="status" size="sm" aria-hidden="true" />
                <div role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </>
            ) : (
              <span className="custom-button-font">
                <i className="fa-solid fa-right-to-bracket"></i> Login
              </span>
            )}
          </Button>
        </div>
      </Form>
      {response.message && (
        <div
          className={`mt-3 ${response.status === 'error' ? 'text-red-500' : 'text-green-500'}`}
        >
          {response.message}
        </div>
      )}
    </div>
  );
};

export default Login;
