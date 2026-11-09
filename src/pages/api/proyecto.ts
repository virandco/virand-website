// POST /api/proyecto: receives the project form and emails it through Resend.
// This is the only route that is not prerendered; the rest of the site is static.
//
// Order of checks: origin, rate limit, size and format, honeypot, fill time,
// validation, service availability, send. Personal data is never logged.
import type { APIRoute } from 'astro';
import { CONTACT_FROM, RESEND_API_KEY } from 'astro:env/server';
import { CONTACT_EMAIL } from '../../consts';
import { checkFillTime, isHoneypotTripped, rateLimit } from '../../lib/antiBot';
import { composeEmail, sendWithResend, validateProject } from '../../lib/projectForm';

export const prerender = false;

/** Where project requests are delivered: always the public contact inbox. */
const INBOX = CONTACT_EMAIL;

const MAX_BODY_BYTES = 16 * 1024;
const ATTEMPTS = { max: 20, windowMs: 10 * 60_000 }; // any request
const SENDS = { max: 3, windowMs: 10 * 60_000 }; // valid requests that reach the inbox

const json = (body: Record<string, unknown>, status = 200, extra: Record<string, string> = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      ...extra,
    },
  });

/** Browsers always send Origin on cross-site POSTs; refuse any that is not ours. */
function sameOrigin(request: Request): boolean {
  const origin = request.headers.get('origin');
  if (!origin) return true; // non-browser clients; the other checks still apply
  try {
    const host = new URL(origin).host;
    return host === new URL(request.url).host;
  } catch {
    return false;
  }
}

const handle: APIRoute = async ({ request, clientAddress }) => {
  if (!sameOrigin(request)) return json({ ok: false, code: 'forbidden' }, 403);

  let ip = 'unknown';
  try {
    ip = clientAddress || 'unknown';
  } catch {
    // no client address available
  }

  const attempts = rateLimit(`attempt:${ip}`, ATTEMPTS);
  if (!attempts.allowed) {
    return json({ ok: false, code: 'rate_limited' }, 429, {
      'Retry-After': String(attempts.retryAfterSec),
    });
  }

  // Size and format.
  const declared = Number(request.headers.get('content-length') ?? '0');
  if (declared > MAX_BODY_BYTES) return json({ ok: false, code: 'too_large' }, 413);

  const raw = await request.text();
  if (new TextEncoder().encode(raw).length > MAX_BODY_BYTES) return json({ ok: false, code: 'too_large' }, 413);

  const type = (request.headers.get('content-type') ?? '').toLowerCase();
  let body: Record<string, unknown>;
  try {
    if (type.includes('application/json')) {
      const parsed: unknown = JSON.parse(raw);
      if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) throw new Error();
      body = parsed as Record<string, unknown>;
    } else if (type.includes('application/x-www-form-urlencoded')) {
      const params = new URLSearchParams(raw);
      body = { ...Object.fromEntries(params), needs: params.getAll('needs') };
    } else {
      return json({ ok: false, code: 'unsupported' }, 415);
    }
  } catch {
    return json({ ok: false, code: 'invalid' }, 400);
  }

  // Honeypot: answer as if it worked, so bots learn nothing. Nothing is sent.
  if (isHoneypotTripped(body.website)) return json({ ok: true });

  // Minimum fill time.
  const fill = checkFillTime(body.ts);
  if (fill === 'too_fast') return json({ ok: false, code: 'too_fast' }, 429);
  if (fill === 'invalid') return json({ ok: false, code: 'invalid' }, 400);

  const result = validateProject(body);
  if (!result.ok) return json({ ok: false, code: 'validation', errors: result.errors }, 422);

  // TURNSTILE would be verified here (see lib/antiBot.ts).

  if (!RESEND_API_KEY || !CONTACT_FROM) {
    return json({ ok: false, code: 'unavailable' }, 503);
  }

  const sends = rateLimit(`send:${ip}`, SENDS);
  if (!sends.allowed) {
    return json({ ok: false, code: 'rate_limited' }, 429, {
      'Retry-After': String(sends.retryAfterSec),
    });
  }

  const { subject, text } = composeEmail(result.data);
  const sent = await sendWithResend({
    apiKey: RESEND_API_KEY,
    from: CONTACT_FROM,
    to: INBOX,
    subject,
    text,
    replyTo: result.data.contactKind === 'email' ? result.data.contact : undefined,
  });

  if (!sent.ok) {
    // Status only. Never the payload, the response body or any field.
    console.error(`[proyecto] resend failed, status ${sent.status}`);
    return json({ ok: false, code: 'send_failed' }, 502);
  }

  return json({ ok: true });
};

/**
 * Entry point. Anything unexpected becomes a generic 500: no stack trace, no
 * error message and no request data leave the server or reach the logs.
 */
export const POST: APIRoute = async (context) => {
  try {
    return await handle(context);
  } catch {
    console.error('[proyecto] unexpected error');
    return json({ ok: false, code: 'server_error' }, 500);
  }
};

/** Any other method is not allowed. */
export const ALL: APIRoute = () =>
  json({ ok: false, code: 'method_not_allowed' }, 405, { Allow: 'POST' });
