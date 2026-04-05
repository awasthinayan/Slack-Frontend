import axios from '@/Config/Axios.Config';

export const createChannelRequest = async ({ channelName, workspaceId, token }) => {
  try {
    const response = await axios.post(
      '/channel/createChannel',
      { channelName, workspaceId },
      {
        headers: {
          'x-access-token': token,
        },
      }
    );

    return response?.data;
  } catch (error) {
    console.log(error);
    throw error.response?.data;
  }
};
