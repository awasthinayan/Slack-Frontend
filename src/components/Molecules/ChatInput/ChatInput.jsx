import { useParams } from 'react-router-dom';

import { Editor } from '@/components/Atoms/Editor/Editor';
import { useAuth } from '@/Hooks/Context/useAuth';
import { useSocket } from '@/Hooks/Context/useSocket';

export const ChatInput = () => {
  const { workspaceId } = useParams();
  const { socket, currentChannel } = useSocket();
  const { auth } = useAuth();

  async function submitHandler({ body }) {
    if (!socket || !currentChannel || !workspaceId) {
      console.error('Missing required data:', {
        socket: !!socket,
        currentChannel,
        workspaceId,
      });
      return;
    }

    socket.emit(
      'NewMessage',
      {
        channelId: currentChannel,
        body: body,
        WorkspaceId: workspaceId,
        SenderId: auth.user._id,
      },
      (data) => {
        console.log('Successfully sent message', data);
      }
    );
  }

  return (
    <div className="w-full">
      <Editor
        variant="create"
        onSubmit={submitHandler}
        placeholder="Type your message here..."
      />
    </div>
  );
};
