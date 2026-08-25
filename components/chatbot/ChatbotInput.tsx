"use client";

import { useState, type KeyboardEvent } from "react";

type Props = {
  onSend: (value: string) => void;
  disabled?: boolean;
};

export default function ChatbotInput({ onSend, disabled }: Props) {
  const [value, setValue] = useState("");

  function submit() {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue("");
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  }

  return (
    <div className="chatbot-input-row">
      <textarea
        className="chatbot-input"
        placeholder="Ask me about Taimoor..."
        aria-label="Message"
        rows={1}
        value={value}
        disabled={disabled}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button
        type="button"
        className="chatbot-send-btn"
        aria-label="Send message"
        onClick={submit}
        disabled={disabled || !value.trim()}
      >
        <i className="fa-solid fa-paper-plane" aria-hidden="true"></i>
      </button>
    </div>
  );
}
