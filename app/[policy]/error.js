'use client';
export default function PageError({ reset }) { return <main className="public-page"><h1>This page is temporarily unavailable</h1><p>Please try again in a moment.</p><button className="button" onClick={reset}>Try again</button></main>; }
