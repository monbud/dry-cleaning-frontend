import { PublicNav, Footer } from '../../../components/ui';
import Tracking from '../../../components/tracking';
export const metadata = { title: 'Your clothing status', robots: { index: false, follow: false }, referrer: 'no-referrer' };
export default async function Page({ params }) { const { token } = await params; return <><PublicNav/><main className="public-page tracking-page"><div className="tracking-intro"><span className="eyebrow">EVERY STEP, WITH CARE</span><h1>Your clothes, accounted for.</h1><p>A quick look at where things stand.</p></div><Tracking token={token}/></main><Footer/></>; }
