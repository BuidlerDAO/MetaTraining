'use client';

import { getCookie } from '@/utils/cookie';
import { useEffect } from 'react';

export const Spaghetti = () => {
  useEffect(() => {
    if (
      getCookie('theme') === 'dark' ||
      (getCookie('theme') === '' &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);
  return <></>;
};
