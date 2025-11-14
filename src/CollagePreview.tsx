import React from 'react';
import { RecommendedItem } from '../types';

interface CollagePreviewProps {
  userImage: string | null;
  recommendedItems: RecommendedItem[];
}

const CollagePreview: React.FC<CollagePreviewProps> = ({ userImage, recommendedItems }) => {
  // This component is not used in the new design. Stubbing out to prevent build errors.
  return null;
};

export default CollagePreview;
