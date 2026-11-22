import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'NC FILMS',
  description: 'NC FILMS',
  openGraph: {
    title: 'NC FILMS',
    description: 'NC FILMS',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NC FILMS',
    description: 'NC FILMS',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
