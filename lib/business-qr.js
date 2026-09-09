import QRCode from 'qrcode';
import { businessUrl } from './business-url';
const escapeXml = value => String(value).replace(/[<>&"']/g, c => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;' })[c]);
export async function createBusinessPoster(business) {
  const url = businessUrl(business._id);
  const qr = await QRCode.toString(url, { type: 'svg', errorCorrectionLevel: 'H', margin: 4, color: { dark: '#400039', light: '#ffffff' } });
  const viewBox = qr.match(/viewBox="([^"]+)"/)[1];
  const paths = qr.replace(/^<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '');
  const name = String(business.name || 'Our business').slice(0, 160);
  const lines = name.match(/.{1,32}(?:\s|$)|.{1,32}/g).map(line => line.trim());
  const qrTop = 130 + lines.length * 52, height = qrTop + 990;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="${height}" viewBox="0 0 1000 ${height}"><rect width="100%" height="100%" fill="#ffffff"/><g fill="#400039" font-family="Arial, sans-serif" text-anchor="middle"><text x="500" y="65" font-size="18" letter-spacing="3">WELCOME TO</text>${lines.map((line, i) => `<text x="500" y="${130 + i * 52}" font-size="42" font-weight="bold">${escapeXml(line)}</text>`).join('')}<text x="500" y="${qrTop + 845}" font-size="27" font-weight="bold">Scan to view our services and prices</text><text x="500" y="${qrTop + 890}" font-size="21">Open your phone camera, scan, and tap the link.</text><text x="500" y="${qrTop + 935}" font-size="18">https://drycleaning.finbudtechnologies.com</text><text x="500" y="${qrTop + 961}" font-size="18">/${business._id.toLowerCase()}</text></g><svg x="100" y="${qrTop}" width="800" height="800" viewBox="${viewBox}">${paths}</svg></svg>`;
  return { svg, url, height };
}
export async function posterPng(svg, height) {
  const blobUrl = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' }));
  try {
    const picture = new Image();
    await new Promise((resolve, reject) => { picture.onload = resolve; picture.onerror = () => reject(new Error('Could not prepare the QR image. Please try again.')); picture.src = blobUrl; });
    const canvas = document.createElement('canvas'); canvas.width = 2000; canvas.height = height * 2;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('This browser cannot export images.');
    ctx.drawImage(picture, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL('image/png');
  } finally { URL.revokeObjectURL(blobUrl); }
}
