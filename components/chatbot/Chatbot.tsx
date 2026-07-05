import { AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useChat } from '../../hooks/useChat';
import { ChatWindow } from './ChatWindow';
import { Launcher } from './Launcher';
import { injectChatbotStyles } from './styles';

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const { messages, isThinking, sendMessage, clear } = useChat();

  useEffect(() => {
    injectChatbotStyles();
  }, []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

  return (
    <div className="nps2-shell">
      <AnimatePresence>
        {isOpen && (
          <ChatWindow
            messages={messages}
            isThinking={isThinking}
            onClose={() => setIsOpen(false)}
            onClear={clear}
            onSend={(message) => {
              setIsOpen(true);
              sendMessage(message);
            }}
          />
        )}
      </AnimatePresence>
      <Launcher isOpen={isOpen} onOpen={() => setIsOpen((current) => !current)} />
    </div>
  );
}
