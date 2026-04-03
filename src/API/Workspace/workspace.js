import axios from '@/Config/Axios.Config';

export const createWorkspaceRequest = async ({
  name,
  workspaceName,
  description,
  token,
}) => {
  try {
    const response = await axios.post(
      '/workspaces/createWorkspace',
      { workspaceName: workspaceName ?? name, description },
      {
        headers: {
          'x-access-token': token,
        },
      }
    );
    console.log('Response for create workspace', response);
    return response?.data;
  } catch (error) {
    console.log(error);
    throw error.response?.data;
  }
};

export const fetchWorkspaceRequest = async ({ token }) => {
  try {
    const response = await axios.get('/workspaces/fetchAllWorkspaceByMemberId', {
      headers: {
        'x-access-token': token,
      },
    });
    console.log('Response for fetch workspace', response);
    return response?.data.data;
  } catch (error) {
    console.log(error);
    throw error.response?.data;
  }
};

export const getWorkspaceDetails = async (workspaceId, token ) => {
  try {
   const response = await axios.get(`/workspaces/${workspaceId}`, {
      headers: {
        'x-access-token': token,
      },
    });
    console.log('Response for fetch workspace', response);
    return response?.data.data;
  } catch (error) {
    console.log(error);
    throw error.response?.data;
  }
};

export const updateWorkspaceRequest = async ({
  workspaceId,
  workspaceName,
  description,
  token,
}) => {
  try {
    const response = await axios.put(
      `/workspaces/updateWorkspace/${workspaceId}`,
      { workspaceName, description },
      {
        headers: {
          'x-access-token': token,
        },
      }
    );
    console.log('Response for update workspace', response);
    return response?.data;
  } catch (error) {
    console.log(error);
    throw error.response?.data;
  }
};
