import { useState } from 'react';
import Icon from '@/components/ui/icon';

const BOOKS = [
  {
    id: 1, title: 'Пепел Звёздного Тракта', genre: 'Фэнтези', chapters: 12, words: 34500,
    progress: 72, color: '#f0a832', status: 'В работе', updated: '2 часа назад',
    tags: ['магия', 'приключения', 'тёмный герой'],
  },
  {
    id: 2, title: 'Тень Последнего Маяка', genre: 'Мистика', chapters: 8, words: 22100,
    progress: 100, color: '#8b5cf6', status: 'Завершена', updated: '3 дня назад',
    tags: ['детектив', 'сверхъестественное'],
  },
  {
    id: 3, title: 'Дочь Ледяного Ветра', genre: 'Романтика', chapters: 5, words: 11300,
    progress: 38, color: '#d946ef', status: 'В работе', updated: '1 неделю назад',
    tags: ['любовь', 'драма', 'зима'],
  },
  {
    id: 4, title: 'Хроники Пустого Неба', genre: 'Sci-Fi', chapters: 3, words: 8700,
    progress: 25, color: '#10b981', status: 'Наброски', updated: '2 недели назад',
    tags: ['космос', 'технологии', 'выживание'],
  },
];

const GENRES = ['Все', 'Фэнтези', 'Мистика', 'Романтика', 'Sci-Fi', 'Драма'];

export default function Library() {
  const [search, setSearch] = useState('');
  const [genre, setGenre] = useState('Все');

  const filtered = BOOKS.filter(b =>
    (genre === 'Все' || b.genre === genre) &&
    (b.title.toLowerCase().includes(search.toLowerCase()) || b.tags.some(t => t.includes(search.toLowerCase())))
  );

  return (
    <div className="flex flex-col h-full gap-4">
      {/* Search & Filter */}
      <div className="flex gap-3 items-center">
        <div className="relative flex-1 max-w-sm">
          <Icon name="Search" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            className="w-full pl-9 pr-4 py-2.5 rounded-xl glass border border-border/50 bg-transparent text-sm font-body text-foreground placeholder:text-muted-foreground outline-none focus:border-gold/30 transition-all"
            placeholder="Поиск по названию или тегу..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-1.5">
          {GENRES.map(g => (
            <button
              key={g}
              onClick={() => setGenre(g)}
              className={`px-3 py-1.5 rounded-lg text-xs font-body transition-all ${
                genre === g
                  ? 'bg-gold/20 text-gold border border-gold/30'
                  : 'glass border border-border/40 text-muted-foreground hover:text-foreground hover:border-border'
              }`}
            >
              {g}
            </button>
          ))}
        </div>
        <button className="ml-auto px-4 py-2.5 rounded-xl bg-gradient-to-r from-gold/80 to-magenta/60 text-ink font-body text-sm font-medium hover:from-gold hover:to-magenta transition-all flex items-center gap-2">
          <Icon name="Plus" size={14} />
          Новая книга
        </button>
      </div>

      {/* Books grid */}
      <div className="grid grid-cols-2 gap-4 overflow-y-auto flex-1 pr-1">
        {filtered.map((book, i) => (
          <div
            key={book.id}
            className="glass rounded-2xl p-5 card-hover cursor-pointer border border-border/40 animate-fade-up"
            style={{ animationDelay: `${i * 100}ms`, opacity: 0 }}
          >
            {/* Top */}
            <div className="flex items-start justify-between mb-4">
              <div
                className="w-10 h-14 rounded-lg flex items-center justify-center text-lg font-display font-bold flex-shrink-0"
                style={{
                  background: `${book.color}15`,
                  border: `1px solid ${book.color}30`,
                  color: book.color,
                  boxShadow: `inset 0 0 20px ${book.color}10`,
                }}
              >
                {book.title[0]}
              </div>
              <span
                className="text-xs px-2 py-0.5 rounded-full font-body"
                style={{
                  background: book.status === 'Завершена' ? 'rgba(16,185,129,0.15)' : 'rgba(240,168,50,0.1)',
                  color: book.status === 'Завершена' ? '#10b981' : '#f0a832',
                  border: `1px solid ${book.status === 'Завершена' ? 'rgba(16,185,129,0.3)' : 'rgba(240,168,50,0.2)'}`,
                }}
              >
                {book.status}
              </span>
            </div>

            <h3 className="font-display text-lg leading-tight mb-1 text-foreground">{book.title}</h3>
            <div className="text-xs text-muted-foreground font-body mb-3">{book.genre} · {book.chapters} глав · {(book.words / 1000).toFixed(1)}к слов</div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1 mb-4">
              {book.tags.map(t => (
                <span key={t} className="text-xs px-2 py-0.5 rounded-full glass border border-border/40 text-muted-foreground font-body">{t}</span>
              ))}
            </div>

            {/* Progress */}
            <div>
              <div className="flex justify-between text-xs font-body text-muted-foreground mb-1.5">
                <span>Прогресс</span>
                <span style={{ color: book.color }}>{book.progress}%</span>
              </div>
              <div className="h-1 rounded-full bg-white/5 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${book.progress}%`,
                    background: `linear-gradient(90deg, ${book.color}80, ${book.color})`,
                    boxShadow: `0 0 8px ${book.color}40`,
                  }}
                />
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-border/30 flex items-center justify-between">
              <span className="text-xs text-muted-foreground font-body">{book.updated}</span>
              <div className="flex gap-1.5">
                <button className="w-6 h-6 rounded flex items-center justify-center text-muted-foreground hover:text-gold transition-all hover:bg-gold/10">
                  <Icon name="Pencil" size={12} />
                </button>
                <button className="w-6 h-6 rounded flex items-center justify-center text-muted-foreground hover:text-magenta transition-all hover:bg-magenta/10">
                  <Icon name="Trash2" size={12} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
