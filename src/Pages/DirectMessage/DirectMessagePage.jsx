import { ArrowLeft, Info, MessagesSquare } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ChatInput } from '@/components/Molecules/ChatInput/ChatInput';
import { Message } from '@/components/Molecules/Message/Message';
import { Button } from '@/components/ui/button';
import { useGetDirectMessages } from '@/Hooks/Apis/DM/useGetDirectMessages';
import { useGetMemberById } from '@/Hooks/Apis/Members/useGetMemberById';
import { useAuth } from '@/Hooks/Context/useAuth';
import { useSocket } from '@/Hooks/Context/useSocket';

export const DirectMessagePage = () => {
  const { workspaceId, memberId } = useParams();
  const navigate = useNavigate();
  const { auth } = useAuth();
  const { joinChannel, setCurrentChannel, socket } = useSocket();
  const [typingUsers, setTypingUsers] = useState({});
  const messageEndRef = useRef(null);

  const { member } = useGetMemberById(memberId);
  const { isFetching, messages, conversationId } = useGetDirectMessages(
    workspaceId,
    memberId
  );

  const typingNames = useMemo(() => Object.values(typingUsers), [typingUsers]);
  const displayName =
    member?.username || member?.name || member?.email || 'Unknown member';

  useEffect(() => {
    if (String(memberId) === String(auth?.user?._id)) {
      navigate(`/workspace/${workspaceId}`, { replace: true });
    }
  }, [auth?.user?._id, memberId, navigate, workspaceId]);

  useEffect(() => {
    if (!conversationId) return;
    joinChannel(conversationId);
    setCurrentChannel(conversationId);
  }, [conversationId, joinChannel, setCurrentChannel]);

  useEffect(() => {
    if (!socket || !conversationId) return;

    const handleTypingStart = ({
      channelId: activeChannelId,
      userId,
      userName,
    }) => {
      if (activeChannelId !== conversationId) return;
      const key = userId || userName;
      if (!key) return;

      setTypingUsers((current) => ({
        ...current,
        [key]: userName || 'Someone',
      }));
    };

    const handleTypingStop = ({
      channelId: activeChannelId,
      userId,
      userName,
    }) => {
      if (activeChannelId !== conversationId) return;
      const key = userId || userName;
      if (!key) return;

      setTypingUsers((current) => {
        const next = { ...current };
        delete next[key];
        return next;
      });
    };

    socket.on('UserTyping', handleTypingStart);
    socket.on('UserStoppedTyping', handleTypingStop);

    return () => {
      socket.off('UserTyping', handleTypingStart);
      socket.off('UserStoppedTyping', handleTypingStop);
    };
  }, [socket, conversationId]);

  useEffect(() => {
    const timer = setTimeout(() => {
      messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
    return () => clearTimeout(timer);
  }, [messages]);

  if (isFetching || !conversationId) {
    return (
      <div className="flex h-full items-center justify-center bg-green-50">
        <div className="animate-pulse text-green-600 font-medium">
          Loading conversation...
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col bg-green-50 text-gray-800">
      <header className="flex items-center justify-between border-b border-green-200/50 bg-green-100/60 px-6 py-3 backdrop-blur">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="iconSm"
            onClick={() => navigate(`/workspace/${workspaceId}`)}
            className="rounded-lg"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-200">
              <MessagesSquare className="h-5 w-5 text-green-700" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-green-800">
                {displayName}
              </h1>
              <p className="text-xs text-green-700">Direct message</p>
            </div>
          </div>
        </div>
        <button className="rounded-lg p-2 transition hover:bg-green-200">
          <Info className="h-5 w-5 text-green-700" />
        </button>
      </header>

      <div className="flex flex-1 flex-col overflow-y-auto custom-scrollbar">
        <div className="flex flex-1 flex-col justify-end px-2 pb-1">
          {messages?.length ? (
            [...messages]
              .reverse()
              .map((message) => (
                <Message
                  key={message._id}
                  body={message.body}
                  authorImage={message.SenderId?.avatar}
                  authorName={message.SenderId?.username || 'Unknown User'}
                  createdAt={message.createdAt}
                />
              ))
          ) : (
            <div className="px-6 py-6 text-sm text-green-700">
              Say hello to {displayName}.
            </div>
          )}
          <div ref={messageEndRef} />
        </div>
      </div>

      <footer className="px-4 py-1.5 bg-transparent">
        <div className="mb-0.5 min-h-5 px-1">
          {typingNames.length > 0 && (
            <div className="flex items-center gap-3 rounded-xl border border-green-200 bg-white/80 px-3 py-1 text-sm text-green-800 shadow-sm backdrop-blur">
              <div
                className="flex shrink-0 items-center gap-1.5"
                aria-hidden="true"
              >
                <span className="h-2 w-2 rounded-full bg-green-500 animate-bounce" />
                <span
                  className="h-2 w-2 rounded-full bg-green-500 animate-bounce"
                  style={{ animationDelay: '120ms' }}
                />
                <span
                  className="h-2 w-2 rounded-full bg-green-500 animate-bounce"
                  style={{ animationDelay: '240ms' }}
                />
              </div>
              <span className="min-w-0 truncate font-medium">
                {typingNames.length === 1
                  ? `${typingNames[0]} is typing`
                  : `${typingNames[0]} and ${typingNames.length - 1} others are typing`}
              </span>
            </div>
          )}
        </div>

        <ChatInput
          roomId={conversationId}
          isDirect
          recipientId={memberId}
          conversationId={conversationId}
        />
        <p className="mt-0.5 ml-1 text-[10px] italic text-green-600">
          <strong>Shift + Enter</strong> for new line • Markdown supported
        </p>
      </footer>
    </div>
  );
};
