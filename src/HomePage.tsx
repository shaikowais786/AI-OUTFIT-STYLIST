import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface HomePageProps {
  onGetStarted: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen bg-[#0D0D0D] text-[#F5F5F5] flex flex-col">
      <Header onGoHome={()=>{}} isAppView={false} />
      <main className="flex-grow flex flex-col items-center justify-center px-4 text-center">
        <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight">
                IMAM Stylist —
                <span className="block text-[#d4af37]">Style Made Personal.</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl max-w-2xl mx-auto text-gray-300">
                Welcome to IMAM Stylist. Get instant, personalized outfit recommendations for any occasion, tailored to your unique style, body, and skin tone.
            </p>
            <button
                onClick={onGetStarted}
                className="mt-10 px-8 py-4 bg-[#d4af37] text-[#0b0b0b] font-bold text-lg rounded-xl shadow-lg shadow-yellow-500/20 hover:bg-yellow-500 transition-all duration-300 transform hover:scale-105"
            >
                Get Started
            </button>
        </div>
      </main>

      {/* Testimonials Section */}
      <section className="py-20 bg-black bg-opacity-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-[#d4af37]">What Our Clients Say</h2>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-[#1c1c1c] p-6 rounded-lg shadow-lg">
                    <p className="text-gray-300">"IMAM Stylist gave me the perfect outfit for my friend's wedding. I felt so confident!"</p>
                    <p className="mt-4 font-bold text-[#d4af37]">- Priya S.</p>
                </div>
                <div className="bg-[#1c1c1c] p-6 rounded-lg shadow-lg">
                    <p className="text-gray-300">"The festival recommendations are amazing. It understood the vibe for Diwali perfectly."</p>
                    <p className="mt-4 font-bold text-[#d4af37]">- Rohan M.</p>
                </div>
                <div className="bg-[#1c1c1c] p-6 rounded-lg shadow-lg">
                    <p className="text-gray-300">"Finally, a styling app that gets Indian wear right. It's my go-to for every occasion now."</p>
                    <p className="mt-4 font-bold text-[#d4af37]">- Ayesha K.</p>
                </div>
            </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
