import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const formsparkFormId = import.meta.env.VITE_FORMSPARK_FORM_ID;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    if (!formsparkFormId) {
      console.error("Formspark form ID not configured.");
      setStatus('error');
      setMessage('This feature is not configured. Please contact support.');
      return;
    }

    try {
      const response = await fetch(`https://submit.formspark.io/${formsparkFormId}`, {
        method: 'POST',
        body: JSON.stringify({ email }),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });

      if (response.ok) {
        setStatus('success');
        setMessage("Thanks for joining the waitlist! We'll be in touch.");
        setEmail('');
      } else {
        const errorData = await response.json();
        setStatus('error');
        setMessage(errorData.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('An error occurred. Please check your connection and try again.');
    }
  };

  return (
    <div className="relative text-white text-center py-20 sm:py-24 px-4 sm:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Animated Badge */}
        <div className="inline-flex items-center justify-center space-x-4 animate-fade-in">
          <Link
            to="/blog"
            className="flex items-center bg-gray-800/50 backdrop-blur-sm border border-gray-600/50 rounded-full px-4 sm:px-6 py-2 text-sm sm:text-base text-gray-300 hover:bg-gray-700/50 transition-all"
          >
            <span>Starling scored 100% on the WebVoyager benchmark.</span>
            <span className="ml-2 text-cyan-400 font-semibold flex items-center">
              Read more
            </span>
          </Link>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-8 sm:mb-12 leading-[1.3] md:leading-[1.2] mt-8">
          <span className="block bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent animate-gradient-x pb-4 overflow-visible bg-clip-text-fix">
            The Next Generation
          </span>
          <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-gradient-x delay-300 overflow-visible bg-clip-text-fix pt-2">
            Web Agent
          </span>
        </h1>
        
        <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 sm:mb-12 max-w-5xl mx-auto leading-relaxed animate-fade-in-up delay-500 px-4">
          Turn natural language into <span className="text-cyan-400 font-semibold">scalable</span> web automation scripts.
        </p>
        
        <div className="flex justify-center animate-fade-in-up delay-700 px-4">
          <form className="w-full max-w-md" onSubmit={handleSubmit}>
            <div className="relative">
              <input 
                type="email" 
                placeholder="Enter your email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === 'loading' || status === 'success'}
                className="w-full bg-gray-800/50 border border-gray-600/80 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/30 rounded-xl px-6 py-4 text-lg text-white placeholder-gray-400 focus:outline-none transition-all duration-300 disabled:opacity-50"
              />
              <button 
                type="submit" 
                disabled={status === 'loading' || status === 'success'}
                className="absolute right-2 top-1/2 -translate-y-1/2 group bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 px-6 py-2.5 rounded-lg text-base font-semibold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? (
                  <span>Submitting...</span>
                ) : (
                  <span className="flex items-center justify-center space-x-2">
                    <span>Join Waitlist</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                )}
              </button>
            </div>
            {(status === 'success' || status === 'error') && (
              <p className={`mt-4 text-center text-sm ${status === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                {message}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;