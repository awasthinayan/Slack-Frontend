import { AlertTriangleIcon, Loader2Icon } from 'lucide-react';
import { useParams } from 'react-router-dom';

import { ChannelHeader } from '@/components/Molecules/Channel/ChannelHeader';
import { ChatInput } from '@/components/Molecules/ChatInput/ChatInput';
import { useGetChannelDetailsById } from '@/Hooks/Apis/Channels/useGetChannelDetails';

export const ChannelPage = () => {
  const { channelId } = useParams();

  const {
    isFetching,
    error,
    isSuccess,
    channel: channelDetails,
  } = useGetChannelDetailsById(channelId);

  if (isFetching) {
    return (
      <div className="flex items-center justify-center h-full w-full bg-[#1a1d21]">
        <div className="flex items-center gap-2">
          <Loader2Icon className="animate-spin h-5 w-5 text-white" />
          <span className="text-white text-sm font-medium">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full w-full bg-[#1a1d21] gap-2">
        <AlertTriangleIcon className="h-8 w-8 text-red-400" />
        <span className="text-red-400 text-sm font-medium">
          Failed to load channel
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full w-full bg-[#1a1d21]">
      {/* Channel Header */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-[#3d3f45] bg-[#1a1d21] shadow-sm">
        <ChannelHeader name={channelDetails.ChannelName} />

        <div className="flex items-center gap-1 text-gray-400 text-sm">
          <span>Channel ID:</span>
          <span className="text-gray-500">{channelId}</span>
        </div>
      </div>

      {/* Channel Description (if available) */}
      {channelDetails?.description && (
        <div className="px-6 py-2 bg-[#1a1d21] border-b border-[#3d3f45]">
          <p className="text-gray-400 text-sm">{channelDetails.description}</p>
        </div>
      )}

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-4">
        {/* Empty State */}
        {isSuccess && (
          <div className="flex flex-col items-center justify-center h-full gap-3 text-center">
            <div className="bg-[#2c2d30] rounded-full p-5">
              <span className="text-4xl">#</span>
            </div>
            <h2 className="text-white font-bold text-xl">
              Welcome to # {channelDetails?.ChannelName}
            </h2>
            <p className="text-gray-400 text-sm max-w-sm">
              This is the start of the{' '}
              <span className="font-semibold text-white">
                # {channelDetails?.ChannelName}
              </span>{' '}
              channel. Send a message to get started!
            </p>
          </div>
        )}
      </div>

      {/* Message Input */}
      <div className="px-4 py-4 bg-[#1a1d21] border-t border-[#3d3f45]">
        <ChatInput />
        <p className="text-xs text-gray-500 text-right mt-1">
          <strong className="text-gray-400">Shift + Enter</strong> to create a
          new line
        </p>
      </div>
    </div>
  );
};
