import React from 'react';
import chemovigiLogo from 'figma:asset/9be7363feabab3af9c8863921d5c9774f15e96c9.png';

interface ChemoVigiLogoProps {
  size?: 'small' | 'medium' | 'large';
  showText?: boolean;
  onClick?: () => void;
}

export function ChemoVigiLogo({ size = 'medium', showText = true, onClick }: ChemoVigiLogoProps) {
  const sizes = {
    small: 'h-10',
    medium: 'h-14',
    large: 'h-20'
  };

  return (
    <button 
      onClick={onClick}
      className="flex items-center gap-3 hover:opacity-80 transition-opacity cursor-pointer"
    >
      <img 
        src={chemovigiLogo} 
        alt="ChemoVigi Logo" 
        className={`${sizes[size]} w-auto object-contain`}
        style={{ imageRendering: 'auto' }}
      />
      {showText && (
        <div className="text-left">
          <div className="flex items-baseline gap-0.5">
            <span className="text-blue-600 font-bold text-xl">Chemo</span>
            <span className="text-teal-600 font-bold text-xl">Vigi</span>
          </div>
          <p className="text-xs text-slate-500">Where Innovation Meets Technology</p>
        </div>
      )}
    </button>
  );
}