import React from 'react';
import { ImamRecommendation } from '../types';

interface ResultDisplayProps {
  recommendation: ImamRecommendation | null;
  isLoading: boolean;
}

const LoadingSpinner: React.FC = () => (
    <div className="flex flex-col items-center justify-center h-full min-h-[500px] text-center bg-[#1c1c1c] rounded-xl p-8">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#d4af37]"></div>
        <p className="mt-6 text-xl text-gray-200 font-semibold">Crafting your signature look...</p>
        <p className="text-sm text-gray-400 mt-2">Our AI stylist is analyzing your profile to curate the perfect outfits.</p>
    </div>
);

const WelcomeMessage: React.FC = () => (
    <div className="flex items-center justify-center h-full min-h-[500px] bg-[#1c1c1c] rounded-xl p-8 text-center">
        <div>
            <h2 className="text-3xl font-bold text-[#d4af37]">Your Personal Style Studio</h2>
            <p className="mt-4 text-lg text-gray-300">Complete your style profile on the left and let our AI stylist create a look that's uniquely you.</p>
        </div>
    </div>
);

const DetailCard: React.FC<{ title: string; children: React.ReactNode; className?: string }> = ({ title, children, className }) => (
    <div className={`bg-black bg-opacity-20 p-4 rounded-lg h-full ${className}`}>
      <h4 className="font-semibold text-[#d4af37] text-md mb-2">{title}</h4>
      <div className="text-gray-300 text-sm leading-relaxed">{children}</div>
    </div>
);

const ResultDisplay: React.FC<ResultDisplayProps> = ({ recommendation, isLoading }) => {
  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!recommendation) {
    return <WelcomeMessage />;
  }
  
  const {
    ui_instructions,
    analysis,
    main_outfit,
    festival_details,
    alternatives
  } = recommendation;
  
  const imageUrl = main_outfit.generated_image_base64 
    ? `data:image/jpeg;base64,${main_outfit.generated_image_base64}` 
    : null;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl md:text-4xl font-bold text-white text-center md:text-left">{main_outfit.title}</h1>
      
      {/* Main Section: Image + Analysis */}
      <div className="flex flex-col lg:flex-row gap-6 bg-[#1c1c1c] p-6 rounded-xl shadow-2xl shadow-black/30">
        {imageUrl && (
          <div className="flex-shrink-0">
            <img 
              src={imageUrl} 
              alt="Generated outfit"
              className="imam-image"
            />
          </div>
        )}
        <div className="flex-grow space-y-4">
            <DetailCard title="Stylist's Analysis">
              <p><strong className='text-gray-200'>Skin Tone:</strong> {analysis.skin_tone_detected}</p>
              <p><strong className='text-gray-200'>Face Shape:</strong> {analysis.face_shape}</p>
              <p><strong className='text-gray-200'>Body Observation:</strong> {analysis.body_observation}</p>
              <p className="mt-2 italic">"{analysis.notes}"</p>
            </DetailCard>
             <DetailCard title="Outfit Description">{main_outfit.description}</DetailCard>
        </div>
      </div>

      {/* Alternatives - MOVED UP */}
      <div>
        <h3 className="text-2xl font-bold text-white mb-4 text-center md:text-left">Alternative Styles</h3>
        <div className="flex flex-col md:flex-row flex-wrap gap-6 justify-center">
            {alternatives.map(alt => (
                 <div key={alt.style} className="flex-1 min-w-[200px]">
                    <DetailCard title={alt.style.charAt(0).toUpperCase() + alt.style.slice(1)}>
                        <p>{alt.outfit}</p>
                    </DetailCard>
                 </div>
            ))}
        </div>
      </div>

      {/* Outfit Details Section */}
      <div className="bg-[#1c1c1c] p-6 rounded-xl">
        <h3 className="text-2xl font-bold text-white mb-4 text-center md:text-left">The Look</h3>
        <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[150px]"><DetailCard title="Top">{main_outfit.top}</DetailCard></div>
            <div className="flex-1 min-w-[150px]"><DetailCard title="Bottom">{main_outfit.bottom}</DetailCard></div>
            <div className="flex-1 min-w-[150px]"><DetailCard title="Footwear">{main_outfit.footwear}</DetailCard></div>
            {main_outfit.layer && <div className="flex-1 min-w-[150px]"><DetailCard title="Layer">{main_outfit.layer}</DetailCard></div>}
            <div className="flex-1 min-w-[150px]"><DetailCard title="Hairstyle">{main_outfit.hairstyle}</DetailCard></div>
            <div className="flex-1 min-w-[150px]"><DetailCard title="Grooming">{main_outfit.grooming}</DetailCard></div>
        </div>
         <div className="mt-4">
             <DetailCard title="Accessories">{main_outfit.accessories.join(', ')}</DetailCard>
         </div>
      </div>
      
      {/* Rationale and Festival Details */}
      <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1"><DetailCard title="Why This Look Works">{main_outfit.why_this_look_works}</DetailCard></div>
          {festival_details.enabled && <div className="flex-1"><DetailCard title="Festival Styling">{festival_details.details}</DetailCard></div>}
      </div>
    </div>
  );
};

export default ResultDisplay;