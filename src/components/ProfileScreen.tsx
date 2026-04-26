import Icon from '@/components/ui/icon';
import type { Book } from '@/data/books';

const PALETTES = [
  { accent: '#f0a832', bg: 'from-orange-900 via-red-900 to-black' },
  { accent: '#8b5cf6', bg: 'from-violet-950 via-purple-900 to-black' },
  { accent: '#60a5fa', bg: 'from-slate-900 via-blue-950 to-black' },
  { accent: '#d946ef', bg: 'from-pink-950 via-purple-950 to-black' },
  { accent: '#10b981', bg: 'from-green-950 via-emerald-900 to-black' },
];

const BADGES = [
  { icon: '✍️', label: 'Первое слово', earned: true },
  { icon: '📖', label: '10к слов', earned: true },
  { icon: '🌙', label: 'Ночной автор', earned: true },
  { icon: '🔥', label: '3 книги', earned: false },
  { icon: '👑', label: 'Мастер', earned: false },
  { icon: '🌟', label: 'Публикация', earned: false },
];

type Props = { books: Book[]; onReadBook: (book: Book) => void };

export default function ProfileScreen({ books, onReadBook }: Props) {
  const totalWords = books.reduce((s, b) => s + b.words, 0);
  const totalChapters = books.reduce((s, b) => s + b.chapters.filter(c => c.status === 'done').length, 0);
  const doneBooks = books.filter(b => b.status === 'done' || b.status === 'published').length;

  return (
    <div className="flex flex-col gap-5">
      {/* Profile header */}
      <div className="glass rounded-2xl p-5 flex items-center gap-4">
        <div className="relative flex-shrink-0">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-gold to-magenta flex items-center justify-center">
            <span className="font-display text-4xl text-ink font-bold">А</span>
          </div>
          <div className="absolute -bottom-1.5 -right-1.5 w-6 h-6 rounded-full bg-emerald-500 border-2 border-background flex items-center justify-center">
            <span className="text-[8px] text-white font-bold">✓</span>
          </div>
        </div>
        <div>
          <h2 className="font-display text-2xl text-foreground">Автор</h2>
          <p className="text-xs text-muted-foreground font-body">Писатель · {books.length} книг</p>
          <div className="flex gap-2 mt-2">
            <span className="text-xs px-2.5 py-1 rounded-full glass border border-gold/30 text-gold font-body">Фэнтези</span>
            <span className="text-xs px-2.5 py-1 rounded-full glass border border-violet/30 text-violet font-body">Мистика</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { value: totalWords >= 1000 ? `${(totalWords / 1000).toFixed(0)}к` : totalWords, label: 'слов написано', icon: 'Type', color: '#f0a832' },
          { value: totalChapters, label: 'глав готово', icon: 'Layers', color: '#d946ef' },
          { value: doneBooks, label: 'книг готово', icon: 'CheckCircle', color: '#10b981' },
        ].map(s => (
          <div key={s.label} className="glass rounded-2xl p-3 flex flex-col items-center gap-1">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center mb-1"
              style={{ background: `${s.color}20`, border: `1px solid ${s.color}30` }}>
              <Icon name={s.icon} size={15} style={{ color: s.color }} />
            </div>
            <span className="font-display text-xl font-bold" style={{ color: s.color }}>{s.value}</span>
            <span className="text-[9px] text-muted-foreground font-body text-center leading-tight">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Badges */}
      <div className="glass rounded-2xl p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs text-muted-foreground uppercase tracking-widest font-body">Достижения</span>
          <span className="text-xs text-gold font-body">{BADGES.filter(b => b.earned).length}/{BADGES.length}</span>
        </div>
        <div className="flex gap-3">
          {BADGES.map(b => (
            <div key={b.label} className="flex flex-col items-center gap-1.5 flex-shrink-0">
              <div className={`w-11 h-11 rounded-2xl flex items-center justify-center text-xl transition-all ${
                b.earned ? 'glass border border-gold/30 shadow-[0_0_12px_rgba(240,168,50,0.2)]' : 'bg-white/3 border border-white/5 opacity-30 grayscale'
              }`}>
                {b.icon}
              </div>
              <span className="text-[8px] font-body text-center text-muted-foreground leading-tight" style={{ maxWidth: '44px' }}>{b.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* My books */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs text-muted-foreground uppercase tracking-widest font-body">Мои книги</span>
          <span className="text-xs text-muted-foreground font-body">{books.length} книг</span>
        </div>

        <div className="flex flex-col gap-3">
          {books.map((book) => {
            const pal = PALETTES[book.coverPalette] ?? PALETTES[0];
            return (
              <button
                key={book.id}
                onClick={() => onReadBook(book)}
                className="glass rounded-2xl p-4 border border-border/40 flex items-center gap-4 active:scale-[0.98] transition-all text-left"
              >
                {/* Mini cover */}
                <div
                  className={`w-14 h-20 rounded-xl bg-gradient-to-b ${pal.bg} flex-shrink-0 flex items-end justify-center pb-2 relative overflow-hidden`}
                  style={{ boxShadow: `0 8px 24px ${pal.accent}30` }}
                >
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 text-sm" style={{ color: pal.accent, opacity: 0.5 }}>✦</div>
                  <span className="text-[8px] font-body tracking-wider text-center leading-tight"
                    style={{ color: `${pal.accent}bb` }}>
                    {book.title.split(' ').slice(0, 2).join('\n')}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-base leading-tight mb-0.5">{book.title}</h3>
                  <p className="text-xs text-muted-foreground font-body mb-2">{book.genre} · {(book.words / 1000).toFixed(1)}к слов</p>
                  <div className="h-1 rounded-full bg-white/5 overflow-hidden mb-1">
                    <div className="h-full rounded-full" style={{ width: `${book.progress}%`, background: `linear-gradient(90deg, ${book.color}60, ${book.color})` }} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-muted-foreground font-body">{book.progress}% завершено</span>
                    <div className="flex items-center gap-1 text-[10px] font-body" style={{ color: book.color }}>
                      <Icon name="BookOpen" size={10} />
                      Читать
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
