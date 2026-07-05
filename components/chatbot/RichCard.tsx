import { motion } from 'framer-motion';
import type { RichCardData } from '../../lib/chatbot/types';

interface RichCardProps {
  card: RichCardData;
  onPrompt: (prompt: string) => void;
}

export function RichCard({ card, onPrompt }: RichCardProps) {
  return (
    <motion.div
      className="nps2-card"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.24 }}
    >
      {card.eyebrow && <div className="nps2-card-eyebrow">{card.eyebrow}</div>}
      <div className="nps2-card-title">{card.title}</div>
      <div className="nps2-card-desc">{card.description}</div>
      {card.bullets && card.bullets.length > 0 && (
        <ul>
          {card.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      )}
      {card.actions && card.actions.length > 0 && (
        <div className="nps2-actions">
          {card.actions.map((action) => (
            action.href ? (
              <a
                className={`nps2-action ${action.variant === 'primary' ? 'primary' : ''}`}
                href={action.href}
                key={`${action.label}-${action.href}`}
              >
                {action.label}
              </a>
            ) : (
              <button
                className={`nps2-action ${action.variant === 'primary' ? 'primary' : ''}`}
                type="button"
                key={`${action.label}-${action.prompt}`}
                onClick={() => action.prompt && onPrompt(action.prompt)}
              >
                {action.label}
              </button>
            )
          ))}
        </div>
      )}
    </motion.div>
  );
}
