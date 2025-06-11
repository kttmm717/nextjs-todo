import '@/app/globals.css';
import { inter, noteSansJP } from '@/ui/fonts';

export default function RootLayout(
  { children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${noteSansJP} antialiased`}>
        {children}
      </body>
    </html>
  );
}
