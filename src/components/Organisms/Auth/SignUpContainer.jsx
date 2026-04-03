import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSignup } from '@/Hooks/Apis/Auth/useSignup';

import { SignUpCard } from './SignUpCard';

export const SignUpContainer = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [validationError, setValidationError] = useState('');

  const navigate = useNavigate();

  const { isPending, isSuccess, isError, error, signUpMutation } = useSignup();

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
      username: formData.username.trim(),
      email: formData.email.trim(),
      password: formData.password,
    };

    if (!payload.username || !payload.email || !payload.password) {
      setValidationError('Please fill in all the required fields.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setValidationError('Passwords do not match yet. Please recheck them.');
      return;
    }

    setValidationError('');
    signUpMutation(payload);
  };

  const apiErrorMessage = isError
    ? error?.response?.data?.message ||
      error?.message ||
      'Something went wrong while creating your account.'
    : '';

  useEffect(() => {
    if (isSuccess) {
      navigate('/signin');
    }
  }, [navigate, isSuccess]);

  return(
  <SignUpCard
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
