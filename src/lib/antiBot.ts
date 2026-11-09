// Anti-bot checks for the project form: honeypot, minimum fill time and a
// per-IP rate limit. Pure functions, no Astro imports.
//
// TURNSTILE (not implemented, door left open): to add Cloudflare Turnstile,
// verify the `cf-turnstile-response` token in `pages/api/proyecto.ts` right
// after the checks from this file pass and before sending, with an optional
// server secret declared in `astro.config.mjs`. Nothing here needs to change.

/** A person cannot fill the form faster than this. Autofill still needs a click. */
export const MIN_FILL_MS = 3000;

/** The honeypot field is hidden from people; only bots fill it in. */
export function isHoneypotTripped(value: unknown): boolean {
  return typeof value === 'string' && value.trim() !== '';
}

/**
 * `ts` is the page-load timestamp (ms) set by the client script.
 * 'invalid' = missing or from the future (script blocked or tampered with).
 */
export function checkFillTime(ts: unknown, now = Date.now()): 'ok' | 'too_fast' | 'invalid' {
  const value = typeof ts === 'string' ? Number(ts) : typeof ts === 'number' ? ts : NaN;
  if (!Number.isFinite(value) || value <= 0 || value > now + 60_000) return 'invalid';
  return now - value < MIN_FILL_MS ? 'too_fast' : 'ok';
}

// Sliding-window rate limit, in memory.
// Limitation: on a serverless host each instance keeps its own counters, so
// this is a best-effort brake against floods, not a hard guarantee. A shared
// store (for example Upstash Redis or Vercel KV) would make it exact.
const hits = new Map<string, number[]>();

export function rateLimit(
  key: string,
  { max, windowMs }: { max: number; windowMs: number },
  now = Date.now(),
): { allowed: boolean; retryAfterSec: number } {
  const recent = (hits.get(key) ?? []).filter((time) => now - time < windowMs);

  if (recent.length >= max) {
    hits.set(key, recent);
    return { allowed: false, retryAfterSec: Math.ceil((windowMs - (now - recent[0])) / 1000) };
  }

  recent.push(now);
  hits.set(key, recent);

  // Keep memory bounded.
  if (hits.size > 1000) {
    for (const [k, times] of hits) {
      if (times.every((time) => now - time >= windowMs)) hits.delete(k);
    }
  }
  return { allowed: true, retryAfterSec: 0 };
}

/** Test helper: clears all counters. */
export function resetRateLimits(): void {
  hits.clear();
}
