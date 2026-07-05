(function () {
  if (window.NPSChatbotV2Loader) return;
  window.NPSChatbotV2Loader = true;

  function loadChatbot() {
    if (window.NPSChatbotV2Loaded) return;
    window.NPSChatbotV2Loaded = true;
    import('/chatbot-v2/chatbot-app.js').catch(function () {
      window.NPSChatbotV2Loaded = false;
    });
  }

  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(loadChatbot, { timeout: 1600 });
  } else {
    window.setTimeout(loadChatbot, 900);
  }
})();
