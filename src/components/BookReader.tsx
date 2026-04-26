import { useState, useEffect, useRef } from 'react';
import Icon from '@/components/ui/icon';
import type { Book } from '@/data/books';

const PALETTES = [
  { bg: 'from-orange-900 via-red-900 to-black', accent: '#f0a832' },
  { bg: 'from-violet-950 via-purple-900 to-black', accent: '#8b5cf6' },
  { bg: 'from-slate-900 via-blue-950 to-black', accent: '#60a5fa' },
  { bg: 'from-pink-950 via-purple-950 to-black', accent: '#d946ef' },
  { bg: 'from-green-950 via-emerald-900 to-black', accent: '#10b981' },
];

const effectStyles: Record<string, React.CSSProperties> = {
  none: { letterSpacing: 'normal', lineHeight: '1.9' },
  dramatic: { letterSpacing: '0.04em', lineHeight: '2.1' },
  mystery: { letterSpacing: '-0.01em', lineHeight: '1.95', opacity: 0.9 },
  epic: { letterSpacing: '0.07em', fontWeight: '500', lineHeight: '2' },
  romantic: { fontStyle: 'italic', lineHeight: '2.3' },
};

const effectNames: Record<string, string> = {
  none: '', dramatic: 'Драматика', mystery: 'Тайна', epic: 'Эпик', romantic: 'Романс',
};

type Props = { book: Book; onClose: () => void };

