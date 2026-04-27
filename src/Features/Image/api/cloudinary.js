import axios from '@/Config/Axios.Config';

export const getCloudinarySignature = async ({ token }) => {
  try {
    const response = await axios.get('/messages/cloudinary-Signature', {
      headers: {
        'x-access-token': token,
      },
    });

    return response?.data?.data;
  } catch (error) {
    console.log('Error while fetching Cloudinary signature', error);
    throw error.response?.data || error;
  }
};

export const uploadImageToCloudinary = async ({ file, signatureData }) => {
  const cloudName =
    signatureData?.cloudName || import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const apiKey = signatureData?.apiKey || import.meta.env.VITE_CLOUDINARY_API_KEY;

  if (!cloudName || !apiKey || !signatureData?.timestamp || !signatureData?.signature) {
    throw new Error('Missing Cloudinary upload configuration');
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('api_key', apiKey);
  formData.append('timestamp', String(signatureData.timestamp));
  formData.append('signature', signatureData.signature);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: 'POST',
      body: formData,
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.error?.message || 'Cloudinary upload failed');
  }

  return data;
};
