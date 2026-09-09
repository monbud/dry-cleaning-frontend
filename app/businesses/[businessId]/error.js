'use client';
export default function ErrorPage({ reset }) {
  return <main className="public-page"><h1>Business details are unavailable</h1><p>Please try again in a moment.</p><button className="button" onClick={reset}>Try again</button></main>;
}
