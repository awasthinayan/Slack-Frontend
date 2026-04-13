import axios from '@/Config/Axios.Config';

export const createChannelRequest = async ({
  channelName,
  workspaceId,
  token,
}) => {
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

export const getChannelDetailsRequest = async ({ channelId, token }) => {
  try {
    const response = await axios.get(`/channel/${channelId}`, {
      headers: {
        'x-access-token': token,
      },
    });
    ('');
    console.log('response from getChannelDetailsRequest', response);
    return response?.data?.data;
  } catch (error) {
    console.log(error);
    throw error.response?.data;
  }
};

export const updateChannelRequest = async ({
  channelId,
  workspaceId,
  token,
  ChannelName,
}) => {
  try {
    const response = await axios.put(
      `/channel/${channelId}/update/${workspaceId}`,
      {ChannelName},
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

export const deleteChannelRequest = async ({ channelId, token }) => {
  try {
    const response = await axios.delete(`/channel/deleteChannel/${channelId}`, {
      headers: {
        'x-access-token': token,
      },
    });
    return response?.data;
  } catch (error) {
    console.log(error);
    throw error.response?.data;
  }
};