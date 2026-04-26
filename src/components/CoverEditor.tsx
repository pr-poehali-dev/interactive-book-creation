import { useState } from 'react';
import Icon from '@/components/ui/icon';

const PALETTES = [
  { name: 'Огонь', bg: 'from-orange-900 via-red-900 to-black', accent: '#f0a832' },
  { name: 'Тьма', bg: 'from-violet-950 via-purple-900 to-black', accent: '#8b5cf6' },
  { name: 'Бездна', bg: 'from-slate-900 via-blue-950 to-black', accent: '#60a5fa' },
  { name: 'Мистика', bg: 'from-pink-950 via-purple-950 to-black', accent: '#d946ef' },
  { name: 'Лес', bg: 'from-green-950 via-emerald-900 to-black', accent: '#10b981' },
];

const FONTS = ['Cormorant Garamond', 'Playfair Display', 'Cinzel', 'Merriweather'];

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
    <div className="flex h-full gap-6">
      {/* Cover Preview */}
      <div className="w-52 flex-shrink-0 flex flex-col items-center gap-4">
        <div
          className={`w-44 h-64 rounded-xl bg-gradient-to-b ${PALETTES[palette].bg} relative overflow-hidden shadow-2xl transition-all duration-500`}
          style={{ boxShadow: `0 20px 60px ${PALETTES[palette].accent}30` }}
        >
          {/* Decorative elements */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `radial-gradient(ellipse 80% 40% at 50% 20%, ${PALETTES[palette].accent}40, transparent)`,
            }}
          />
          <div
            className="absolute top-3 left-3 right-3 h-px"
            style={{ background: `linear-gradient(90deg, transparent, ${PALETTES[palette].accent}80, transparent)` }}
          />
          <div
            className="absolute bottom-16 left-3 right-3 h-px"
            style={{ background: `linear-gradient(90deg, transparent, ${PALETTES[palette].accent}40, transparent)` }}
          />

          {/* Ornament */}
          <div className="absolute top-5 left-1/2 -translate-x-1/2 text-center">
            <div style={{ color: PALETTES[palette].accent, fontSize: 18, opacity: 0.6 }}>✦</div>
          </div>

          {/* Title */}
          <div className="absolute inset-x-4 top-12 bottom-16 flex items-center justify-center">
            <div
              className="text-center leading-tight"
              style={{
                fontFamily: FONTS[font],
                fontSize: `${Math.min(fontSize * 0.55, 22)}px`,
                color: 'rgba(255,255,255,0.95)',
                textShadow: `0 0 20px ${PALETTES[palette].accent}60`,
              }}
            >
              {title || 'Название книги'}
            </div>
          </div>

          {/* Author */}
          <div
            className="absolute bottom-5 inset-x-4 text-center text-xs tracking-widest uppercase"
            style={{ color: `${PALETTES[palette].accent}cc`, fontFamily: 'Rubik' }}
          >
            {author || 'Автор'}
          </div>
        </div>

        {/* Palette selector */}
        <div className="flex gap-2">
          {PALETTES.map((p, i) => (
            <button
              key={p.name}
              onClick={() => setPalette(i)}
              className={`w-6 h-6 rounded-full transition-all ${palette === i ? 'scale-125 ring-1 ring-white/30' : 'scale-100 hover:scale-110'}`}
              style={{ background: p.accent }}
              title={p.name}
            />
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="flex-1 flex flex-col gap-4">
        {/* Text controls */}
        <div className="glass rounded-2xl p-5">
          <span className="text-xs text-muted-foreground uppercase tracking-widest font-body block mb-4">Текст обложки</span>

          <div className="flex flex-col gap-3">
            <div>
              <label className="text-xs text-muted-foreground font-body block mb-1.5">Название</label>
              <input
                className="w-full px-3 py-2.5 rounded-xl glass border border-border/50 bg-transparent text-sm font-body text-foreground placeholder:text-muted-foreground outline-none focus:border-gold/30 transition-all"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Введи название книги..."
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground font-body block mb-1.5">Автор</label>
              <input
                className="w-full px-3 py-2.5 rounded-xl glass border border-border/50 bg-transparent text-sm font-body text-foreground placeholder:text-muted-foreground outline-none focus:border-gold/30 transition-all"
                value={author}
                onChange={e => setAuthor(e.target.value)}
                placeholder="Имя автора..."
              />
            </div>
          </div>
        </div>

        {/* Font & size */}
        <div className="glass rounded-2xl p-5">
          <span className="text-xs text-muted-foreground uppercase tracking-widest font-body block mb-4">Шрифт</span>
          <div className="flex flex-wrap gap-2 mb-4">
            {FONTS.map((f, i) => (
              <button
                key={f}
                onClick={() => setFont(i)}
                className={`px-3 py-1.5 rounded-lg text-xs transition-all border ${
                  font === i
                    ? 'border-gold/40 bg-gold/10 text-gold'
                    : 'glass border-border/40 text-muted-foreground hover:text-foreground'
                }`}
                style={{ fontFamily: f }}
              >
                {f.split(' ')[0]}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground font-body w-16">Размер: {fontSize}</span>
            <input
              type="range" min={16} max={48} value={fontSize}
              onChange={e => setFontSize(Number(e.target.value))}
              className="flex-1 accent-gold h-1 rounded"
            />
          </div>
        </div>

        {/* AI background */}
        <div className="glass-violet rounded-2xl p-5 border border-violet/20">
          <div className="flex items-center gap-2 mb-3">
            <Icon name="Sparkles" size={14} className="text-violet" />
            <span className="text-sm font-body text-violet">AI-фон обложки</span>
          </div>
          <div className="flex gap-2">
            <input
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none font-body"
              placeholder="Опиши желаемый фон обложки..."
              value={bgPrompt}
              onChange={e => setBgPrompt(e.target.value)}
            />
            <button
              onClick={handleGenerate}
              className="px-4 py-1.5 rounded-lg bg-violet/30 text-violet text-xs font-body hover:bg-violet/40 transition-all flex items-center gap-1.5 flex-shrink-0"
            >
              {generating
                ? <Icon name="Loader" size={12} className="animate-spin" />
                : <Icon name="Image" size={12} />
              }
              Создать фон
            </button>
          </div>
        </div>

        {/* Export */}
        <button className="px-5 py-3 rounded-xl bg-gradient-to-r from-gold/80 to-magenta/60 text-ink font-body font-medium text-sm hover:from-gold hover:to-magenta transition-all flex items-center justify-center gap-2">
          <Icon name="Download" size={15} />
          Скачать обложку
        </button>
      </div>
    </div>
  );
}
