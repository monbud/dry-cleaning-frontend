'use client';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { QrCode, Download, Printer, Copy } from 'lucide-react';
import { Modal, ErrorBox } from './ui';
import { createBusinessPoster, posterPng } from '../lib/business-qr';

export default function BusinessQrCode({ business }) {
  const [open, setOpen] = useState(false);
  return <div className="business-qr-entry"><button type="button" className="button secondary small" disabled={!business.listed} onClick={() => setOpen(true)}><QrCode size={17}/> Business QR code</button>{!business.listed && <small className="muted">Enable public listing to generate a QR code for customers.</small>}{open && business.listed && <QrDialog key={`${business._id}:${business.name}`} business={business} onClose={() => setOpen(false)}/>}</div>;
}
function QrDialog({ business, onClose }) {
  const [assets, setAssets] = useState(null), [error, setError] = useState(''), [ready, setReady] = useState(false), [copied, setCopied] = useState(false), [attempt, setAttempt] = useState(0);
  useEffect(() => {
    let active = true;
    setError(''); setAssets(null); setReady(false);
    (async () => { try { const poster = await createBusinessPoster(business); const png = await posterPng(poster.svg, poster.height); if (active) setAssets({ ...poster, png }); } catch (err) { if (active) setError(err.message); } })();
    return () => { active = false; };
  }, [business._id, business.name, attempt]);
  function download(format) {
    const name = business.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || business._id;
    const url = format === 'svg' ? URL.createObjectURL(new Blob([assets.svg], { type: 'image/svg+xml' })) : assets.png;
    const link = document.createElement('a'); link.href = url; link.download = `${name}-business-qr.${format}`; document.body.append(link); link.click(); link.remove();
    if (format === 'svg') setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return <><Modal title="Business QR code" onClose={onClose}><p className="muted">Display this at your counter or on a wall so customers can view your business and prices.</p><ErrorBox error={error}/>{error && !assets && <button className="button secondary" onClick={() => setAttempt(n => n + 1)}>Try again</button>}{!assets && !error && <p role="status">Preparing your QR code…</p>}{assets && <><div className="qr-poster-preview"><img src={assets.png} alt={`Printable QR code for ${business.name}`}/></div><p className="qr-destination">Links to <a href={assets.url} target="_blank" rel="noreferrer">{assets.url}</a></p><p className="muted">This uses your permanent live address. Scanning will open the page once the site is deployed at that domain. Keep your business publicly listed.</p><div className="qr-actions"><button className="button secondary small" onClick={() => download('png')}><Download size={15}/> Download PNG</button><button className="button secondary small" onClick={() => download('svg')}><Download size={15}/> Download SVG</button><button className="button small" disabled={!ready} onClick={() => window.print()}><Printer size={15}/> Print</button><button className="text-link" onClick={async () => { try { await navigator.clipboard.writeText(assets.url); setCopied(true); } catch { setError('Could not copy automatically. Select and copy the link above.'); } }}><Copy size={14}/>{copied ? 'Link copied' : 'Copy link'}</button></div><p className="muted">Print on white paper. Keep the white border around the code and test a scan before displaying it. The printed code stays valid when you change your prices.</p></>}</Modal>{assets && createPortal(<div className="qr-print-root"><img src={assets.png} alt={`QR poster for ${business.name}`} onLoad={() => setReady(true)}/></div>, document.body)}</>;
}
