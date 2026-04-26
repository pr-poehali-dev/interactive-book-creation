import { useState } from 'react';
import Icon from '@/components/ui/icon';
import type { Character } from '@/data/books';

type Props = { character: Character; allCharacters: Character[]; onClose: () => void };

const RELATION_COLORS: Record<string, string> = {
  'Дружба': '#10b981',
  'Противостояние': '#ef4444',
  'Враждебность': '#f0a832',
  'Любовь': '#d946ef',
  'Наставничество': '#8b5cf6',
};

export default function CharacterCard({ character, allCharacters, onClose }: Props) {
  const [tab, setTab] = useState<'info' | 'backstory' | 'connections'>('info');
  const [generating, setGenerating] = useState(false);
  const [imageGenerated, setImageGenerated] = useState(false);
  const [prompt, setPrompt] = useState('');

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      setImageGenerated(true);
    }, 2500);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-mesh overflow-hidden"
      style={{ maxWidth: '430px', margin: '0 auto' }}
    >
      {/* Header */}
      <div
        className="flex-shrink-0 flex items-center gap-3 px-4 py-3 border-b border-border/20 glass"
        style={{ paddingTop: 'max(14px, env(safe-area-inset-top))' }}
      >
        <button onClick={onClose} className="w-9 h-9 rounded-xl glass border border-border/40 flex items-center justify-center text-muted-foreground">
          <Icon name="ChevronLeft" size={18} />
        </button>
        <span className="font-display text-lg" style={{ color: character.color }}>{character.name}</span>
      </div>

      <div className="flex-1 overflow-y-auto" style={{ paddingBottom: 'max(24px, env(safe-area-inset-bottom))' }}>
        {/* Hero section */}
        <div className="p-4">
          <div className="glass rounded-2xl p-4 flex gap-4 mb-4">
            {/* Portrait */}
            <div className="flex-shrink-0 relative">
              {imageGenerated ? (
                <div
                  className="w-24 h-24 rounded-2xl flex items-center justify-center text-4xl font-display relative overflow-hidden"
                  style={{ background: `${character.color}15`, border: `2px solid ${character.color}50`, boxShadow: `0 0 30px ${character.color}30` }}
                >
                  <span style={{ color: character.color }}>{character.name[0]}</span>
                  {/* Simulated AI portrait overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40" />
                  <div className="absolute inset-0 animate-shimmer opacity-30" />
                  <div className="absolute bottom-1 right-1">
                    <span className="text-[8px] font-body text-white/60 bg-black/40 px-1 rounded">AI</span>
                  </div>
                </div>
              ) : (
                <div
                  className="w-24 h-24 rounded-2xl flex items-center justify-center text-4xl font-display"
                  style={{ background: `${character.color}15`, border: `2px solid ${character.color}40`, color: character.color, boxShadow: `0 0 24px ${character.color}20` }}
                >
                  {character.name[0]}
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <h2 className="font-display text-2xl leading-tight mb-1">{character.name}</h2>
              <span className="inline-block text-xs px-2.5 py-1 rounded-full font-body mb-2"
                style={{ background: `${character.color}20`, color: character.color, border: `1px solid ${character.color}30` }}>
                {character.role}
              </span>
              <p className="text-xs text-muted-foreground font-body">{character.archetype}</p>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {character.traits.map(t => (
                  <span key={t} className="text-xs px-2 py-0.5 rounded-full glass border border-border/40 text-foreground/70 font-body">{t}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 p-1 glass rounded-xl border border-border/30 mb-4">
            {([
              { id: 'info', label: 'О герое', icon: 'User' },
              { id: 'backstory', label: 'История', icon: 'Scroll' },
              { id: 'connections', label: 'Связи', icon: 'Network' },
            ] as const).map(t => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-body transition-all ${
                  tab === t.id ? 'bg-white/8 text-foreground border border-white/10' : 'text-muted-foreground'
                }`}
              >
                <Icon name={t.icon} size={12} />
                {t.label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          {tab === 'info' && (
            <div className="glass rounded-2xl p-4 animate-fade-in">
              <p className="text-sm text-foreground/80 font-body leading-relaxed mb-4">{character.description}</p>
              <div className="ink-line mb-4" />
              {/* AI image gen */}
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-body block mb-3">AI-портрет персонажа</span>
              <div className="p-3 rounded-xl glass-violet border border-violet/20">
                <input
                  className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none font-body mb-3"
                  placeholder="Опиши внешность персонажа..."
                  value={prompt}
                  onChange={e => setPrompt(e.target.value)}
                />
                <button
                  onClick={handleGenerate}
                  className="w-full py-2.5 rounded-xl bg-violet/20 border border-violet/30 text-violet text-sm font-body flex items-center justify-center gap-2 active:bg-violet/30 transition-all"
                >
                  {generating
                    ? <><Icon name="Loader" size={14} className="animate-spin" /> Генерирую...</>
                    : <><Icon name="Sparkles" size={14} /> Создать AI-портрет</>
                  }
                </button>
                {imageGenerated && (
                  <p className="text-xs text-emerald-400 font-body text-center mt-2">✓ Портрет создан и сохранён</p>
                )}
              </div>
            </div>
          )}

          {tab === 'backstory' && (
            <div className="glass rounded-2xl p-4 animate-fade-in">
              <p className="text-sm text-foreground/80 font-body leading-relaxed" style={{ whiteSpace: 'pre-wrap' }}>{character.backstory}</p>
            </div>
          )}

          {tab === 'connections' && (
            <div className="flex flex-col gap-3 animate-fade-in">
              {/* Graph visual */}
              <div className="glass rounded-2xl p-4 relative overflow-hidden" style={{ height: '200px' }}>
                <div className="absolute inset-0 opacity-5"
                  style={{ backgroundImage: 'radial-gradient(circle at center, rgba(240,168,50,0.5) 0%, transparent 70%)' }} />
                {/* Center node */}
                <div
                  className="absolute w-16 h-16 rounded-full flex items-center justify-center text-2xl font-display font-bold"
                  style={{
                    left: '50%', top: '50%', transform: 'translate(-50%,-50%)',
                    background: `${character.color}20`, border: `2px solid ${character.color}60`,
                    color: character.color, boxShadow: `0 0 24px ${character.color}40`,
                    zIndex: 2,
                  }}
                >
                  {character.name[0]}
                </div>
                {/* Connected nodes */}
                {character.connections.map((conn, i) => {
                  const linked = allCharacters.find(c => c.id === conn.characterId);
                  if (!linked) return null;
                  const angle = (i / character.connections.length) * Math.PI * 2 - Math.PI / 2;
                  const r = 72;
                  const cx = 50 + Math.cos(angle) * r / 2;
                  const cy = 50 + Math.sin(angle) * r / 2.5;
                  const relColor = RELATION_COLORS[conn.type] ?? '#ffffff';
                  return (
                    <div key={conn.characterId}>
                      {/* Line */}
                      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
                        <line
                          x1="50%" y1="50%"
                          x2={`${cx}%`} y2={`${cy}%`}
                          stroke={relColor} strokeWidth="1.5" strokeDasharray="4,3" opacity="0.4"
                        />
                      </svg>
                      {/* Node */}
                      <div
                        className="absolute flex flex-col items-center gap-1"
                        style={{ left: `${cx}%`, top: `${cy}%`, transform: 'translate(-50%,-50%)', zIndex: 2 }}
                      >
                        <div
                          className="w-12 h-12 rounded-full flex items-center justify-center text-base font-display font-bold"
                          style={{ background: `${linked.color}20`, border: `2px solid ${linked.color}50`, color: linked.color }}
                        >
                          {linked.name[0]}
                        </div>
                        <span className="text-[8px] font-body whitespace-nowrap" style={{ color: relColor }}>{conn.type}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Relations list */}
              {character.connections.map(conn => {
                const linked = allCharacters.find(c => c.id === conn.characterId);
                if (!linked) return null;
                const relColor = RELATION_COLORS[conn.type] ?? '#ffffff';
                return (
                  <div key={conn.characterId} className="glass rounded-2xl p-3 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-base font-display flex-shrink-0"
                      style={{ background: `${linked.color}20`, border: `1px solid ${linked.color}40`, color: linked.color }}>
                      {linked.name[0]}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-body text-foreground/90">{linked.name}</div>
                      <div className="text-xs font-body" style={{ color: relColor }}>{conn.type}</div>
                    </div>
                    <div className="text-xs text-muted-foreground font-body">{linked.role}</div>
                  </div>
                );
              })}

              {character.connections.length === 0 && (
                <div className="glass rounded-2xl p-6 text-center">
                  <p className="text-muted-foreground font-body text-sm">Связи не добавлены</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
