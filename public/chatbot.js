(function () {
  if (window.NPSChatbotLoaded) return;
  window.NPSChatbotLoaded = true;

  const styles = `
    .nps-chat-toggle{position:fixed;right:22px;bottom:22px;width:58px;height:58px;border-radius:50%;border:0;background:#0f1f5c;color:#fff;box-shadow:0 16px 34px rgba(15,31,92,.32);display:flex;align-items:center;justify-content:center;cursor:pointer;z-index:9998;font-size:1.22rem}
    .nps-chat-toggle:hover{background:#1f3ba0}
    .nps-chat-panel{position:fixed;right:22px;bottom:92px;width:min(380px,calc(100vw - 28px));height:min(560px,calc(100vh - 120px));background:#fff;border:1px solid #dbe3ef;border-radius:16px;box-shadow:0 24px 70px rgba(15,31,92,.22);z-index:9999;display:none;overflow:hidden}
    .nps-chat-panel.open{display:flex;flex-direction:column}
    .nps-chat-head{background:#0f1f5c;color:#fff;padding:16px 18px;display:flex;align-items:center;justify-content:space-between;gap:12px}
    .nps-chat-title{font-weight:800;font-size:1rem;line-height:1.2}
    .nps-chat-subtitle{font-size:.76rem;color:rgba(255,255,255,.72);margin-top:3px}
    .nps-chat-close{width:34px;height:34px;border-radius:50%;border:1px solid rgba(255,255,255,.22);background:rgba(255,255,255,.1);color:#fff;cursor:pointer}
    .nps-chat-messages{flex:1;padding:16px;background:#f7f9fd;overflow:auto;display:flex;flex-direction:column;gap:12px}
    .nps-chat-msg{max-width:86%;padding:12px 14px;border-radius:14px;font-size:.9rem;line-height:1.5;white-space:pre-line}
    .nps-chat-msg.bot{background:#fff;color:#182449;border:1px solid #e2e8f0;border-top-left-radius:4px}
    .nps-chat-msg.user{align-self:flex-end;background:#0f1f5c;color:#fff;border-top-right-radius:4px}
    .nps-chat-links{display:flex;flex-wrap:wrap;gap:8px;margin-top:10px}
    .nps-chat-links a{font-size:.78rem;color:#0f1f5c;background:#eef3ff;border:1px solid #d7e3ff;padding:6px 9px;border-radius:999px;text-decoration:none;font-weight:700}
    .nps-chat-suggestions{padding:10px 12px;border-top:1px solid #e5eaf3;background:#fff;display:flex;gap:8px;overflow-x:auto}
    .nps-chat-suggestions button{white-space:nowrap;border:1px solid #d7e3ff;background:#f5f8ff;color:#0f1f5c;border-radius:999px;padding:7px 10px;font-size:.78rem;font-weight:700;cursor:pointer}
    .nps-chat-form{display:flex;gap:8px;padding:12px;background:#fff;border-top:1px solid #e5eaf3}
    .nps-chat-input{flex:1;border:1px solid #d6deee;border-radius:999px;padding:11px 14px;font-size:.9rem;outline:none;min-width:0}
    .nps-chat-input:focus{border-color:#2f56c7;box-shadow:0 0 0 3px rgba(47,86,199,.12)}
    .nps-chat-send{width:44px;height:44px;border-radius:50%;border:0;background:#f5a623;color:#0f1f5c;font-size:1rem;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0}
    .nps-chat-send:disabled{opacity:.6;cursor:not-allowed}
    @media (max-width:520px){.nps-chat-toggle{right:16px;bottom:16px}.nps-chat-panel{right:10px;bottom:84px;width:calc(100vw - 20px);height:min(560px,calc(100vh - 100px));border-radius:14px}}
  `;

  const style = document.createElement('style');
  style.textContent = styles;
  document.head.appendChild(style);

  const panel = document.createElement('section');
  panel.className = 'nps-chat-panel';
  panel.setAttribute('aria-label', 'Nirmaan Public School chatbot');
  panel.innerHTML = `
    <div class="nps-chat-head">
      <div>
        <div class="nps-chat-title">NPS Assistant</div>
        <div class="nps-chat-subtitle">Public website information</div>
      </div>
      <button class="nps-chat-close" type="button" aria-label="Close chat"><i class="fas fa-times"></i></button>
    </div>
    <div class="nps-chat-messages" aria-live="polite"></div>
    <div class="nps-chat-suggestions">
      <button type="button" data-question="What classes are offered?">Classes</button>
      <button type="button" data-question="How can I apply for admission?">Admissions</button>
      <button type="button" data-question="What are the office hours?">Timings</button>
      <button type="button" data-question="What documents are required?">Documents</button>
      <button type="button" data-question="Is transport available?">Transport</button>
    </div>
    <form class="nps-chat-form">
      <input class="nps-chat-input" type="text" maxlength="300" autocomplete="off" placeholder="Ask about admissions, timings, fees..." aria-label="Ask a question" />
      <button class="nps-chat-send" type="submit" aria-label="Send"><i class="fas fa-paper-plane"></i></button>
    </form>
  `;

  const toggle = document.createElement('button');
  toggle.className = 'nps-chat-toggle';
  toggle.type = 'button';
  toggle.setAttribute('aria-label', 'Open NPS assistant');
  toggle.innerHTML = '<i class="fas fa-comments"></i>';

  document.body.appendChild(panel);
  document.body.appendChild(toggle);

  const messages = panel.querySelector('.nps-chat-messages');
  const form = panel.querySelector('.nps-chat-form');
  const input = panel.querySelector('.nps-chat-input');
  const send = panel.querySelector('.nps-chat-send');
  const close = panel.querySelector('.nps-chat-close');

  function addMessage(text, type, links) {
    const msg = document.createElement('div');
    msg.className = `nps-chat-msg ${type}`;
    msg.textContent = text;

    if (links && links.length) {
      const linkWrap = document.createElement('div');
      linkWrap.className = 'nps-chat-links';
      links.forEach((link) => {
        const a = document.createElement('a');
        a.href = link.href;
        a.textContent = link.label;
        linkWrap.appendChild(a);
      });
      msg.appendChild(linkWrap);
    }

    messages.appendChild(msg);
    messages.scrollTop = messages.scrollHeight;
  }

  async function ask(question) {
    const value = question.trim();
    if (!value) return;

    addMessage(value, 'user');
    input.value = '';
    send.disabled = true;

    try {
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: value })
      });
      const result = await response.json();
      addMessage(result.answer || 'Please contact the school office at 991-822-5511.', 'bot', result.links || []);
    } catch (error) {
      addMessage('I could not answer right now. Please contact the school office at 991-822-5511.', 'bot');
    } finally {
      send.disabled = false;
      input.focus();
    }
  }

  toggle.addEventListener('click', () => {
    panel.classList.toggle('open');
    if (panel.classList.contains('open')) {
      if (!messages.children.length) {
        addMessage('Hello! I can answer questions using only public information from the Nirmaan Public School website.', 'bot');
      }
      input.focus();
    }
  });

  close.addEventListener('click', () => {
    panel.classList.remove('open');
    toggle.focus();
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    ask(input.value);
  });

  panel.querySelectorAll('[data-question]').forEach((button) => {
    button.addEventListener('click', () => ask(button.dataset.question || ''));
  });
})();
