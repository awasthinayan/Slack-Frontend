import { Hash, Info } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

import { ChannelHeader } from '@/components/Molecules/Channel/ChannelHeader';
import { ChatInput } from '@/components/Molecules/ChatInput/ChatInput';
import { Message } from '@/components/Molecules/Message/Message';
import { useGetChannelDetailsById } from '@/Hooks/Apis/Channels/useGetChannelDetails';
import { useGetChannelsMessage } from '@/Hooks/Apis/Channels/useGetChannelsMessage';
import { useSocket } from '@/Hooks/Context/useSocket';

export const ChannelPage = () => {
  const { channelId } = useParams();
  const { joinChannel, setCurrentChannel } = useSocket();
  const messageEndRef = useRef(null);

  const {
    isFetching,
    error,
    channel: channelDetails,
  } = useGetChannelDetailsById(channelId);

  const { messages, isSuccess: isMessageSuccess } =
    useGetChannelsMessage(channelId);

  useEffect(() => {
    if (!isFetching && !error) {
      joinChannel(channelId);
      setCurrentChannel(channelId);
    }
  }, [isFetching, error, joinChannel, channelId, setCurrentChannel]);

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
    <div className="flex flex-col h-full w-full bg-green-50 text-gray-800">
      
      {/* HEADER */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-green-200 bg-green-100 shadow-sm">
        <div className="flex flex-col">
          <ChannelHeader name={channelDetails?.ChannelName} />
        </div>

        <button className="p-2 rounded-lg hover:bg-green-200 transition">
          <Info className="h-5 w-5 text-green-700" />
        </button>
      </header>

      {/* MESSAGES AREA */}
      <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col">
        
        {/* WELCOME SECTION */}
        <div className="p-8 mb-4 flex flex-col gap-3">
          <div className="h-16 w-16 bg-green-200 rounded-xl flex items-center justify-center">
            <Hash className="h-10 w-10 text-green-700" />
          </div>

          <h1 className="text-2xl font-bold text-green-800">
            Welcome to #{channelDetails?.ChannelName} 🌿
          </h1>

          <p className="text-green-700 text-sm">
            {channelDetails?.description ||
              `This is the start of the #${channelDetails?.ChannelName} channel.`}
          </p>

          <hr className="mt-3 border-green-200" />
        </div>

        {/* MESSAGE LIST */}
        <div className="flex flex-col gap-1 px-2 pb-4">
          {isMessageSuccess &&
            [...messages].reverse().map((message) => (
              <div
                key={message._id}
                className="px-6 py-2 hover:bg-green-100/30 transition"
              >
                <Message
                  body={message.body}
                  authorImage={message.SenderId?.avatar}
                  authorName={message.SenderId?.username || 'Unknown User'}
                  createdAt={message.createdAt}
                />
              </div>
            ))}
          <div ref={messageEndRef} />
        </div>
      </div>

      {/* FOOTER */}
      <footer className="px-5 py-4 bg-green-100 border-t border-green-200">
        <div className="max-w-[100%] mx-auto bg-white rounded-xl shadow p-3">
          <ChatInput />

          <p className="text-[10px] text-green-600 mt-2 ml-1 italic">
            <strong>Shift + Enter</strong> for new line • Use Markdown for code
            blocks
          </p>
        </div>
      </footer>
    </div>
  );
};