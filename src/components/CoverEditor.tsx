import { useState } from 'react';
import Icon from '@/components/ui/icon';

const PALETTES = [
  { name: 'Огонь', bg: 'from-orange-900 via-red-900 to-black', accent: '#f0a832' },
  { name: 'Тьма', bg: 'from-violet-950 via-purple-900 to-black', accent: '#8b5cf6' },
  { name: 'Бездна', bg: 'from-slate-900 via-blue-950 to-black', accent: '#60a5fa' },
  { name: 'Мистика', bg: 'from-pink-950 via-purple-950 to-black', accent: '#d946ef' },
  { name: 'Лес', bg: 'from-green-950 via-emerald-900 to-black', accent: '#10b981' },
];

const FONTS = ['Cormorant Garamond', 'Merriweather', 'Cinzel'];

export default function CoverEditor() {
  const [palette, setPalette] = useState(0);
  const [title, setTitle] = useState('Пепел Звёздного Тракта');
  const [author, setAuthor] = useState('Ваше имя');
  const [font, setFont] = useState(0);
  const [fontSize, setFontSize] = useState(28);
  const [generating, setGenerating] = useState(false);
  const [bgPrompt, setBgPrompt] = useState('');

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => setGenerating(false), 2000);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Cover preview — centered */}
      <div className="flex flex-col items-center gap-3 py-2">
        <div
          className={`w-48 h-72 rounded-2xl bg-gradient-to-b ${PALETTES[palette].bg} relative overflow-hidden shadow-2xl transition-all duration-500`}
          style={{ boxShadow: `0 20px 60px ${PALETTES[palette].accent}40` }}
        >
          <div
            className="absolute inset-0 opacity-20"
            style={{ backgroundImage: `radial-gradient(ellipse 80% 40% at 50% 20%, ${PALETTES[palette].accent}40, transparent)` }}
          />
          <div className="absolute top-3 left-3 right-3 h-px"
            style={{ background: `linear-gradient(90deg, transparent, ${PALETTES[palette].accent}80, transparent)` }} />
          <div className="absolute bottom-16 left-3 right-3 h-px"
            style={{ background: `linear-gradient(90deg, transparent, ${PALETTES[palette].accent}40, transparent)` }} />

          <div className="absolute top-5 left-1/2 -translate-x-1/2 text-center">
            <div style={{ color: PALETTES[palette].accent, fontSize: 20, opacity: 0.6 }}>✦</div>
          </div>

          <div className="absolute inset-x-4 top-12 bottom-16 flex items-center justify-center">
            <div
              className="text-center leading-tight"
              style={{
                fontFamily: FONTS[font],
                fontSize: `${Math.min(fontSize * 0.58, 24)}px`,
                color: 'rgba(255,255,255,0.95)',
                textShadow: `0 0 20px ${PALETTES[palette].accent}60`,
              }}
            >
              {title || 'Название книги'}
            </div>
          </div>

          <div
            className="absolute bottom-5 inset-x-4 text-center text-xs tracking-widest uppercase"
            style={{ color: `${PALETTES[palette].accent}cc`, fontFamily: 'Rubik' }}
          >
            {author || 'Автор'}
          </div>
        </div>

        {/* Palette dots */}
        <div className="flex gap-3">
          {PALETTES.map((p, i) => (
            <button
              key={p.name}
              onClick={() => setPalette(i)}
              className="w-8 h-8 rounded-full transition-all active:scale-95"
              style={{
                background: p.accent,
                transform: palette === i ? 'scale(1.25)' : 'scale(1)',
                boxShadow: palette === i ? `0 0 12px ${p.accent}80` : 'none',
                border: palette === i ? `2px solid rgba(255,255,255,0.3)` : '2px solid transparent',
              }}
              title={p.name}
            />
          ))}
        </div>
      </div>

      {/* Title & Author */}
      <div className="glass rounded-2xl p-4 flex flex-col gap-3">
        <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-body">Текст обложки</span>
        <div>
          <label className="text-xs text-muted-foreground font-body block mb-1.5">Название книги</label>
          <input
            className="w-full px-4 py-3 rounded-xl glass border border-border/50 bg-transparent text-sm font-body text-foreground placeholder:text-muted-foreground outline-none focus:border-gold/30 transition-all"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Введи название..."
          />
        </div>
        <div>
          <label className="text-xs text-muted-foreground font-body block mb-1.5">Автор</label>
          <input
            className="w-full px-4 py-3 rounded-xl glass border border-border/50 bg-transparent text-sm font-body text-foreground placeholder:text-muted-foreground outline-none focus:border-gold/30 transition-all"
            value={author}
            onChange={e => setAuthor(e.target.value)}
            placeholder="Имя автора..."
          />
        </div>
      </div>

      {/* Font & size */}
      <div className="glass rounded-2xl p-4 flex flex-col gap-3">
        <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-body">Шрифт</span>
        <div className="flex gap-2">
          {FONTS.map((f, i) => (
            <button
              key={f}
              onClick={() => setFont(i)}
              className={`flex-1 py-2.5 rounded-xl text-xs transition-all border ${
                font === i
                  ? 'border-gold/40 bg-gold/10 text-gold'
                  : 'glass border-border/40 text-muted-foreground'
              }`}
              style={{ fontFamily: f }}
            >
              {f.split(' ')[0]}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground font-body w-20">Размер: {fontSize}</span>
          <input
            type="range" min={16} max={48} value={fontSize}
            onChange={e => setFontSize(Number(e.target.value))}
            className="flex-1 accent-gold"
          />
        </div>
      </div>

      {/* AI background */}
      <div className="glass-violet rounded-2xl p-4 border border-violet/20">
        <div className="flex items-center gap-2 mb-3">
          <Icon name="Sparkles" size={14} className="text-violet" />
          <span className="text-sm font-body text-violet">AI-фон обложки</span>
        </div>
        <input
          className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none font-body mb-3"
          placeholder="Опиши желаемый фон..."
          value={bgPrompt}
          onChange={e => setBgPrompt(e.target.value)}
        />
        <button
          onClick={handleGenerate}
          className="w-full py-3 rounded-xl bg-violet/20 border border-violet/30 text-violet text-sm font-body flex items-center justify-center gap-2 active:bg-violet/30 transition-all"
        >
          {generating ? <Icon name="Loader" size={14} className="animate-spin" /> : <Icon name="Image" size={14} />}
          {generating ? 'Генерирую...' : 'Создать фон'}
        </button>
      </div>

      {/* Export */}
      <button className="w-full py-4 rounded-2xl bg-gradient-to-r from-gold/80 to-magenta/60 text-ink font-body font-semibold text-sm flex items-center justify-center gap-2 active:opacity-80 transition-all">
        <Icon name="Download" size={16} />
        Скачать обложку
      </button>
    </div>
  );
}
