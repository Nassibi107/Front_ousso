import React, { useState, useEffect } from 'react';
import Panner1 from "../../assets/cover1.png"
import Panner2 from "../../assets/cover2.png"
import Panner3 from "../../assets/cover3.png"


export default function Panner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);


  // Replace these with your actual image URLs
  const images = [
    Panner1,
    Panner2,
    Panner3
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        setIsTransitioning(false);
      }, 5000);
    }, 10000);

    return () => clearInterval(interval);
  }, [images.length]);

  const nextImage = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        setIsTransitioning(false);
      }, 5000);
    }
  };

  const prevImage = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
        setIsTransitioning(false);
      }, 500);
    }
  };

  const goToImage = (index) => {
    if (!isTransitioning && index !== currentIndex) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex(index);
        setIsTransitioning(false);
      }, 500);
    }
  };

  return (
    <div className="w-full min-h-screen relative overflow-hidden" style={{ backgroundColor: '#025984' }}>
      {/* Main Image Container */}
      <div className="relative w-full h-screen overflow-hidden">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out ${
              index === currentIndex 
                ? 'opacity-100 scale-100 z-20' 
                : 'opacity-0 scale-110 z-10'
            } ${isTransitioning ? 'blur-sm' : 'blur-0'}`}
          >
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover object-center"
            />
            
            {/* Overlay with your colors */}
            <div 
              className="absolute inset-0 opacity-30 mix-blend-multiply"
              style={{ 
                background: `linear-gradient(135deg, #025984 0%, #0a8899 50%, #0fb5a0 100%)`
              }}
            ></div>
          </div>
        ))}

        {/* Moving Elements */}
        <div className="absolute inset-0 pointer-events-none z-30">
          {/* Floating circles */}
          <div 
            className="absolute top-20 left-20 w-12 h-12 rounded-full opacity-70 animate-bounce"
            style={{ backgroundColor: '#e7d8c4', animationDelay: '0s', animationDuration: '3s' }}
          ></div>
          <div 
            className="absolute top-1/3 right-32 w-8 h-8 rounded-full opacity-60 animate-pulse"
            style={{ backgroundColor: '#01af4c', animationDuration: '2s' }}
          ></div>
          <div 
            className="absolute bottom-32 left-1/4 w-16 h-16 rounded-full opacity-50 animate-ping"
            style={{ backgroundColor: '#0fb5a0', animationDuration: '4s' }}
          ></div>
          
          {/* Moving bars */}
          <div 
            className="absolute top-0 left-0 w-full h-2 transform translate-y-0 animate-slide-right"
            style={{ backgroundColor: '#e7d8c4' }}
          ></div>
          <div 
            className="absolute bottom-0 right-0 w-full h-2 transform translate-y-0 animate-slide-left"
            style={{ backgroundColor: '#01af4c' }}
          ></div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevImage}
          className="absolute left-8 top-1/2 transform -translate-y-1/2 z-40 p-4 rounded-full transition-all duration-300 hover:scale-110 focus:outline-none"
          style={{ backgroundColor: 'rgba(2, 89, 132, 0.8)' }}
        >
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button
          onClick={nextImage}
          className="absolute right-8 top-1/2 transform -translate-y-1/2 z-40 p-4 rounded-full transition-all duration-300 hover:scale-110 focus:outline-none"
          style={{ backgroundColor: 'rgba(2, 89, 132, 0.8)' }}
        >
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Dots Navigation */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-40 flex space-x-4">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToImage(index)}
              className={`w-4 h-4 rounded-full transition-all duration-300 focus:outline-none ${
                index === currentIndex ? 'scale-125' : 'scale-100 hover:scale-110'
              }`}
              style={{ 
                backgroundColor: index === currentIndex ? '#e7d8c4' : 'rgba(231, 216, 196, 0.5)'
              }}
            ></button>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 w-full h-1 z-40" style={{ backgroundColor: 'rgba(2, 89, 132, 0.3)' }}>
          <div 
            className="h-full transition-all duration-4000 ease-linear"
            style={{ 
              backgroundColor: '#0fb5a0',
              width: `${((currentIndex + 1) / images.length) * 100}%`
            }}
          ></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-right {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(100vw); }
          100% { transform: translateX(-100%); }
        }
        
        @keyframes slide-left {
          0% { transform: translateX(100%); }
          50% { transform: translateX(-100vw); }
          100% { transform: translateX(100%); }
        }
        
        .animate-slide-right {
          animation: slide-right 8s linear infinite;
        }
        
        .animate-slide-left {
          animation: slide-left 10s linear infinite;
        }
      `}</style>
    </div>
  );
}