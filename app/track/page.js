import { PublicNav, Footer } from '../../components/ui';
import { TrackLookup } from '../../components/tracking';
export const metadata = { title: 'Track your clothes' };
export default function Page() { return <><PublicNav/><main className="public-page tracking-page"><div className="tracking-intro"><span className="eyebrow">A LITTLE PEACE OF MIND</span><h1>How are your clothes doing?</h1><p>From drop-off to pickup, stay in the loop.</p></div><TrackLookup/></main><Footer/></>; }
