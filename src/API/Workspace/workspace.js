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
    // console.log('Response for create workspace', response);
    return response?.data;
  } catch (error) {
    console.log(error);
    throw error.response?.data;
  }
};

export const fetchWorkspaceRequest = async ({ token }) => {
  
  try {
    const response = await axios.get(
      '/workspaces/fetchAllWorkspaceByMemberId',
      {
        headers: {
          'x-access-token': token,
        },
      }
    );
    // console.log('Response for fetch workspace by member id', response);
    return response?.data.data;
  } catch (error) {
    console.log(error.response);
    throw error.response?.data;
  }
};

export const getWorkspaceDetails = async (workspaceId, token) => {
  try {
    const response = await axios.get(`/workspaces/${workspaceId}`, {
      headers: {
        'x-access-token': token,
      },
    });
    // console.log('Response for fetch workspace details', response);
    return response?.data.data;
  } catch (error) {
    console.log(error);
    throw {
      ...error.response?.data,
      httpStatus: error.response?.status,
    };
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
    // console.log('Response for update workspace', response);
    return response?.data;
  } catch (error) {
    console.log(error);
    throw error.response?.data;
  }
};

export const deleteWorkspaceRequest = async ({ workspaceId, token }) => {
  try {
    const response = await axios.delete(
      `/workspaces/deleteWorkspace/${workspaceId}`,
      {
        headers: {
          'x-access-token': token,
        },
      }
    );
    // console.log('Workspace Deleted Successfully', response);
    return response?.data;
  } catch (error) {
    console.log(error);
    throw error.response?.data;
  }
};

export const addMemberToWorkspaceRequest = async ({
  workspaceId,
  memberId,
  role,
  token,
}) => {
  try {
    const response = await axios.put(
      `/workspaces/addMemberToWorkspace/${workspaceId}`,
      { memberId, role },
      {
        headers: {
          'x-access-token': token,
        },
      }
    );
    // console.log('Response for add member to workspace', response);
    return response?.data;
  } catch (error) {
    console.log(error);
    throw {
      ...error.response?.data,
      httpStatus: error.response?.status,
    };
  }
};

export const resetJoinCodeRequest = async ({ workspaceId, token }) => {
  try {
    const response = await axios.put(
      `/workspaces/${workspaceId}/joinCode/reset`,
      {},
      {
        headers: {
          'x-access-token': token,
        },
      }
    );
    return response?.data;
  } catch (error) {
    throw {
      ...error.response?.data,
      httpStatus: error.response?.status,
    };
  }
};

export const joinWorkspaceByCodeRequest = async ({
  workspaceId,
  joinCode,
  token,
}) => {
  try {
    const response = await axios.put(
      `/workspaces/${workspaceId}/joinCode/${joinCode}`,
      {},
      {
        headers: {
          'x-access-token': token,
        },
      }
    );
    return response?.data;
  } catch (error) {
    throw {
      ...error.response?.data,
      httpStatus: error.response?.status,
    };
  }
};
