import { useState } from 'react';
import Icon from '@/components/ui/icon';
import type { Book } from '@/data/books';

const DESTINATIONS = [
  { id: 'litres', label: 'Литрес', icon: '📚', desc: 'Крупнейший магазин электронных книг' },
  { id: 'author', label: 'Author.Today', icon: '✍️', desc: 'Платформа для самиздата' },
  { id: 'wattpad', label: 'Wattpad', icon: '🌍', desc: 'Международная платформа' },
  { id: 'telegram', label: 'Telegram канал', icon: '📣', desc: 'Публикация в свой канал' },
  { id: 'pdf', label: 'PDF файл', icon: '📄', desc: 'Скачать готовую книгу' },
  { id: 'epub', label: 'EPUB', icon: '📱', desc: 'Формат для читалок' },
];

type Props = { book: Book; onClose: () => void };

export default function PublishSheet({ book, onClose }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const [step, setStep] = useState<'choose' | 'details' | 'done'>('choose');
  const [note, setNote] = useState('');
  const [publishing, setPublishing] = useState(false);

  const handlePublish = () => {
    setPublishing(true);
    setTimeout(() => {
      setPublishing(false);
      setStep('done');
    }, 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col"
      style={{ maxWidth: '430px', margin: '0 auto', background: 'rgba(8,8,16,0.7)', backdropFilter: 'blur(10px)' }}
    >
      <button className="flex-1" onClick={onClose} />

      <div className="glass border-t border-border/40 rounded-t-3xl" style={{ paddingBottom: 'max(24px, env(safe-area-inset-bottom))' }}>
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 rounded-full bg-white/20" />
        </div>

        <div className="px-5 pb-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-xl text-foreground">Опубликовать книгу</h2>
            <button onClick={onClose} className="w-8 h-8 rounded-full glass border border-border/40 flex items-center justify-center text-muted-foreground">
              <Icon name="X" size={14} />
            </button>
          </div>

          {/* Book mini info */}
          <div className="flex items-center gap-3 p-3 glass rounded-xl border border-border/30 mb-5">
            <div className="w-8 h-10 rounded-lg flex items-center justify-center text-base font-display font-bold flex-shrink-0"
              style={{ background: `${book.color}15`, border: `1px solid ${book.color}30`, color: book.color }}>
              {book.title[0]}
            </div>
            <div>
              <p className="text-sm font-body text-foreground/90 leading-tight">{book.title}</p>
              <p className="text-xs text-muted-foreground font-body">{book.genre} · {(book.words / 1000).toFixed(1)}к слов</p>
            </div>
          </div>

          {step === 'choose' && (
            <div className="flex flex-col gap-2">
              <p className="text-xs text-muted-foreground font-body uppercase tracking-widest mb-2">Куда публикуем?</p>
              <div className="grid grid-cols-2 gap-2">
                {DESTINATIONS.map(d => (
                  <button
                    key={d.id}
                    onClick={() => setSelected(d.id)}
                    className={`p-3 rounded-xl text-left transition-all border ${
                      selected === d.id
                        ? 'border-gold/40 bg-gold/8'
                        : 'glass border-border/40'
                    }`}
                  >
                    <div className="text-xl mb-1">{d.icon}</div>
                    <div className="text-sm font-body text-foreground/90 leading-tight">{d.label}</div>
                    <div className="text-[10px] text-muted-foreground font-body mt-0.5 leading-tight">{d.desc}</div>
                  </button>
                ))}
              </div>

              <button
                onClick={() => selected && setStep('details')}
                disabled={!selected}
                className="mt-3 w-full py-3.5 rounded-2xl bg-gradient-to-r from-gold/80 to-magenta/60 text-ink font-body font-semibold text-sm disabled:opacity-30 active:opacity-80 transition-all flex items-center justify-center gap-2"
              >
                <Icon name="ArrowRight" size={15} />
                Далее
              </button>
            </div>
          )}

          {step === 'details' && (
            <div className="flex flex-col gap-3 animate-fade-in">
              <p className="text-xs text-muted-foreground font-body uppercase tracking-widest">Дополнительно</p>
              <div>
                <label className="text-xs text-muted-foreground font-body block mb-1.5">Заметка к публикации</label>
                <textarea
                  className="w-full px-4 py-3 rounded-xl glass border border-border/50 bg-transparent text-sm font-body text-foreground placeholder:text-muted-foreground outline-none resize-none"
                  rows={3}
                  placeholder="Примечание для читателей, хэштеги..."
                  value={note}
                  onChange={e => setNote(e.target.value)}
                />
              </div>
              <div className="p-3 glass-gold rounded-xl border border-gold/20 text-xs font-body text-gold/80 flex items-start gap-2">
                <Icon name="Info" size={12} className="flex-shrink-0 mt-0.5" />
                Книга будет экспортирована со всеми главами и обложкой.
              </div>
              <button
                onClick={handlePublish}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-gold/80 to-magenta/60 text-ink font-body font-semibold text-sm active:opacity-80 transition-all flex items-center justify-center gap-2"
              >
                {publishing
                  ? <><Icon name="Loader" size={15} className="animate-spin" /> Публикую...</>
                  : <><Icon name="Upload" size={15} /> Опубликовать</>
                }
              </button>
            </div>
          )}

          {step === 'done' && (
            <div className="flex flex-col items-center py-6 gap-3 animate-scale-in">
              <div className="w-20 h-20 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
                <Icon name="CheckCircle" size={36} className="text-emerald-400" />
              </div>
              <p className="font-display text-2xl text-foreground">Готово!</p>
              <p className="text-sm text-muted-foreground font-body text-center">
                «{book.title}» отправлена в {DESTINATIONS.find(d => d.id === selected)?.label}
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-8 py-3 rounded-2xl glass border border-border/40 text-sm font-body text-foreground"
              >
                Закрыть
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
