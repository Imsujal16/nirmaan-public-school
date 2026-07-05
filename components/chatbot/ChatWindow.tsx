import { motion } from 'framer-motion';
import type { ChatMessage } from '../../lib/chatbot/types';
import { Header } from './Header';
import { Input } from './Input';
import { MessageList } from './MessageList';

interface ChatWindowProps {
  messages: ChatMessage[];
  isThinking: boolean;
  onClose: () => void;
  onClear: () => void;
  onSend: (message: string) => void;
}

export function ChatWindow({ messages, isThinking, onClose, onClear, onSend }: ChatWindowProps) {
  return (
    <motion.section
      className="nps2-window"
      role="dialog"
      aria-modal="true"
      aria-label="Nirmaan Public School virtual assistant"
      initial={{ opacity: 0, y: 22, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 22, scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 300, damping: 28 }}
    >
      <Header onClose={onClose} onClear={onClear} />
      <div className="nps2-body">
        <MessageList messages={messages} isThinking={isThinking} onPrompt={onSend} />
        <Input disabled={isThinking} onSend={onSend} onClose={onClose} />
      </div>
    </motion.section>
  );
}
