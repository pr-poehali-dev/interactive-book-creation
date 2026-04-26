import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { BOOKS } from '@/data/books';
import CharacterCard from '@/components/CharacterCard';
import type { Character } from '@/data/books';

export default function CharactersPanel() {
  const book = BOOKS[0];
  const characters = book.characters;
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [generating, setGenerating] = useState<number | null>(null);

  const handleGenerate = (id: number) => {
    setGenerating(id);
    setTimeout(() => setGenerating(null), 2500);
  };

  if (selectedCharacter) {
    return (
      <CharacterCard
        character={selectedCharacter}
        allCharacters={characters}
        onClose={() => setSelectedCharacter(null)}
      />
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2 px-3 py-2 glass rounded-xl border border-border/30">
        <Icon name="BookOpen" size={14} className="text-gold" />
        <span className="text-xs font-body text-foreground/70 flex-1 truncate">{book.title}</span>
        <Icon name="ChevronDown" size={13} className="text-muted-foreground" />
      </div>

      <div className="flex flex-col gap-3">
        {characters.map((char) => (
          <button
            key={char.id}
            onClick={() => setSelectedCharacter(char)}
            className="glass rounded-2xl p-4 border border-border/40 active:scale-[0.98] transition-all text-left"
          >
            <div className="flex items-center gap-4">
              <div className="relative flex-shrink-0">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-display font-bold"
                  style={{
                    background: `${char.color}15`,
                    border: `2px solid ${char.color}40`,
                    color: char.color,
                    boxShadow: `0 0 20px ${char.color}20`,
                  }}
                >
                  {char.name[0]}
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-display text-lg leading-tight">{char.name}</h3>
                  <Icon name="ChevronRight" size={16} className="text-muted-foreground flex-shrink-0 mt-0.5" />
                </div>
                <span
                  className="inline-block text-[10px] px-2 py-0.5 rounded-full font-body mt-1 mb-2"
                  style={{ background: `${char.color}20`, color: char.color, border: `1px solid ${char.color}30` }}
                >
                  {char.role}
                </span>
                <p className="text-xs text-muted-foreground font-body leading-relaxed line-clamp-2">{char.description}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-border/20">
              {char.traits.map(t => (
                <span key={t} className="text-[10px] px-2.5 py-1 rounded-full glass border border-border/40 text-foreground/60 font-body">{t}</span>
              ))}
              {char.connections.length > 0 && (
                <span className="ml-auto text-[10px] px-2.5 py-1 rounded-full glass border border-violet/20 text-violet font-body flex items-center gap-1">
                  <Icon name="Network" size={9} />
                  {char.connections.length} связи
                </span>
              )}
            </div>

            <button
              onClick={e => { e.stopPropagation(); handleGenerate(char.id); }}
              className="mt-3 w-full py-2 rounded-xl glass border border-violet/20 text-violet text-xs font-body flex items-center justify-center gap-1.5 active:bg-violet/10 transition-all"
            >
              {generating === char.id
                ? <><Icon name="Loader" size={12} className="animate-spin" /> Генерирую портрет...</>
                : <><Icon name="Sparkles" size={12} /> AI-портрет</>
              }
            </button>
          </button>
        ))}
      </div>

      <button className="w-full py-4 rounded-2xl border border-dashed border-border/40 text-muted-foreground font-body text-sm flex items-center justify-center gap-2 active:border-gold/30 active:text-gold transition-all">
        <Icon name="Plus" size={16} />
        Добавить персонажа
      </button>
    </div>
  );
}
