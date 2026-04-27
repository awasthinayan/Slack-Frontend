import { ImagePlus, X } from 'lucide-react';

import { getImageCollageClasses } from '@/Features/Image/utils/messageImage';

export const SelectedImagePreview = ({
  imagePreviewUrls,
  canAddMoreImages,
  onAddMoreImages,
  onRemoveImage,
}) => {
  if (!imagePreviewUrls?.length) return null;

  const collage = getImageCollageClasses(imagePreviewUrls.length);

  return (
    <div className="border-b border-green-100/60 bg-[#e9f8ee] p-3">
      <div className="overflow-hidden rounded-xl bg-[#dff3e5] p-4">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-sm font-medium text-green-900">
            {imagePreviewUrls.length}/5 images selected
          </span>

          <button
            type="button"
            onClick={onAddMoreImages}
            disabled={!canAddMoreImages}
            className="rounded-full bg-white/90 p-2 text-green-700 shadow-sm transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
            aria-label="Add more images"
          >
            <ImagePlus className="h-4 w-4" />
          </button>
        </div>

        <div className={collage.wrapper} >
          {imagePreviewUrls.map((imageUrl, index) => (
            <div
              key={`${imageUrl}-${index}`}
              className={`relative overflow-hidden rounded-xl bg-white/55 ${collage.item} ${collage.itemClassesByIndex?.[index] || ''}`}
            >
              <button
                type="button"
                onClick={() => onRemoveImage(index)}
                className="absolute right-2 top-2 z-10 rounded-full bg-black/50 p-1.5 text-white transition hover:bg-black/40 cursor-pointer"
                aria-label={`Remove selected image ${index + 1}`}
              >
                <X className="h-4 w-4" />
              </button>

              <img
                src={imageUrl}
                alt={`Selected upload preview ${index + 1}`}
                className={`${collage.image} object-cover`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
