import { motion } from 'framer-motion';
import { CHATBOT_CONFIG } from '../../lib/chatbot/config';
import { Avatar } from './Avatar';

interface HeaderProps {
  onClose: () => void;
  onClear: () => void;
}

export function Header({ onClose, onClear }: HeaderProps) {
  return (
    <div className="nps2-header">
      <Avatar />
      <div className="nps2-header-main">
        <div className="nps2-title">{CHATBOT_CONFIG.schoolName}</div>
        <div className="nps2-status">
          <span className="nps2-online-dot" />
          Online assistant · public website information
        </div>
      </div>
      <motion.button
        className="nps2-icon-btn"
        type="button"
        aria-label="Clear conversation"
        onClick={onClear}
        whileTap={{ scale: 0.92 }}
      >
        ↺
      </motion.button>
      <motion.button
        className="nps2-icon-btn"
        type="button"
        aria-label="Close chatbot"
        onClick={onClose}
        whileTap={{ scale: 0.92 }}
      >
        ×
      </motion.button>
    </div>
  );
}