export default function BookReader({ book, onClose }: Props) {
  const [chapterIdx, setChapterIdx] = useState(0);
  const [showCover, setShowCover] = useState(true);
  const [visibleParas, setVisibleParas] = useState<number[]>([]);
  const [showChapters, setShowChapters] = useState(false);
  const palette = PALETTES[book.coverPalette] ?? PALETTES[0];
  const contentRef = useRef<HTMLDivElement>(null);

  const chapters = book.chapters.filter(c => c.content);
  const chapter = chapters[chapterIdx];

  // Animate paragraphs in one by one
  useEffect(() => {
    if (!chapter || showCover) return;
    setVisibleParas([]);
    const paras = chapter.content.split('\n\n').filter(Boolean);
    paras.forEach((_, i) => {
      setTimeout(() => {
        setVisibleParas(prev => [...prev, i]);
      }, i * 250);
    });
  }, [chapterIdx, showCover, chapter]);

  const handleDownload = () => {
    const content = book.chapters
      .filter(c => c.content)
      .map(c => `== ${c.title} ==\n\n${c.content}`)
      .join('\n\n\n');
    const blob = new Blob([`${book.title}\n\n${book.description}\n\n${content}`], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${book.title}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (showCover) {
    return (
      <div
        className="fixed inset-0 z-50 flex flex-col items-center justify-center"
        style={{ maxWidth: '430px', margin: '0 auto', background: '#080810' }}
        onClick={() => setShowCover(false)}
      >
        {/* Cover */}
        <div
          className={`w-56 h-80 rounded-3xl bg-gradient-to-b ${palette.bg} relative overflow-hidden shadow-2xl animate-scale-in mb-8`}
          style={{ boxShadow: `0 30px 80px ${palette.accent}50` }}
        >
          <div className="absolute inset-0 opacity-20"
            style={{ backgroundImage: `radial-gradient(ellipse 80% 40% at 50% 20%, ${palette.accent}50, transparent)` }} />
          <div className="absolute top-4 left-4 right-4 h-px"
            style={{ background: `linear-gradient(90deg, transparent, ${palette.accent}90, transparent)` }} />
          <div className="absolute bottom-20 left-4 right-4 h-px"
            style={{ background: `linear-gradient(90deg, transparent, ${palette.accent}40, transparent)` }} />
          <div className="absolute top-6 left-1/2 -translate-x-1/2 text-2xl" style={{ color: palette.accent, opacity: 0.5 }}>✦</div>
          <div className="absolute inset-x-5 top-14 bottom-20 flex items-center justify-center">
            <div className="text-center leading-tight font-display text-xl text-white/95"
              style={{ textShadow: `0 0 30px ${palette.accent}70` }}>
              {book.title}
            </div>
          </div>
          <div className="absolute bottom-6 inset-x-4 text-center text-xs tracking-widest uppercase font-body"
            style={{ color: `${palette.accent}bb` }}>Автор</div>
        </div>

        <div className="text-center animate-fade-up" style={{ animationDelay: '300ms', opacity: 0 }}>
          <p className="font-display text-2xl text-foreground mb-2">{book.title}</p>
          <p className="text-sm text-muted-foreground font-body mb-1">{book.genre} · {(book.words / 1000).toFixed(1)}к слов</p>
          <p className="text-xs text-muted-foreground font-body px-8">{book.description}</p>
        </div>

        <div className="mt-8 flex items-center gap-2 text-muted-foreground animate-fade-up"
          style={{ animationDelay: '500ms', opacity: 0 }}>
          <Icon name="ArrowDown" size={14} />
          <span className="text-xs font-body">Нажми, чтобы начать читать</span>
        </div>

        {/* Close */}
        <button
          onClick={(e) => { e.stopPropagation(); onClose(); }}
          className="absolute top-safe right-4 w-10 h-10 rounded-full glass border border-border/40 flex items-center justify-center text-muted-foreground"
          style={{ top: 'max(16px, env(safe-area-inset-top))' }}
        >
          <Icon name="X" size={18} />
        </button>
      </div>
    );
  }

  const paras = chapter?.content.split('\n\n').filter(Boolean) ?? [];
  const effect = chapter?.effect ?? 'none';

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-mesh"
      style={{ maxWidth: '430px', margin: '0 auto' }}
    >
      {/* Top bar */}
      <div
        className="flex-shrink-0 flex items-center gap-3 px-4 py-3 border-b border-border/20 glass"
        style={{ paddingTop: 'max(14px, env(safe-area-inset-top))' }}
      >
        <button onClick={onClose} className="w-9 h-9 rounded-xl glass border border-border/40 flex items-center justify-center text-muted-foreground">
          <Icon name="ChevronLeft" size={18} />
        </button>
        <div className="flex-1 min-w-0">
          <p className="font-display text-base truncate" style={{ color: palette.accent }}>{book.title}</p>
          <p className="text-[10px] text-muted-foreground font-body">{chapter?.title ?? '—'}</p>
        </div>
        <button
          onClick={() => setShowChapters(!showChapters)}
          className="w-9 h-9 rounded-xl glass border border-border/40 flex items-center justify-center text-muted-foreground"
        >
          <Icon name="List" size={16} />
        </button>
        <button
          onClick={handleDownload}
          className="w-9 h-9 rounded-xl glass border border-border/40 flex items-center justify-center text-gold"
        >
          <Icon name="Download" size={16} />
        </button>
      </div>

      {/* Chapters panel */}
      {showChapters && (
        <div className="flex-shrink-0 p-3 border-b border-border/20 glass animate-fade-in flex flex-col gap-1">
          {chapters.map((ch, i) => (
            <button
              key={ch.id}
              onClick={() => { setChapterIdx(i); setShowChapters(false); }}
              className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-body transition-all ${
                chapterIdx === i ? 'bg-white/8 border border-white/10 text-foreground' : 'text-muted-foreground'
              }`}
            >
              <span>{ch.title}</span>
              <span className="text-xs text-muted-foreground">{ch.words} сл.</span>
            </button>
          ))}
        </div>
      )}

      {/* Effect badge */}
      {effectNames[effect] && (
        <div className="flex-shrink-0 px-4 py-2">
          <span className="text-xs font-body px-2.5 py-1 rounded-full glass border border-violet/20 text-violet">
            ✦ {effectNames[effect]}
          </span>
        </div>
      )}

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-5 pb-32" ref={contentRef}>
        <h2 className="font-display text-2xl mb-6 mt-2 text-foreground/90">{chapter?.title}</h2>

        {paras.map((para, i) => (
          <p
            key={i}
            className="font-display text-[1.05rem] mb-5 transition-all duration-500"
            style={{
              ...effectStyles[effect],
              opacity: visibleParas.includes(i) ? 1 : 0,
              transform: visibleParas.includes(i) ? 'translateY(0)' : 'translateY(12px)',
              color: 'rgba(242, 235, 210, 0.88)',
            }}
          >
            {para}
          </p>
        ))}
      </div>

      {/* Bottom nav */}
      <div
        className="flex-shrink-0 glass border-t border-border/20 flex items-center px-4 gap-3"
        style={{ paddingBottom: 'max(16px, env(safe-area-inset-bottom))', paddingTop: '12px', position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: '430px' }}
      >
        <button
          onClick={() => { if (chapterIdx > 0) { setChapterIdx(p => p - 1); } }}
          disabled={chapterIdx === 0}
          className="w-11 h-11 rounded-xl glass border border-border/40 flex items-center justify-center text-muted-foreground disabled:opacity-30"
        >
          <Icon name="ChevronLeft" size={18} />
        </button>

        <div className="flex-1 flex justify-center gap-1.5">
          {chapters.map((_, i) => (
            <button key={i} onClick={() => setChapterIdx(i)}
              className="rounded-full transition-all"
              style={{
                width: chapterIdx === i ? '20px' : '6px',
                height: '6px',
                background: chapterIdx === i ? palette.accent : 'rgba(255,255,255,0.2)',
              }}
            />
          ))}
        </div>

        <button
          onClick={() => { if (chapterIdx < chapters.length - 1) { setChapterIdx(p => p + 1); } }}
          disabled={chapterIdx === chapters.length - 1}
          className="w-11 h-11 rounded-xl glass border border-border/40 flex items-center justify-center text-muted-foreground disabled:opacity-30"
        >
          <Icon name="ChevronRight" size={18} />
        </button>
      </div>
    </div>
  );
}
