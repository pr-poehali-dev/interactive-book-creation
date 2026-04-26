import { useState } from 'react';
import Icon from '@/components/ui/icon';

const LOCATIONS = [
  {
    id: 1, name: 'Северный Квартал', type: 'Город', color: '#f0a832',
    desc: 'Лабиринт узких улочек и торговых рядов. Здесь правят контрабандисты и информаторы.',
    connections: ['Академия магов', 'Чёрный рынок'],
    mood: 'Напряжённая',
  },
  {
    id: 2, name: 'Академия магов', type: 'Институт', color: '#8b5cf6',
    desc: 'Великая башня знаний. За её стенами хранятся тайны, которые могут изменить мир.',
    connections: ['Северный Квартал', 'Запретный лес'],
    mood: 'Торжественная',
  },
  {
    id: 3, name: 'Запретный лес', type: 'Природа', color: '#10b981',
    desc: 'Древний лес, где живут духи прошлого. Время течёт иначе под его сводами.',
    connections: ['Академия магов', 'Руины Древних'],
    mood: 'Мистическая',
  },
  {
    id: 4, name: 'Руины Древних', type: 'Заброшенное', color: '#d946ef',
    desc: 'Остатки цивилизации, исчезнувшей тысячу лет назад. Ответы — и опасности — ждут здесь.',
    connections: ['Запретный лес'],
    mood: 'Зловещая',
  },
];

const MOODS = ['Напряжённая', 'Торжественная', 'Мистическая', 'Зловещая', 'Радостная', 'Меланхоличная'];

export default function WorldBuilder() {
  const [selected, setSelected] = useState(1);
  const [view, setView] = useState<'map' | 'list'>('map');

  const location = LOCATIONS.find(l => l.id === selected);

  return (
    <div className="flex h-full gap-4">
      {/* Left: location list + map toggle */}
      <div className="w-52 flex-shrink-0 flex flex-col gap-2">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-muted-foreground uppercase tracking-widest font-body">Локации</span>
          <div className="flex gap-1">
            <button
              onClick={() => setView('list')}
              className={`w-6 h-6 rounded flex items-center justify-center transition-all ${view === 'list' ? 'text-gold' : 'text-muted-foreground hover:text-foreground'}`}
            >
              <Icon name="List" size={12} />
            </button>
            <button
              onClick={() => setView('map')}
              className={`w-6 h-6 rounded flex items-center justify-center transition-all ${view === 'map' ? 'text-gold' : 'text-muted-foreground hover:text-foreground'}`}
            >
              <Icon name="Map" size={12} />
            </button>
          </div>
        </div>

        {LOCATIONS.map((loc) => (
          <button
            key={loc.id}
            onClick={() => setSelected(loc.id)}
            className={`text-left p-3 rounded-xl transition-all border font-body ${
              selected === loc.id
                ? 'border-white/10 bg-white/5'
                : 'glass border-border/50 hover:border-border'
            }`}
          >
            <div className="flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-full flex-shrink-0 animate-pulse-glow"
                style={{ background: loc.color, boxShadow: `0 0 6px ${loc.color}80` }}
              />
              <div className="min-w-0">
                <div className="text-sm font-medium truncate text-foreground/90">{loc.name}</div>
                <div className="text-xs text-muted-foreground">{loc.type}</div>
              </div>
            </div>
          </button>
        ))}

        <button className="mt-2 p-3 rounded-xl border border-dashed border-border/40 text-sm text-muted-foreground font-body hover:border-gold/30 hover:text-gold transition-all flex items-center gap-2">
          <Icon name="Plus" size={14} />
          Добавить локацию
        </button>
      </div>

      {/* Right: detail + mini-map */}
      <div className="flex-1 flex flex-col gap-4">
        {/* Map visual */}
        <div className="h-48 glass rounded-2xl p-4 relative overflow-hidden">
          {/* Grid background */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: 'linear-gradient(rgba(240,168,50,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(240,168,50,0.3) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />
          {/* Nodes */}
          {LOCATIONS.map((loc, i) => {
            const positions = [
              { x: 25, y: 40 }, { x: 55, y: 20 }, { x: 70, y: 55 }, { x: 45, y: 70 }
            ];
            const pos = positions[i];
            return (
              <button
                key={loc.id}
                onClick={() => setSelected(loc.id)}
                className="absolute transition-all"
                style={{ left: `${pos.x}%`, top: `${pos.y}%`, transform: 'translate(-50%, -50%)' }}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-display font-bold transition-all ${selected === loc.id ? 'scale-125' : 'scale-100 hover:scale-110'}`}
                  style={{
                    background: `${loc.color}20`,
                    border: `2px solid ${loc.color}${selected === loc.id ? 'cc' : '60'}`,
                    color: loc.color,
                    boxShadow: selected === loc.id ? `0 0 20px ${loc.color}40` : 'none',
                  }}
                >
                  {loc.name[0]}
                </div>
                <div
                  className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[9px] font-body whitespace-nowrap"
                  style={{ color: loc.color }}
                >
                  {loc.name.split(' ')[0]}
                </div>
              </button>
            );
          })}
          {/* Connection lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.2 }}>
            <line x1="25%" y1="40%" x2="55%" y2="20%" stroke="#f0a832" strokeWidth="1" strokeDasharray="4,4" />
            <line x1="55%" y1="20%" x2="70%" y2="55%" stroke="#8b5cf6" strokeWidth="1" strokeDasharray="4,4" />
            <line x1="70%" y1="55%" x2="45%" y2="70%" stroke="#d946ef" strokeWidth="1" strokeDasharray="4,4" />
          </svg>
        </div>

        {/* Location detail */}
        {location && (
          <div className="flex-1 glass rounded-2xl p-6 animate-fade-in">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="font-display text-2xl mb-1" style={{ color: location.color }}>
                  {location.name}
                </h2>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-body text-muted-foreground">{location.type}</span>
                  <span className="text-xs text-muted-foreground">·</span>
                  <span className="text-xs font-body" style={{ color: location.color }}>Атмосфера: {location.mood}</span>
                </div>
              </div>
              <button className="px-3 py-1.5 rounded-lg text-xs font-body glass border border-gold/20 text-gold hover:bg-gold/10 transition-all flex items-center gap-1.5">
                <Icon name="Pencil" size={11} />
                Изменить
              </button>
            </div>

            <p className="text-sm text-foreground/70 font-body leading-relaxed mb-5">{location.desc}</p>

            <div className="ink-line mb-4" />

            {/* Connections */}
            <div className="mb-4">
              <span className="text-xs text-muted-foreground uppercase tracking-widest font-body block mb-2">Связи с локациями</span>
              <div className="flex flex-wrap gap-2">
                {location.connections.map((conn) => (
                  <span key={conn} className="px-3 py-1 rounded-full glass border border-border/50 text-xs font-body text-foreground/70 flex items-center gap-1.5">
                    <Icon name="ArrowRight" size={10} className="text-muted-foreground" />
                    {conn}
                  </span>
                ))}
              </div>
            </div>

            {/* Mood selector */}
            <div>
              <span className="text-xs text-muted-foreground uppercase tracking-widest font-body block mb-2">Атмосфера</span>
              <div className="flex flex-wrap gap-2">
                {MOODS.map((mood) => (
                  <button
                    key={mood}
                    className={`px-3 py-1 rounded-full text-xs font-body transition-all ${
                      mood === location.mood
                        ? 'text-foreground border border-white/20 bg-white/10'
                        : 'text-muted-foreground glass border border-border/30 hover:text-foreground'
                    }`}
                  >
                    {mood}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
