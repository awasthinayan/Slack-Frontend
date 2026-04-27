import { useCallback, useEffect, useState } from 'react';

import {
  getCloudinarySignature,
  uploadImageToCloudinary,
} from '@/Features/Image/api/cloudinary';
import { useAuth } from '@/Hooks/Context/useAuth';

export const useMessageImageUpload = () => {
  const { auth } = useAuth();
  const [selectedImages, setSelectedImages] = useState([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState([]);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  useEffect(() => {
    if (!selectedImages.length) {
      setImagePreviewUrls([]);
      return;
    }

    const objectUrls = selectedImages.map((image) => URL.createObjectURL(image));
    setImagePreviewUrls(objectUrls);

    return () => {
      objectUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [selectedImages]);

  const addSelectedImages = useCallback((files) => {
    if (!files?.length) return;

    setSelectedImages((current) => {
      const remainingSlots = Math.max(0, 5 - current.length);
      if (!remainingSlots) return current;

      return [...current, ...files.slice(0, remainingSlots)];
    });
  }, []);

  const removeSelectedImage = useCallback((indexToRemove) => {
    setSelectedImages((current) =>
      current.filter((_, index) => index !== indexToRemove)
    );
  }, []);

  const clearSelectedImages = useCallback(() => {
    setSelectedImages([]);
  }, []);

  const uploadSelectedImage = useCallback(async () => {
    if (!selectedImages.length) return null;

    setIsUploadingImage(true);

    try {
      const signatureData = await getCloudinarySignature({
        token: auth?.token,
      });

      const uploadResponses = await Promise.all(
        selectedImages.map((file) =>
          uploadImageToCloudinary({
            file,
            signatureData,
          })
        )
      );

      return uploadResponses.map((uploadResponse) => ({
        url: uploadResponse.secure_url,
        publicId: uploadResponse.public_id,
      }));
    } finally {
      setIsUploadingImage(false);
    }
  }, [auth?.token, selectedImages]);

  return {
    selectedImages,
    imagePreviewUrls,
    isUploadingImage,
    addSelectedImages,
    removeSelectedImage,
    clearSelectedImages,
    uploadSelectedImage,
  };
};
