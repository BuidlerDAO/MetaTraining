import React, { useState } from 'react';
import { Loading } from '../loading';

interface Props {
  src?: string;
  className?: string;
}

const Image: React.FC<Props> = ({ src, className }) => {
  const [loading, setLoading] = useState(true);
  const [fadeIn, setFadeIn] = useState(false);

  const handleLoad = () => {
    setTimeout(() => {
      setLoading(false);
      setFadeIn(true);
    }, 400);
  };

  const imageStyle = `w-full h-full object-cover rounded-lg ${
    fadeIn ? 'opacity-100' : 'opacity-0'
  }`;
  const loadingStyle = `w-full h-full flex items-center justify-center rounded-lg bg-gray-300 ${
    fadeIn ? 'opacity-0' : 'opacity-100'
  }`;

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img src={src} onLoad={handleLoad} className={imageStyle} />
      <div className={loadingStyle}>{(loading || !src) && <Loading />}</div>
    </div>
  );
};

export default Image;
