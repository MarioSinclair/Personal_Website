/* global process */
// Visitor counter. Vercel serves this file at /api/visits.
// Storage: Upstash Redis over its REST API. Add "Upstash for Redis" from the Vercel Marketplace
// (Project > Storage) and Vercel injects the URL/token env vars below.
//   POST /api/visits -> increments and returns { count }
//   GET  /api/visits -> returns { count } without incrementing
const BASE = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
const TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
const KEY = 'portfolio:visits';

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'GET' && req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ error: 'Use GET or POST.' });
  }
  if (!BASE || !TOKEN) return res.status(503).json({ error: 'Counter storage is not configured.' });

  try {
    const command = req.method === 'POST' ? 'incr' : 'get';
    const r = await fetch(`${BASE}/${command}/${KEY}`, { headers: { Authorization: `Bearer ${TOKEN}` } });
    const body = await r.json();
    if (!r.ok) throw new Error(body.error || `Upstash returned ${r.status}`);
    return res.status(200).json({ count: Number(body.result) || 0 });
  } catch (err) {
    console.error('visits:', err);
    return res.status(502).json({ error: 'Counter is unavailable right now.' });
  }
}
