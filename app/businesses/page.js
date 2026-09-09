import { PublicNav, Footer, ErrorBox } from '../../components/ui';
import Directory from '../../components/directory';
export const dynamic = 'force-dynamic';
export const metadata = { title: 'Find a dry cleaner in Nigeria', description: 'Discover dry-cleaning businesses by city and state in Nigeria. Find business addresses, contact details, and clothing-care services.' };
export default async function Page() {
  let businesses = [], error = '';
  try { const response = await fetch(`${process.env.BACKEND_URL || 'http://127.0.0.1:4000'}/api/directory`, { cache: 'no-store', signal: AbortSignal.timeout(5000) }); if (!response.ok) throw new Error(); businesses = (await response.json()).businesses; } catch { error = 'The directory is temporarily unavailable. Please refresh in a moment.'; }
  return <><PublicNav/><main className="public-page"><span className="eyebrow">GOOD CARE, CLOSE BY</span><h1>A fresh look. Wherever life takes you.</h1><p>Find a dry cleaner in your neighbourhood, your next city, or your new home.</p><ErrorBox error={error}/>{!error && <Directory businesses={businesses}/>}</main><Footer/></>;
}
