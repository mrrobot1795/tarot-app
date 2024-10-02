'use client';

import GlobalStyle from './globalStyles';
import './globals.css'; // Ensure this is imported here to apply Tailwind

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <GlobalStyle />
        {children}
      </body>
    </html>
  );
}
