'use client';
import { Shirt, Pencil, Trash2, Plus } from 'lucide-react';
import { money } from './ui';
export const serviceLabels = { wash: 'Washing', iron: 'Ironing', washIron: 'Wash & iron' };
export function ServiceAmounts({ service }) {
  return <dl className="service-amounts">{Object.entries(serviceLabels).map(([field, label]) => <div key={field}><dt>{label}</dt><dd>{service[field] === null || service[field] === undefined ? <span className="muted">Not offered</span> : money(service[field])}</dd></div>)}</dl>;
}
export default function ServicePricing({ groups, onEdit, onRemove, onAdd }) {
  return <><div className="info-box">Set each clothing type’s washing, ironing, and combined prices independently. Blank prices mean that service is not offered. Saved orders retain their original prices.</div><div className="pricing-grid">{groups.map(group => <article className="panel price-card" key={group._id}><span className="feature-icon"><Shirt size={25}/></span><h3>{group.category}</h3><span className="muted">Prices per item</span><ServiceAmounts service={group}/><div className="price-card-actions"><button className="text-link" onClick={() => onEdit(group)}><Pencil size={14}/> Edit prices</button><button className="icon-button" aria-label={`Remove ${group.category} pricing`} onClick={() => onRemove(group)}><Trash2 size={16}/></button></div></article>)}<button className="add-price" onClick={onAdd}><Plus size={28}/><strong>Add a clothing type</strong><span>Set all its service prices together</span></button></div></>;
}
