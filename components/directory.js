'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Search, MapPin, Store, Phone } from 'lucide-react';
import { Empty } from './ui';
export default function Directory({ businesses }) {
  const [query, setQuery] = useState('');
  const results = businesses.filter(b => `${b.name} ${b.city} ${b.state} ${b.address}`.toLowerCase().includes(query.toLowerCase()));
  return <><label className="search-box"><Search size={18}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search a city, area, state, or business…" aria-label="Search dry cleaners"/></label><small className="muted">{results.length} listed {results.length === 1 ? 'business' : 'businesses'} · Nigeria</small><div className="directory-grid">{results.map(b => <article key={b._id} className="panel directory-card"><span className="feature-icon"><Store size={25}/></span><h2><Link href={`/${b._id}`}>{b.name}</Link></h2><p className="location"><MapPin size={14}/>{b.city}, {b.state}</p><p>{b.description || 'Clothing care in your neighbourhood.'}</p><p>{b.address}</p><Link className="button secondary small" href={`/${b._id}`}>View business & prices</Link><br/><a className="text-link" href={`tel:${b.phone}`}><Phone size={14}/>{b.phone}</a></article>)}</div>{!results.length && <Empty icon={MapPin} title={query ? 'No matches in this area yet' : 'Good neighbours are on their way'} description="As businesses join and choose to be listed, you’ll find them here. Try another city or check back soon."/>}</>;
}
