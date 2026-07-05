const CHATBOT_STYLE_ID = 'nps-chatbot-v2-styles';

export function injectChatbotStyles() {
  if (document.getElementById(CHATBOT_STYLE_ID)) return;

  const style = document.createElement('style');
  style.id = CHATBOT_STYLE_ID;
  style.textContent = `
    /* ── Shell & font ── */
    .nps2-shell{position:fixed;inset:auto 22px 22px auto;z-index:9999;font-family:'Inter','Outfit','Poppins',system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:var(--text-dark,#0d1545)}

    /* ── Robot Launcher ── */
    .nps2-robot-launcher{position:relative;width:72px;height:72px;border:0;border-radius:50%;background:linear-gradient(160deg,#1a3a8f,#0f1f5c 60%,#071240);box-shadow:0 8px 32px rgba(15,31,92,.45),0 0 0 2px rgba(100,160,255,.25),inset 0 1px 0 rgba(255,255,255,.15);display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:pointer;overflow:visible;padding:0}
    .nps2-robot-launcher.is-open .nps2-robot-head{transform:scale(.92);opacity:.8}
    .nps2-robot-launcher:before{content:'';position:absolute;inset:0;border-radius:50%;background:radial-gradient(circle at 35% 20%,rgba(100,160,255,.22),transparent 55%);pointer-events:none}

    /* ── Antenna ── */
    .nps2-robot-antenna{position:absolute;top:-14px;left:50%;transform:translateX(-50%);width:3px;height:14px;background:linear-gradient(to top,#3a5fc0,#6ab0ff);border-radius:2px}
    .nps2-robot-antenna-ball{position:absolute;top:-6px;left:50%;transform:translateX(-50%);width:8px;height:8px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#7fffff,#00c8ff);box-shadow:0 0 10px 3px rgba(0,200,255,.7),0 0 20px 6px rgba(0,200,255,.3);animation:nps2-pulse 1.8s ease-in-out infinite}

    /* ── Robot head ── */
    .nps2-robot-head{position:relative;width:52px;height:44px;background:linear-gradient(160deg,#1e3fa0,#0d1f5e);border-radius:16px 16px 12px 12px;box-shadow:0 6px 18px rgba(0,0,0,.4),inset 0 1px 0 rgba(255,255,255,.12);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;transition:transform .25s ease,opacity .25s ease}

    /* ── Visor ── */
    .nps2-robot-visor{width:40px;height:22px;background:linear-gradient(160deg,#050d2a,#0a1840);border-radius:10px;display:flex;align-items:center;justify-content:center;gap:8px;box-shadow:inset 0 2px 8px rgba(0,0,0,.6),inset 0 -1px 0 rgba(100,160,255,.1);position:relative;overflow:hidden}
    .nps2-robot-visor:before{content:'';position:absolute;top:1px;left:8px;right:8px;height:1px;background:linear-gradient(90deg,transparent,rgba(100,200,255,.35),transparent);border-radius:1px}

    /* ── Eyes ── */
    .nps2-robot-eye-socket{width:10px;height:10px;border-radius:50%;background:rgba(0,0,0,.5);display:grid;place-items:center;box-shadow:inset 0 1px 3px rgba(0,0,0,.8)}
    .nps2-robot-eye{width:6px;height:6px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#88ffff,#00d4ff);box-shadow:0 0 6px 2px rgba(0,212,255,.85),0 0 12px 4px rgba(0,212,255,.4);transition:transform .05s linear;will-change:transform}

    /* ── Mouth LEDs ── */
    .nps2-robot-mouth{display:flex;gap:4px;align-items:center;margin-top:1px}
    .nps2-robot-mouth-led{width:5px;height:3px;border-radius:2px;background:#00d4ff;box-shadow:0 0 5px rgba(0,212,255,.7);animation:nps2-blink-led 2s ease-in-out infinite}
    .nps2-robot-mouth-led:nth-child(2){animation-delay:.3s;width:8px}
    .nps2-robot-mouth-led:nth-child(3){animation-delay:.6s}

    /* ── Waving hand ── */
    .nps2-robot-hand{position:absolute;bottom:2px;right:-28px;font-size:22px;opacity:0;transform:rotate(20deg) translateX(0px);transform-origin:bottom left;transition:opacity .3s ease;pointer-events:none}
    .nps2-robot-hand.waving{opacity:1;animation:nps2-wave 0.55s ease-in-out 4;animation-fill-mode:forwards}

    /* ── Greeting bubble ── */
    .nps2-robot-greeting{position:absolute;bottom:80px;right:0;background:white;color:#0d1545;font-size:.78rem;font-weight:700;padding:8px 13px;border-radius:16px 16px 4px 16px;box-shadow:0 8px 24px rgba(15,31,92,.2);white-space:nowrap;animation:nps2-greet-in .35s cubic-bezier(.34,1.56,.64,1) forwards,nps2-greet-out .35s ease 2.4s forwards;pointer-events:none}
    .nps2-robot-greeting:before{content:'';position:absolute;bottom:-6px;right:12px;width:12px;height:12px;background:white;clip-path:polygon(0 0,100% 0,0 100%)}

    /* ── Notification badge ── */
    .nps2-badge{position:absolute;top:-4px;right:-4px;min-width:20px;height:20px;padding:0 5px;border-radius:999px;background:#f5a623;color:#0f1f5c;border:2px solid white;font-weight:900;font-size:10px;display:grid;place-items:center;box-shadow:0 4px 12px rgba(245,166,35,.5)}

    /* ── Chat window ── */
    .nps2-window{position:fixed;right:22px;bottom:98px;width:min(456px,calc(100vw - 28px));height:min(720px,calc(100vh - 128px));display:flex;flex-direction:column;border:1px solid rgba(255,255,255,.55);border-radius:32px;background:linear-gradient(180deg,rgba(255,255,255,.88),rgba(247,249,255,.82));box-shadow:0 34px 90px rgba(15,31,92,.28);backdrop-filter:blur(22px);-webkit-backdrop-filter:blur(22px);overflow:hidden;isolation:isolate}
    .nps2-window:before{content:'';position:absolute;inset:0;background:radial-gradient(circle at 15% 0%,rgba(245,166,35,.18),transparent 34%),radial-gradient(circle at 100% 12%,rgba(42,71,168,.16),transparent 36%);pointer-events:none;z-index:-1}

    /* ── Header ── */
    .nps2-header{padding:14px 16px;display:flex;align-items:center;gap:12px;border-bottom:1px solid rgba(221,226,240,.74);background:linear-gradient(135deg,rgba(15,31,92,.96),rgba(26,45,107,.92));color:white;min-height:70px}

    /* ── Avatar (header) ── */
    .nps2-avatar{width:44px;height:44px;min-width:44px;border-radius:16px;background:white;padding:5px;box-shadow:0 12px 26px rgba(0,0,0,.2);display:flex;align-items:center;justify-content:center;flex:0 0 44px;overflow:hidden}
    .nps2-avatar img{width:100%;height:100%;object-fit:contain;display:block}

    /* ── Header text ── */
    .nps2-header-main{min-width:0;flex:1;display:flex;flex-direction:column;justify-content:center;gap:3px}
    .nps2-title{font-size:.95rem;font-weight:800;line-height:1.2;letter-spacing:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    .nps2-status{display:flex;align-items:center;gap:6px;font-size:.73rem;color:rgba(255,255,255,.72);font-weight:400;line-height:1}
    .nps2-online-dot{width:7px;height:7px;flex:0 0 7px;border-radius:50%;background:#19d47b;box-shadow:0 0 0 4px rgba(25,212,123,.15)}

    /* ── Header icon buttons ── */
    .nps2-icon-btn{width:36px;height:36px;flex:0 0 36px;border-radius:12px;border:1px solid rgba(255,255,255,.18);background:rgba(255,255,255,.1);color:white;display:grid;place-items:center;cursor:pointer;transition:all .25s ease;font-size:1rem;font-weight:900;line-height:1}
    .nps2-icon-btn:hover{background:rgba(255,255,255,.2);transform:translateY(-1px)}

    /* ── Body & messages ── */
    .nps2-body{flex:1;overflow:hidden;display:flex;flex-direction:column;background:rgba(247,249,255,.74)}
    .nps2-messages{flex:1;overflow:auto;padding:18px 16px 20px;scroll-behavior:smooth}
    .nps2-messages::-webkit-scrollbar{width:6px}.nps2-messages::-webkit-scrollbar-thumb{background:#c8d2ec;border-radius:20px}

    /* ── Empty / welcome state ── */
    .nps2-empty{min-height:100%;display:flex;flex-direction:column;gap:16px}
    .nps2-hero{border-radius:26px;padding:20px;background:linear-gradient(145deg,rgba(255,255,255,.88),rgba(232,238,255,.75));border:1px solid rgba(221,226,240,.9);box-shadow:0 18px 46px rgba(15,31,92,.1)}
    .nps2-hero-kicker{display:inline-flex;align-items:center;gap:8px;padding:7px 11px;border-radius:999px;background:rgba(245,166,35,.14);color:#8a5a07;font-size:.73rem;font-weight:800;margin-bottom:12px;letter-spacing:.01em}
    .nps2-hero h2{font-size:1.22rem;line-height:1.3;margin:0 0 8px;color:#0d1545;font-weight:800}
    .nps2-hero p{margin:0;color:#4c5a8e;line-height:1.6;font-size:.88rem;font-weight:400}
    .nps2-capabilities{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;margin-top:14px}
    .nps2-capability{padding:8px 10px;border-radius:14px;background:white;border:1px solid #e2e8f5;font-weight:700;font-size:.78rem;color:#1a2d6b;text-align:center}

    /* ── Quick-action card grid ── */
    .nps2-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}
    .nps2-quick-card{border:1px solid rgba(221,226,240,.9);background:rgba(255,255,255,.92);border-radius:20px;padding:13px;text-align:left;cursor:pointer;box-shadow:0 10px 24px rgba(15,31,92,.08);min-height:120px;display:flex;flex-direction:column;justify-content:space-between;transition:all .25s ease}
    .nps2-quick-card:hover{transform:translateY(-3px);box-shadow:0 16px 32px rgba(15,31,92,.13);border-color:#bfd0ff}
    .nps2-quick-card-body{display:flex;flex-direction:column;gap:0}
    .nps2-quick-icon{width:34px;height:34px;border-radius:12px;background:var(--blue-pale,#e8eeff);display:grid;place-items:center;font-size:1rem;margin-bottom:9px;flex:0 0 auto}
    .nps2-quick-title{display:block;font-weight:800;color:#0d1545;font-size:.88rem;margin-bottom:4px;line-height:1.2;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    .nps2-quick-desc{display:block;font-size:.73rem;color:#6675a8;line-height:1.4;font-weight:400}
    .nps2-quick-action{font-size:.74rem;color:#0f1f5c;font-weight:800;margin-top:10px;display:inline-flex;align-items:center;gap:4px}

    /* ── Message rows ── */
    .nps2-row{display:flex;gap:10px;margin-bottom:14px;align-items:flex-end}
    .nps2-row.user{justify-content:flex-end}
    .nps2-mini-avatar{width:30px;height:30px;min-width:30px;border-radius:12px;background:white;border:1px solid #e5eaf5;padding:4px;box-shadow:0 8px 20px rgba(15,31,92,.08);flex:0 0 30px;display:flex;align-items:center;justify-content:center;overflow:hidden}
    .nps2-mini-avatar img{width:100%;height:100%;object-fit:contain;display:block}
    .nps2-bubble-wrap{max-width:86%;display:flex;flex-direction:column;gap:8px}
    .nps2-bubble{border-radius:22px;padding:12px 15px;font-size:.89rem;line-height:1.6;box-shadow:0 10px 28px rgba(15,31,92,.07);white-space:normal;font-weight:400}
    .nps2-row.bot .nps2-bubble{background:rgba(255,255,255,.94);border:1px solid #e2e8f5;border-bottom-left-radius:8px;color:#182449}
    .nps2-row.user .nps2-bubble{background:linear-gradient(135deg,#0f1f5c,#2a47a8);color:#ffffff !important;border-bottom-right-radius:8px;box-shadow:0 14px 30px rgba(15,31,92,.18)}
    .nps2-markdown p{margin:0 0 8px;font-size:.89rem;line-height:1.6}.nps2-row.user .nps2-markdown p{color:#ffffff !important}.nps2-markdown p:last-child{margin-bottom:0}.nps2-markdown ul{margin:8px 0 0;padding-left:16px}.nps2-markdown li{margin:4px 0;font-size:.86rem;line-height:1.5}
    .nps2-time{font-size:.66rem;color:#8a96bd;margin:0 4px}

    /* ── Rich answer card ── */
    .nps2-card{border-radius:20px;border:1px solid #e0e7f5;background:linear-gradient(145deg,#fff,#f8fbff);padding:14px;box-shadow:0 12px 30px rgba(15,31,92,.09)}
    .nps2-card-eyebrow{font-size:.66rem;text-transform:uppercase;font-weight:800;letter-spacing:.08em;color:#f5a623;margin-bottom:6px}
    .nps2-card-title{font-size:.94rem;font-weight:800;color:#0d1545;margin-bottom:5px;line-height:1.3}
    .nps2-card-desc{font-size:.81rem;color:#536294;line-height:1.55;margin-bottom:10px;font-weight:400}
    .nps2-card ul{padding-left:16px;margin:6px 0 10px;color:#374275;font-size:.79rem;line-height:1.55}
    .nps2-card ul li{margin:3px 0}
    .nps2-actions{display:flex;flex-wrap:wrap;gap:8px;margin-top:8px}
    .nps2-action{border:1px solid #d7e0f5;background:#f2f6ff;color:#0f1f5c;border-radius:999px;padding:7px 12px;font-size:.75rem;font-weight:700;text-decoration:none;cursor:pointer;display:inline-flex;align-items:center;transition:all .2s ease}
    .nps2-action:hover{background:#e5ecff;border-color:#a0b8ff}
    .nps2-action.primary{background:#0f1f5c;color:white;border-color:#0f1f5c}
    .nps2-action.primary:hover{background:#1a2d6b}

    /* ── Suggested follow-up chips ── */
    .nps2-suggestions{display:flex;flex-wrap:wrap;gap:8px;margin-top:4px}
    .nps2-suggestion{border:1px solid #dce5f8;background:white;color:#1a2d6b;border-radius:999px;padding:6px 11px;font-size:.73rem;font-weight:700;cursor:pointer;transition:all .2s ease}
    .nps2-suggestion:hover{background:#f0f5ff;border-color:#9fb7ff}

    /* ── Typing dots ── */
    .nps2-typing{display:flex;align-items:center;gap:5px;padding:12px 14px;border-radius:18px;background:white;border:1px solid #e2e8f5;width:max-content;box-shadow:0 10px 24px rgba(15,31,92,.08)}
    .nps2-typing span{width:7px;height:7px;border-radius:50%;background:#8ca0d4;animation:nps2-typing 1.1s infinite ease-in-out}.nps2-typing span:nth-child(2){animation-delay:.15s}.nps2-typing span:nth-child(3){animation-delay:.3s}

    /* ── Input zone ── */
    .nps2-input-zone{padding:12px;border-top:1px solid rgba(221,226,240,.9);background:rgba(255,255,255,.9);backdrop-filter:blur(14px)}
    .nps2-input-shell{display:flex;align-items:flex-end;gap:8px;border:1px solid #d9e2f4;border-radius:24px;background:white;padding:8px;box-shadow:0 12px 28px rgba(15,31,92,.07)}
    .nps2-input-shell:focus-within{border-color:#9fb7ff;box-shadow:0 0 0 3px rgba(42,71,168,.1),0 12px 28px rgba(15,31,92,.07)}
    .nps2-tool{width:34px;height:34px;border:0;border-radius:12px;background:#f2f5fc;color:#7b8ab8;display:grid;place-items:center;cursor:not-allowed;flex:0 0 auto}
    .nps2-textarea{flex:1;border:0;resize:none;outline:0;max-height:116px;min-height:34px;padding:7px 4px;font:inherit;font-family:inherit;font-size:.88rem;color:#0d1545;background:transparent;line-height:1.5}
    .nps2-textarea::placeholder{color:#8c99c1}
    .nps2-send{width:38px;height:38px;border:0;border-radius:14px;background:linear-gradient(135deg,#f5a623,#ffd966);color:#0f1f5c;font-weight:900;display:grid;place-items:center;cursor:pointer;box-shadow:0 8px 20px rgba(245,166,35,.25);flex:0 0 auto;transition:all .2s ease}
    .nps2-send:hover:not(:disabled){transform:scale(1.05);box-shadow:0 12px 24px rgba(245,166,35,.35)}
    .nps2-send:disabled{opacity:.5;cursor:not-allowed;box-shadow:none}
    .nps2-input-help{font-size:.66rem;color:#8c99c1;margin:7px 10px 0;display:flex;justify-content:space-between;gap:8px}

    /* ── Keyframes ── */
    @keyframes nps2-typing{0%,80%,100%{transform:translateY(0);opacity:.45}40%{transform:translateY(-4px);opacity:1}}
    @keyframes nps2-pulse{0%,100%{box-shadow:0 0 10px 3px rgba(0,200,255,.7),0 0 20px 6px rgba(0,200,255,.3)}50%{box-shadow:0 0 16px 6px rgba(0,200,255,.9),0 0 28px 10px rgba(0,200,255,.5)}}
    @keyframes nps2-blink-led{0%,90%,100%{opacity:1}95%{opacity:.2}}
    @keyframes nps2-wave{0%{transform:rotate(20deg)}25%{transform:rotate(-10deg)}50%{transform:rotate(20deg)}75%{transform:rotate(-5deg)}100%{transform:rotate(20deg)}}
    @keyframes nps2-greet-in{from{opacity:0;transform:scale(.8) translateY(6px)}to{opacity:1;transform:scale(1) translateY(0)}}
    @keyframes nps2-greet-out{from{opacity:1;transform:scale(1)}to{opacity:0;transform:scale(.85) translateY(4px)}}

    /* ── Mobile ── */
    @media (max-width:560px){
      .nps2-shell{inset:auto 14px 14px auto}
      .nps2-window{inset:auto 0 0 0;width:auto;height:min(88vh,760px);max-height:calc(100vh - 10px);border-radius:28px 28px 0 0;padding-bottom:env(safe-area-inset-bottom)}
      .nps2-grid{grid-template-columns:1fr}
      .nps2-capabilities{grid-template-columns:1fr 1fr}
      .nps2-bubble-wrap{max-width:92%}
      .nps2-robot-launcher{width:64px;height:64px}
      .nps2-robot-head{width:46px;height:40px}
      .nps2-robot-visor{width:36px;height:20px}
      .nps2-robot-greeting{font-size:.72rem;padding:7px 11px}
    }

    /* ── Reduced motion ── */
    @media (prefers-reduced-motion:reduce){
      .nps2-wave-arm,.nps2-typing span{animation:none}
      .nps2-messages{scroll-behavior:auto}
    }
  `;
  document.head.appendChild(style);
}
