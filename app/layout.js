import './globals.css';
export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: { default: 'FinBud Dry Cleaning — A little more care. A lot less paperwork.', template: '%s | FinBud Dry Cleaning' },
  description: 'A calmer way to run your dry-cleaning business in Nigeria. Manage clothing drop-offs, customers, pricing, and collections in one place.',
  openGraph: { title: 'FinBud for dry cleaners', description: 'Every garment accounted for. Every customer kept in the loop.', locale: 'en_NG', type: 'website' },
};
export default function RootLayout({ children }) { return <html lang="en-NG"><body>{children}</body></html>; }
