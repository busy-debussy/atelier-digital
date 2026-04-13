import { useState, useRef, useEffect } from 'react';
import imgSend  from '../assets/icons/icon-send.svg';
import imgClose from '../assets/icons/icon-close-sm.svg';
import { trackEvent } from '../analytics';

const API_URL = import.meta.env.VITE_CHAT_API_URL || '/api/chat';
const MAX_TURNS = 6;

const L = {
  en: {
    button:      'Ask about my work',
    pill:        'Ask Claude about me',
    title:       'A.I. knows about me',
    empty:       "Ask anything about David's experience or work.",
    placeholder: 'Ask Claude…',
    send:        'Send',
    limit:       "That's the end of our chat — reach out directly for more.",
    error:       'Something went wrong. Please try again.',
    rateLimited: 'Too many requests. Please try again later.',
    remaining:   (n) => `${n} message${n === 1 ? '' : 's'} remaining`,
    cookieNotice: 'By using this chat you agree to the',
    cookieLink:   'cookies policy',
  },
  fr: {
    button:      'Poser une question',
    pill:        'Ask A.I. about David',
    title:       'L\'I.A. me connaît par 💙',
    empty:       "Posez une question sur l'expérience ou le travail de David.",
    placeholder: 'Demandez à Claude…',
    send:        'Envoyer',
    limit:       'Fin de la conversation — contactez David directement pour en savoir plus.',
    error:       'Une erreur s\'est produite. Veuillez réessayer.',
    rateLimited: 'Trop de requêtes. Veuillez réessayer plus tard.',
    remaining:   (n) => `${n} message${n === 1 ? '' : 's'} restant${n === 1 ? '' : 's'}`,
    cookieNotice: 'En utilisant ce chat vous acceptez notre',
    cookieLink:   'politique de cookies',
  },
};

