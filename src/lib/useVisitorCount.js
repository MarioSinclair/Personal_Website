import { useEffect, useState } from 'react';

const SEEN_KEY = 'ms-boarded';

// Reads the visitor count from /api/visits (a Vercel function backed by Upstash Redis).
// A browser's first visit increments the count; later visits only read it.
// In `npm run dev` there is no API, so it shows a fixed preview number instead.
export default function useVisitorCount() {
  const [state, setState] = useState({ count: null, status: 'loading' });

  useEffect(() => {
    if (import.meta.env.DEV) {
      setState({ count: 1337, status: 'preview' });
      return undefined;
    }
    let cancelled = false;
    let seen = false;
    try { seen = localStorage.getItem(SEEN_KEY) === '1'; } catch { /* storage blocked */ }
    fetch('/api/visits', { method: seen ? 'GET' : 'POST' })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((data) => {
        if (cancelled) return;
        if (typeof data.count !== 'number') throw new Error('bad payload');
        try { localStorage.setItem(SEEN_KEY, '1'); } catch { /* storage blocked */ }
        setState({ count: data.count, status: 'live' });
      })
      .catch(() => { if (!cancelled) setState({ count: null, status: 'off' }); });
    return () => { cancelled = true; };
  }, []);

  return state;
}
