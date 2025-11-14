import React from 'react';
import { OutfitOption } from '../types';

interface ResultCardProps {
  recommendation: OutfitOption;
}

const ResultCard: React.FC<ResultCardProps> = ({ recommendation }) => {
  // This component is not used in the new design. Stubbing out to prevent build errors.
  return null;
};

export default ResultCard;
