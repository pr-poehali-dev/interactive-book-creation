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

const PLACEHOLDER = `Ветер нёс запах старых страниц и чего-то ещё — чего-то, что нельзя было назвать словами, но что каждый писатель узнавал с первого вздоха...

Начни свою историю здесь. Пусть слова текут свободно.`;

export default function BookEditor() {
  const [activeChapter, setActiveChapter] = useState(3);
  const [activeEffect, setActiveEffect] = useState('none');
  const [text, setText] = useState('');
  const [wordCount, setWordCount] = useState(0);
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

  return (
    <div className="flex h-full gap-4">
      {/* Chapter list */}
      <div className="w-56 flex-shrink-0 flex flex-col gap-2">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-muted-foreground uppercase tracking-widest font-body">Главы</span>
          <button className="w-6 h-6 rounded-full border border-gold/30 flex items-center justify-center hover:border-gold/60 hover:bg-gold/10 transition-all">
            <Icon name="Plus" size={12} className="text-gold" />
          </button>
        </div>
        {CHAPTERS.map((ch) => (
          <button
            key={ch.id}
            onClick={() => setActiveChapter(ch.id)}
            className={`text-left p-3 rounded-lg transition-all border font-body ${
              activeChapter === ch.id
                ? 'glass-gold border-gold/30 text-gold'
                : 'glass border-border/50 text-foreground/70 hover:text-foreground hover:border-border'
            }`}
          >
            <div className="text-sm font-medium truncate">{ch.title}</div>
            <div className="flex items-center gap-2 mt-1">
              {ch.status === 'done' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />}
              {ch.status === 'progress' && <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />}
              {ch.status === 'empty' && <span className="w-1.5 h-1.5 rounded-full bg-white/20" />}
              <span className="text-xs text-muted-foreground">
                {ch.words > 0 ? `${ch.words} сл.` : 'пусто'}
              </span>
            </div>
          </button>
        ))}

        <div className="mt-4 ink-line" />

        <div className="mt-4">
          <span className="text-xs text-muted-foreground uppercase tracking-widest font-body block mb-3">Эффект текста</span>
          <div className="flex flex-col gap-1.5">
            {EFFECTS.map((effect) => (
              <button
                key={effect.id}
                onClick={() => setActiveEffect(effect.id)}
                className={`flex items-center gap-2 p-2 rounded-lg text-sm transition-all font-body ${
                  activeEffect === effect.id
                    ? 'bg-violet/20 border border-violet/30 text-violet'
                    : 'text-foreground/50 hover:text-foreground hover:bg-white/5'
                }`}
              >
                <Icon name={effect.icon} fallback="Type" size={14} />
                {effect.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Editor */}
      <div className={`flex-1 flex flex-col glass rounded-2xl p-6 transition-all duration-500 ${effectGlows[activeEffect]}`}>
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-border/30">
          <div>
            <h3 className="font-display text-2xl text-foreground/90">
              {CHAPTERS.find(c => c.id === activeChapter)?.title}
            </h3>
            <span className="text-xs text-muted-foreground font-body">{wordCount} слов</span>
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 rounded-lg text-xs font-body glass border border-violet/30 text-violet hover:bg-violet/10 transition-all flex items-center gap-1.5">
              <Icon name="Sparkles" size={12} />
              AI-продолжение
            </button>
            <button className="px-3 py-1.5 rounded-lg text-xs font-body glass border border-gold/30 text-gold hover:bg-gold/10 transition-all flex items-center gap-1.5">
              <Icon name="Save" size={12} />
              Сохранить
            </button>
          </div>
        </div>

        <textarea
          ref={textareaRef}
          className="editor-area flex-1 w-full"
          style={effectStyles[activeEffect]}
          placeholder={PLACEHOLDER}
          value={text}
          onChange={handleTextChange}
        />

        {/* Bottom bar */}
        <div className="mt-4 pt-4 border-t border-border/30 flex items-center justify-between">
          <div className="flex gap-4 text-xs text-muted-foreground font-body">
            <span>{wordCount} слов</span>
            <span>~{Math.ceil(wordCount / 200)} мин. чтения</span>
          </div>
          <div className="flex gap-2">
            <button className="w-7 h-7 rounded flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all">
              <Icon name="Bold" size={14} />
            </button>
            <button className="w-7 h-7 rounded flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all">
              <Icon name="Italic" size={14} />
            </button>
            <button className="w-7 h-7 rounded flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all">
              <Icon name="AlignLeft" size={14} />
            </button>
            <div className="w-px h-5 bg-border/50 mx-1 self-center" />
            <button className="w-7 h-7 rounded flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all">
              <Icon name="Quote" size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}