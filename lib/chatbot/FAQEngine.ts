import { CHATBOT_CONFIG, restrictedTerms } from './config';
import { knowledgeBase } from './KnowledgeBase';
import { IntentEngine } from './IntentEngine';
import { normalizeLinks } from './Navigation';
import { SearchEngine } from './SearchEngine';
import type { ChatResponse, RichCardData } from './types';

function containsRestrictedTerm(question: string) {
  const lower = question.toLowerCase();
  return restrictedTerms.some((term) => lower.includes(term));
}

function suggestionsFor(intent: string) {
  const defaults = [
    'How do I apply for admission?',
    'What classes are offered?',
    'What are the office hours?',
    'What is the fee structure?',
    'Who is the principal?'
  ];

  const byIntent: Record<string, string[]> = {
    admissions: ['What documents are required?', 'What is the age criteria?', 'Is there an entrance test?'],
    documents: ['What is the age criteria?', 'How do I apply for admission?', 'What is the fee structure?'],
    academics: ['What curriculum do you follow?', 'Tell me about smart classrooms', 'What activities are available?'],
    facilities: ['Tell me about smart classrooms', 'Is the campus safe?', 'Show me the gallery'],
    transport: ['What are the office hours?', 'What is the school address?', 'How do I contact the school?'],
    contact: ['What are the office hours?', 'Where is the school located?', 'Who runs the school?'],
    sports: ['What subjects are taught?', 'What facilities are available?', 'Show me the gallery'],
    fees: ['How do I contact the school?', 'What are the office hours?', 'How do I apply for admission?'],
    safety: ['What facilities are available?', 'Who is the school principal?', 'What are the office timings?'],
    leadership: ['What is the principal\'s message?', 'Message from the Founder', 'Message from the Director'],
    gallery: ['What sports activities are available?', 'Tell me about the campus', 'How do I apply?'],
    timings: ['What is the school address?', 'How do I contact the school?', 'What is the fee structure?']
  };

  return byIntent[intent] || defaults;
}

function cardFor(hitTitle: string, response: ChatResponse): RichCardData {
  return {
    eyebrow: undefined,
    title: hitTitle,
    description: response.markdown.split('\n')[0],
    bullets: response.markdown
      .split('\n')
      .filter((line) => line.startsWith('- '))
      .map((line) => line.replace(/^- /, ''))
      .slice(0, 6),
    actions: response.links.slice(0, 3).map((link) => ({
      label: link.label,
      href: link.href,
      variant: link.variant
    }))
  };
}

export class FAQEngine {
  private searchEngine = new SearchEngine(knowledgeBase);
  private intentEngine = new IntentEngine();

  respond(question: string): ChatResponse {
    if (containsRestrictedTerm(question)) {
      return {
        intent: 'unknown',
        title: 'Public Information Only',
        markdown: `I can help with public information from the Nirmaan Public School website.\n\nI cannot access or describe admin panels, CMS tools, private dashboards, passwords, records, or backend management features.\n\nFor school enquiries, call ${CHATBOT_CONFIG.phone}.`,
        confidence: 1,
        cards: [],
        links: [{ label: 'Contact Us', href: '/contact.html', variant: 'primary' }],
        suggestions: ['How do I apply?', 'Where is the school?', 'What classes are offered?']
      };
    }

    const hits = this.searchEngine.search(question);
    const best = hits[0];

    // ── Strict confidence gate ─────────────────────────────────────────────
    // Minimum score of 8 is required. Additionally, the top result must either
    // score above 12 (high confidence) OR lead the 2nd result by at least 4
    // points (clear winner). This prevents the catch-all 'overview' entry
    // from bleeding into unrelated queries like transport or fees.
    const second = hits[1];
    const isLowConfidence =
      !best ||
      best.score < 8 ||
      (best.score < 12 && second && best.score - second.score < 4);

    if (isLowConfidence) {
      return {
        intent: 'unknown',
        title: "I'm still learning!",
        markdown: `I'm still learning all the details! For specific questions like this, please contact our administration office directly at **${CHATBOT_CONFIG.phone}** or via WhatsApp — they will be happy to help you. 😊`,
        confidence: 0,
        cards: [],
        links: [
          { label: '💬 WhatsApp Us', href: 'https://api.whatsapp.com/send/?phone=919918225511&text&type=phone_number&app_absent=0', variant: 'primary' },
          { label: 'Contact Office', href: '/contact.html' }
        ],
        suggestions: ['How do I apply for admission?', 'What are the office hours?', 'Tell me about transport facility']
      };
    }

    const intent = this.intentEngine.detect(hits);
    const details = best.entry.details.map((detail) => `- ${detail}`).join('\n');
    const links = normalizeLinks(best.entry.links);
    const response: ChatResponse = {
      intent,
      title: best.entry.title,
      markdown: `${best.entry.summary}\n\n${details}`,
      confidence: Math.min(1, best.score / 24),
      cards: [],
      links,
      suggestions: suggestionsFor(intent)
    };

    response.cards = [cardFor(best.entry.title, response)];
    return response;
  }
}
