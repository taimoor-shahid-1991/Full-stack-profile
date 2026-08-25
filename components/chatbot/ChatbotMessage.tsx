import type { ChatMessage } from "@/lib/chatbot/types";

function renderInline(line: string, key: number) {
  const parts = line.split(/(\*\*[^*]+\*\*)/g).filter(Boolean);
  return (
    <span key={key}>
      {parts.map((part, i) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <strong key={i}>{part.slice(2, -2)}</strong>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </span>
  );
}

function MessageBody({ content }: { content: string }) {
  const lines = content.split("\n");

  return (
    <>
      {lines.map((line, i) => {
        if (!line.trim()) return <div key={i} className="chatbot-line-gap" />;
        if (line.startsWith("• ")) {
          return (
            <div className="chatbot-bullet" key={i}>
              {renderInline(line.slice(2), i)}
            </div>
          );
        }
        return (
          <p className="chatbot-paragraph" key={i}>
            {renderInline(line, i)}
          </p>
        );
      })}
    </>
  );
}

export default function ChatbotMessage({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";

  return (
    <div className={`chatbot-message ${isUser ? "chatbot-message--user" : "chatbot-message--assistant"}`}>
      <div className="chatbot-bubble">
        <MessageBody content={message.content} />
      </div>
    </div>
  );
}
