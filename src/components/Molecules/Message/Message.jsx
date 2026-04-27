import { MessageRenderer } from '@/components/atoms/MessageRenderer/MessageRenderer';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageImage } from '@/Features/Image/components/MessageImage';

export const Message = ({
  authorImage,
  authorName,
  createdAt,
  body,
  image,
}) => {
  return (
    <div className="px-6 py-2 hover:bg-green-100/40 transition rounded-lg">
      <div className="flex items-start gap-3">
        <Avatar>
          <AvatarImage className="rounded-md" src={authorImage} />
          <AvatarFallback className="rounded-md bg-green-500 text-white text-sm">
            {authorName ? authorName.charAt(0).toUpperCase() : 'U'}
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-col w-full overflow-hidden">
          <div className="text-xs flex items-center gap-2">
            <span className="font-semibold text-gray-800">{authorName}</span>
            <span className="text-gray-500 text-[11px]">
              {createdAt || 'Just now'}
            </span>
          </div>

          <div className="text-sm text-gray-800">
            <MessageRenderer value={body} />
          </div>

          <MessageImage image={image} />
        </div>
      </div>
    </div>
  );
};
