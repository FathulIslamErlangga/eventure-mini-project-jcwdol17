import React from 'react';

interface JumbotronNavigationProps {
  totalSlides: number;
  currentSlide: number;
  onDotClick: (index: number) => void;
}

export function JumbotronNavigation({
  totalSlides,
  currentSlide,
  onDotClick
}: JumbotronNavigationProps) {
  return (
    <div className="jumbotron-dots">
      {[...Array(totalSlides)].map((_, index) => (
        <div 
          key={index}
          className={`dot ${currentSlide === index ? 'active' : ''}`}
          onClick={() => onDotClick(index)}
        />
      ))}
    </div>
  );
}