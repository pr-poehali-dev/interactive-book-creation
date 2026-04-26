import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { BOOKS, type Book } from '@/data/books';
import BookReader from '@/components/BookReader';
import PublishSheet from '@/components/PublishSheet';

const PALETTES = [
  { accent: '#f0a832', bg: 'from-orange-900 via-red-900 to-black' },
  { accent: '#8b5cf6', bg: 'from-violet-950 via-purple-900 to-black' },
  { accent: '#60a5fa', bg: 'from-slate-900 via-blue-950 to-black' },
  { accent: '#d946ef', bg: 'from-pink-950 via-purple-950 to-black' },
  { accent: '#10b981', bg: 'from-green-950 via-emerald-900 to-black' },
];

const GENRES = ['Все', 'Фэнтези', 'Мистика', 'Романтика', 'Sci-Fi'];

export default function Library() {
  const [search, setSearch] = useState('');
  const [genre, setGenre] = useState('Все');
  const [readingBook, setReadingBook] = useState<Book | null>(null);
  const [publishBook, setPublishBook] = useState<Book | null>(null);

  const filtered = BOOKS.filter(b =>
    (genre === 'Все' || b.genre === genre) &&
    (b.title.toLowerCase().includes(search.toLowerCase()) || b.tags.some(t => t.includes(search.toLowerCase())))
  );

  if (readingBook) return <BookReader book={readingBook} onClose={() => setReadingBook(null)} />;
  if (publishBook) return <PublishSheet book={publishBook} onClose={() => setPublishBook(null)} />;

  return (
    <div className="flex flex-col gap-4">
      <div className="relative">
        <Icon name="Search" size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          className="w-full pl-10 pr-4 py-3 rounded-xl glass border border-border/50 bg-transparent text-sm font-body text-foreground placeholder:text-muted-foreground outline-none focus:border-gold/30 transition-all"
          placeholder="Поиск книги..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {GENRES.map(g => (
          <button key={g} onClick={() => setGenre(g)}
            className={`px-4 py-2 rounded-xl text-xs font-body flex-shrink-0 transition-all border ${
              genre === g ? 'bg-gold/15 text-gold border-gold/30' : 'glass border-border/40 text-muted-foreground'
            }`}>
            {g}
          </button>
        ))}
      </div>

      <button className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-gold/70 to-magenta/50 text-ink font-body text-sm font-semibold flex items-center justify-center gap-2 active:opacity-80 transition-all">
        <Icon name="Plus" size={16} />
        Новая книга
      </button>

      <div className="flex flex-col gap-3">
        {filtered.map((book, i) => {
          const pal = PALETTES[book.coverPalette] ?? PALETTES[0];
          return (
            <div
              key={book.id}
              className="glass rounded-2xl border border-border/40 animate-fade-up overflow-hidden"
              style={{ animationDelay: `${i * 80}ms`, opacity: 0 }}
            >
              <button
                className="w-full flex items-start gap-3 p-4 active:bg-white/5 transition-all text-left"
                onClick={() => setReadingBook(book)}
              >
                <div
                  className={`w-14 h-20 rounded-xl bg-gradient-to-b ${pal.bg} flex-shrink-0 relative overflow-hidden`}
                  style={{ boxShadow: `0 6px 20px ${pal.accent}30` }}
                >
                  <div className="absolute top-1.5 left-1/2 -translate-x-1/2 text-xs" style={{ color: pal.accent, opacity: 0.5 }}>✦</div>
                  <div className="absolute inset-x-1 bottom-2 text-center text-[7px] font-display leading-tight"
                    style={{ color: `${pal.accent}cc` }}>
                    {book.title.split(' ').slice(0, 2).join(' ')}
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-display text-base leading-tight">{book.title}</h3>
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-body flex-shrink-0 whitespace-nowrap"
                      style={{
                        background: book.status === 'done' || book.status === 'published' ? 'rgba(16,185,129,0.15)' : 'rgba(240,168,50,0.1)',
                        color: book.status === 'done' || book.status === 'published' ? '#10b981' : '#f0a832',
                        border: `1px solid ${book.status === 'done' || book.status === 'published' ? 'rgba(16,185,129,0.3)' : 'rgba(240,168,50,0.2)'}`,
                      }}>
                      {book.status === 'done' ? 'Готова' : book.status === 'published' ? 'Опубликована' : 'В работе'}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground font-body mt-0.5 mb-2">{book.genre} · {book.chapters.length} глав · {(book.words / 1000).toFixed(1)}к слов</p>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {book.tags.map(t => (
                      <span key={t} className="text-[10px] px-2 py-0.5 rounded-full glass border border-border/40 text-muted-foreground font-body">{t}</span>
                    ))}
                  </div>
                  <div className="h-1 rounded-full bg-white/5 overflow-hidden mb-1">
                    <div className="h-full rounded-full"
                      style={{ width: `${book.progress}%`, background: `linear-gradient(90deg, ${book.color}60, ${book.color})`, boxShadow: `0 0 8px ${book.color}40` }} />
                  </div>
                  <div className="flex justify-between text-[10px] font-body text-muted-foreground">
                    <span>{book.updated}</span>
                    <span style={{ color: book.color }}>{book.progress}%</span>
                  </div>
                </div>
              </button>

              <div className="flex border-t border-border/20">
                <button onClick={() => setReadingBook(book)}
                  className="flex-1 py-3 flex items-center justify-center gap-2 text-xs font-body text-foreground/60 active:bg-white/5 transition-all border-r border-border/20">
                  <Icon name="BookOpen" size={13} style={{ color: book.color }} />
                  Читать
                </button>
                <button onClick={() => setPublishBook(book)}
                  className="flex-1 py-3 flex items-center justify-center gap-2 text-xs font-body text-foreground/60 active:bg-white/5 transition-all border-r border-border/20">
                  <Icon name="Upload" size={13} className="text-violet" />
                  Публикация
                </button>
                <button className="w-12 py-3 flex items-center justify-center text-muted-foreground active:bg-white/5 transition-all">
                  <Icon name="Pencil" size={13} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
