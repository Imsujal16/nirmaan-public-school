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

    if (!best || best.score < 2) {
      return {
        intent: 'unknown',
        title: 'I can check public website information',
        markdown: `I could not find that detail in the public website content.\n\nFor the most accurate current information, please contact the school office at ${CHATBOT_CONFIG.phone}.`,
        confidence: 0,
        cards: [],
        links: [{ label: 'Contact Office', href: '/contact.html', variant: 'primary' }],
        suggestions: ['Admissions process', 'Office timings', 'Transport facility']
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
