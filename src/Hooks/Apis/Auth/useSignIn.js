import { useMutation } from '@tanstack/react-query';

import { SignInRequest } from '@/API/auth/auth';

export const useSignIn = () => {
  const {
    data,
    error,
    isPending,
    isError,
    isSuccess,
    mutate: signInMutation,
  } = useMutation({
    mutationFn: SignInRequest,
    onSuccess: (data) => {
      console.log('Signin Success', data);
    },
    onError: (error) => {
      console.log('Signin Error', error);
    },
  });
  return { data, error, isPending, isError, isSuccess, signInMutation };
};
