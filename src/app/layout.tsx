import type { Metadata } from 'next';
import ApolloProviderWrapper from '@/providers/ApolloProvider';
import Header from '@/components/Header/Header';
import './globals.css';
import { Poppins, Aboreto } from 'next/font/google';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['400', '700'],
});

const aboreto = Aboreto({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-aboreto',
  weight: ['400'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${aboreto.variable} trancy-ru`}
    >
      <body>
        <ApolloProviderWrapper>
          <Header />
          {children}
        </ApolloProviderWrapper>
      </body>
    </html>
  );
}