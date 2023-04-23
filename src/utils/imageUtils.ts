import { StoreImageTypes, StoreImageFormatTypes } from '../types';

const getImageObject = (img: StoreImageTypes, boxWidth?: number): StoreImageFormatTypes => {
  if (!img || !img.responsive) return img;
  const { large, medium, small, thumbnail } = img.responsive;

  let scaleRatio = 1;
  if (img.width && img.height && !boxWidth) {
    scaleRatio = img.width > img.height ? img.height / img.width : img.width / img.height;
  }

  let currentWidth = 0;
  if (boxWidth) {
    currentWidth = boxWidth;
  } else if (!boxWidth && typeof window === 'object') {
    currentWidth = window.innerWidth;
  }

  if (scaleRatio !== 1) currentWidth /= scaleRatio;
  const largeSize = 1000;
  const mediumSize = 750;
  const smallSize = 500;
  const thumbSize = 250;

  if (currentWidth === 0) return null;
  if (currentWidth > largeSize) return img;

  if (
    Math.max(largeSize, currentWidth) === largeSize &&
    Math.min(mediumSize, currentWidth) === mediumSize
  ) {
    return large || img;
  }

  if (
    Math.max(mediumSize, currentWidth) === mediumSize &&
    Math.min(smallSize, currentWidth) === smallSize
  ) {
    return medium || img;
  }

  if (
    Math.max(smallSize, currentWidth) === smallSize &&
    Math.min(thumbSize, currentWidth) === thumbSize
  ) {
    return small || img;
  }

  if (currentWidth < thumbSize) {
    return thumbnail || img;
  }
};

export const getImageUrl = (img: StoreImageTypes, boxWidth?: number): string => {
  const imageObj = getImageObject(img, boxWidth);
  if (!imageObj) return null;

  return imageObj.url;
};
