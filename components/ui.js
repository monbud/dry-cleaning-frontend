'use client';
import Link from 'next/link';
import { cloneElement, useEffect, useId, useRef } from 'react';
import { Shirt, ArrowUpRight, LoaderCircle, X } from 'lucide-react';
export const money = n => new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0, maximumFractionDigits: 2 }).format((n || 0) / 100);
export const date = n => n ? new Date(n).toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Africa/Lagos' }) : '—';
export const today = () => new Date().toLocaleDateString('en-CA', { timeZone: 'Africa/Lagos' });
export async function api(path, options = {}) {
  let response;
  try { response = await fetch(`/api${path}`, { ...options, headers: { ...(options.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }), ...options.headers }, ...(options.body && !(options.body instanceof FormData) ? { body: JSON.stringify(options.body) } : {}) }); }
  catch { throw new Error('Cannot reach the server. Check that the backend is running.'); }
  const result = await response.json().catch(() => ({ error: 'The server is unavailable. Please try again.' }));
  if (!response.ok) { const error = new Error(result.error || 'Request failed.'); error.status = response.status; throw error; }
  return result;
}
export function Logo({ light = false }) { return <Link href="/" className={`logo ${light ? 'light' : ''}`}><span className="logo-mark"><Shirt size={21}/></span></Link>; }
export function PublicNav() { return <header className="public-nav"><Logo/><nav><Link href="/#how-it-works">How it works</Link><Link href="/businesses">Find a dry cleaner</Link><Link href="/track">Track your clothes</Link></nav><div className="nav-actions"><Link href="/login" className="text-link">Log in</Link><Link href="/register" className="button small">Get started <ArrowUpRight size={16}/></Link></div></header>; }
export function Footer() { return <footer className="footer"><div><Logo/><p>Thoughtfully made for Nigerian dry cleaners.</p></div><div className="footer-links"><Link href="/terms">Terms of use</Link><Link href="/privacy">Privacy</Link><Link href="/refunds">Refunds</Link><Link href="/delete-account">Delete account</Link></div><small>© {new Date().getFullYear()} FinBud Technologies Limited. All rights reserved.</small></footer>; }
export function Field({ label, children, hint }) {
  const generatedId = useId(), id = children.props.id || generatedId;
  return <div className="field"><label htmlFor={id}>{label}</label>{cloneElement(children, { id, ...(hint ? { 'aria-describedby': `${id}-hint` } : {}) })}{hint && <small id={`${id}-hint`}>{hint}</small>}</div>;
}
export function ErrorBox({ error }) { return error ? <div className="error-box" role="alert">{error}</div> : null; }
export function Empty({ icon: Icon = Shirt, title, description, children }) { return <div className="empty"><span className="empty-icon"><Icon size={26}/></span><h3>{title}</h3><p>{description}</p>{children}</div>; }
export function Loading() { return <div className="loading" role="status"><LoaderCircle className="spin"/> Loading your workspace…</div>; }
export function Badge({ status }) { const colors = { 'Dropped off': 'purple', Washing: 'blue', Ironing: 'amber', 'Ready for pickup': 'green', Collected: 'gray', Paid: 'green', Unpaid: 'amber' }; return <span className={`badge ${colors[status] || 'gray'}`}><i/>{status}</span>; }
export function Modal({ title, onClose, children }) {
  const ref = useRef(null), close = useRef(onClose); close.current = onClose;
  useEffect(() => {
    const previous = document.activeElement, overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const focusable = () => [...ref.current.querySelectorAll('button:not(:disabled), a[href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex="0"]')];
    focusable()[0]?.focus();
    const keydown = event => {
      if (event.key === 'Escape') close.current();
      if (event.key !== 'Tab') return;
      const nodes = focusable(), first = nodes[0], last = nodes.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    document.addEventListener('keydown', keydown);
    return () => { document.removeEventListener('keydown', keydown); document.body.style.overflow = overflow; previous?.focus(); };
  }, []);
  return <div className="modal-backdrop" onClick={onClose}><section ref={ref} role="dialog" aria-modal="true" aria-label={title} className="modal" onClick={e => e.stopPropagation()}><div className="modal-title"><h2>{title}</h2><button className="icon-button" aria-label="Close dialog" onClick={onClose}><X size={20}/></button></div>{children}</section></div>;
}
