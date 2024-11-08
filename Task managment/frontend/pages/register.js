// pages/register.js
import { useRouter } from 'next/router';
import AuthForm from '../components/AuthForm';
import { register } from '../utils/api';
import { useState } from 'react';

const Register = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = async (data) => {
    try {
      await register(data);
      router.push('/login');
    } catch (error) {
      setErrorMessage(error.message); 
    }
  };

  return (
   <AuthForm onSubmit={handleRegister} isLogin={false} errorMessage={errorMessage} />
  );
};

export default Register;
