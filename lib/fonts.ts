import { Bodoni_Moda, Inter, IBM_Plex_Mono } from 'next/font/google';

export const bodoniModa = Bodoni_Moda({
  weight: ['400', '500'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
});

export const inter = Inter({
  weight: ['400', '500', '600'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-text',
});

export const ibmPlexMono = IBM_Plex_Mono({
  weight: ['400', '500'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-data',
});
