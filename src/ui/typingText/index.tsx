import React, { useEffect, useState } from 'react';

interface TextProps {
  text: string;
  speed: number;
  className?: string;
}

const TypingText: React.FC<TextProps> = ({ text, speed, className }) => {
  const [currentText, setCurrentText] = useState('');
  const textArray = text.split('');

  useEffect(() => {
    let index = 0;
    const textInterval = setInterval(() => {
      setCurrentText(textArray.slice(0, index).join(''));
      index++;
      if (index > textArray.length) {
        clearInterval(textInterval);
      }
    }, speed);
    return () => clearInterval(textInterval);
  }, [text, speed]);

  return <div className={`${className}`}>{currentText}</div>;
};

export default TypingText;
