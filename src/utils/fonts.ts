import { Russo_One, Ubuntu } from 'next/font/google';

export const contentFont = Ubuntu({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
});

export const titleFont = Russo_One({
  weight: '400',
  subsets: ['latin'],
});
