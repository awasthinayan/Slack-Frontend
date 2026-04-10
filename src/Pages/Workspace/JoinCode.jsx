import { useState } from 'react';
import OtpInput from 'react-otp-input';
import { useNavigate, useParams } from 'react-router-dom'; // ✅ CHANGE HERE

import { Button } from '@/components/ui/button';
import { useJoinWorkspaceRequest } from '@/Hooks/Apis/Workspaces/useJoinWorkspaceByCode';
import { useAuth } from '@/Hooks/Context/useAuth';
import { useToast } from '@/Hooks/Context/useToast';

export const JoinPage = () => {
  const { showToast } = useToast();

  const { workspaceId } = useParams(); // ✅ GET FROM PARAMS

  const { joinWorkspaceMutation } = useJoinWorkspaceRequest();
  const { auth } = useAuth(); // ✅ FIXED

  const navigate = useNavigate();

  console.log('auth', auth);
  console.log('workspaceId', workspaceId);
  console.log('auth?.user?._id', auth?.user?._id);

  const [code, setCode] = useState('');

  const handleJoin = async (joinCode) => {
    if (!joinCode) {
      showToast({
        title: 'Error',
        description: 'Please enter join code',
        type: 'error',
      });
      return;
    }

    try {
      await joinWorkspaceMutation({
        workspaceId,
        joinCode,
        token: auth?.token,
      });

      showToast({
        title: 'Success',
        description: 'Joined workspace successfully',
        type: 'success',
      });

      navigate(`/workspace/${workspaceId}`);
    } catch (error) {
      console.error(error);
      showToast({
        title: 'Error',
        description: error?.message || 'Unable to join workspace',
        type: 'error',
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-4">
      <div className="w-full max-w-md p-8 rounded-2xl shadow-lg bg-white border border-gray-200">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Join Workspace
        </h2>

        <p className="text-sm text-gray-500 text-center mt-1 mb-6">
          Enter the invite code to join your team
        </p>

        <div className="flex justify-center">
          <OtpInput
            value={code}
            onChange={setCode}
            numInputs={8}
            renderInput={(props) => <input {...props} />}
            containerStyle="flex gap-3 items-center"
            inputStyle="w-20 h-12 border border-gray-300 rounded-md text-center text-lg font-semibold"
          />
        </div>

        <Button
          className="w-full mt-8 py-5 text-base cursor-pointer font-semibold rounded-xl bg-blue-600 hover:bg-blue-700"
          onClick={() => handleJoin(code)}
        >
          Join Workspace
        </Button>
      </div>
    </div>
  );
};
