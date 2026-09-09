import { cache } from 'react';
import { businessUrl } from '../../../lib/business-url';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MapPin, Phone, Store, ArrowLeft } from 'lucide-react';
import { PublicNav, Footer, Empty } from '../../../components/ui';
import { ServiceAmounts } from '../../../components/service-pricing';
export const dynamic = 'force-dynamic';
const getBusiness = cache(async id => {
  if (!/^[a-f\d]{24}$/i.test(id)) notFound();
  const origin = (process.env.BACKEND_URL || 'http://127.0.0.1:4000').replace(/\/+$/, '');
  const response = await fetch(`${origin}/api/directory/${id}`, { cache: 'no-store', signal: AbortSignal.timeout(10000) });
  if (response.status === 404) notFound();
  if (!response.ok) throw new Error('Business details are temporarily unavailable.');
  return response.json();
});
export async function generateMetadata({ params }) {
  const { businessId } = await params;
  const { business } = await getBusiness(businessId);
  return { title: `${business.name} — ${business.city}`, description: business.description || `View ${business.name} in ${business.city}, ${business.state}: services, prices, notices, and contact information.`, alternates: { canonical: businessUrl(businessId) } };
}
export default async function Page({ params }) {
  const { businessId } = await params;
  const { business, services } = await getBusiness(businessId);
  return <><PublicNav/><main className="public-page business-profile"><Link href="/businesses" className="text-link"><ArrowLeft size={16}/> All dry cleaners</Link><header className="business-profile-heading"><span className="feature-icon"><Store size={28}/></span><div><span className="eyebrow">CLOTHING CARE IN {business.state.toUpperCase()}</span><h1>{business.name}</h1><p><MapPin size={16}/> {business.city}, {business.state}</p></div><a className="button" href={`tel:${business.phone}`}><Phone size={17}/> Call business</a></header><div className="business-profile-info"><section className="panel settings-panel"><h2>About the business</h2><p className="preserve-lines">{business.description || 'This business has not added an introduction yet.'}</p><h3>Visit or get in touch</h3><p><MapPin size={16}/> {business.address}</p><a className="text-link" href={`tel:${business.phone}`}><Phone size={16}/> {business.phone}</a></section><section className="panel settings-panel"><h2>Notices & information</h2><p className="preserve-lines">{business.notice || 'No notices at the moment. Contact the business for opening hours and collection information.'}</p></section></div><section><div className="section-heading"><div><span className="eyebrow">PLAN YOUR NEXT DROP-OFF</span><h2>Services & pricing</h2></div><p>Prices in Nigerian naira, per item.</p></div>{services.length ? <div className="pricing-grid">{services.map(service => <article key={service.category} className="panel price-card"><h3>{service.category}</h3><ServiceAmounts service={service}/></article>)}</div> : <Empty title="Prices are being prepared" description="Contact the business for its current service prices."/>}</section></main><Footer/></>;
}
