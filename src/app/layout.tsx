import './globals.css';
import Link from 'next/link';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Daily Recipes',
  description: 'A personal recipe site by Flo & partner',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 font-sans">
        <header className="border-b px-6 py-4 bg-white shadow-sm">
          <nav className="flex gap-6 text-lg font-medium">
            <Link href="/">Daily Recipe</Link>
            <Link href="/favorites">Our Favorites</Link>
            <Link href="/who">Who Will Be Cooking?</Link>
          </nav>
        </header>
        <main className="px-6 py-10">{children}</main>
      </body>
    </html>
  );
}