// On-site FAQ assistant. Rule-based: chips and keyword matching over the approved
// answers in i18n/chat.ts. Everything is written with textContent (no HTML from input).
import { chatCopy, type Intent } from '../i18n/chat';
import { CONTACT_EMAIL, WHATSAPP } from '../consts';
import { track } from './analytics';

const root = document.querySelector<HTMLElement>('[data-chat]');
if (root) {
  const lang = root.dataset.lang === 'en' ? 'en' : 'es';
  const copy = chatCopy[lang];
  const panel = root.querySelector<HTMLElement>('[data-chat-panel]')!;
  const launcher = root.querySelector<HTMLButtonElement>('[data-chat-open]')!;
  const log = root.querySelector<HTMLElement>('[data-chat-log]')!;
  const chips = root.querySelector<HTMLElement>('[data-chat-chips]')!;
  const form = root.querySelector<HTMLFormElement>('[data-chat-form]')!;
  const input = root.querySelector<HTMLInputElement>('[data-chat-input]')!;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const byId = new Map(copy.intents.map(i => [i.id, i]));
  let started = false, busy = false;

  const hrefs: Record<NonNullable<Intent['actions']>[number], string> = {
    whatsapp: WHATSAPP.url, questionnaire: '#cuestionario', signature: '#signature',
    custom: '#a-medida', mail: `mailto:${CONTACT_EMAIL}`, calendar: '#cuestionario',
  };

  const normalize = (text: string) => text.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9ñ ]+/g, ' ').replace(/\s+/g, ' ').trim();

  // Score each intent: whole phrase for multi-word keywords, word prefix for longer stems.
  function match(text: string): Intent | undefined {
    const clean = ` ${normalize(text)} `, words = clean.trim().split(' ');
    let best: Intent | undefined, score = 0;
    for (const intent of copy.intents) {
      let s = 0;
      for (const kw of intent.keywords) {
        const k = normalize(kw);
        if (k.includes(' ')) { if (clean.includes(` ${k} `)) s += 2; }
        else if (words.some(w => (k.length >= 4 ? w.startsWith(k) : w === k))) s += 1;
      }
      if (s > score) { score = s; best = intent; }
    }
    return best;
  }

  function bubble(kind: 'bot' | 'user', lines: string[], actions: Intent['actions'] = []) {
    const msg = document.createElement('div');
    msg.className = `msg msg--${kind}`;
    for (const line of lines) { const p = document.createElement('p'); p.textContent = line; msg.append(p); }
    if (actions.length) {
      const row = document.createElement('div');
      row.className = 'msg__actions';
      for (const action of actions) {
        const a = document.createElement('a');
        a.textContent = copy.actions[action];
        a.href = hrefs[action];
        if (action === 'whatsapp') { a.target = '_blank'; a.rel = 'noopener noreferrer'; a.addEventListener('click', () => track('cta_whatsapp', { idioma: lang })); }
        if (hrefs[action].startsWith('#')) a.addEventListener('click', () => close(false));
        row.append(a);
      }
      msg.append(row);
    }
    log.append(msg);
    log.scrollTop = log.scrollHeight;
  }

  function offer(ids: string[]) {
    chips.replaceChildren();
    for (const id of ids) {
      const intent = byId.get(id); if (!intent) continue;
      const b = document.createElement('button');
      b.type = 'button'; b.textContent = intent.chip;
      b.addEventListener('click', () => ask(intent.chip, intent));
      chips.append(b);
    }
  }

  async function reply(intent: Intent | undefined) {
    busy = true;
    if (!reduced.matches) {
      const typing = document.createElement('div');
      typing.className = 'msg msg--bot msg--typing';
      typing.setAttribute('aria-hidden', 'true');
      typing.append(document.createElement('i'), document.createElement('i'), document.createElement('i'));
      log.append(typing); log.scrollTop = log.scrollHeight;
      await new Promise(r => setTimeout(r, 420));
      typing.remove();
    }
    if (intent) { bubble('bot', intent.answer, intent.actions); offer(intent.next ?? copy.start); }
    else { bubble('bot', copy.fallback, ['whatsapp']); offer(copy.start); }
    // The chips change the log height, so scroll once they are in place.
    log.scrollTop = log.scrollHeight;
    busy = false;
  }

  function ask(text: string, intent?: Intent) {
    if (busy) return;
    bubble('user', [text]);
    void reply(intent ?? match(text));
  }

  function open() {
    panel.hidden = false;
    root!.dataset.open = '';
    launcher.setAttribute('aria-expanded', 'true');
    if (!started) { started = true; bubble('bot', [copy.greeting]); offer(copy.start); track('chat_abierto', { idioma: lang }); }
    input.focus({ preventScroll: true });
  }
  function close(returnFocus = true) {
    panel.hidden = true;
    delete root!.dataset.open;
    launcher.setAttribute('aria-expanded', 'false');
    if (returnFocus) launcher.focus({ preventScroll: true });
  }

  launcher.addEventListener('click', open);
  root.querySelector('[data-chat-close]')!.addEventListener('click', () => close());
  panel.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
  form.addEventListener('submit', e => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    input.value = '';
    ask(text);
  });
}
