import React, { useState } from 'react';
import useAuth, { userinfo } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../helper/axios';
import { Form, Spinner, Button } from 'react-bootstrap';

interface FormState {
  username: string;
  password: string;
}

interface FocusedFields {
  username: boolean;
  password: boolean;
}

const Login: React.FC = () => {
  const { setAuth } = useAuth();
  const { setuserData } = userinfo();
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

    try {
      const userData = await loginUser({ ...form, expiresInMins: 30 });

      if (userData?.accessToken) {
        localStorage.setItem('userdata', JSON.stringify(userData));
        localStorage.setItem('authToken', userData.accessToken);

        setAuth(userData);
        setuserData(userData);
        navigate('/todolist');
      } else {
        setError('Invalid login credentials.');
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const inputs = [
    { label: 'Username', type: 'text', name: 'username' },
    { label: 'Password', type: 'password', name: 'password' },
  ];

  return (
    <div className="login-form">
      <p className="text-2xl font-semibold text-center p-3">Things ToDo!</p>
      <Form className="mt-3 p-5" onSubmit={handleOnSubmit}>
        {inputs.map((input, idx) => (
          <div className="mb-6 relative" key={idx}>
            <input
              type={input.type}
              id="input.name"
              name={input.name}
              value={form[input.name as keyof FormState]}
              onChange={handleOnChange}
              onFocus={() => handleFocus(input.name as keyof FocusedFields)}
              onBlur={(e) => handleBlur(e, input.name as keyof FocusedFields)}
              className="p-3 custom-form rounded-lg focus:outline-none"
              required
            />
            <label
              htmlFor={input.name}
              className={`absolute left-3 top-4 transition-all duration-200 ease-in-out ${
                focusedFields[input.name as keyof FocusedFields]
                  ? 'top-0 text-xs text-gray-600'
                  : 'top-4 text-gray-600'
              }`}
            >
              {input.label}
            </label>
          </div>
        ))}
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
          className={`mt-3 ${
            response.status === 'error' ? 'text-red-500' : 'text-green-500'
          }`}
        >
          {response.message}
        </div>
      )}
    </div>
  );
};

export default Login;
