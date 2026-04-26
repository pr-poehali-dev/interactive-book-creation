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
    description: 'Бывший придворный маг, изгнанная за нарушение кодекса. Ищет правду о своём прошлом.',
  },
  {
    id: 2,
    name: 'Лорд Каэ',
    role: 'Антагонист',
    archetype: 'Тёмный наставник',
    traits: ['хитрый', 'харизматичный', 'безжалостный'],
    color: '#8b5cf6',
    description: 'Архимаг с тысячелетней историей. Его истинные цели неизвестны никому.',
  },
  {
    id: 3,
    name: 'Торин',
    role: 'Союзник',
    archetype: 'Верный друг',
    traits: ['надёжный', 'остроумный', 'скрытный'],
    color: '#d946ef',
    description: 'Вор и контрабандист с золотым сердцем. Знает каждый переулок Северного Квартала.',
  },
];

const ARCHETYPES = ['Герой', 'Антагонист', 'Наставник', 'Трикстер', 'Страж', 'Тень', 'Союзник'];

export default function CharactersPanel() {
  const [selected, setSelected] = useState(1);
  const [generating, setGenerating] = useState(false);

  const character = CHARACTERS.find(c => c.id === selected);

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => setGenerating(false), 2500);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Character cards row */}
      <div className="flex gap-3 overflow-x-auto pb-1 no-scrollbar">
        {CHARACTERS.map((char) => (
          <button
            key={char.id}
            onClick={() => setSelected(char.id)}
            className={`flex-shrink-0 flex flex-col items-center gap-2 p-3 rounded-2xl transition-all border ${
              selected === char.id ? 'border-white/15 bg-white/5' : 'glass border-border/40'
            }`}
            style={{ width: '100px' }}
          >
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-display font-bold"
              style={{
                background: `${char.color}15`,
                border: `2px solid ${char.color}${selected === char.id ? '60' : '30'}`,
                color: char.color,
                boxShadow: selected === char.id ? `0 0 20px ${char.color}30` : 'none',
              }}
            >
              {char.name[0]}
            </div>
            <div className="text-center">
              <div className="text-xs font-body font-medium text-foreground/90 leading-tight">{char.name.split(' ')[0]}</div>
              <div className="text-[10px] text-muted-foreground">{char.role}</div>
            </div>
          </button>
        ))}
        {/* Add new */}
        <button className="flex-shrink-0 flex flex-col items-center justify-center gap-2 p-3 rounded-2xl border border-dashed border-border/40 text-muted-foreground hover:border-gold/30 hover:text-gold transition-all"
          style={{ width: '80px', minHeight: '100px' }}>
          <Icon name="Plus" size={20} />
          <span className="text-[10px] font-body">Новый</span>
        </button>
      </div>

      {/* Character detail */}
      {character && (
        <div className="glass rounded-2xl p-4 animate-fade-in">
          <div className="flex items-start gap-4 mb-4">
            <div className="relative flex-shrink-0">
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-display"
                style={{
                  background: `${character.color}15`,
                  border: `2px solid ${character.color}40`,
                  boxShadow: `0 0 30px ${character.color}20`,
                  color: character.color,
                }}
              >
                {character.name[0]}
              </div>
              <button
                onClick={handleGenerate}
                className="absolute -bottom-1.5 -right-1.5 w-7 h-7 rounded-full bg-card border border-border flex items-center justify-center"
              >
                {generating
                  ? <Icon name="Loader" size={13} className="text-gold animate-spin" />
                  : <Icon name="Sparkles" size={13} className="text-gold" />
                }
              </button>
            </div>

            <div className="flex-1 min-w-0">
              <h2 className="font-display text-2xl leading-tight">{character.name}</h2>
              <span
                className="inline-block text-xs px-2.5 py-1 rounded-full font-body mt-1 mb-2"
                style={{ background: `${character.color}20`, color: character.color, border: `1px solid ${character.color}30` }}
              >
                {character.role}
              </span>
              <p className="text-xs text-foreground/60 font-body leading-relaxed">{character.description}</p>
            </div>
          </div>

          <div className="ink-line mb-4" />

          {/* Traits */}
          <div className="mb-4">
            <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-body block mb-2">Черты характера</span>
            <div className="flex flex-wrap gap-2">
              {character.traits.map((t) => (
                <span key={t} className="px-3 py-1.5 rounded-full glass border border-border/50 text-sm text-foreground/80 font-body">
                  {t}
                </span>
              ))}
              <button className="px-3 py-1.5 rounded-full border border-dashed border-border/40 text-sm text-muted-foreground font-body">
                + добавить
              </button>
            </div>
          </div>

          {/* Archetype */}
          <div className="mb-4">
            <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-body block mb-2">Архетип</span>
            <div className="flex flex-wrap gap-2">
              {ARCHETYPES.map((arch) => (
                <button
                  key={arch}
                  className={`px-3 py-1.5 rounded-full text-xs font-body transition-all ${
                    arch === character.archetype.split(' ')[0]
                      ? 'bg-violet/20 border border-violet/40 text-violet'
                      : 'glass border-border/40 text-muted-foreground'
                  }`}
                >
                  {arch}
                </button>
              ))}
            </div>
          </div>

          {/* AI gen */}
          <div className="p-3 rounded-xl glass-violet border border-violet/20">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="Sparkles" size={13} className="text-violet" />
              <span className="text-xs font-body text-violet">AI-генерация образа</span>
            </div>
            <div className="flex gap-2">
              <input
                className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none font-body"
                placeholder="Опиши внешность..."
              />
              <button
                onClick={handleGenerate}
                className="px-3 py-2 rounded-lg bg-violet/30 text-violet text-xs font-body flex items-center gap-1.5 flex-shrink-0"
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
