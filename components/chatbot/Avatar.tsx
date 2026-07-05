import { CHATBOT_CONFIG } from '../../lib/chatbot/config';

interface AvatarProps {
  compact?: boolean;
}

export function Avatar({ compact = false }: AvatarProps) {
  return (
    <div className={compact ? 'nps2-mini-avatar' : 'nps2-avatar'} aria-hidden="true">
      <img src={CHATBOT_CONFIG.logo} alt="" />
    </div>
  );
}
