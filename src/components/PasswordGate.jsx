import { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { trackEvent } from '../analytics';
import LogoLoader from './LogoLoader';
import { assetUrl } from '../utils/protectedAsset';
import imgFacadePattern from '../assets/case-study/digital-twin/facade-pattern.webp';

// Derive the Vercel API base from the chat URL (same origin), e.g.
// "http://localhost:3000/api/chat" -> "http://localhost:3000/api".
const API_BASE = (import.meta.env.VITE_CHAT_API_URL || '/api/chat').replace(/\/chat$/, '');
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const L = {
  en: {
    heading: 'Protected case study',
    requestHeading: 'Access request',
    intro: 'Enter the password to continue.',
    placeholder: 'Password',
    showPw: 'Show password',
    hidePw: 'Hide password',
    submit: 'Unlock',
    checking: 'Unlocking…',
    wrong: 'Incorrect password.',
    error: 'Something went wrong. Please try again.',
    invalidEmail: 'Please enter a valid email address.',
    loading: 'Loading…',
    noAccess: 'No password?',
    requestCta: 'Request access',
    namePlaceholder: 'Name',
    emailPlaceholder: 'Email',
    notePlaceholder: 'A quick note',
    sendRequest: 'Send request',
    sending: 'Sending…',
    requestSentHeading: 'Request sent',
    requestSent: 'Thanks, I’ll be in touch soon.',
    backToHome: 'Back to case studies',
    cancel: 'Cancel',
    back: 'Back',
    requiredLegend: '* Required',
    clear: 'Clear',
  },
  fr: {
    heading: 'Étude de cas protégée',
    requestHeading: 'Demande d’accès',
    intro: 'Saisissez le mot de passe pour continuer.',
    placeholder: 'Mot de passe',
    showPw: 'Afficher le mot de passe',
    hidePw: 'Masquer le mot de passe',
    submit: 'Déverrouiller',
    checking: 'Déverrouillage…',
    wrong: 'Mot de passe incorrect.',
    error: 'Une erreur s\'est produite. Veuillez réessayer.',
    invalidEmail: 'Veuillez saisir une adresse email valide.',
    loading: 'Chargement…',
    noAccess: 'Pas de mot de passe ?',
    requestCta: 'Demander l’accès',
    namePlaceholder: 'Nom',
    emailPlaceholder: 'Email',
    notePlaceholder: 'Un petit mot',
    sendRequest: 'Envoyer la demande',
    sending: 'Envoi…',
    requestSentHeading: 'Demande envoyée',
    requestSent: 'Merci, je vous recontacterai bientôt.',
    backToHome: 'Retour aux études de cas',
    cancel: 'Annuler',
    back: 'Retour',
    requiredLegend: '* Obligatoire',
    clear: 'Effacer',
  },
};

// Gates `children(content, token)` behind a shared password.
// Stores the signed token (default 7-day lifetime) in localStorage so a viewer
// can return across sessions; the server re-validates signature + expiry on
// every request, so a stale token is harmless.
export default function PasswordGate({
  lang = 'en',
  storageKey = 'gate:digital-twin',
  unlockPath = '/unlock',
  contentPath = '/digital-twin',
  heroImagePath = 'digital-twin/hero.digital-twin-hero.webp',
  children,
}) {
  const l = L[lang] || L.en;
  const [token, setToken] = useState(() => {
    try { return localStorage.getItem(storageKey); } catch { return null; }
  });
  const [content, setContent] = useState(null);
  const [status, setStatus] = useState(token ? 'loading' : 'locked'); // locked | loading | unlocked | error
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [msg, setMsg] = useState('');
  const inputRef = useRef(null);
  const [requestOpen, setRequestOpen] = useState(false);
  const [requestName, setRequestName] = useState('');
  const [requestEmail, setRequestEmail] = useState('');
  const [emailFocused, setEmailFocused] = useState(false);
  const [requestNote, setRequestNote] = useState('');
  const [requestState, setRequestState] = useState('idle'); // idle | sending | sent | error
  const [requestErrorMsg, setRequestErrorMsg] = useState('');
  const [dimReady, setDimReady] = useState(false);

  // Fades the loading screen's vignette in on mount, rather than having it
  // snap on instantly, so the dimming reads as an intentional animation —
  // matching the ambient feel of the loader itself.
  useEffect(() => {
    if (status !== 'loading') return;
    setDimReady(false);
    const id = requestAnimationFrame(() => setDimReady(true));
    return () => cancelAnimationFrame(id);
  }, [status]);

  const clearToken = useCallback(() => {
    try { localStorage.removeItem(storageKey); } catch { /* ignore */ }
    setToken(null);
  }, [storageKey]);

  // Fetch gated content whenever we hold a token (and on language change).
  const loadContent = useCallback(async (tok) => {
    setStatus('loading');
    try {
      const res = await fetch(`${API_BASE}${contentPath}?lang=${lang}`, {
        headers: { Authorization: `Bearer ${tok}` },
      });
      if (res.status === 401) { clearToken(); setStatus('locked'); return; }
      if (!res.ok) { setStatus('error'); setMsg(l.error); return; }
      setContent(await res.json());
      setStatus('unlocked');
    } catch {
      setStatus('error');
      setMsg(l.error);
    }
  }, [contentPath, lang, l.error, clearToken]);

  useEffect(() => {
    // Fetching gated content is exactly the external-sync an effect is for.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (token) loadContent(token);
  }, [token, loadContent]);

  useEffect(() => {
    if (status === 'locked') setTimeout(() => inputRef.current?.focus(), 100);
  }, [status]);

  const submit = async (e) => {
    e.preventDefault();
    // Read the live DOM value, not React state: Chrome autofill doesn't always
    // fire onChange, so `password` can lag behind what's actually in the field.
    // Trim to absorb stray whitespace from autofill/paste.
    const pw = ((inputRef.current?.value ?? password) || '').trim();
    if (!pw || status === 'checking') return;
    setStatus('checking');
    setMsg('');
    try {
      const res = await fetch(`${API_BASE}${unlockPath}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: pw }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.status === 401) { setStatus('locked'); setMsg(l.wrong); setPassword(''); return; }
      if (!res.ok || !data.token) { setStatus('locked'); setMsg(l.error); return; }
      try { localStorage.setItem(storageKey, data.token); } catch { /* ignore */ }
      trackEvent('case_study_unlock', { scope: storageKey });
      setPassword('');
      setToken(data.token); // triggers loadContent
    } catch {
      setStatus('locked');
      setMsg(l.error);
    }
  };

  const submitRequest = async () => {
    const email = requestEmail.trim();
    if (!email || requestState === 'sending') return;
    if (!EMAIL_RE.test(email)) {
      setRequestErrorMsg(l.invalidEmail);
      setRequestState('error');
      return;
    }
    setRequestState('sending');
    try {
      const res = await fetch(`${API_BASE}/request-access`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: requestName.trim(), email, note: requestNote.trim(), scope: storageKey }),
      });
      if (!res.ok) { setRequestErrorMsg(l.error); setRequestState('error'); return; }
      trackEvent('case_study_access_request', { scope: storageKey });
      setRequestState('sent');
    } catch {
      setRequestErrorMsg(l.error);
      setRequestState('error');
    }
  };

  if (status === 'unlocked' && content) return children(content, token);

  if (status === 'loading') {
    // A stored token means this viewer already unlocked the case study in a
    // prior session, so the hero image (otherwise gated behind the token) is
    // fair game here — fetching it via assetUrl keeps it token-gated for
    // anyone without one. Rendered as an <img object-cover>, matching the
    // Hero's own markup exactly (rather than a CSS `background` with
    // `bg-fixed`), so the crop/position is identical whether or not a
    // scrollbar is present — a `bg-fixed` background is sized against the
    // viewport, so it shifts a few pixels once the page below the fold makes
    // the scrollbar appear on unlock, while `object-cover` is sized against
    // the element's own box either way.
    return (
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-bg-page">
        <img
          src={assetUrl(heroImagePath, token)}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
          draggable="false"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/95 transition-opacity duration-700"
          style={{ opacity: dimReady ? 1 : 0 }}
        />
        <LogoLoader label={l.loading} className="relative z-10" />
      </div>
    );
  }

  // Locked / checking / error -> password form
  return (
    <main
      id="main-content"
      className="min-h-screen flex items-center justify-center bg-bg-page bg-cover bg-center bg-fixed px-6"
      style={{ backgroundImage: `url(${imgFacadePattern})` }}
    >
      <form onSubmit={submit} className="w-full max-w-sm text-center backdrop-blur-3 bg-nav-bg ring-1 ring-tw-700 dark:ring-nav-ring rounded-radius-10 shadow-m px-8 pt-8 pb-8">
        {requestOpen && requestState === 'sent' ? (
          <h1 className="flex items-center justify-center gap-3 text-h3 font-semibold text-fg-primary mb-4">
            {l.requestSentHeading}
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="text-fg-primary">
              <circle cx="12" cy="12" r="10" />
              <path d="M8 12l3 3 5-6" />
            </svg>
          </h1>
        ) : requestOpen ? (
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 shrink-0">
              <button
                type="button"
                onClick={() => { setRequestOpen(false); setRequestState('idle'); }}
                aria-label={l.back}
                className="flex items-center justify-center w-10 h-10 rounded-full text-fg-primary hover:bg-btn-nav-bg-rest transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
              >
                <svg width="20" height="20" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
                  <path d="M18.4874 26.7922C19.2238 27.3928 20.3097 27.3504 20.9962 26.6642C21.7284 25.932 21.7284 24.7441 20.9962 24.0119L12.9894 16.006L20.9962 7.99822L21.1251 7.85662C21.726 7.12017 21.6828 6.03342 20.9962 5.34686C20.3098 4.66064 19.2238 4.61755 18.4874 5.21795L18.3448 5.34686L9.01182 14.6799C8.27995 15.4121 8.27987 16.5991 9.01182 17.3312L18.3448 26.6642L18.4874 26.7922Z" />
                </svg>
              </button>
            </div>
            <h1 className="flex-1 text-h3 font-semibold text-fg-primary whitespace-nowrap">{l.requestHeading}</h1>
            <div className="w-10 shrink-0" aria-hidden="true" />
          </div>
        ) : (
          <h1 className="text-h3 font-semibold text-fg-primary mb-4">{l.heading}</h1>
        )}
        {!requestOpen && <p className="text-copy-s mb-8 text-fg-muted">{l.intro}</p>}
        {!requestOpen && (
          <>
            <div className="relative">
              <input
                ref={inputRef}
                id="gate-password"
                type={showPw ? 'text' : 'password'}
                value={password}
                onChange={(e) => { setPassword(e.target.value); if (msg) setMsg(''); }}
                onClick={() => { if (msg) setMsg(''); }}
                placeholder=" "
                autoComplete="current-password"
                maxLength={128}
                className={`peer w-full pl-5 pr-12 pt-6 pb-1.5 rounded-radius-7 bg-bg-surface border text-fg-primary text-copy-m outline-none focus-visible:ring-2 ${msg ? 'border-red-700 dark:border-red-400 focus-visible:ring-red-700 dark:focus-visible:ring-red-400 input-shake' : 'border-border-subtle focus-visible:ring-border-focus'}`}
              />
              <label
                htmlFor="gate-password"
                className="absolute left-5 top-1/2 -translate-y-1/2 origin-left text-copy-m text-fg-muted transition-transform duration-200 ease-out pointer-events-none peer-focus:-translate-y-[calc(50%+12px)] peer-focus:scale-75 peer-[:not(:placeholder-shown)]:-translate-y-[calc(50%+12px)] peer-[:not(:placeholder-shown)]:scale-75"
              >
                {l.placeholder}
              </label>
              <button
                type="button"
                onClick={() => setShowPw((v) => !v)}
                aria-label={showPw ? l.hidePw : l.showPw}
                aria-pressed={showPw}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 flex items-center justify-center w-9 h-9 rounded-full text-fg-muted hover:text-fg-primary hover:bg-btn-nav-bg-rest transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
              >
                {showPw ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 7 11 7a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <path d="M6.61 6.61A18.45 18.45 0 0 0 1 12s4 7 11 7a9.12 9.12 0 0 0 5.39-1.61" />
                    <line x1="2" y1="2" x2="22" y2="22" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7Z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
            <p className="min-h-[1.5rem] my-1 text-copy-s text-red-700 dark:text-red-400" role="alert">{msg}</p>
            <button
              type="submit"
              disabled={status === 'checking' || !password.trim()}
              className="w-full px-6 py-3 rounded-full bg-cta-600 enabled:hover:bg-cta-700 text-fg-on-accent-opacity-95 text-btn-m font-medium border border-accent-border transition-colors disabled:opacity-50 disabled:cursor-not-allowed enabled:cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2 flex items-center justify-center gap-2"
            >
              {status === 'checking' && (
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                  <path className="opacity-90" d="M22 12a10 10 0 0 0-10-10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                </svg>
              )}
              {status === 'checking' ? l.checking : l.submit}
            </button>
          </>
        )}
        {!requestOpen ? (
          <p className="mt-8 text-copy-s text-fg-muted">
            {l.noAccess}{' '}
            <button
              type="button"
              onClick={() => setRequestOpen(true)}
              className="text-fg-primary underline underline-offset-2 decoration-1 hover:decoration-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus rounded-radius-1 cursor-pointer"
            >
              {l.requestCta}
            </button>
          </p>
        ) : requestState === 'sent' ? (
          <>
            <p className="mt-8 text-copy-s text-fg-secondary" role="status">{l.requestSent}</p>
            <Link
              to="/#case-studies"
              data-spring
              className="mt-8 inline-flex w-full items-center justify-center px-6 py-3 rounded-full bg-cta-600 hover:bg-cta-700 text-fg-on-accent-opacity-95 text-btn-m font-medium border border-accent-border transition-colors"
            >
              {l.backToHome}
            </Link>
          </>
        ) : (
          <div className="mt-8 text-left">
            <div className="relative mb-8">
              <input
                id="request-name"
                type="text"
                value={requestName}
                onChange={(e) => setRequestName(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); submitRequest(); } }}
                placeholder=" "
                autoComplete="name"
                maxLength={100}
                className="peer w-full pl-5 pr-11 pt-6 pb-1.5 rounded-radius-7 bg-bg-surface border border-border-subtle text-fg-primary text-copy-s outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
              />
              <label
                htmlFor="request-name"
                className="absolute left-5 top-1/2 -translate-y-1/2 origin-left text-copy-s text-fg-muted transition-transform duration-200 ease-out pointer-events-none peer-focus:-translate-y-[calc(50%+12px)] peer-focus:scale-75 peer-[:not(:placeholder-shown)]:-translate-y-[calc(50%+12px)] peer-[:not(:placeholder-shown)]:scale-75"
              >
                {l.namePlaceholder}
              </label>
              {requestName && (
                <button
                  type="button"
                  onClick={() => setRequestName('')}
                  aria-label={l.clear}
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-glass-subtle text-fg-muted hover:text-fg-primary hover:bg-btn-nav-bg-rest transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round" aria-hidden="true">
                    <line x1="6" y1="6" x2="18" y2="18" />
                    <line x1="18" y1="6" x2="6" y2="18" />
                  </svg>
                </button>
              )}
            </div>
            <div className="relative mb-1">
              <input
                id="request-email"
                type="email"
                value={requestEmail}
                onChange={(e) => { setRequestEmail(e.target.value); if (requestState === 'error') setRequestState('idle'); }}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); submitRequest(); } }}
                onFocus={() => setEmailFocused(true)}
                onBlur={() => {
                  setEmailFocused(false);
                  const email = requestEmail.trim();
                  if (!email) { if (requestState === 'error') setRequestState('idle'); return; }
                  if (!EMAIL_RE.test(email)) {
                    setRequestErrorMsg(l.invalidEmail);
                    setRequestState('error');
                  } else if (requestState === 'error') {
                    setRequestState('idle');
                  }
                }}
                placeholder=" "
                autoComplete="email"
                maxLength={254}
                className={`peer w-full pl-5 pr-11 pt-6 pb-1.5 rounded-radius-7 bg-bg-surface border text-fg-primary text-copy-s outline-none focus-visible:ring-2 ${requestState === 'error' ? 'border-red-700 dark:border-red-400 focus-visible:ring-red-700 dark:focus-visible:ring-red-400 input-shake' : 'border-border-subtle focus-visible:ring-border-focus'}`}
              />
              <label
                htmlFor="request-email"
                className="absolute left-5 top-1/2 -translate-y-1/2 origin-left text-copy-s text-fg-muted transition-transform duration-200 ease-out pointer-events-none peer-focus:-translate-y-[calc(50%+12px)] peer-focus:scale-75 peer-[:not(:placeholder-shown)]:-translate-y-[calc(50%+12px)] peer-[:not(:placeholder-shown)]:scale-75"
              >
                {l.emailPlaceholder}
                {!(emailFocused || requestEmail) && <span className="text-red-700 dark:text-red-400"> *</span>}
              </label>
              {requestEmail && (
                <button
                  type="button"
                  onClick={() => setRequestEmail('')}
                  aria-label={l.clear}
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-glass-subtle text-fg-muted hover:text-fg-primary hover:bg-btn-nav-bg-rest transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round" aria-hidden="true">
                    <line x1="6" y1="6" x2="18" y2="18" />
                    <line x1="18" y1="6" x2="6" y2="18" />
                  </svg>
                </button>
              )}
            </div>
            <p className="text-right pr-3.5 text-fine-print text-fg-muted mb-3">{l.requiredLegend}</p>
            <div className="relative mb-3">
              <textarea
                id="request-note"
                value={requestNote}
                onChange={(e) => setRequestNote(e.target.value)}
                placeholder=" "
                maxLength={500}
                rows={2}
                className="peer w-full pl-5 pr-11 pt-6 pb-1.5 rounded-radius-7 bg-bg-surface border border-border-subtle text-fg-primary text-copy-s outline-none resize-none focus-visible:ring-2 focus-visible:ring-border-focus"
              />
              <label
                htmlFor="request-note"
                className="absolute left-5 top-4 origin-left text-copy-s text-fg-muted transition-transform duration-200 ease-out pointer-events-none peer-focus:-translate-y-3 peer-focus:scale-75 peer-[:not(:placeholder-shown)]:-translate-y-3 peer-[:not(:placeholder-shown)]:scale-75"
              >
                {l.notePlaceholder}
              </label>
              {requestNote && (
                <button
                  type="button"
                  onClick={() => setRequestNote('')}
                  aria-label={l.clear}
                  className="absolute right-1.5 top-1.5 flex items-center justify-center w-8 h-8 rounded-full bg-glass-subtle text-fg-muted hover:text-fg-primary hover:bg-btn-nav-bg-rest transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round" aria-hidden="true">
                    <line x1="6" y1="6" x2="18" y2="18" />
                    <line x1="18" y1="6" x2="6" y2="18" />
                  </svg>
                </button>
              )}
            </div>
            <p className="min-h-[1.5rem] mb-3 text-center text-copy-s text-red-700 dark:text-red-400" role="alert">
              {requestState === 'error' ? requestErrorMsg : ''}
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => { setRequestOpen(false); setRequestState('idle'); }}
                className="px-4 py-2 rounded-full text-copy-s text-fg-muted hover:text-fg-primary transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
              >
                {l.cancel}
              </button>
              <button
                type="button"
                onClick={submitRequest}
                disabled={requestState === 'sending' || !requestEmail.trim()}
                className="flex-1 px-4 py-2 rounded-full bg-cta-600 enabled:hover:bg-cta-700 text-fg-on-accent-opacity-95 text-copy-s font-medium border border-accent-border transition-colors disabled:opacity-50 disabled:cursor-not-allowed enabled:cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus flex items-center justify-center gap-2"
              >
                {requestState === 'sending' && (
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                    <path className="opacity-90" d="M22 12a10 10 0 0 0-10-10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                )}
                {requestState === 'sending' ? l.sending : l.sendRequest}
              </button>
            </div>
          </div>
        )}
      </form>
    </main>
  );
}
