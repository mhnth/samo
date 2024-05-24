import type { Metadata } from 'next';
import './globals.css';
import NextAuthProvider from '@/lib/nextauth/next-auth-provider';

export const metadata: Metadata = {
  title: 'Finence App',
  description: '',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  );
}
