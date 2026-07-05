import { motion } from 'framer-motion';
import { Avatar } from './Avatar';

export function TypingIndicator() {
  return (
    <motion.div
      className="nps2-row bot"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
    >
      <Avatar compact />
      <div className="nps2-typing" aria-label="Assistant is typing">
        <span />
        <span />
        <span />
      </div>
    </motion.div>
  );
}
