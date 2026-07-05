import { motion } from 'framer-motion';
import type { ChatMessage } from '../../lib/chatbot/types';
import { Avatar } from './Avatar';
import { RichCard } from './RichCard';

interface MessageProps {
  message: ChatMessage;
  onPrompt: (prompt: string) => void;
}

function formatTime(timestamp: number) {
  return new Intl.DateTimeFormat('en-IN', {
    hour: '2-digit',
    minute: '2-digit'
  }).format(timestamp);
}

function renderMarkdown(content: string) {
  const blocks = content.split(/\n{2,}/).filter(Boolean);
  return blocks.map((block, blockIndex) => {
    const lines = block.split('\n').filter(Boolean);
    if (lines.every((line) => line.trim().startsWith('- '))) {
      return (
        <ul key={`ul-${blockIndex}`}>
          {lines.map((line) => (
            <li key={line}>{line.replace(/^- /, '')}</li>
          ))}
        </ul>
      );
    }
    return <p key={`p-${blockIndex}`}>{block}</p>;
  });
}

export function Message({ message, onPrompt }: MessageProps) {
  const isBot = message.role === 'bot';

  return (
    <motion.div
      className={`nps2-row ${message.role}`}
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
    >
      {isBot && <Avatar compact />}
      <div className="nps2-bubble-wrap">
        {!(isBot && message.cards && message.cards.length > 0) && (
          <div className="nps2-bubble">
            <div className="nps2-markdown">{renderMarkdown(message.content)}</div>
          </div>
        )}
        {isBot && message.cards?.map((card) => (
          <RichCard card={card} key={card.title} onPrompt={onPrompt} />
        ))}
        {isBot && message.suggestions && message.status === 'complete' && (
          <div className="nps2-suggestions">
            {message.suggestions.map((suggestion) => (
              <button
                type="button"
                className="nps2-suggestion"
                key={suggestion}
                onClick={() => onPrompt(suggestion)}
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}
        <div className="nps2-time">{formatTime(message.timestamp)}</div>
      </div>
    </motion.div>
  );
}
