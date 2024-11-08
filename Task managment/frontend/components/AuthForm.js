import { useState } from 'react';
import Link from 'next/link';

const AuthForm = ({ onSubmit, isLogin = true, errorMessage }) => {
  const [formData, setFormData] = useState({ email: '', password: '', name: '', confirmPassword: '' });
  const [errors, setErrors] = useState({ email: '', password: '', confirmPassword: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    let formErrors = { email: '', password: '', confirmPassword: '' };

    if (!formData.email.includes('@') || !formData.email.includes('.')) {
      formErrors.email = 'Please enter a valid email address.';
    }

    if (!isLogin &&formData.password.length < 6) {
      formErrors.password = 'Password must be at least 6 characters long.';
    }

    if (!isLogin && formData.password !== formData.confirmPassword) {
      formErrors.confirmPassword = 'Passwords do not match.';
    }

    setErrors(formErrors);

    return !Object.values(formErrors).some((error) => error);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData); 
    }
  };

  return (
    <div className="min-h-screen flex items-center flex-col justify-center p-5 bg-[#191919]">
      <div className="text-center max-w-2xl mx-auto ">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">
          Regain <span className="px-3 text-[#F15025]">control</span> over your days
        </h1>
        <p className="text-base md:text-lg text-[#CED0CE] m-4">
          Empower yourself to manage tasks effectively with our simple yet powerful tool.
        </p>
      </div>
      <div className="bg-[#CED0CE] shadow-md rounded-lg px-8 py-6 max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4 text-[#191919]">
          {isLogin ? 'Welcome Back!' : 'Create an Account'}
        </h1>
        
        {errorMessage && <p className="text-red-500 text-xs mb-4">{errorMessage}</p>}
        
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-[#191919] mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="shadow-sm rounded-md text-[#191919] w-full px-3 py-2 border border-gray-300 dark:border-gray-600"
                placeholder="Enter your full name"
              />
            </div>
          )}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-[#191919] mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="shadow-sm rounded-md text-[#191919] w-full px-3 py-2 border border-gray-300 dark:border-gray-600"
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-[#191919] mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="shadow-sm rounded-md text-[#191919] w-full px-3 py-2 border border-gray-300 dark:border-gray-600"
              placeholder="Enter your password"
            />
            {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
          </div>
          {!isLogin && (
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#191919] mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="shadow-sm rounded-md text-[#191919] w-full px-3 py-2 border border-gray-300 dark:border-gray-600"
                placeholder="Confirm your password"
              />
              {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword}</p>}
            </div>
          )}
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#F15025] hover:bg-[#f15125c7] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#191919]"
          >
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>

        <p className="text-xs text-center text-[#191919] mt-4">
          {isLogin ? (
            <>
              Don't have an account?{' '}
              <Link href="/register" className="hover:text-[#F15025]">
                Create Account
              </Link>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <Link href="/login" className="hover:text-[#F15025]">
                Login here
              </Link>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
