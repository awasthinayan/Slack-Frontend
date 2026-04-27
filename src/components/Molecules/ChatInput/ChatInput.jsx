import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useParams } from 'react-router-dom';

import { Editor } from '@/components/Atoms/Editor/Editor';
import { useMessageImageUpload } from '@/Features/Image/hooks/useMessageImageUpload';
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
  const {
    imagePreviewUrls,
    isUploadingImage,
    addSelectedImages,
    clearSelectedImages,
    removeSelectedImage,
    selectedImages,
    uploadSelectedImage,
  } = useMessageImageUpload();
  const activeRoomId = roomId || currentChannel;
  const typingDisplayName =
    auth.user?.username ||
    auth.user?.name ||
    'Someone';
  const messageRoomId = useMemo(() => {
    return conversationId || activeRoomId;
  }, [conversationId, activeRoomId]);

  const stopTyping = useCallback(() => {
    if (!socket || !messageRoomId) return;

    socket.emit('UserStoppedTyping', {
      channelId: messageRoomId,
      userId: auth.user?._id,
      userName: typingDisplayName,
    });
    isTypingRef.current = false;
  }, [auth.user?._id, messageRoomId, socket, typingDisplayName]);

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
  }, [messageRoomId, socket, stopTyping]);

  async function submitHandler({ body, plainText }) {
    if (!socket || !messageRoomId || !workspaceId) {
      console.error('Missing required data:', {
        socket: !!socket,
        currentChannel: messageRoomId,
        workspaceId,
      });
      return false;
    }

    if (!plainText && !selectedImages.length) {
      return false;
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

    try {
      const uploadedImage = await uploadSelectedImage();

      const response = await new Promise((resolve) => {
        socket.emit(
          'NewMessage',
          {
            ...messagePayload,
            body,
            image: uploadedImage,
            WorkspaceId: workspaceId,
            SenderId: auth.user?._id,
          },
          (data) => {
            resolve(data);
          }
        );
      });

      if (!response?.success) {
        console.error('Failed to send message', response);
        return false;
      }

      console.log('Successfully sent message', response);
      stopTyping();
      if (typingTimerRef.current) {
        clearTimeout(typingTimerRef.current);
        typingTimerRef.current = null;
      }
      clearSelectedImages();
      return true;
    } catch (error) {
      console.error('Error while sending message', error);
      return false;
    }
  }

  return (
    <div className="w-full">
      <Editor
        variant="create"
        onSubmit={submitHandler}
        onTextChange={handleTextChange}
        placeholder="Type your message here..."
        imagePreviewUrls={imagePreviewUrls}
        isUploadingImage={isUploadingImage}
        onImageSelect={addSelectedImages}
        onRemoveImage={removeSelectedImage}
      />
    </div>
  );
};
