import { useState } from 'react';
import Icon from '@/components/ui/icon';

const CHARACTERS = [
  {
    id: 1,
    name: 'Аэлин Страдивари',
    role: 'Главный герой',
    archetype: 'Герой-изгнанник',
    traits: ['смелая', 'импульсивная', 'верная'],
    color: '#f0a832',
    avatar: null,
    description: 'Бывший придворный маг, изгнанная за нарушение кодекса. Ищет правду о своём прошлом.',
  },
  {
    id: 2,
    name: 'Лорд Каэ',
    role: 'Антагонист',
    archetype: 'Тёмный наставник',
    traits: ['хитрый', 'харизматичный', 'безжалостный'],
    color: '#8b5cf6',
    avatar: null,
    description: 'Архимаг с тысячелетней историей. Его истинные цели неизвестны никому.',
  },
  {
    id: 3,
    name: 'Торин',
    role: 'Союзник',
    archetype: 'Верный друг',
    traits: ['надёжный', 'остроумный', 'скрытный'],
    color: '#d946ef',
    avatar: null,
    description: 'Вор и контрабандист с золотым сердцем. Знает каждый переулок Северного Квартала.',
  },
];

const ARCHETYPES = ['Герой', 'Антагонист', 'Наставник', 'Трикстер', 'Страж', 'Тень', 'Союзник', 'Глашатай'];

export default function CharactersPanel() {
  const [selected, setSelected] = useState(1);
  const [showAdd, setShowAdd] = useState(false);
  const [generating, setGenerating] = useState(false);

  const character = CHARACTERS.find(c => c.id === selected);

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => setGenerating(false), 2500);
  };

  return (
    <div className="flex h-full gap-4">
      {/* Characters list */}
      <div className="w-52 flex-shrink-0 flex flex-col gap-2">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-muted-foreground uppercase tracking-widest font-body">Персонажи</span>
          <button
            onClick={() => setShowAdd(!showAdd)}
            className="w-6 h-6 rounded-full border border-gold/30 flex items-center justify-center hover:border-gold/60 hover:bg-gold/10 transition-all"
          >
            <Icon name="Plus" size={12} className="text-gold" />
          </button>
        </div>

        {CHARACTERS.map((char) => (
          <button
            key={char.id}
            onClick={() => setSelected(char.id)}
            className={`text-left p-3 rounded-xl transition-all border font-body ${
              selected === char.id
                ? 'border-white/10 bg-white/5'
                : 'glass border-border/50 hover:border-border'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                style={{ background: `${char.color}20`, border: `1px solid ${char.color}40`, color: char.color }}
              >
                {char.name[0]}
              </div>
              <div className="min-w-0">
                <div className="text-sm font-medium truncate text-foreground/90">{char.name}</div>
                <div className="text-xs text-muted-foreground truncate">{char.role}</div>
              </div>
            </div>
          </button>
        ))}

        {showAdd && (
          <div className="p-3 rounded-xl glass-gold border border-gold/20 animate-fade-in">
            <input
              className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none font-body mb-2"
              placeholder="Имя персонажа..."
              autoFocus
            />
            <button className="w-full py-1.5 rounded-lg bg-gold/20 text-gold text-xs font-body hover:bg-gold/30 transition-all">
              Создать
            </button>
          </div>
        )}
      </div>

      {/* Character detail */}
      {character && (
        <div className="flex-1 glass rounded-2xl p-6 animate-fade-in">
          <div className="flex items-start gap-5 mb-6">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div
                className="w-24 h-24 rounded-2xl flex items-center justify-center text-4xl font-display transition-all"
                style={{
                  background: `${character.color}15`,
                  border: `2px solid ${character.color}30`,
                  boxShadow: `0 0 30px ${character.color}20`,
                  color: character.color,
                }}
              >
                {character.name[0]}
              </div>
              <button
                onClick={handleGenerate}
                className="absolute -bottom-2 -right-2 w-7 h-7 rounded-full bg-card border border-border flex items-center justify-center hover:border-gold/30 hover:bg-gold/10 transition-all"
              >
                {generating
                  ? <Icon name="Loader" size={12} className="text-gold animate-spin" />
                  : <Icon name="Sparkles" size={12} className="text-gold" />
                }
              </button>
            </div>

            <div className="flex-1">
              <h2 className="font-display text-3xl text-foreground mb-1">{character.name}</h2>
              <div className="flex items-center gap-3 mb-3">
                <span
                  className="text-xs px-2.5 py-1 rounded-full font-body"
                  style={{ background: `${character.color}20`, color: character.color, border: `1px solid ${character.color}30` }}
                >
                  {character.role}
                </span>
                <span className="text-xs text-muted-foreground font-body">{character.archetype}</span>
              </div>
              <p className="text-sm text-foreground/70 font-body leading-relaxed">{character.description}</p>
            </div>
          </div>

          <div className="ink-line mb-5" />

          {/* Traits */}
          <div className="mb-5">
            <span className="text-xs text-muted-foreground uppercase tracking-widest font-body block mb-3">Черты характера</span>
            <div className="flex flex-wrap gap-2">
              {character.traits.map((t) => (
                <span key={t} className="px-3 py-1 rounded-full glass border border-border/60 text-sm text-foreground/80 font-body">
                  {t}
                </span>
              ))}
              <button className="px-3 py-1 rounded-full border border-dashed border-border/40 text-sm text-muted-foreground font-body hover:border-gold/30 hover:text-gold transition-all">
                + добавить
              </button>
            </div>
          </div>

          {/* Archetype selector */}
          <div className="mb-5">
            <span className="text-xs text-muted-foreground uppercase tracking-widest font-body block mb-3">Архетип</span>
            <div className="flex flex-wrap gap-2">
              {ARCHETYPES.map((arch) => (
                <button
                  key={arch}
                  className={`px-3 py-1 rounded-full text-xs font-body transition-all ${
                    arch === character.archetype.split(' ')[0]
                      ? 'bg-violet/20 border border-violet/40 text-violet'
                      : 'glass border-border/40 text-muted-foreground hover:text-foreground hover:border-border'
                  }`}
                >
                  {arch}
                </button>
              ))}
            </div>
          </div>

          {/* AI Generation */}
          <div className="p-4 rounded-xl glass-violet border border-violet/20">
            <div className="flex items-center gap-2 mb-3">
              <Icon name="Sparkles" size={14} className="text-violet" />
              <span className="text-sm font-body text-violet">AI-генерация образа</span>
            </div>
            <div className="flex gap-2">
              <input
                className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none font-body"
                placeholder="Опиши внешность персонажа..."
              />
              <button
                onClick={handleGenerate}
                className="px-4 py-1.5 rounded-lg bg-violet/30 text-violet text-xs font-body hover:bg-violet/40 transition-all flex items-center gap-1.5"
              >
                {generating ? <Icon name="Loader" size={12} className="animate-spin" /> : <Icon name="Image" size={12} />}
                Создать
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
