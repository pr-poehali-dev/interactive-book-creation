import { useState, useRef } from 'react';
import Icon from '@/components/ui/icon';

const EFFECTS = [
  { id: 'none', label: 'Обычный', icon: 'Type' },
  { id: 'dramatic', label: 'Драматика', icon: 'Zap' },
  { id: 'mystery', label: 'Тайна', icon: 'Moon' },
  { id: 'epic', label: 'Эпик', icon: 'Sword' },
  { id: 'romantic', label: 'Романс', icon: 'Heart' },
];

const CHAPTERS = [
  { id: 1, title: 'Пролог', words: 342, status: 'done' },
  { id: 2, title: 'Начало пути', words: 1204, status: 'done' },
  { id: 3, title: 'Первое испытание', words: 856, status: 'progress' },
  { id: 4, title: 'Тёмный лес', words: 0, status: 'empty' },
  { id: 5, title: 'Финал', words: 0, status: 'empty' },
];

const PLACEHOLDER = `Ветер нёс запах старых страниц...

Начни свою историю здесь. Пусть слова текут свободно.`;

export default function BookEditor() {
  const [activeChapter, setActiveChapter] = useState(3);
  const [activeEffect, setActiveEffect] = useState('none');
  const [text, setText] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [showChapters, setShowChapters] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setText(val);
    setWordCount(val.trim() ? val.trim().split(/\s+/).length : 0);
  };

  const effectStyles: Record<string, React.CSSProperties> = {
    none: {},
    dramatic: { letterSpacing: '0.05em', lineHeight: '2.2' },
    mystery: { letterSpacing: '-0.01em', opacity: 0.85 },
    epic: { letterSpacing: '0.08em', fontWeight: '600' },
    romantic: { fontStyle: 'italic', lineHeight: '2.4' },
  };

  const effectGlows: Record<string, string> = {
    none: '',
    dramatic: 'shadow-[0_0_40px_rgba(240,168,50,0.15)]',
    mystery: 'shadow-[0_0_40px_rgba(139,92,246,0.15)]',
    epic: 'shadow-[0_0_40px_rgba(217,70,239,0.15)]',
    romantic: 'shadow-[0_0_40px_rgba(240,168,50,0.1)]',
  };

  const currentChapter = CHAPTERS.find(c => c.id === activeChapter);

  return (
    <div className="flex flex-col gap-3">
      {/* Chapter selector row */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setShowChapters(!showChapters)}
          className="flex-1 flex items-center justify-between px-4 py-3 rounded-xl glass border border-border/50 text-sm font-body"
        >
          <div className="flex items-center gap-2">
            {currentChapter?.status === 'done' && <span className="w-2 h-2 rounded-full bg-emerald-400" />}
            {currentChapter?.status === 'progress' && <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />}
            {currentChapter?.status === 'empty' && <span className="w-2 h-2 rounded-full bg-white/20" />}
            <span className="font-display text-base">{currentChapter?.title}</span>
          </div>
          <Icon name={showChapters ? 'ChevronUp' : 'ChevronDown'} size={16} className="text-muted-foreground" />
        </button>
        <button className="w-11 h-11 rounded-xl border border-gold/30 flex items-center justify-center bg-gold/5">
          <Icon name="Plus" size={18} className="text-gold" />
        </button>
      </div>

      {/* Chapters dropdown */}
      {showChapters && (
        <div className="glass rounded-2xl p-2 border border-border/40 animate-fade-in flex flex-col gap-1">
          {CHAPTERS.map((ch) => (
            <button
              key={ch.id}
              onClick={() => { setActiveChapter(ch.id); setShowChapters(false); }}
              className={`flex items-center justify-between px-3 py-3 rounded-xl text-sm font-body transition-all ${
                activeChapter === ch.id ? 'glass-gold text-gold border border-gold/20' : 'hover:bg-white/5 text-foreground/70'
              }`}
            >
              <div className="flex items-center gap-2">
                {ch.status === 'done' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />}
                {ch.status === 'progress' && <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />}
                {ch.status === 'empty' && <span className="w-1.5 h-1.5 rounded-full bg-white/20" />}
                {ch.title}
              </div>
              <span className="text-xs text-muted-foreground">{ch.words > 0 ? `${ch.words} сл.` : 'пусто'}</span>
            </button>
          ))}
        </div>
      )}

      {/* Effects row */}
      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {EFFECTS.map((effect) => (
          <button
            key={effect.id}
            onClick={() => setActiveEffect(effect.id)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-body flex-shrink-0 transition-all border ${
              activeEffect === effect.id
                ? 'bg-violet/20 border-violet/30 text-violet'
                : 'glass border-border/40 text-muted-foreground'
            }`}
          >
            <Icon name={effect.icon} fallback="Type" size={13} />
            {effect.label}
          </button>
        ))}
      </div>

      {/* Editor area */}
      <div className={`glass rounded-2xl p-4 transition-all duration-500 ${effectGlows[activeEffect]}`}>
        <div className="flex items-center justify-between mb-3 pb-3 border-b border-border/30">
          <span className="text-xs text-muted-foreground font-body">{wordCount} слов · ~{Math.ceil(wordCount / 200)} мин.</span>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 rounded-lg text-xs font-body border border-violet/30 text-violet bg-violet/5 flex items-center gap-1">
              <Icon name="Sparkles" size={11} />
              AI
            </button>
            <button className="px-3 py-1.5 rounded-lg text-xs font-body border border-gold/30 text-gold bg-gold/5 flex items-center gap-1">
              <Icon name="Save" size={11} />
              Сохранить
            </button>
          </div>
        </div>

        <textarea
          ref={textareaRef}
          className="editor-area w-full"
          style={{ ...effectStyles[activeEffect], minHeight: '280px' }}
          placeholder={PLACEHOLDER}
          value={text}
          onChange={handleTextChange}
        />

        {/* Formatting bar */}
        <div className="mt-3 pt-3 border-t border-border/30 flex items-center gap-3">
          {['Bold', 'Italic', 'AlignLeft', 'Quote'].map((icon, i) => (
            <button key={icon} className={`w-9 h-9 rounded-xl flex items-center justify-center text-muted-foreground active:bg-white/10 transition-all ${i === 2 ? 'ml-auto' : ''}`}>
              <Icon name={icon} size={15} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
