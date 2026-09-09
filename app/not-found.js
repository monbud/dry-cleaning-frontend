import Link from 'next/link';
import { PublicNav, Footer } from '../components/ui';
export default function Page() { return <><PublicNav/><main className="not-found"><span className="eyebrow">A SMALL DETOUR</span><h1>This page isn’t on the rail.</h1><p className="muted">The link may have changed. Let’s get you back.</p><Link href="/" className="button">Back to home</Link></main><Footer/></>; }
