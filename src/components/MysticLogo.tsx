
import React from 'react';

const MysticLogo = () => {
  return (
    <div className="flex items-center justify-center mb-8">
      <div className="relative">
        <div className="text-4xl md:text-6xl font-cinzel font-bold text-mystic-gold mb-2 animate-float">
          Madame do Luar
        </div>
        <div className="absolute -top-2 -right-8 md:-right-12">
          <div className="relative w-12 h-12 md:w-16 md:h-16">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-mystic-gold to-yellow-300 opacity-20 animate-pulse"></div>
            <div className="absolute inset-2 rounded-full bg-mystic-gold opacity-40"></div>
            <div className="absolute inset-1 rounded-l-full bg-mystic-purple"></div>
            <div className="absolute inset-0 animate-mystical-spin">
              <div className="w-2 h-2 bg-mystic-gold rounded-full absolute top-1 left-1/2 transform -translate-x-1/2"></div>
            </div>
          </div>
        </div>
        <div className="text-center text-mystic-gold/80 font-poppins text-sm md:text-base tracking-wider">
          Cartomante Quântica
        </div>
      </div>
    </div>
  );
};

export default MysticLogo;
