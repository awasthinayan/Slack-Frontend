import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  AUTH_EXPIRY_KEY,
  AUTH_SESSION_DURATION_MS,
  AUTH_TOKEN_KEY,
  AUTH_USER_KEY,
} from '@/Context/AuthContext';
import { useSignIn } from '@/Hooks/Apis/Auth/useSignIn';
import { useAuth } from '@/Hooks/Context/useAuth';

import { SignInCard } from './SignInCard';

export const SignInContainer = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [validationError, setValidationError] = useState('');
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const { data, error, isPending, isError, isSuccess, signInMutation } =
    useSignIn();

  const handleChange = (field) => (event) => {
    setFormData((previous) => ({
      ...previous,
      [field]: event.target.value,
    }));

    if (validationError) {
      setValidationError('');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const payload = {
      email: formData.email.trim(),
      password: formData.password,
    };

    if (!payload.email || !payload.password) {
      setValidationError('Enter your email and password to continue.');
      return;
    }

    setValidationError('');
    signInMutation(payload);
  };

  const apiErrorMessage = isError
    ? error?.response?.data?.message ||
    error?.message ||
    'We could not sign you in right now. Please try again.'
    : '';

  useEffect(() => {
    if (!isSuccess || !data?.token) {
      return;
    }

    const user = {
      email: formData.email.trim(),
    };
    const authExpiry = Date.now() + AUTH_SESSION_DURATION_MS;

    localStorage.setItem(AUTH_TOKEN_KEY, data.token);
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
    localStorage.setItem(AUTH_EXPIRY_KEY, authExpiry.toString());

    setAuth({
      user,
      token: data.token,
      isloading: false,
    });

    navigate('/home', { replace: true });
  }, [data, formData.email, isSuccess, navigate, setAuth]);

  return (
    <SignInCard
      apiErrorMessage={apiErrorMessage}
      formData={formData}
      isPending={isPending}
      isSuccess={isSuccess}
      onChange={handleChange}
      onSubmit={handleSubmit}
      validationError={validationError}
    />
  );
};