const LINK_RE = /(https?:\/\/[^\s]+|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;
const EMAIL_RE = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function renderContent(text) {
  const parts = text.split(LINK_RE);
  return parts.map((part, i) => {
    if (/^https?:\/\//.test(part)) {
      return <a key={i} href={part} target="_blank" rel="noopener noreferrer" className="underline opacity-80 hover:opacity-100 transition-opacity">{part}</a>;
    }
    if (EMAIL_RE.test(part)) {
      return <a key={i} href={`mailto:${part}`} className="underline opacity-80 hover:opacity-100 transition-opacity">{part}</a>;
    }
    return part;
  });
}

export default function ChatBot({ lang = 'en', onOpenChange, hideFloating = false, fadeFloating = false }) {
  const l = L[lang] || L.en;
  const [open, setOpen] = useState(false);

  useEffect(() => { onOpenChange?.(open); if (open) trackEvent('chat_open'); }, [open, onOpenChange]);
  const [messages, setMessages] = useState([]);
  const [input, setInput]     = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef   = useRef(null);
  const inputRef    = useRef(null);
  const textareaRef = useRef(null);
  const closeRef    = useRef(null);

  const userTurns = messages.filter(m => m.role === 'user').length;
  const atLimit   = userTurns >= MAX_TURNS;

  const [pillExpanded, setPillExpanded] = useState(true);
  useEffect(() => {
    const id = setTimeout(() => setPillExpanded(false), 3000);
    return () => clearTimeout(id);
  }, []);

  // Scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // Keyboard shortcuts: C (toggle), Escape (close)
  useEffect(() => {
    const toggle = () => setOpen(o => !o);
    const close  = () => setOpen(false);
    window.addEventListener('toggle-chat', toggle);
    window.addEventListener('close-chat',  close);
    return () => {
      window.removeEventListener('toggle-chat', toggle);
      window.removeEventListener('close-chat',  close);
    };
  }, []);

  // Focus input when panel opens
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open]);

  // Auto-resize textarea
  const handleInputChange = (e) => {
    setInput(e.target.value);
    const el = textareaRef.current;
    if (el) {
      el.style.height = 'auto';
      el.style.height = `${Math.max(42, Math.min(el.scrollHeight, 100))}px`;
    }
  };

  const send = async () => {
    const text = input.trim();
    if (!text || loading || atLimit) return;

    const updated = [...messages, { role: 'user', content: text }];
    setMessages(updated);
    setInput('');
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
    setLoading(true);

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updated }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.content || data.error || l.error,
      }]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: l.error }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Dismiss overlay */}
      {open && <div className="fixed inset-0 z-[399]" onClick={() => setOpen(false)} aria-hidden="true" />}
      {/* Chat panel */}
      <div
        {...(open ? { role: 'dialog', 'aria-modal': 'true', 'aria-labelledby': 'chatbot-title', 'aria-live': 'polite' } : {})}
        inert={!open}
        className={`fixed bottom-4 z-[400] transition-all duration-300 ease-out ${
          open ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-3 pointer-events-none'
        }`}
        style={{ left: '16px', right: '16px', maxWidth: '380px' }}
      >
        <div className="bg-black/95 dark:bg-white/95 backdrop-blur-[16px] rounded-radius-7 shadow-m flex flex-col overflow-hidden" style={{ maxHeight: '520px' }}>

          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 shrink-0">
            <span id="chatbot-title" className="text-h6 font-semibold leading-tight text-fg-primary-inverse">{l.title}</span>
            <button
              ref={closeRef}
              data-spring
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="group flex items-center justify-center p-2.5 rounded-full hover:bg-white dark:hover:bg-bg-surface transition-[background-color] duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 -mt-2 -mr-3"
            >
              <img
                src={imgClose}
                alt=""
                width={16} height={16}
                className="invert dark:invert-0 group-hover:invert-0 dark:group-hover:invert transition-[filter] duration-150"
              />
            </button>
          </div>

          {/* Cookie notice */}
          <p className="px-5 pb-3 text-fine-print leading-normal text-fg-primary-inverse/40 shrink-0">
            {l.cookieNotice}{' '}
            <a href="/cookies" className="underline text-fg-primary-inverse hover:opacity-70 transition-opacity">{l.cookieLink}</a>.
          </p>

          {/* Messages */}
          <div className={`overflow-y-auto px-4 space-y-3 min-h-0 ${messages.length || loading ? 'flex-1 py-4' : ''}`} style={{ scrollbarWidth: 'none' }}>
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-4 py-3 rounded-radius-4 text-copy-s leading-relaxed break-words ${
                  m.role === 'user'
                    ? 'bg-cta-600 text-white/95 rounded-br-[2px]'
                    : 'bg-white/[0.06] dark:bg-black/[0.04] text-fg-primary-inverse rounded-bl-[2px]'
                }`}>
                  {m.role === 'assistant' ? renderContent(m.content) : m.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-white/[0.06] dark:bg-black/[0.04] px-4 py-3 rounded-radius-4 rounded-bl-[2px] flex gap-2 items-center">
                  {[0, 1, 2].map(i => (
                    <span
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-fg-muted-inverse animate-bounce"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </div>
              </div>
            )}

            {userTurns >= 2 && !atLimit && !loading && (() => {
              const left = MAX_TURNS - userTurns;
              const urgent = left === 1;
              return (
                <p className={`text-fine-print leading-normal text-center ${urgent ? 'text-feedback-warning-msg-fg font-medium' : 'text-fg-muted-inverse'}`}>
                  {l.remaining(left)}
                </p>
              );
            })()}

            {atLimit && !loading && (
              <p className="text-tooltip text-fg-muted-inverse text-center pt-2 leading-relaxed">
                {l.limit}
              </p>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input */}
          {!atLimit && (
            <div className={`px-4 py-4 shrink-0 flex items-end gap-2 ${messages.length || loading ? 'border-t border-white/[0.06] dark:border-black/[0.06]' : ''}`}>
              <textarea
                ref={el => { textareaRef.current = el; inputRef.current = el; }}
                value={input}
                onChange={handleInputChange}
                onKeyDown={e => {
                  if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
                  if (e.key === 'Tab' && !e.shiftKey) { e.preventDefault(); closeRef.current?.focus(); }
                }}
                placeholder={l.placeholder}
                aria-label={l.placeholder}
                autoComplete="off"
                rows={1}
                disabled={loading}
                className="flex-1 resize-none bg-white/[0.06] dark:bg-black/[0.04] rounded-radius-3 px-3 py-[10px] text-copy-s leading-[22px] text-fg-primary-inverse placeholder:text-fg-muted-inverse placeholder:[text-indent:2px] outline-none focus:ring-1 focus:ring-border-focus transition-all"
                style={{ scrollbarWidth: 'none', minHeight: '42px', maxHeight: '100px' }}
              />
              <button
                onClick={send}
                disabled={!input.trim() || loading}
                data-spring
                aria-label={l.send}
                className="shrink-0 rounded-radius-3 bg-cta-600 border border-accent-border text-white/95 flex items-center justify-center p-2 transition-opacity disabled:opacity-30 enabled:cursor-pointer enabled:hover:bg-cta-700"
              >
                <img src={imgSend} alt="" width={24} height={24} className="brightness-0 invert" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Floating trigger button */}
      <div inert={hideFloating || fadeFloating || open || undefined} className={`fixed bottom-4 left-4 z-40 group transition-[opacity,transform] duration-300 ease-out ${hideFloating ? 'opacity-0 pointer-events-none translate-y-3' : fadeFloating ? 'opacity-0 pointer-events-none' : open ? 'opacity-0 pointer-events-none translate-y-0' : 'opacity-100 pointer-events-auto translate-y-0'}`}>
        <button
          data-spring
          onClick={() => setOpen(o => !o)}
          aria-label={open ? 'Close chat' : l.button}
          aria-expanded={open}
          tabIndex={0}
          className={`group flex items-center justify-center rounded-full bg-tooltip-bg shadow-xs ring-1 ring-white/[0.08] dark:ring-black/[0.08] hover:bg-bg-surface transition-[width,padding,background-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus ${pillExpanded ? 'h-9 px-4 gap-2' : 'w-9 h-9'}`}
        >
          <span className="text-[16px] leading-none text-fg-primary-inverse group-hover:text-fg-primary shrink-0">💬</span>
          <span className={`text-tooltip font-semibold text-fg-primary-inverse group-hover:text-fg-primary whitespace-nowrap overflow-hidden transition-[max-width,opacity,color] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] ${pillExpanded ? 'max-w-[160px] opacity-100' : 'max-w-0 opacity-0'}`}>
            {l.pill}
          </span>
        </button>
        <div className="pointer-events-none absolute left-[calc(100%+8px)] top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:delay-[600ms] transition-opacity duration-200">
          <div className="bg-tooltip-bg text-fg-primary-inverse text-tooltip font-light leading-[1.2] px-2 py-[4px] rounded-radius-2 whitespace-nowrap ring-1 ring-white/20 dark:ring-black/10 flex items-center gap-2">
            {lang === 'fr' ? 'Tchat avec Claude' : 'Chat with Claude'}
            <kbd className="text-tooltip-kbd font-medium w-[15px] h-[18px] flex items-center justify-center rounded bg-tooltip-keyboard-shortcut-bg text-tooltip-keyboard-shortcut-fg not-italic">C</kbd>
          </div>
        </div>
      </div>
    </>
  );
}
