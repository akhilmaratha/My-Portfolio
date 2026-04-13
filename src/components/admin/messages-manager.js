"use client";

import { useMemo, useState } from "react";
import { Check, MailCheck, Trash2 } from "lucide-react";

export function MessagesManager({ initialMessages }) {
  const [messages, setMessages] = useState(initialMessages);
  const [activeId, setActiveId] = useState(initialMessages[0]?._id || null);
  const [status, setStatus] = useState("");
  const [loadingId, setLoadingId] = useState(null);

  const activeMessage = useMemo(() => messages.find((message) => message._id === activeId), [messages, activeId]);

  async function markRead(id, read) {
    setLoadingId(id);
    setStatus("");

    const response = await fetch(`/api/messages/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ read }),
    });

    if (response.ok) {
      const data = await response.json();
      setMessages((current) => current.map((message) => (message._id === id ? data.message : message)));
      if (data.thankYouSent) {
        setStatus("Marked as read and thank-you email sent.");
      } else if (data.thankYouSkipped) {
        setStatus(`Marked as read. Thank-you email skipped: ${data.thankYouSkipReason || "Brevo settings are incomplete."}`);
      } else {
        setStatus("Marked as read.");
      }
    } else {
      const data = await response.json().catch(() => ({}));
      setStatus(data.error || "Unable to update this message.");
    }

    setLoadingId(null);
  }

  async function removeMessage(id) {
    const response = await fetch(`/api/messages/${id}`, { method: "DELETE" });
    if (response.ok) {
      setMessages((current) => current.filter((message) => message._id !== id));
      if (activeId === id) {
        setActiveId(messages[0]?._id || null);
      }
    }
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
      <div className="space-y-4 rounded-3xl border border-white/10 bg-white/3 p-6">
        {messages.map((message) => (
          <button key={message._id} type="button" onClick={() => setActiveId(message._id)} className="w-full rounded-2xl border border-white/10 p-4 text-left transition-colors hover:border-[#00ffaa]/30">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h3 className="font-syne text-xl font-black text-white">{message.name}</h3>
                <p className="text-sm text-white/55">{message.subject}</p>
              </div>
              <span className={message.read ? "text-xs uppercase tracking-[0.24em] text-[#00ffaa]" : "text-xs uppercase tracking-[0.24em] text-white/40"}>
                {message.read ? "Read" : "New"}
              </span>
            </div>
          </button>
        ))}
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/3 p-6">
        {activeMessage ? (
          <div className="space-y-5">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[#00ffaa]">{activeMessage.email}</p>
              <h3 className="mt-3 font-syne text-3xl font-black text-white">{activeMessage.subject}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-full border border-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-white/45">
                  {activeMessage.read ? "Read" : "Unread"}
                </span>
                <span className={activeMessage.thankYouSent ? "rounded-full border border-[#00ffaa]/30 bg-[#00ffaa]/10 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-[#00ffaa]" : "rounded-full border border-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-white/45"}>
                  {activeMessage.thankYouSent ? "Thank-you sent" : "Thank-you pending"}
                </span>
              </div>
            </div>
            <p className="whitespace-pre-wrap rounded-2xl border border-white/10 bg-[#05070a] p-5 text-sm leading-7 text-white/75">{activeMessage.message}</p>
            <div className="flex flex-wrap gap-3">
              <button type="button" onClick={() => markRead(activeMessage._id, true)} disabled={loadingId === activeMessage._id} className="inline-flex items-center rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.24em] text-white/70 hover:text-[#00ffaa] disabled:cursor-not-allowed disabled:opacity-60">
                {loadingId === activeMessage._id ? <MailCheck className="mr-2 h-4 w-4 animate-pulse" /> : <Check className="mr-2 h-4 w-4" />}
                {activeMessage.read ? (activeMessage.thankYouSent ? "Save read status" : "Send thank you email") : "Mark as read & thank you"}
              </button>
              <button type="button" onClick={() => removeMessage(activeMessage._id)} className="inline-flex items-center rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.24em] text-white/70 hover:text-red-400">
                <Trash2 className="mr-2 h-4 w-4" /> Delete
              </button>
            </div>
            {status ? <p className="text-sm text-white/60">{status}</p> : null}
          </div>
        ) : (
          <p className="text-white/60">No messages available.</p>
        )}
      </div>
    </div>
  );
}