import { useEffect, useRef, useState } from "react";
import { ChatIcon, CloseIcon, SendIcon } from "../icons/Icons";
import { sendChatMessage } from "../utils/api";
import { openWhatsApp } from "../utils/whatsapp";
import { contact } from "../data/content";

const GREETING =
  "Hi! I'm the QuantEdge Assistant. Ask me about our training programs, delivery modes, or the team behind QuantEdge — happy to help.";
const TEASER_TEXT = "👋 Need help? Ask our AI assistant anything about QuantEdge.";
const TEASER_SEEN_KEY = "qe_chat_teaser_seen";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [showTeaser, setShowTeaser] = useState(false);
  const [messages, setMessages] = useState([{ role: "assistant", content: GREETING }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const bodyRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(TEASER_SEEN_KEY) === "1";
    } catch {
      // ignore — private browsing / storage blocked
    }
    if (seen) return;

    const showT = setTimeout(() => setShowTeaser(true), 2500);
    const hideT = setTimeout(() => setShowTeaser(false), 11000);
    return () => {
      clearTimeout(showT);
      clearTimeout(hideT);
    };
  }, []);

  function dismissTeaser() {
    setShowTeaser(false);
    try {
      sessionStorage.setItem(TEASER_SEEN_KEY, "1");
    } catch {
      // ignore
    }
  }

  function openFromTeaser() {
    dismissTeaser();
    setOpen(true);
  }

  useEffect(() => {
    if (!open) return;
    dismissTeaser();
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const t = setTimeout(() => inputRef.current?.focus(), 150);
    return () => {
      window.removeEventListener("keydown", onKey);
      clearTimeout(t);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    if (!bodyRef.current) return;
    bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [messages, loading, open]);

  async function handleSend(e) {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    const history = messages.map((m) => ({ role: m.role, content: m.content }));
    const nextMessages = [...messages, { role: "user", content: text }];
    setMessages(nextMessages);
    setInput("");
    setError(false);
    setLoading(true);

    try {
      const { reply } = await sendChatMessage(text, history);
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setError(true);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, I couldn't reply just now. You can message our team directly on WhatsApp instead.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="chat-widget">
      {showTeaser && !open && (
        <div className="chat-teaser raised-lg" role="status">
          <button
            type="button"
            className="chat-teaser-close"
            onClick={dismissTeaser}
            aria-label="Dismiss"
          >
            <CloseIcon width="12" height="12" />
          </button>
          <button type="button" className="chat-teaser-body" onClick={openFromTeaser}>
            {TEASER_TEXT}
          </button>
        </div>
      )}

      {open && (
        <div className="chat-panel raised-lg" role="dialog" aria-label="QuantEdge Assistant chat">
          <div className="chat-head">
            <div>
              <b>QuantEdge Assistant</b>
              <span>Usually replies in seconds</span>
            </div>
            <button
              type="button"
              className="chat-close"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
            >
              <CloseIcon width="18" height="18" />
            </button>
          </div>

          <div className="chat-body" ref={bodyRef}>
            {messages.map((m, i) => (
              <div className={`chat-msg ${m.role}`} key={i}>
                {m.content}
              </div>
            ))}
            {loading && (
              <div className="chat-msg assistant chat-typing">
                <span />
                <span />
                <span />
              </div>
            )}
            {error && (
              <button
                type="button"
                className="btn btn-secondary btn-sm chat-wa-fallback"
                onClick={() => openWhatsApp("Hi QuantEdge! I was chatting on your website and wanted to continue here.")}
              >
                Continue on WhatsApp
              </button>
            )}
          </div>

          <form className="chat-input-row" onSubmit={handleSend}>
            <input
              ref={inputRef}
              type="text"
              className="chat-input"
              placeholder="Ask about programs, pricing, team…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              maxLength={800}
            />
            <button
              type="submit"
              className="chat-send"
              disabled={loading || !input.trim()}
              aria-label="Send message"
            >
              <SendIcon width="16" height="16" />
            </button>
          </form>
          <div className="chat-foot">
            Prefer WhatsApp?{" "}
            <a href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noreferrer">
              Chat with our team
            </a>
          </div>
        </div>
      )}

      <button
        type="button"
        className="chat-toggle raised-lg glow-blue"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close chat" : "Open QuantEdge Assistant chat"}
        aria-expanded={open}
      >
        {open ? <CloseIcon width="24" height="24" /> : <ChatIcon width="24" height="24" />}
      </button>
    </div>
  );
}
