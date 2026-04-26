import { useState } from 'react';
import Icon from '@/components/ui/icon';

const BOOKS = [
  {
    id: 1, title: 'Пепел Звёздного Тракта', genre: 'Фэнтези', chapters: 12, words: 34500,
    progress: 72, color: '#f0a832', status: 'В работе', updated: '2 часа назад',
    tags: ['магия', 'приключения'],
  },
  {
    id: 2, title: 'Тень Последнего Маяка', genre: 'Мистика', chapters: 8, words: 22100,
    progress: 100, color: '#8b5cf6', status: 'Завершена', updated: '3 дня назад',
    tags: ['детектив', 'мистика'],
  },
  {
    id: 3, title: 'Дочь Ледяного Ветра', genre: 'Романтика', chapters: 5, words: 11300,
    progress: 38, color: '#d946ef', status: 'В работе', updated: '1 нед. назад',
    tags: ['любовь', 'драма'],
  },
  {
    id: 4, title: 'Хроники Пустого Неба', genre: 'Sci-Fi', chapters: 3, words: 8700,
    progress: 25, color: '#10b981', status: 'Наброски', updated: '2 нед. назад',
    tags: ['космос', 'выживание'],
  },
];

const GENRES = ['Все', 'Фэнтези', 'Мистика', 'Романтика', 'Sci-Fi'];

export default function Library() {
  const [search, setSearch] = useState('');
  const [genre, setGenre] = useState('Все');

  const filtered = BOOKS.filter(b =>
    (genre === 'Все' || b.genre === genre) &&
    (b.title.toLowerCase().includes(search.toLowerCase()) || b.tags.some(t => t.includes(search.toLowerCase())))
  );

  return (
    <div className="flex flex-col gap-4">
      {/* Search */}
      <div className="relative">
        <Icon name="Search" size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          className="w-full pl-10 pr-4 py-3 rounded-xl glass border border-border/50 bg-transparent text-sm font-body text-foreground placeholder:text-muted-foreground outline-none focus:border-gold/30 transition-all"
          placeholder="Поиск книги..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* Genre filter */}
      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {GENRES.map(g => (
          <button
            key={g}
            onClick={() => setGenre(g)}
            className={`px-4 py-2 rounded-xl text-xs font-body flex-shrink-0 transition-all border ${
              genre === g
                ? 'bg-gold/15 text-gold border-gold/30'
                : 'glass border-border/40 text-muted-foreground'
            }`}
          >
            {g}
          </button>
        ))}
      </div>

      {/* New book button */}
      <button className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-gold/70 to-magenta/50 text-ink font-body text-sm font-medium flex items-center justify-center gap-2">
        <Icon name="Plus" size={16} />
        Новая книга
      </button>

      {/* Books list */}
      <div className="flex flex-col gap-3">
        {filtered.map((book, i) => (
          <div
            key={book.id}
            className="glass rounded-2xl p-4 border border-border/40 animate-fade-up active:scale-[0.99] transition-all"
            style={{ animationDelay: `${i * 80}ms`, opacity: 0 }}
          >
            <div className="flex items-start gap-3 mb-3">
              {/* Book spine */}
              <div
                className="w-10 h-14 rounded-lg flex items-center justify-center text-lg font-display font-bold flex-shrink-0"
                style={{
                  background: `${book.color}15`,
                  border: `1px solid ${book.color}30`,
                  color: book.color,
                }}
              >
                {book.title[0]}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-display text-base leading-tight text-foreground">{book.title}</h3>
                  <span
                    className="text-[10px] px-2 py-0.5 rounded-full font-body flex-shrink-0"
                    style={{
                      background: book.status === 'Завершена' ? 'rgba(16,185,129,0.15)' : 'rgba(240,168,50,0.1)',
                      color: book.status === 'Завершена' ? '#10b981' : '#f0a832',
                      border: `1px solid ${book.status === 'Завершена' ? 'rgba(16,185,129,0.3)' : 'rgba(240,168,50,0.2)'}`,
                    }}
                  >
                    {book.status}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground font-body mt-0.5">
                  {book.genre} · {book.chapters} глав · {(book.words / 1000).toFixed(1)}к слов
                </div>
                <div className="flex gap-1.5 mt-1.5">
                  {book.tags.map(t => (
                    <span key={t} className="text-[10px] px-2 py-0.5 rounded-full glass border border-border/40 text-muted-foreground font-body">{t}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Progress */}
            <div>
              <div className="flex justify-between text-xs font-body text-muted-foreground mb-1.5">
                <span>{book.updated}</span>
                <span style={{ color: book.color }}>{book.progress}%</span>
              </div>
              <div className="h-1 rounded-full bg-white/5 overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${book.progress}%`,
                    background: `linear-gradient(90deg, ${book.color}70, ${book.color})`,
                    boxShadow: `0 0 8px ${book.color}40`,
                  }}
                />
              </div>
            </div>

            <div className="flex gap-2 mt-3 pt-3 border-t border-border/30">
              <button className="flex-1 py-2 rounded-xl glass border border-border/40 text-xs font-body text-muted-foreground flex items-center justify-center gap-1.5 active:bg-white/10 transition-all">
                <Icon name="PenLine" size={12} />
                Писать
              </button>
              <button className="w-10 h-9 rounded-xl glass border border-border/40 flex items-center justify-center text-muted-foreground active:bg-white/10 transition-all">
                <Icon name="Trash2" size={13} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
