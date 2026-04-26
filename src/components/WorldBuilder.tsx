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
    desc: 'Остатки цивилизации, исчезнувшей тысячу лет назад. Ответы и опасности ждут здесь.',
    connections: ['Запретный лес'],
    mood: 'Зловещая',
  },
];

const MOODS = ['Напряжённая', 'Торжественная', 'Мистическая', 'Зловещая', 'Радостная', 'Меланхоличная'];

export default function WorldBuilder() {
  const [selected, setSelected] = useState(1);
  const location = LOCATIONS.find(l => l.id === selected);

  return (
    <div className="flex flex-col gap-4">
      {/* Mini map */}
      <div className="h-52 glass rounded-2xl p-4 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'linear-gradient(rgba(240,168,50,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(240,168,50,0.3) 1px, transparent 1px)',
            backgroundSize: '36px 36px',
          }}
        />
        {/* Nodes */}
        {LOCATIONS.map((loc, i) => {
          const positions = [
            { x: 22, y: 45 }, { x: 52, y: 20 }, { x: 72, y: 55 }, { x: 42, y: 72 }
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
                className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-display font-bold transition-all"
                style={{
                  background: `${loc.color}20`,
                  border: `2px solid ${loc.color}${selected === loc.id ? 'cc' : '50'}`,
                  color: loc.color,
                  boxShadow: selected === loc.id ? `0 0 20px ${loc.color}50` : 'none',
                  transform: selected === loc.id ? 'scale(1.2)' : 'scale(1)',
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
        {/* Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
          <line x1="22%" y1="45%" x2="52%" y2="20%" stroke="#f0a832" strokeWidth="1" strokeDasharray="4,4" />
          <line x1="52%" y1="20%" x2="72%" y2="55%" stroke="#8b5cf6" strokeWidth="1" strokeDasharray="4,4" />
          <line x1="72%" y1="55%" x2="42%" y2="72%" stroke="#d946ef" strokeWidth="1" strokeDasharray="4,4" />
        </svg>
        {/* Add button */}
        <button className="absolute top-3 right-3 w-8 h-8 rounded-lg glass border border-gold/30 flex items-center justify-center text-gold">
          <Icon name="Plus" size={14} />
        </button>
      </div>

      {/* Locations list */}
      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {LOCATIONS.map((loc) => (
          <button
            key={loc.id}
            onClick={() => setSelected(loc.id)}
            className={`flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-body transition-all border ${
              selected === loc.id ? 'border-white/15 bg-white/5' : 'glass border-border/40 text-muted-foreground'
            }`}
          >
            <div
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ background: loc.color, boxShadow: `0 0 6px ${loc.color}80` }}
            />
            {loc.name.split(' ')[0]}
          </button>
        ))}
      </div>

      {/* Location detail */}
      {location && (
        <div className="glass rounded-2xl p-4 animate-fade-in">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h2 className="font-display text-2xl" style={{ color: location.color }}>{location.name}</h2>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs font-body text-muted-foreground">{location.type}</span>
                <span className="text-xs text-muted-foreground">·</span>
                <span className="text-xs font-body" style={{ color: location.color }}>{location.mood}</span>
              </div>
            </div>
            <button className="px-3 py-1.5 rounded-lg text-xs font-body border border-gold/20 text-gold bg-gold/5 flex items-center gap-1">
              <Icon name="Pencil" size={11} />
              Изменить
            </button>
          </div>

          <p className="text-sm text-foreground/70 font-body leading-relaxed mb-4">{location.desc}</p>

          <div className="ink-line mb-4" />

          {/* Connections */}
          <div className="mb-4">
            <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-body block mb-2">Связи с локациями</span>
            <div className="flex flex-wrap gap-2">
              {location.connections.map((conn) => (
                <span key={conn} className="px-3 py-1.5 rounded-full glass border border-border/50 text-xs font-body text-foreground/70 flex items-center gap-1.5">
                  <Icon name="ArrowRight" size={10} className="text-muted-foreground" />
                  {conn}
                </span>
              ))}
            </div>
          </div>

          {/* Mood */}
          <div>
            <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-body block mb-2">Атмосфера</span>
            <div className="flex flex-wrap gap-2">
              {MOODS.map((mood) => (
                <button
                  key={mood}
                  className={`px-3 py-1.5 rounded-full text-xs font-body transition-all ${
                    mood === location.mood
                      ? 'text-foreground border border-white/20 bg-white/10'
                      : 'text-muted-foreground glass border-border/30'
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
  );
}
