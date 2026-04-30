"use client";

import { useState, useRef, useEffect } from "react";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

type Message = {
  role: "user" | "assistant";
  content: string;
};

function renderMarkdown(text: string): string {
  return text
    .replace(
      /^### (.+)$/gm,
      '<h3 class="font-alnevrada text-base text-primarydeep mt-3 mb-1">$1</h3>',
    )
    .replace(
      /^## (.+)$/gm,
      '<h2 class="font-alnevrada text-lg text-primarydeep mt-4 mb-2">$1</h2>',
    )
    .replace(
      /^# (.+)$/gm,
      '<h2 class="font-alnevrada text-lg text-primarydeep mt-4 mb-2">$1</h2>',
    )
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/^- (.+)$/gm, '<li class="ml-4 list-disc">$1</li>')
    .replace(/(<li.*<\/li>\n?)+/g, '<ul class="my-2 space-y-1">$&</ul>')
    .replace(/\n\n/g, '</p><p class="mt-2">')
    .replace(/^(?!<)/, "<p>")
    .replace(/(?<!>)$/, "</p>");
}

function IfeAvatar({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background circle */}
      <circle
        cx="20"
        cy="20"
        r="19"
        fill="#2C1D49"
        stroke="#AD4A00"
        strokeWidth="1"
      />

      {/* Outer petals */}
      <ellipse
        cx="20"
        cy="14"
        rx="3"
        ry="6"
        fill="#D4537E"
        opacity="0.7"
        transform="rotate(0 20 20)"
      />
      <ellipse
        cx="20"
        cy="14"
        rx="3"
        ry="6"
        fill="#D4537E"
        opacity="0.7"
        transform="rotate(45 20 20)"
      />
      <ellipse
        cx="20"
        cy="14"
        rx="3"
        ry="6"
        fill="#D4537E"
        opacity="0.7"
        transform="rotate(90 20 20)"
      />
      <ellipse
        cx="20"
        cy="14"
        rx="3"
        ry="6"
        fill="#D4537E"
        opacity="0.7"
        transform="rotate(135 20 20)"
      />
      <ellipse
        cx="20"
        cy="14"
        rx="3"
        ry="6"
        fill="#D4537E"
        opacity="0.7"
        transform="rotate(180 20 20)"
      />
      <ellipse
        cx="20"
        cy="14"
        rx="3"
        ry="6"
        fill="#D4537E"
        opacity="0.7"
        transform="rotate(225 20 20)"
      />
      <ellipse
        cx="20"
        cy="14"
        rx="3"
        ry="6"
        fill="#D4537E"
        opacity="0.7"
        transform="rotate(270 20 20)"
      />
      <ellipse
        cx="20"
        cy="14"
        rx="3"
        ry="6"
        fill="#D4537E"
        opacity="0.7"
        transform="rotate(315 20 20)"
      />

      {/* Inner petals — lighter */}
      <ellipse
        cx="20"
        cy="15.5"
        rx="2"
        ry="4.5"
        fill="#ED93B1"
        opacity="0.9"
        transform="rotate(22.5 20 20)"
      />
      <ellipse
        cx="20"
        cy="15.5"
        rx="2"
        ry="4.5"
        fill="#ED93B1"
        opacity="0.9"
        transform="rotate(67.5 20 20)"
      />
      <ellipse
        cx="20"
        cy="15.5"
        rx="2"
        ry="4.5"
        fill="#ED93B1"
        opacity="0.9"
        transform="rotate(112.5 20 20)"
      />
      <ellipse
        cx="20"
        cy="15.5"
        rx="2"
        ry="4.5"
        fill="#ED93B1"
        opacity="0.9"
        transform="rotate(157.5 20 20)"
      />
      <ellipse
        cx="20"
        cy="15.5"
        rx="2"
        ry="4.5"
        fill="#ED93B1"
        opacity="0.9"
        transform="rotate(202.5 20 20)"
      />
      <ellipse
        cx="20"
        cy="15.5"
        rx="2"
        ry="4.5"
        fill="#ED93B1"
        opacity="0.9"
        transform="rotate(247.5 20 20)"
      />
      <ellipse
        cx="20"
        cy="15.5"
        rx="2"
        ry="4.5"
        fill="#ED93B1"
        opacity="0.9"
        transform="rotate(292.5 20 20)"
      />
      <ellipse
        cx="20"
        cy="15.5"
        rx="2"
        ry="4.5"
        fill="#ED93B1"
        opacity="0.9"
        transform="rotate(337.5 20 20)"
      />

      {/* Centre */}
      <circle cx="20" cy="20" r="4" fill="#FAC775" />
      <circle cx="20" cy="20" r="2.5" fill="#EF9F27" />
      <circle cx="20" cy="20" r="1.2" fill="#2C1D49" />
    </svg>
  );
}

