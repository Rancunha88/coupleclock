import type { ImageSourcePropType } from 'react-native';

const placeholderCouplePhoto = require('@/assets/images/couple-photo.jpg') as ImageSourcePropType;

/** Resolves the couple photo to display: a picked photo URI, or the bundled placeholder. */
export function getPhotoSource(photoUri: string): ImageSourcePropType {
  return photoUri ? { uri: photoUri } : placeholderCouplePhoto;
}
