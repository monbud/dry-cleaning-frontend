'use client';
import { useState } from 'react';
import Link from 'next/link';
import { api, Field, ErrorBox } from './ui';
export default function DeleteAccount() {
  const [error, setError] = useState(''), [busy, setBusy] = useState(false), [done, setDone] = useState(false);
  if (done) return <div className="success-box">Your account has been deleted and your sessions have ended. <Link href="/">Return home</Link></div>;
  return <form className="delete-form" onSubmit={async e => { e.preventDefault(); setBusy(true); setError(''); try { await api('/auth/account', { method: 'DELETE', body: { password: new FormData(e.currentTarget).get('password') } }); setDone(true); } catch (err) { setError(err.message); } finally { setBusy(false); } }}><ErrorBox error={error}/><Field label="Confirm your password"><input type="password" name="password" autoComplete="current-password" required maxLength={72}/></Field><label className="check-field"><input type="checkbox" required/><span>I understand that I will lose access and this action cannot be undone.</span></label><button className="button danger" disabled={busy}>{busy ? 'Deleting…' : 'Permanently delete my account'}</button><p><Link className="text-link" href="/login">Sign in first if you are not already signed in</Link></p></form>;
}
