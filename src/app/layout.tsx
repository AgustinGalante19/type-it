import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const geistSans = Inter({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: 'CVM Web Tools',
  description: 'Different tools to make more easy my job 8)',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${geistSans.className} antialiased`}>
        <div className='flex flex-col min-h-screen'>
          <div className='flex-1'>{children}</div>
        </div>
      </body>
    </html>
  );
}
