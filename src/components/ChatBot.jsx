import { useState, useRef, useEffect } from 'react';

const API_URL = import.meta.env.VITE_CHAT_API_URL || '/api/chat';
const MAX_TURNS = 6;

const L = {
  en: {
    button:      'Ask about my work',
    title:       'Ask about David',
    empty:       "Ask anything about David's experience or work.",
    placeholder: 'Ask me anything…',
    send:        'Send',
    limit:       "That's the end of our chat — reach out directly for more.",
    error:       'Something went wrong. Please try again.',
    rateLimited: 'Too many requests. Please try again later.',
  },
  fr: {
    button:      'Poser une question',
    title:       'Renseignez-vous sur David',
    empty:       "Posez une question sur l'expérience ou le travail de David.",
    placeholder: 'Posez votre question…',
    send:        'Envoyer',
    limit:       'Fin de la conversation — contactez David directement pour en savoir plus.',
    error:       'Une erreur s\'est produite. Veuillez réessayer.',
    rateLimited: 'Trop de requêtes. Veuillez réessayer plus tard.',
  },
};

export default function ChatBot({ lang = 'en' }) {
  const l = L[lang] || L.en;
  const [open, setOpen]       = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput]     = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const inputRef  = useRef(null);
  const textareaRef = useRef(null);

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
      el.style.height = `${Math.min(el.scrollHeight, 100)}px`;
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
        aria-live="polite"
        className={`fixed bottom-[84px] right-4 sm:right-6 z-40 w-[calc(100vw-32px)] sm:w-[380px] transition-all duration-300 ease-out ${
          open ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-3 pointer-events-none'
        }`}
      >
        <div className="bg-white/[0.94] dark:bg-[#1c1c1c]/[0.94] backdrop-blur-[16px] rounded-3xl shadow-[0px_8px_40px_rgba(0,0,0,0.14)] dark:shadow-[0px_8px_40px_rgba(0,0,0,0.5)] dark:ring-1 dark:ring-white/[0.08] flex flex-col overflow-hidden" style={{ maxHeight: '520px' }}>

          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-black/[0.06] dark:border-white/[0.07] shrink-0">
            <span className="font-semibold text-[15px] text-[#1f1f1f] dark:text-[#f6f6f6]">{l.title}</span>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-black/[0.06] dark:hover:bg-white/[0.1] transition-colors cursor-pointer text-[#5c5c5c] dark:text-[#adadad]"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 min-h-0" style={{ scrollbarWidth: 'none' }}>
            {messages.length === 0 && (
              <p className="text-[13px] text-[#5c5c5c] dark:text-[#adadad] text-center pt-4 leading-relaxed">
                {l.empty}
              </p>
            )}

            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-[14px] leading-relaxed ${
                  m.role === 'user'
                    ? 'bg-[#0152EC] text-white rounded-br-sm'
                    : 'bg-black/[0.05] dark:bg-white/[0.07] text-[#1f1f1f] dark:text-[#f6f6f6] rounded-bl-sm'
                }`}>
                  {m.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-black/[0.05] dark:bg-white/[0.07] px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1.5 items-center">
                  {[0, 1, 2].map(i => (
                    <span
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-[#5c5c5c] dark:bg-[#adadad] animate-bounce"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </div>
              </div>
            )}

            {atLimit && !loading && (
              <p className="text-[13px] text-[#5c5c5c] dark:text-[#adadad] text-center pt-2 leading-relaxed">
                {l.limit}
              </p>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input */}
          {!atLimit && (
            <div className="px-4 py-3 border-t border-black/[0.06] dark:border-white/[0.07] shrink-0 flex items-end gap-2">
              <textarea
                ref={el => { textareaRef.current = el; inputRef.current = el; }}
                value={input}
                onChange={handleInputChange}
                onKeyDown={e => {
                  if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
                }}
                placeholder={l.placeholder}
                rows={1}
                disabled={loading}
                className="flex-1 resize-none bg-black/[0.04] dark:bg-white/[0.06] rounded-xl px-3 py-2.5 text-[14px] text-[#1f1f1f] dark:text-[#f6f6f6] placeholder:text-[#9c9c9c] dark:placeholder:text-[#666] outline-none focus:ring-1 focus:ring-[#0152EC] transition-all leading-relaxed"
                style={{ scrollbarWidth: 'none', maxHeight: '100px' }}
              />
              <button
                onClick={send}
                disabled={!input.trim() || loading}
                data-spring
                aria-label={l.send}
                className="shrink-0 w-9 h-9 rounded-xl bg-[#0152EC] text-white flex items-center justify-center transition-opacity disabled:opacity-30 enabled:cursor-pointer enabled:hover:bg-[#0143c8]"
              >
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                  <path d="M13.5 7.5L1.5 1.5l2 6-2 6 12-6z" fill="currentColor"/>
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Floating trigger button */}
      <button
        data-spring
        onClick={() => setOpen(o => !o)}
        aria-label={open ? 'Close chat' : l.button}
        aria-expanded={open}
        className="fixed bottom-6 right-4 sm:right-6 z-40 flex items-center gap-2 pl-3 pr-4 py-2.5 bg-white/[0.72] dark:bg-black/[0.72] backdrop-blur-[8px] rounded-full shadow-[0px_4px_20px_rgba(0,0,0,0.12)] dark:shadow-[0px_4px_20px_rgba(0,0,0,0.4)] dark:ring-1 dark:ring-white/[0.16] cursor-pointer hover:bg-white/90 dark:hover:bg-black/90 transition-colors"
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="shrink-0 text-[#1f1f1f] dark:text-[#f6f6f6]">
          <path d="M9 1C4.58 1 1 4.13 1 8c0 1.71.67 3.27 1.78 4.5L2 17l4.5-1.78C7.56 15.73 8.26 16 9 16c4.42 0 8-3.13 8-7s-3.58-8-8-8z" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        </svg>
        <span className="text-[13px] font-semibold text-[#1f1f1f] dark:text-[#f6f6f6] whitespace-nowrap leading-none">
          {l.button}
        </span>
      </button>
    </>
  );
}
