import { Cinzel, Pinyon_Script, Playfair_Display, Raleway } from 'next/font/google';

export const contentFont = Raleway({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ['latin'],
})

export const playfairFont = Playfair_Display({
  weight: '400',
  subsets: ['latin'],
});

export const cinzelFont = Cinzel({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ['latin'],
});

export const pinyonFont = Pinyon_Script({
  weight: "400",
  subsets: ['latin'],
})
