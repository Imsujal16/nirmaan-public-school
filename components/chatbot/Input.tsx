import { motion } from 'framer-motion';
import { KeyboardEvent, useEffect, useRef, useState } from 'react';

interface InputProps {
  disabled: boolean;
  onSend: (message: string) => void;
  onClose: () => void;
}

export function Input({ disabled, onSend, onClose }: InputProps) {
  const [value, setValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = 'auto';
    textarea.style.height = `${Math.min(textarea.scrollHeight, 116)}px`;
  }, [value]);

  function submit() {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue('');
  }

  function onKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === 'Escape') {
      event.preventDefault();
      onClose();
      return;
    }

    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      submit();
    }
  }

  return (
    <div className="nps2-input-zone">
      <div className="nps2-input-shell">
        <button className="nps2-tool" type="button" aria-label="Attachment placeholder" title="Coming soon" disabled>
          +
        </button>
        <textarea
          ref={textareaRef}
          className="nps2-textarea"
          placeholder="Ask about admissions, fees, transport..."
          aria-label="Ask Nirmaan Public School assistant"
          rows={1}
          value={value}
          disabled={disabled}
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={onKeyDown}
        />
        <button className="nps2-tool" type="button" aria-label="Voice placeholder" title="Coming soon" disabled>
          ◌
        </button>
        <motion.button
          className="nps2-send"
          type="button"
          aria-label="Send message"
          disabled={disabled || !value.trim()}
          onClick={submit}
          whileTap={{ scale: 0.92 }}
        >
          →
        </motion.button>
      </div>
      <div className="nps2-input-help">
        <span>Enter to send · Shift+Enter for new line</span>
        <span>Esc closes</span>
      </div>
    </div>
  );
}
