
import { Info } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import { ChannelHeader } from '@/components/Molecules/Channel/ChannelHeader';
import { ChatInput } from '@/components/Molecules/ChatInput/ChatInput';
import { Message } from '@/components/Molecules/Message/Message';
import { useGetChannelDetailsById } from '@/Hooks/Apis/Channels/useGetChannelDetails';
import { useGetChannelsMessage } from '@/Hooks/Apis/Channels/useGetChannelsMessage';
import { useSocket } from '@/Hooks/Context/useSocket';

export const ChannelPage = () => {
  const { channelId } = useParams();
  const { joinChannel, setCurrentChannel, socket } = useSocket();
  const [typingUsers, setTypingUsers] = useState({});
  const messageEndRef = useRef(null);

  const {
    isFetching,
    error,
    channel: channelDetails,
  } = useGetChannelDetailsById(channelId);
  const { messages, isSuccess: isMessageSuccess } =
    useGetChannelsMessage(channelId);

  const typingNames = useMemo(() => Object.values(typingUsers), [typingUsers]);

  useEffect(() => {
    if (!isFetching && !error) {
      joinChannel(channelId);
      setCurrentChannel(channelId);
    }
  }, [isFetching, error, joinChannel, channelId, setCurrentChannel]);

  useEffect(() => {
    if (!socket || !channelId) return;

    const handleTypingStart = ({
      channelId: activeChannelId,
      userId,
      userName,
    }) => {
      if (activeChannelId !== channelId) return;

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
      if (activeChannelId !== channelId) return;

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
  }, [socket, channelId]);

  useEffect(() => {
    const timer = setTimeout(() => {
      messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
    return () => clearTimeout(timer);
  }, [messages]);

  if (isFetching) {
    return (
      <div className="flex-1 flex items-center justify-center bg-green-50">
        <div className="animate-pulse text-green-600 font-medium">
          Loading channel...
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col bg-green-50 text-gray-800">
      <header className="flex items-center justify-between border-b border-green-200/50 bg-green-100/60 px-6 py-3 backdrop-blur">
        <ChannelHeader name={channelDetails?.ChannelName} />
        <button className="rounded-lg p-2 transition hover:bg-green-200">
          <Info className="h-5 w-5 text-green-700" />
        </button>
      </header>

      <div className="flex flex-1 flex-col overflow-y-auto custom-scrollbar">
        <div className="mb-1 flex flex-col gap-2 p-6">

          <h1 className="text-lg font-semibold text-green-800">
            Welcome to #{channelDetails?.ChannelName}
          </h1>

          <p className="text-sm text-green-700">
            {channelDetails?.description ||
              `This is the start of the #${channelDetails?.ChannelName} channel.`}
          </p>

          <hr className="mt-2 border-green-200" />
        </div>

        <div className="flex flex-1 flex-col justify-end px-2 pb-1">
          {isMessageSuccess &&
            [...messages]
              .reverse()
              .map((message) => (
                <Message
                  key={message._id}
                  body={message.body}
                  image={message.image}
                  authorImage={message.SenderId?.avatar}
                  authorName={message.SenderId?.username || 'Unknown User'}
                  createdAt={message.createdAt}
                />
              ))}
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
                <span
                  className="h-2 w-2 rounded-full bg-green-500 animate-bounce"
                  style={{ animationDelay: '0ms' }}
                />
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

        <ChatInput />
        <p className="mt-0.5 ml-1 text-[10px] italic text-green-600">
          <strong>Shift + Enter</strong> for new line â€¢ Markdown supported
        </p>
      </footer>
    </div>
  );
};
