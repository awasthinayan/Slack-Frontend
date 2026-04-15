import axios from '@/Config/Axios.Config';

export const getMemberDetails = async (memberId, token) => {
  try {
    const response = await axios.get(`/member/getMemberDetails/${memberId}`, {
      headers: {
        'x-access-token': token,
      },
    });
    console.log('Response for fetch member details', response);
    return response?.data.data;
  } catch (error) {
    console.log(error);
    throw {
      ...error.response?.data,
      httpStatus: error.response?.status,
    };
  }
};
