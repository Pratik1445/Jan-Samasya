import React from 'react';
import { Link } from 'react-router-dom';

interface AnimatedButtonProps {
  to: string;
  text: string;
  variant?: 'primary' | 'secondary';
  className?: string;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({ 
  to, 
  text, 
  variant = 'primary',
  className = '' 
}) => {
  const isPrimary = variant === 'primary';
  
  return (
    <Link to={to} className={`animated-button ${isPrimary ? 'animated-button-primary' : 'animated-button-secondary'} ${className}`}>
      <svg viewBox="0 0 24 24" className="arr-2" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
      </svg>
      
      <span className="text">
        {text}
      </span>
      
      <span className="circle"></span>
      
      <svg viewBox="0 0 24 24" className="arr-1" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
      </svg>
    </Link>
  );
};

export default AnimatedButton;
