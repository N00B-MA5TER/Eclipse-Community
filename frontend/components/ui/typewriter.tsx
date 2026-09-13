"use client";

import React, { useState, useEffect } from 'react';

export const Typewriter = ({ 
  phrases, 
  delay = 2000, 
  typingSpeed = 100, 
  deletingSpeed = 50 
}: { 
  phrases: string[], 
  delay?: number, 
  typingSpeed?: number, 
  deletingSpeed?: number 
}) => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);

  useEffect(() => {
    const currentPhrase = phrases[loopNum % phrases.length];
    
    let timer: NodeJS.Timeout;
    
    const handleTyping = () => {
      if (isDeleting) {
        setText(currentPhrase.substring(0, text.length - 1));
        if (text.length === 0) {
          setIsDeleting(false);
          setLoopNum(loopNum + 1);
        }
      } else {
        setText(currentPhrase.substring(0, text.length + 1));
        if (text.length === currentPhrase.length) {
          timer = setTimeout(() => setIsDeleting(true), delay);
          return;
        }
      }
    };

    timer = setTimeout(handleTyping, isDeleting ? deletingSpeed : typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, phrases, delay, typingSpeed, deletingSpeed]);

  return (
    <span className="inline-block relative">
      {text}
      <span className="inline-block w-[0.1em] bg-black dark:bg-white animate-pulse h-[0.8em] ml-1 align-baseline translate-y-[2px]" />
    </span>
  );
};
