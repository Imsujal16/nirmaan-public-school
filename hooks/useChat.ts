import { useCallback, useEffect, useRef, useState } from 'react';
import { CHATBOT_CONFIG } from '../lib/chatbot/config';
import type { ChatMessage } from '../lib/chatbot/types';

function createId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function readHistory(): ChatMessage[] {
  try {
    const raw = window.localStorage.getItem(CHATBOT_CONFIG.storageKey);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as ChatMessage[];
    return Array.isArray(parsed) ? parsed.slice(-CHATBOT_CONFIG.maxHistory) : [];
  } catch {
    return [];
  }
}

function wait(ms: number) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

export function useChat() {
  const engineRef = useRef<Promise<import('../lib/chatbot/FAQEngine').FAQEngine> | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>(() => readHistory());
  const [isThinking, setIsThinking] = useState(false);

  const getEngine = useCallback(() => {
    if (!engineRef.current) {
      engineRef.current = import('../lib/chatbot/FAQEngine').then(({ FAQEngine }) => new FAQEngine());
    }
    return engineRef.current;
  }, []);

  useEffect(() => {
    const stableMessages = messages
      .filter((message) => message.status !== 'streaming')
      .slice(-CHATBOT_CONFIG.maxHistory);
    window.localStorage.setItem(CHATBOT_CONFIG.storageKey, JSON.stringify(stableMessages));
  }, [messages]);

  const clear = useCallback(() => {
    setMessages([]);
    window.localStorage.removeItem(CHATBOT_CONFIG.storageKey);
  }, []);

  const sendMessage = useCallback(async (content: string) => {
    const trimmed = content.trim();
    if (!trimmed || isThinking) return;

    const userMessage: ChatMessage = {
      id: createId('user'),
      role: 'user',
      content: trimmed,
      timestamp: Date.now(),
      status: 'complete'
    };

    setMessages((current) => [...current, userMessage]);
    setIsThinking(true);
    await wait(420);

    const engine = await getEngine();
    const response = engine.respond(trimmed);
    const botId = createId('bot');
    const botMessage: ChatMessage = {
      id: botId,
      role: 'bot',
      content: '',
      timestamp: Date.now(),
      cards: response.cards,
      links: response.links,
      suggestions: response.suggestions,
      status: 'streaming'
    };

    setMessages((current) => [...current, botMessage]);
    setIsThinking(false);

    const words = response.markdown.split(/(\s+)/);
    let currentText = '';
    for (let index = 0; index < words.length; index += 1) {
      currentText += words[index];
      setMessages((current) => current.map((message) => (
        message.id === botId ? { ...message, content: currentText } : message
      )));
      if (index % 3 === 0) await wait(18);
    }

    setMessages((current) => current.map((message) => (
      message.id === botId ? { ...message, content: response.markdown, status: 'complete' } : message
    )));
  }, [getEngine, isThinking]);

  return {
    messages,
    isThinking,
    sendMessage,
    clear
  };
}
