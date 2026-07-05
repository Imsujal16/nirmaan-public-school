import { motion } from 'framer-motion';

const quickActions = [
  {
    icon: '🎓',
    title: 'Admissions',
    desc: 'Process, age criteria, documents and seats.',
    prompt: 'How do I apply for admission?'
  },
  {
    icon: '📚',
    title: 'Academics',
    desc: 'Curriculum, classes and learning methods.',
    prompt: 'What classes and curriculum are available?'
  },
  {
    icon: '🏫',
    title: 'Facilities',
    desc: 'Smart classrooms, campus and infrastructure.',
    prompt: 'What facilities are available?'
  },
  {
    icon: '🚌',
    title: 'Transport',
    desc: 'Bus routes and pickup availability.',
    prompt: 'Tell me about transport facility.'
  },
  {
    icon: '🏆',
    title: 'Sports',
    desc: 'Activities, games and co-curricular options.',
    prompt: 'What sports and activities are available?'
  },
  {
    icon: '🖼️',
    title: 'Gallery',
    desc: 'Photos, videos, annual day and campus tour.',
    prompt: 'Show me the gallery.'
  }
];

interface QuickActionGridProps {
  onSelect: (prompt: string) => void;
}

export function QuickActionGrid({ onSelect }: QuickActionGridProps) {
  return (
    <div className="nps2-grid">
      {quickActions.map((action, index) => (
        <motion.button
          type="button"
          className="nps2-quick-card"
          key={action.title}
          onClick={() => onSelect(action.prompt)}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.045, duration: 0.28 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="nps2-quick-card-body">
            <span className="nps2-quick-icon">{action.icon}</span>
            <span className="nps2-quick-title">{action.title}</span>
            <span className="nps2-quick-desc">{action.desc}</span>
          </span>
          <span className="nps2-quick-action">Explore →</span>
        </motion.button>
      ))}
    </div>
  );
}
