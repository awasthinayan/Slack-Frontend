import axios from '@/Config/Axios.Config';

export const SignUpRequest = async (data) => {
  try {
    const response = await axios.post('/signup', data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const SignInRequest = async (data) => {
  try {
    const response = await axios.post('/signin', data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const SendOtpRequest = async (data) => {
  try {
    const response = await axios.post('/sendOTP', data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const VerifyOtpRequest = async (data) => {
  try {
    const response = await axios.post('/verifyOTP', data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const ResetPasswordRequest = async (data) => {
  try {
    const response = await axios.post('/resetPassword', data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const VerifyEmailRequest = async ({ email, token }) => {
  try {
    const response = await axios.post('/verifyEmail', { email, token });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
