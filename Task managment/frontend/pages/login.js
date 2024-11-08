import { useState } from 'react';
import AuthForm from '../components/AuthForm';
import { login } from '../utils/api';
import { saveToken } from '../utils/auth';
import { useRouter } from 'next/router';

const Login = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const router = useRouter();

  const handleLogin = async (data) => {
    try {
      const response = await login(data);
      saveToken(response.data.token);
      router.push('/tasks');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setErrorMessage(error.response.data.error); 
      } else {
        setErrorMessage('An unexpected error occurred. Please try again later.');
      }
    }
  };

  return (
    <AuthForm onSubmit={handleLogin} isLogin errorMessage={errorMessage} />
  );
  
};

export default Login;
