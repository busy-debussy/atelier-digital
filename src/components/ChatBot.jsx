import { useState, useRef, useEffect } from 'react';
import imgSend  from '../assets/icons/icon-send.svg';
import imgClose from '../assets/icons/icon-close-sm.svg';

const API_URL = import.meta.env.VITE_CHAT_API_URL || '/api/chat';
const MAX_TURNS = 6;

const L = {
  en: {
    button:      'Ask about my work',
    title:       'A.I. knows about me',
    empty:       "Ask anything about David's experience or work.",
    placeholder: 'Ask Claude…',
    send:        'Send',
    limit:       "That's the end of our chat — reach out directly for more.",
    error:       'Something went wrong. Please try again.',
    rateLimited: 'Too many requests. Please try again later.',
  },
  fr: {
    button:      'Poser une question',
    title:       'L\'I.A. me connaît par 💙',
    empty:       "Posez une question sur l'expérience ou le travail de David.",
    placeholder: 'Demandez à Claude…',
    send:        'Envoyer',
    limit:       'Fin de la conversation — contactez David directement pour en savoir plus.',
    error:       'Une erreur s\'est produite. Veuillez réessayer.',
    rateLimited: 'Trop de requêtes. Veuillez réessayer plus tard.',
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

const HINT_KEY = 'chatbot-hint-shown';

export default function ChatBot({ lang = 'en', onOpenChange, hideFloating = false }) {
  const l = L[lang] || L.en;
  const [open, setOpen]       = useState(false);
  const [hint, setHint]       = useState(false);

  useEffect(() => { onOpenChange?.(open); }, [open, onOpenChange]);
  const [messages, setMessages] = useState([]);
  const [input, setInput]     = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef   = useRef(null);
  const inputRef    = useRef(null);
  const textareaRef = useRef(null);
  const closeRef    = useRef(null);
  const hintTimer   = useRef(null);

  // Show hint once, after the user actions the cookie banner; dismiss on any click
  useEffect(() => {
    if (localStorage.getItem(HINT_KEY)) return;
    const onConsent = () => {
      hintTimer.current = setTimeout(() => setHint(true), 600);
      const onAnyClick = () => dismissHint();
      document.addEventListener('pointerdown', onAnyClick, { once: true });
    };
    window.addEventListener('cookie-consent-changed', onConsent, { once: true });
    return () => {
      clearTimeout(hintTimer.current);
      window.removeEventListener('cookie-consent-changed', onConsent);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Auto-dismiss hint after 5s
  useEffect(() => {
    if (!hint) return;
    const t = setTimeout(dismissHint, 5000);
    return () => clearTimeout(t);
  }, [hint]);

  const dismissHint = () => {
    setHint(false);
    localStorage.setItem(HINT_KEY, '1');
  };

  const userTurns = messages.filter(m => m.role === 'user').length;
  const atLimit   = userTurns >= MAX_TURNS;

  // Scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

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
      {/* Chat panel */}
      <div
        {...(open ? { role: 'dialog', 'aria-modal': 'true', 'aria-labelledby': 'chatbot-title', 'aria-live': 'polite' } : {})}
        inert={!open}
        className={`fixed bottom-4 z-[400] transition-all duration-300 ease-out ${
          open ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-3 pointer-events-none'
        }`}
        style={{ left: '16px', right: '16px', maxWidth: '380px' }}
      >
        <div className="bg-[#1c1c1c]/[0.94] dark:bg-white/[0.94] backdrop-blur-[16px] rounded-3xl shadow-[0px_8px_40px_rgba(0,0,0,0.14)] dark:shadow-[0px_8px_40px_rgba(0,0,0,0.5)] border border-white/[0.16] dark:border-black/[0.16] flex flex-col overflow-hidden" style={{ maxHeight: '520px' }}>

          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 shrink-0">
            <span id="chatbot-title" className="font-semibold text-[15px] text-[#f6f6f6] dark:text-[#1f1f1f]">{l.title}</span>
            <button
              ref={closeRef}
              data-spring
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="group flex items-center justify-center p-1.5 rounded-full hover:bg-white dark:hover:bg-[#1f1f1f] transition-[background-color] duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
            >
              <img
                src={imgClose}
                alt=""
                width={16} height={16}
                className="invert dark:invert-0 group-hover:invert-0 dark:group-hover:invert transition-[filter] duration-150"
              />
            </button>
          </div>

          {/* Messages */}
          <div className={`overflow-y-auto px-4 space-y-3 min-h-0 ${messages.length || loading ? 'flex-1 py-4' : ''}`} style={{ scrollbarWidth: 'none' }}>
{messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-[14px] leading-relaxed break-words ${
                  m.role === 'user'
                    ? 'bg-[#0152EC] text-white rounded-br-sm'
                    : 'bg-white/[0.07] dark:bg-black/[0.05] text-[#f6f6f6] dark:text-[#1f1f1f] rounded-bl-sm'
                }`}>
                  {m.role === 'assistant' ? renderContent(m.content) : m.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-white/[0.07] dark:bg-black/[0.05] px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1.5 items-center">
                  {[0, 1, 2].map(i => (
                    <span
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-[#adadad] dark:bg-[#5c5c5c] animate-bounce"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </div>
              </div>
            )}

            {atLimit && !loading && (
              <p className="text-[13px] text-[#adadad] dark:text-[#5c5c5c] text-center pt-2 leading-relaxed">
                {l.limit}
              </p>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input */}
          {!atLimit && (
            <div className={`px-4 py-4 shrink-0 flex items-end gap-2 ${messages.length || loading ? 'border-t border-white/[0.07] dark:border-black/[0.06]' : ''}`}>
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
                className="flex-1 resize-none bg-white/[0.06] dark:bg-black/[0.04] rounded-xl px-3 py-[10px] text-[14px] leading-[22px] text-[#f6f6f6] dark:text-[#1f1f1f] placeholder:text-[#666] dark:placeholder:text-[#9c9c9c] placeholder:[text-indent:2px] outline-none focus:ring-1 focus:ring-[#0152EC] transition-all"
                style={{ scrollbarWidth: 'none', minHeight: '42px', maxHeight: '100px' }}
              />
              <button
                onClick={send}
                disabled={!input.trim() || loading}
                data-spring
                aria-label={l.send}
                className="shrink-0 rounded-xl bg-[#0152EC] border border-[#5289f2] text-white flex items-center justify-center p-2 transition-opacity disabled:opacity-30 enabled:cursor-pointer enabled:hover:bg-[#0143c8]"
              >
                <img src={imgSend} alt="" width={24} height={24} className="brightness-0 invert" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Floating trigger button — stacked above cookie button (bottom-left) */}
      <div inert={hideFloating || undefined} className={`fixed bottom-[68px] left-4 z-40 group transition-all duration-300 ease-out ${hideFloating ? 'opacity-0 pointer-events-none translate-y-3' : 'opacity-100 pointer-events-auto translate-y-0'}`}>
        {/* First-load hint callout */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute left-[calc(100%+10px)] top-1/2 -translate-y-1/2 transition-all duration-300 ease-out ${hint && !hideFloating ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-1'}`}
        >
          <div className="bg-[#0152EC] text-white px-3 py-2 rounded-xl shadow-[0px_4px_16px_rgba(1,82,236,0.35)] whitespace-nowrap flex flex-col gap-0.5">
            <span className="text-[13px] font-semibold leading-snug">{lang === 'fr' ? 'Discutez avec l\'I.A. pour gagner du temps' : 'Chat with A.I.'}</span>
            <span className="text-[11px] opacity-80 leading-snug">{lang === 'fr' ? '' : 'Skip the scroll, just ask'}</span>
          </div>
          {/* Caret pointing left */}
          <div className="absolute right-full top-1/2 -translate-y-1/2 border-y-[5px] border-r-[6px] border-y-transparent border-r-[#0152EC]" />
        </div>

        <button
          data-spring
          onClick={() => { dismissHint(); setOpen(o => !o); }}
          aria-label={open ? 'Close chat' : l.button}
          aria-expanded={open}
          tabIndex={0}
          className="w-9 h-9 flex items-center justify-center rounded-full backdrop-blur-[4px] bg-white/[0.64] dark:bg-black/[0.64] shadow-[0px_0px_17.1px_0px_rgba(0,0,0,0.08)] dark:ring-1 dark:ring-white/[0.16] hover:scale-110 transition-transform duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0152EC]"
        >
          <span className="text-[16px] leading-none">💬</span>
        </button>
        <div className="pointer-events-none absolute left-[calc(100%+8px)] top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:delay-[600ms] transition-opacity duration-200">
          <div className="bg-[#1f1f1f] dark:bg-[#f6f6f6] text-[#f6f6f6] dark:text-[#1f1f1f] text-[15px] font-semibold leading-4 px-3 py-[4px] rounded-lg whitespace-nowrap ring-1 ring-white/20 dark:ring-black/10">
            {lang === 'fr' ? 'En savoir plus sur David' : 'Learn about David'}
          </div>
        </div>
      </div>
    </>
  );
}
