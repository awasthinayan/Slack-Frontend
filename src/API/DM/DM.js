import axios from '@/Config/Axios.Config';

export const getDirectMessages = async ({
  workspaceId,
  memberId,
  token,
  limit,
  page,
}) => {
  try {
    const response = await axios.get(
      `/messages/dm/${workspaceId}/${memberId}`,
      {
        params: {
          page: page || 1,
          limit: limit || 20,
        },
        headers: {
          'x-access-token': token,
        },
      }
    );

    return response?.data?.data;
  } catch (error) {
    console.log('Error in getDirectMessagesRequest', error);
    throw error.response?.data || error;
  }
};