function IfeAvatarSmall() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="20"
        cy="20"
        r="19"
        fill="#2C1D49"
        stroke="#AD4A00"
        strokeWidth="1"
      />
      <ellipse
        cx="20"
        cy="14"
        rx="3"
        ry="6"
        fill="#D4537E"
        opacity="0.7"
        transform="rotate(0 20 20)"
      />
      <ellipse
        cx="20"
        cy="14"
        rx="3"
        ry="6"
        fill="#D4537E"
        opacity="0.7"
        transform="rotate(45 20 20)"
      />
      <ellipse
        cx="20"
        cy="14"
        rx="3"
        ry="6"
        fill="#D4537E"
        opacity="0.7"
        transform="rotate(90 20 20)"
      />
      <ellipse
        cx="20"
        cy="14"
        rx="3"
        ry="6"
        fill="#D4537E"
        opacity="0.7"
        transform="rotate(135 20 20)"
      />
      <ellipse
        cx="20"
        cy="14"
        rx="3"
        ry="6"
        fill="#D4537E"
        opacity="0.7"
        transform="rotate(180 20 20)"
      />
      <ellipse
        cx="20"
        cy="14"
        rx="3"
        ry="6"
        fill="#D4537E"
        opacity="0.7"
        transform="rotate(225 20 20)"
      />
      <ellipse
        cx="20"
        cy="14"
        rx="3"
        ry="6"
        fill="#D4537E"
        opacity="0.7"
        transform="rotate(270 20 20)"
      />
      <ellipse
        cx="20"
        cy="14"
        rx="3"
        ry="6"
        fill="#D4537E"
        opacity="0.7"
        transform="rotate(315 20 20)"
      />
      <ellipse
        cx="20"
        cy="15.5"
        rx="2"
        ry="4.5"
        fill="#ED93B1"
        opacity="0.9"
        transform="rotate(22.5 20 20)"
      />
      <ellipse
        cx="20"
        cy="15.5"
        rx="2"
        ry="4.5"
        fill="#ED93B1"
        opacity="0.9"
        transform="rotate(67.5 20 20)"
      />
      <ellipse
        cx="20"
        cy="15.5"
        rx="2"
        ry="4.5"
        fill="#ED93B1"
        opacity="0.9"
        transform="rotate(112.5 20 20)"
      />
      <ellipse
        cx="20"
        cy="15.5"
        rx="2"
        ry="4.5"
        fill="#ED93B1"
        opacity="0.9"
        transform="rotate(157.5 20 20)"
      />
      <ellipse
        cx="20"
        cy="15.5"
        rx="2"
        ry="4.5"
        fill="#ED93B1"
        opacity="0.9"
        transform="rotate(202.5 20 20)"
      />
      <ellipse
        cx="20"
        cy="15.5"
        rx="2"
        ry="4.5"
        fill="#ED93B1"
        opacity="0.9"
        transform="rotate(247.5 20 20)"
      />
      <ellipse
        cx="20"
        cy="15.5"
        rx="2"
        ry="4.5"
        fill="#ED93B1"
        opacity="0.9"
        transform="rotate(292.5 20 20)"
      />
      <ellipse
        cx="20"
        cy="15.5"
        rx="2"
        ry="4.5"
        fill="#ED93B1"
        opacity="0.9"
        transform="rotate(337.5 20 20)"
      />
      <circle cx="20" cy="20" r="4" fill="#FAC775" />
      <circle cx="20" cy="20" r="2.5" fill="#EF9F27" />
      <circle cx="20" cy="20" r="1.2" fill="#2C1D49" />
    </svg>
  );
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! I'm Ife, your guide to HerStories. Ask me about any African woman in our archive, or explore themes like activism, art, politics, and more. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Hide tooltip after 4 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  // Hide tooltip when chat opens
  useEffect(() => {
    if (isOpen) setShowTooltip(false);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      inputRef.current?.focus();
    }
  }, [messages, isOpen]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = { role: "user", content: input.trim() };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const history = updatedMessages
        .slice(0, -1)
        .map((m) => ({ role: m.role, content: m.content }));

      const res = await fetch(`${BASE_URL}/chat/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage.content,
          history,
        }),
      });

      if (!res.ok) throw new Error("Chat failed");
      const data = await res.json();

      setMessages([
        ...updatedMessages,
        { role: "assistant", content: data.response },
      ]);
    } catch {
      setMessages([
        ...updatedMessages,
        {
          role: "assistant",
          content:
            "I'm sorry, something went wrong. Please try again in a moment.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Chat panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 md:right-8 w-[90vw] md:w-96 h-[70vh] max-h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 border border-gray-100">
          {/* Header */}
          <div className="bg-primarydeep rounded-t-2xl px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <IfeAvatar size={36} />
              <div>
                <p className="font-alnevrada text-white text-sm">Ife</p>
                <p className="font-poppins text-white/60 text-xs">
                  HerStories guide
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/60 hover:text-white transition-colors text-2xl leading-none pb-1"
            >
              ×
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.role === "assistant" && (
                  <div className="mr-2 mt-1 shrink-0">
                    <IfeAvatarSmall />
                  </div>
                )}
                <div
                  className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm font-poppins leading-relaxed ${
                    msg.role === "user"
                      ? "bg-primary text-white rounded-br-sm"
                      : "bg-gray-100 text-gray-800 rounded-bl-sm"
                  }`}
                >
                  {msg.role === "assistant" ? (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: renderMarkdown(msg.content),
                      }}
                    />
                  ) : (
                    msg.content
                  )}
                </div>
              </div>
            ))}

            {/* Loading indicator */}
            {loading && (
              <div className="flex justify-start">
                <div className="mr-2 mt-1 shrink-0">
                  <IfeAvatarSmall />
                </div>
                <div className="bg-gray-100 px-4 py-3 rounded-2xl rounded-bl-sm">
                  <div className="flex gap-1">
                    <span
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    />
                    <span
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    />
                    <span
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="px-4 py-3 border-t border-gray-100">
            <div className="flex gap-2 items-center">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask Ife anything..."
                disabled={loading}
                className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-4 py-2 text-base font-poppins focus:outline-none focus:border-primary disabled:opacity-50"
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || loading}
                className="w-9 h-9 bg-primary rounded-full flex items-center justify-center disabled:opacity-40 hover:bg-primarydeep transition-colors shrink-0"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M22 2L11 13M22 2L15 22L11 13M11 13L2 9L22 2"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            <p className="font-poppins text-xs text-gray-400 text-center mt-2">
              Ife knows the HerStories archive
            </p>
          </div>
        </div>
      )}

      {/* Tooltip — always shows on hover, also auto-shows on load */}
      {!isOpen && (
        <div
          className={`fixed bottom-24 right-4 md:right-8 z-50 transition-opacity duration-300 ${
            showTooltip ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="bg-primarydeep text-white text-xs font-poppins px-4 py-2.5 rounded-xl shadow-lg whitespace-nowrap relative">
            Chat with Ife, your HerStories guide
            <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-primarydeep rotate-45" />
          </div>
        </div>
      )}

      {/* Floating button with pulse */}
      <div className="fixed bottom-6 right-4 md:right-8 z-50">
        {/* Pulse ring */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full animate-ping bg-secondary opacity-30" />
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          className="relative w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
          aria-label="Chat with Ife"
        >
          {isOpen ? (
            <div className="w-14 h-14 rounded-full bg-primarydeep flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M18 6L6 18M6 6L18 18"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          ) : (
            <IfeAvatar size={56} />
          )}
        </button>
      </div>
    </>
  );
}
