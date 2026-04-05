import axios from '@/Config/Axios.Config';

export const fetchAllUsers = async () => {
  try {
    const response = await axios.get('/allUsers');
    console.log('Response for fetch all users', response);

    const payload = response?.data?.data;
    if (Array.isArray(payload)) {
      return payload;
    }

    return Array.isArray(payload?.data) ? payload.data : [];
  } catch (error) {
    console.log(error);
    throw {
      ...error.response?.data,
      httpStatus: error.response?.status,
    };
  }
};
