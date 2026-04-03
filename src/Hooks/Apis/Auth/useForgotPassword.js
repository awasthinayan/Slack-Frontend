import { useMutation } from '@tanstack/react-query';

import {
  ResetPasswordRequest,
  SendOtpRequest,
  VerifyOtpRequest,
} from '@/API/auth/auth';

export const useForgotPassword = () => {
  const sendOtpMutation = useMutation({
    mutationFn: SendOtpRequest,
    onSuccess: (data) => {
      console.log('Send OTP Success', data);
    },
    onError: (error) => {
      console.log('Send OTP Error', error);
    },
  });

  const verifyOtpMutation = useMutation({
    mutationFn: VerifyOtpRequest,
    onSuccess: (data) => {
      console.log('Verify OTP Success', data);
    },
    onError: (error) => {
      console.log('Verify OTP Error', error);
    },
  });

  const resetPasswordMutation = useMutation({
    mutationFn: ResetPasswordRequest,
    onSuccess: (data) => {
      console.log('Reset Password Success', data);
    },
    onError: (error) => {
      console.log('Reset Password Error', error);
    },
  });

  return {
    sendOtp: sendOtpMutation.mutateAsync,
    verifyOtp: verifyOtpMutation.mutateAsync,
    resetPassword: resetPasswordMutation.mutateAsync,
    isPending:
      sendOtpMutation.isPending ||
      verifyOtpMutation.isPending ||
      resetPasswordMutation.isPending,
  };
};
