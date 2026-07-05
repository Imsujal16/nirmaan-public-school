import React from 'react';
import { createRoot } from 'react-dom/client';
import { Chatbot } from '../components/chatbot/Chatbot';

const ROOT_ID = 'nps-chatbot-v2-root';

function mountChatbot() {
  if (document.getElementById(ROOT_ID)) return;

  const rootElement = document.createElement('div');
  rootElement.id = ROOT_ID;
  document.body.appendChild(rootElement);

  createRoot(rootElement).render(
    <React.StrictMode>
      <Chatbot />
    </React.StrictMode>
  );
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountChatbot, { once: true });
} else {
  mountChatbot();
}
