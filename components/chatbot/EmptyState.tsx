import { motion } from 'framer-motion';
import { QuickActionGrid } from './QuickActionGrid';
import { SuggestedQuestions } from './SuggestedQuestions';

interface EmptyStateProps {
  onSelect: (prompt: string) => void;
}

export function EmptyState({ onSelect }: EmptyStateProps) {
  return (
    <div className="nps2-empty">
      <motion.div
        className="nps2-hero"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.34 }}
      >
        <div className="nps2-hero-kicker">✨ Virtual Assistant</div>
        <h2>👋 Welcome to Nirmaan Public School</h2>
        <p>
          I can help you with admissions, academics, facilities, transport,
          sports, gallery and contact information from the public website.
        </p>
        <div className="nps2-capabilities">
          <span className="nps2-capability">🎓 Admissions</span>
          <span className="nps2-capability">📚 Academics</span>
          <span className="nps2-capability">🏫 Facilities</span>
          <span className="nps2-capability">📞 Contact</span>
        </div>
      </motion.div>
      <QuickActionGrid onSelect={onSelect} />
      <SuggestedQuestions onSelect={onSelect} />
    </div>
  );
}
