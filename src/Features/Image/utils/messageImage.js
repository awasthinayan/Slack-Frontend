export const getMessageImageItems = (image) => {
  if (!image) return [];

  if (Array.isArray(image)) {
    return image
      .map((item) => {
        if (typeof item === 'string') {
          return { url: item, publicId: null };
        }

        if (item?.url) {
          return {
            url: item.url,
            publicId: item.publicId || null,
          };
        }

        return null;
      })
      .filter(Boolean);
  }

  if (typeof image === 'string') {
    return [{ url: image, publicId: null }];
  }

  if (image?.url) {
    return [{ url: image.url, publicId: image.publicId || null }];
  }

  return [];
};

export const getMessageImageUrl = (image) => {
  return getMessageImageItems(image)[0]?.url || '';
};

export const getImageCollageClasses = (count) => {
  if (count <= 1) {
    return {
      wrapper: 'flex',
      item: 'w-[220px]',
      image: 'h-[150px] w-[220px]',
    };
  }

  if (count === 2) {
    return {
      wrapper: 'grid grid-cols-2 gap-2 max-w-[360px]',
      item: 'w-full',
      image: 'h-[140px] w-full',
    };
  }

  if (count === 3) {
    return {
      wrapper: 'grid grid-cols-2 gap-2 max-w-[360px]',
      item: 'w-full',
      image: 'h-[110px] w-full',
      itemClassesByIndex: ['col-span-2', '', ''],
    };
  }

  if (count === 4) {
    return {
      wrapper: 'grid grid-cols-2 gap-2 max-w-[360px]',
      item: 'w-full',
      image: 'h-[110px] w-full',
    };
  }

  return {
    wrapper: 'grid grid-cols-6 gap-2 max-w-[360px]',
    item: 'w-full',
    image: 'h-[104px] w-full',
    itemClassesByIndex: [
      'col-span-3',
      'col-span-3',
      'col-span-2',
      'col-span-2',
      'col-span-2',
    ],
  };
};
