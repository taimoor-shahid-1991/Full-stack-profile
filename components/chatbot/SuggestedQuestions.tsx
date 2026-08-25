import type { SuggestedQuestion } from "@/lib/chatbot/types";

type Props = {
  questions: SuggestedQuestion[];
  onSelect: (label: string) => void;
  disabled?: boolean;
};

export default function SuggestedQuestions({ questions, onSelect, disabled }: Props) {
  if (!questions.length) return null;

  return (
    <div className="chatbot-suggestions" role="group" aria-label="Suggested questions">
      {questions.map((q) => (
        <button
          key={q.id}
          type="button"
          className="chatbot-suggestion-chip"
          onClick={() => onSelect(q.label)}
          disabled={disabled}
        >
          {q.label}
        </button>
      ))}
    </div>
  );
}
