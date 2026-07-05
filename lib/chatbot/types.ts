export type ChatRole = 'bot' | 'user';

export type ChatIntent =
  | 'admissions'
  | 'academics'
  | 'facilities'
  | 'transport'
  | 'sports'
  | 'gallery'
  | 'contact'
  | 'leadership'
  | 'timings'
  | 'fees'
  | 'documents'
  | 'safety'
  | 'overview'
  | 'unknown';

export interface ChatLink {
  label: string;
  href: string;
  variant?: 'primary' | 'secondary';
}

export interface KnowledgeEntry {
  id: string;
  title: string;
  intent: ChatIntent;
  summary: string;
  details: string[];
  keywords: string[];
  aliases: string[];
  links: ChatLink[];
  related?: string[];
}

export interface RichCardAction {
  label: string;
  href?: string;
  prompt?: string;
  variant?: 'primary' | 'secondary';
}

export interface RichCardData {
  eyebrow?: string;
  title: string;
  description: string;
  bullets?: string[];
  actions?: RichCardAction[];
}

export interface ChatResponse {
  intent: ChatIntent;
  title: string;
  markdown: string;
  confidence: number;
  cards: RichCardData[];
  links: ChatLink[];
  suggestions: string[];
}

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  timestamp: number;
  cards?: RichCardData[];
  links?: ChatLink[];
  suggestions?: string[];
  status?: 'streaming' | 'complete';
}

export interface SearchHit {
  entry: KnowledgeEntry;
  score: number;
  reasons: string[];
}
