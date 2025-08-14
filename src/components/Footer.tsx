import React from 'react';
import { Zap } from 'lucide-react';
import Twitter from 'lucide-react/dist/esm/icons/twitter';

export const Footer: React.FC = () => {

  return (
    <footer className="relative z-10 px-4 sm:px-8 py-12 sm:py-16 border-t border-gray-800/50 bg-gradient-to-b from-transparent to-gray-900/50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 sm:mb-12">
          <div className="flex items-center space-x-3 mb-6 md:mb-0 group">
            <div className="relative">
              <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-cyan-400 group-hover:text-cyan-300 transition-all duration-300" />
              <div className="absolute inset-0 w-6 h-6 sm:w-8 sm:h-8 bg-cyan-400/20 rounded-full blur-lg group-hover:bg-cyan-300/30 transition-all duration-300" />
            </div>
            <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Starling
            </span>
          </div>
          <div className="flex items-center space-x-6">
            <a href="https://twitter.com/aayushfromspace" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              <Twitter className="h-6 w-6" />
            </a>
            <a href="mailto:aayugupta04@gmail.com" className="text-gray-400 hover:text-white">
              aayugupta04@gmail.com
            </a>
          </div>
        </div>
        <div className="pt-6 sm:pt-8 border-t border-gray-800/50 text-center text-gray-500 text-sm sm:text-base">
          <p>&copy; 2025 Starling. The next generation of web automation.</p>
        </div>
      </div>
    </footer>
  );
};