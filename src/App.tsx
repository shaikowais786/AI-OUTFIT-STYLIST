import React, { useState } from 'react';
import HomePage from './pages/HomePage';
import AppPage from './pages/AppPage';
import { ImamRecommendation, UserInputs } from './types';

const App: React.FC = () => {
  const [view, setView] = useState<'home' | 'app'>('home');
  const [recommendation, setRecommendation] = useState<ImamRecommendation | null>(null);
  const [userInputs, setUserInputs] = useState<UserInputs | null>(null);
  const [userImage, setUserImage] = useState<string | null>(null);

  const handleGetStarted = () => {
    setView('app');
  };

  const handleNewRecommendation = (response: ImamRecommendation, inputs: UserInputs, image: string | null) => {
    setRecommendation(response);
    setUserInputs(inputs);
    setUserImage(image);
    setView('app');
  };

  const handleStartOver = () => {
    setRecommendation(null);
    setUserInputs(null);
    setUserImage(null);
    setView('app'); 
  };
  
  const handleGoHome = () => {
    setView('home');
    setRecommendation(null);
    setUserInputs(null);
    setUserImage(null);
  }


  if (view === 'home') {
    return <HomePage onGetStarted={handleGetStarted} />;
  }

  return <AppPage 
            onNewRecommendation={handleNewRecommendation} 
            recommendation={recommendation}
            userInputs={userInputs}
            userImage={userImage}
            onStartOver={handleStartOver}
            onGoHome={handleGoHome}
        />;
};

export default App;