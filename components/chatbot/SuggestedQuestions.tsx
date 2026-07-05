const questions = [
  'What are the school timings?',
  'What documents are required?',
  'Is there an entrance test?',
  'Where can I contact the school?'
];

interface SuggestedQuestionsProps {
  onSelect: (prompt: string) => void;
}

export function SuggestedQuestions({ onSelect }: SuggestedQuestionsProps) {
  return (
    <div className="nps2-suggestions" aria-label="Suggested questions">
      {questions.map((question) => (
        <button
          className="nps2-suggestion"
          type="button"
          key={question}
          onClick={() => onSelect(question)}
        >
          {question}
        </button>
      ))}
    </div>
  );
}
