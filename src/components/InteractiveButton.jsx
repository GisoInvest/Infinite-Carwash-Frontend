import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import soundManager from '../utils/soundManager';

/**
 * Enhanced Interactive Button with sound effects and animations
 */
const InteractiveButton = ({ 
  children, 
  onClick, 
  variant = "default",
  size = "default",
  className = "",
  disabled = false,
  soundType = "click", // click, success, error, notification
  ...props 
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = async (e) => {
    if (disabled) return;
    
    setIsPressed(true);
    
    // Play sound effect
    switch (soundType) {
      case 'success':
        await soundManager.playSuccess();
        break;
      case 'error':
        await soundManager.playError();
        break;
      case 'notification':
        await soundManager.playNotification();
        break;
      default:
        await soundManager.playClick();
    }
    
    // Call the original onClick handler
    if (onClick) {
      onClick(e);
    }
    
    // Reset pressed state after animation
    setTimeout(() => setIsPressed(false), 150);
  };

  const handleMouseEnter = async () => {
    if (disabled) return;
    setIsHovered(true);
    await soundManager.playHover();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const animationClasses = `
    transition-all duration-200 ease-in-out
    ${isPressed ? 'scale-95 shadow-inner' : 'scale-100'}
    ${isHovered && !disabled ? 'scale-105 shadow-lg transform-gpu' : ''}
    ${!disabled ? 'hover:brightness-110 active:brightness-90' : ''}
    relative overflow-hidden
  `;

  const rippleEffect = isPressed ? (
    <div className="absolute inset-0 bg-white/20 rounded-md animate-ping" />
  ) : null;

  return (
    <Button
      variant={variant}
      size={size}
      className={`${animationClasses} ${className}`}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      disabled={disabled}
      {...props}
    >
      {rippleEffect}
      <span className="relative z-10">{children}</span>
    </Button>
  );
};

export default InteractiveButton;
