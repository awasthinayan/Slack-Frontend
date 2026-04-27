import { Expand } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  getImageCollageClasses,
  getMessageImageItems,
} from '@/Features/Image/utils/messageImage';

export const MessageImage = ({ image }) => {
  const imageItems = getMessageImageItems(image);

  if (!imageItems.length) return null;

  const collage = getImageCollageClasses(imageItems.length);

  return (
    <div className={`mt-2 ${collage.wrapper}`}>
      {imageItems.map((item, index) => (
        <Dialog key={`${item.url}-${index}`}>
          <DialogTrigger asChild>
            <button
              type="button"
              className={`group relative block overflow-hidden rounded-sm bg-transparent text-left shadow-sm transition hover:shadow-md cursor-pointer ${collage.item} ${collage.itemClassesByIndex?.[index] || ''}`}
              aria-label={`Open shared image ${index + 1}`}
            >
              <img
                src={item.url}
                alt={`Shared message attachment ${index + 1}`}
                className={`block rounded-sm object-cover ${collage.image}`}
              />
              <span className="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-black/60 px-2 py-1 text-[11px] font-medium text-white opacity-0 transition group-hover:opacity-100 cursor-pointer">
                <Expand className="h-3.5 w-3.5" />
                View
              </span>
            </button>
          </DialogTrigger>

          <DialogContent
            showCloseButton={false}
            className="flex w-auto max-w-none items-center justify-center border-0 bg-transparent p-0 shadow-none ring-0 cursor-pointer"
          >
            <div className="flex items-center justify-center">
              <img
                src={item.url}
                alt={`Expanded shared attachment ${index + 1}`}
                className="h-auto w-[920px] max-w-[98vw] rounded-sm object-contain cursor-pointer"
              />
            </div>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
};
