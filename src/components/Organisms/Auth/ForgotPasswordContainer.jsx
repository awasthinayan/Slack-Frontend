import { useState } from 'react';

import { useForgotPassword } from '@/Hooks/Apis/Auth/useForgotPassword';

import { ForgotPasswordCard } from './ForgotPasswordCard';

const getApiErrorMessage = (error, fallbackMessage) =>
  error?.response?.data?.message || error?.message || fallbackMessage;

export const ForgotPasswordContainer = () => {
  const [step, setStep] = useState('request');
  const [feedback, setFeedback] = useState({
    type: '',
    message: '',
  });
  const [formData, setFormData] = useState({
    email: '',
    otp: '',
    password: '',
    confirmPassword: '',
  });

  const { isPending, resetPassword, sendOtp, verifyOtp } = useForgotPassword();

  const handleChange = (field) => (event) => {
    setFormData((previous) => ({
      ...previous,
      [field]: event.target.value,
    }));

    if (feedback.type === 'error') {
      setFeedback({ type: '', message: '' });
    }
  };

  const handleRequestOtp = async (event) => {
    event.preventDefault();

    const email = formData.email.trim();

    if (!email) {
      setFeedback({
        type: 'error',
        message: 'Enter your email address to receive a verification code.',
      });
      return;
    }

    try {
      const response = await sendOtp({ email });

      setFormData((previous) => ({ ...previous, email }));
      setFeedback({
        type: 'success',
        message:
          response?.message ||
          'We sent a verification code to your email address.',
      });
      setStep('verify');
    } catch (error) {
      setFeedback({
        type: 'error',
        message: getApiErrorMessage(
          error,
          'We could not send the verification code right now.',
        ),
      });
    }
  };

  const handleVerifyOtp = async (event) => {
    event.preventDefault();

    const email = formData.email.trim();
    const otp = formData.otp.trim();

    if (!otp) {
      setFeedback({
        type: 'error',
        message: 'Enter the 6-digit code sent to your email.',
      });
      return;
    }

    try {
      const response = await verifyOtp({ email, otp });

      setFeedback({
        type: 'success',
        message:
          response?.message ||
          'Code verified successfully. You can set a new password now.',
      });
      setStep('reset');
    } catch (error) {
      setFeedback({
        type: 'error',
        message: getApiErrorMessage(
          error,
          'The verification code is invalid or has expired.',
        ),
      });
    }
  };

  const handleResetPassword = async (event) => {
    event.preventDefault();

    const email = formData.email.trim();
    const password = formData.password;

    if (!password || !formData.confirmPassword) {
      setFeedback({
        type: 'error',
        message: 'Enter your new password in both fields to continue.',
      });
      return;
    }

    if (password.length < 6) {
      setFeedback({
        type: 'error',
        message: 'Use a password with at least 6 characters.',
      });
      return;
    }

    if (password !== formData.confirmPassword) {
      setFeedback({
        type: 'error',
        message: 'Passwords do not match yet. Please recheck them.',
      });
      return;
    }

    try {
      const response = await resetPassword({ email, password });

      setFeedback({
        type: 'success',
        message:
          response?.message ||
          'Password reset successful. You can sign in with your new password.',
      });
      setStep('success');
    } catch (error) {
      setFeedback({
        type: 'error',
        message: getApiErrorMessage(
          error,
          'We could not reset your password right now.',
        ),
      });
    }
  };

  const handleResendOtp = async () => {
    const email = formData.email.trim();

    if (!email) {
      setFeedback({
        type: 'error',
        message: 'Enter your email address before requesting another code.',
      });
      return;
    }

    try {
      const response = await sendOtp({ email });

      setFeedback({
        type: 'success',
        message:
          response?.message ||
          'A fresh verification code has been sent to your email.',
      });
    } catch (error) {
      setFeedback({
        type: 'error',
        message: getApiErrorMessage(
          error,
          'We could not resend the verification code right now.',
        ),
      });
    }
  };

  return (
    <ForgotPasswordCard
      feedback={feedback}
      formData={formData}
      isPending={isPending}
      onChange={handleChange}
      onRequestOtp={handleRequestOtp}
      onResendOtp={handleResendOtp}
      onResetPassword={handleResetPassword}
      onVerifyOtp={handleVerifyOtp}
      step={step}
    />
  );
};
