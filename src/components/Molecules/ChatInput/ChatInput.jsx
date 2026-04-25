import { useEffect, useMemo, useRef } from 'react';
import { useParams } from 'react-router-dom';

import { Editor } from '@/components/Atoms/Editor/Editor';
import { useAuth } from '@/Hooks/Context/useAuth';
import { useSocket } from '@/Hooks/Context/useSocket';

export const ChatInput = ({
  roomId,
  isDirect = false,
  recipientId = null,
  conversationId = null,
}) => {
  const { workspaceId } = useParams();
  const { socket, currentChannel } = useSocket();
  const { auth } = useAuth();
  const typingTimerRef = useRef(null);
  const isTypingRef = useRef(false);
  const activeRoomId = roomId || currentChannel;
  const typingDisplayName =
    auth.user?.username ||
    auth.user?.name ||
    'Someone';
  const messageRoomId = useMemo(() => {
    return conversationId || activeRoomId;
  }, [conversationId, activeRoomId]);

  const stopTyping = () => {
    if (!socket || !messageRoomId) return;

    socket.emit('UserStoppedTyping', {
      channelId: messageRoomId,
      userId: auth.user?._id,
      userName: typingDisplayName,
    });
    isTypingRef.current = false;
  };

  const handleTextChange = (text) => {
    if (!socket || !messageRoomId || !workspaceId) return;

    const hasText = Boolean(text?.length);

    if (!hasText) {
      if (typingTimerRef.current) {
        clearTimeout(typingTimerRef.current);
        typingTimerRef.current = null;
      }

      if (isTypingRef.current) {
        stopTyping();
      }
      return;
    }

    if (!isTypingRef.current) {
      socket.emit('UserTyping', {
        channelId: messageRoomId,
        userId: auth.user?._id,
        userName: typingDisplayName,
      });
      isTypingRef.current = true;
    }

    if (typingTimerRef.current) {
      clearTimeout(typingTimerRef.current);
    }

    typingTimerRef.current = setTimeout(() => {
      stopTyping();
      typingTimerRef.current = null;
    }, 1200);
  };

  useEffect(() => {
    return () => {
      if (typingTimerRef.current) {
        clearTimeout(typingTimerRef.current);
      }
      stopTyping();
    };
  }, [messageRoomId, socket]);

  async function submitHandler({ body }) {
    if (!socket || !messageRoomId || !workspaceId) {
      console.error('Missing required data:', {
        socket: !!socket,
        currentChannel: messageRoomId,
        workspaceId,
      });
      return;
    }

    const messagePayload = isDirect
      ? {
          conversationId: messageRoomId,
          RecipientId: recipientId,
          isDirect: true,
        }
      : {
          channelId: messageRoomId,
          isDirect: false,
        };

    socket.emit(
      'NewMessage',
      {
        ...messagePayload,
        body: body,
        WorkspaceId: workspaceId,
        SenderId: auth.user?._id,
      },
      (data) => {
        console.log('Successfully sent message', data);
        stopTyping();
        if (typingTimerRef.current) {
          clearTimeout(typingTimerRef.current);
          typingTimerRef.current = null;
        }
      }
    );
  }

  return (
    <div className="w-full">
      <Editor
        variant="create"
        onSubmit={submitHandler}
        onTextChange={handleTextChange}
        placeholder="Type your message here..."
      />
    </div>
  );
};
