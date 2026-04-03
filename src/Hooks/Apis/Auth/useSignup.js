import { useMutation } from '@tanstack/react-query';

import { SignUpRequest } from '@/API/auth/auth';

export const useSignup = () => {
  const {
    data,
    error,
    isPending,
    isError,
    isSuccess,
    mutate: signUpMutation,
  } = useMutation({
    mutationFn: SignUpRequest,
    onSuccess: (data) => {
      console.log('Signup Success', data);
    },
    onError: (error) => {
      console.log('Signup Error', error);
    },
  });
  return { data, error, isPending, isError, isSuccess, signUpMutation };
};
