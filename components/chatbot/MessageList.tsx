import { AnimatePresence } from 'framer-motion';
import { useEffect, useRef } from 'react';
import type { ChatMessage } from '../../lib/chatbot/types';
import { EmptyState } from './EmptyState';
import { Message } from './Message';
import { TypingIndicator } from './TypingIndicator';

interface MessageListProps {
  messages: ChatMessage[];
  isThinking: boolean;
  onPrompt: (prompt: string) => void;
}

export function MessageList({ messages, isThinking, onPrompt }: MessageListProps) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    scroller.scrollTop = scroller.scrollHeight;
  }, [messages, isThinking]);

  return (
    <div className="nps2-messages" ref={scrollerRef}>
      {messages.length === 0 ? (
        <EmptyState onSelect={onPrompt} />
      ) : (
        <AnimatePresence initial={false}>
          {messages.map((message) => (
            <Message message={message} key={message.id} onPrompt={onPrompt} />
          ))}
          {isThinking && <TypingIndicator key="typing" />}
        </AnimatePresence>
      )}
    </div>
  );
}
