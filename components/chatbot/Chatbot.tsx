"use client";

import { useEffect, useRef, useState } from "react";

import { getChatbotResponse, getSuggestedQuestions } from "@/lib/chatbot/response";
import type { ChatMessage } from "@/lib/chatbot/types";
import ChatbotInput from "@/components/chatbot/ChatbotInput";
import ChatbotMessage from "@/components/chatbot/ChatbotMessage";
import SuggestedQuestions from "@/components/chatbot/SuggestedQuestions";

const WELCOME_MESSAGE =
  "Hi, I'm Taimoor's portfolio assistant. Ask me about his experience, tech stack, projects, education, or how to get in touch.";

function createMessage(role: ChatMessage["role"], content: string): ChatMessage {
  return { id: `${role}-${Math.random().toString(36).slice(2)}`, role, content };
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([createMessage("assistant", WELCOME_MESSAGE)]);
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const suggestions = getSuggestedQuestions();

  useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, typing]);

  function handleSend(text: string) {
    setMessages((prev) => [...prev, createMessage("user", text)]);
    setTyping(true);

    window.setTimeout(() => {
      const { text: replyText } = getChatbotResponse(text);
      setMessages((prev) => [...prev, createMessage("assistant", replyText)]);
      setTyping(false);
    }, 450);
  }

  function handleClear() {
    setMessages([createMessage("assistant", WELCOME_MESSAGE)]);
  }

  return (
    <>
      <button
        type="button"
        className="chatbot-toggle-btn"
        aria-label={open ? "Close chat assistant" : "Open chat assistant"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <i className={`fa-solid ${open ? "fa-xmark" : "fa-comment-dots"}`} aria-hidden="true"></i>
      </button>

      <div className={`chatbot-panel${open ? " chatbot-panel--open" : ""}`} role="dialog" aria-label="Portfolio assistant" aria-hidden={!open}>
        <div className="chatbot-header">
          <div className="chatbot-header-info">
            <span className="chatbot-header-title">Portfolio Assistant</span>
            <span className="chatbot-header-subtitle">Ask me about Taimoor</span>
          </div>
          <div className="chatbot-header-actions">
            <button type="button" className="chatbot-icon-btn" aria-label="Clear conversation" onClick={handleClear}>
              <i className="fa-solid fa-rotate-left" aria-hidden="true"></i>
            </button>
            <button type="button" className="chatbot-icon-btn" aria-label="Close chat assistant" onClick={() => setOpen(false)}>
              <i className="fa-solid fa-xmark" aria-hidden="true"></i>
            </button>
          </div>
        </div>

        <div className="chatbot-messages" ref={scrollRef}>
          {messages.map((message) => (
            <ChatbotMessage message={message} key={message.id} />
          ))}
          {typing && (
            <div className="chatbot-message chatbot-message--assistant">
              <div className="chatbot-bubble chatbot-typing" aria-label="Assistant is typing">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
        </div>

        {messages.length <= 1 && (
          <SuggestedQuestions questions={suggestions} onSelect={handleSend} disabled={typing} />
        )}

        <div className="chatbot-footer">
          <ChatbotInput onSend={handleSend} disabled={typing} />
        </div>
      </div>
    </>
  );
}
