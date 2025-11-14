import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import InputPanel from '../components/InputPanel';
import ResultDisplay from '../components/ResultDisplay';
import { ImamRecommendation, UserInputs } from '../types';

interface AppPageProps {
  onNewRecommendation: (response: ImamRecommendation, inputs: UserInputs, image: string | null) => void;
  recommendation: ImamRecommendation | null;
  userInputs: UserInputs | null;
  userImage: string | null;
  onStartOver: () => void;
  onGoHome: () => void;
}

const AppPage: React.FC<AppPageProps> = ({ onNewRecommendation, recommendation, userInputs, userImage, onStartOver, onGoHome }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-[#f5f5dc] flex flex-col">
      <Header onGoHome={onGoHome} isAppView={true} onStartOver={onStartOver} hasResult={!!recommendation} />
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          <div className="w-full lg:w-1/3 lg:max-w-md">
            <InputPanel 
              onNewRecommendation={onNewRecommendation} 
              setLoading={setIsLoading}
              onStartOver={onStartOver}
              hasResult={!!recommendation}
            />
          </div>
          <div className="w-full lg:flex-1">
            <ResultDisplay 
              recommendation={recommendation}
              isLoading={isLoading}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AppPage;