import React, { useState } from 'react';
import { X, Gift, Sparkles } from 'lucide-react';

export default function AlertBar() {
  const [showAlert, setShowAlert] = useState(true);

  const handleClose = () => {
    setShowAlert(false);
  };

  if (!showAlert) {
    return null;
  }

  return (
    <div 
      className="relative py-3 px-4 sm:px-8 md:px-16 lg:px-40 text-white shadow-lg"
      style={{ 
        background: `linear-gradient(90deg, #025984 0%, #0a8899 50%, #0fb5a0 100%)`
      }}
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0">
        {/* Left side - Icon and Message */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          <div className="flex items-center">
            <Gift className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-300" />
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-300 ml-1 animate-pulse" />
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2">
            <span className="font-bold text-sm sm:text-lg">Secure your discount now</span>
            <span className="text-xs sm:text-sm opacity-90">and be one of the lucky 1000!</span>
          </div>
        </div>

        {/* Right side - Close */}
        <div className="flex items-center">
          <button
            onClick={handleClose}
            className="p-1 rounded-full hover:bg-white hover:bg-opacity-20 transition-all duration-200"
            aria-label="Close alert"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </button>
        </div>
      </div>
      
      {/* Subtle animated accent line */}
      <div 
        className="absolute bottom-0 left-0 h-1 animate-pulse"
        style={{ 
          background: `linear-gradient(90deg, #01af4c 0%, #e7d8c4 50%, #01af4c 100%)`,
          width: '100%'
        }}
      ></div>
    </div>
  );
}