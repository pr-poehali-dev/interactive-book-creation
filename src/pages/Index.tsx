import { useState } from 'react';
import Icon from '@/components/ui/icon';
import BookEditor from '@/components/BookEditor';
import CharactersPanel from '@/components/CharactersPanel';
import WorldBuilder from '@/components/WorldBuilder';
import Library from '@/components/Library';
import CoverEditor from '@/components/CoverEditor';
import AIAssistant from '@/components/AIAssistant';

type Tab = 'editor' | 'characters' | 'world' | 'library' | 'cover' | 'ai';

const TABS: { id: Tab; label: string; icon: string; color: string }[] = [
  { id: 'editor', label: 'Редактор', icon: 'PenLine', color: '#f0a832' },
  { id: 'characters', label: 'Персонажи', icon: 'Users', color: '#d946ef' },
  { id: 'world', label: 'Мир', icon: 'Globe', color: '#10b981' },
  { id: 'library', label: 'Библиотека', icon: 'BookOpen', color: '#60a5fa' },
  { id: 'cover', label: 'Обложка', icon: 'Image', color: '#8b5cf6' },
  { id: 'ai', label: 'AI-помощник', icon: 'Sparkles', color: '#f472b6' },
];

const FLOATING_LETTERS = ['А', 'И', 'С', 'Т', 'О', 'Р', 'И', 'Я'];

export default function Index() {
  const [activeTab, setActiveTab] = useState<Tab>('editor');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const currentTab = TABS.find(t => t.id === activeTab)!;

  return (
    <div className="min-h-screen bg-mesh flex flex-col overflow-hidden" style={{ height: '100vh' }}>
      {/* Floating decorative letters */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {FLOATING_LETTERS.map((letter, i) => (
          <span
            key={i}
            className="absolute font-display text-7xl font-bold select-none animate-float"
            style={{
              left: `${8 + i * 12}%`,
              top: `${15 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${7 + i * 0.5}s`,
              color: TABS[i % TABS.length].color,
              opacity: 0.015,
            }}
          >
            {letter}
          </span>
        ))}

        {/* Orb glows */}
        <div className="absolute top-20 left-20 w-96 h-96 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, #f0a832, transparent)', opacity: 0.05 }} />
        <div className="absolute bottom-20 right-20 w-80 h-80 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, #d946ef, transparent)', opacity: 0.05 }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, #8b5cf6, transparent)', opacity: 0.03 }} />
      </div>

      {/* Header */}
      <header className="relative z-10 flex-shrink-0 flex items-center justify-between px-6 py-4 border-b border-border/30 glass">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all"
          >
            <Icon name="Menu" size={16} />
          </button>

          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-gold to-magenta flex items-center justify-center">
              <span className="text-ink text-xs font-bold font-display">С</span>
            </div>
            <span className="font-display text-lg font-semibold text-shimmer">Сказочник</span>
          </div>

          <div className="w-px h-5 bg-border/50 mx-1" />

          <div className="flex items-center gap-1 text-xs text-muted-foreground font-body">
            <Icon name="BookOpen" size={12} />
            <span>Пепел Звёздного Тракта</span>
            <Icon name="ChevronDown" size={10} className="ml-0.5" />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass border border-emerald-500/20 text-xs font-body text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Сохранено
          </div>

          <button className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-gold/80 to-magenta/60 text-ink text-xs font-body font-medium hover:from-gold hover:to-magenta transition-all flex items-center gap-1.5">
            <Icon name="Zap" size={12} />
            Опубликовать
          </button>

          <div className="w-8 h-8 rounded-full bg-gold/20 border border-gold/30 flex items-center justify-center text-gold text-xs font-bold font-display">
            А
          </div>
        </div>
      </header>

      <div className="relative z-10 flex flex-1 overflow-hidden">
        {/* Sidebar navigation */}
        <aside className={`flex-shrink-0 transition-all duration-300 ${sidebarOpen ? 'w-52' : 'w-14'} border-r border-border/30 glass flex flex-col py-3 overflow-hidden`}>
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-3 py-2.5 mx-2 rounded-xl transition-all font-body text-sm ${
                activeTab === tab.id
                  ? 'bg-white/5 border border-white/8'
                  : 'hover:bg-white/3 text-muted-foreground hover:text-foreground'
              }`}
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all"
                style={{
                  background: activeTab === tab.id ? `${tab.color}20` : 'transparent',
                  border: activeTab === tab.id ? `1px solid ${tab.color}30` : '1px solid transparent',
                }}
              >
                <Icon
                  name={tab.icon}
                  size={16}
                  style={{ color: activeTab === tab.id ? tab.color : undefined }}
                />
              </div>
              {sidebarOpen && (
                <span
                  className="truncate transition-all"
                  style={{ color: activeTab === tab.id ? tab.color : undefined }}
                >
                  {tab.label}
                </span>
              )}
              {sidebarOpen && activeTab === tab.id && (
                <div className="ml-auto w-1 h-1 rounded-full flex-shrink-0" style={{ background: tab.color }} />
              )}
            </button>
          ))}

          <div className="mt-auto px-2">
            <div className="ink-line mb-3" />
            <button className="flex items-center gap-3 px-3 py-2 w-full rounded-xl text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all font-body text-sm">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name="Settings" size={16} />
              </div>
              {sidebarOpen && <span>Настройки</span>}
            </button>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-hidden flex flex-col">
          {/* Section header */}
          <div className="flex-shrink-0 px-6 py-4 border-b border-border/20 flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: `${currentTab.color}20`, border: `1px solid ${currentTab.color}30` }}
            >
              <Icon name={currentTab.icon} size={16} style={{ color: currentTab.color }} />
            </div>
            <h1 className="font-display text-2xl" style={{ color: currentTab.color }}>
              {currentTab.label}
            </h1>
            <div className="flex-1" />
            {activeTab === 'editor' && (
              <div className="flex items-center gap-2">
                <button className="px-3 py-1.5 rounded-lg glass border border-border/40 text-xs font-body text-muted-foreground hover:text-foreground transition-all flex items-center gap-1.5">
                  <Icon name="Eye" size={12} /> Превью
                </button>
                <button className="px-3 py-1.5 rounded-lg glass border border-border/40 text-xs font-body text-muted-foreground hover:text-foreground transition-all flex items-center gap-1.5">
                  <Icon name="History" size={12} /> История
                </button>
              </div>
            )}
          </div>

          {/* Content area */}
          <div className="flex-1 overflow-hidden p-5">
            {activeTab === 'editor' && <BookEditor />}
            {activeTab === 'characters' && <CharactersPanel />}
            {activeTab === 'world' && <WorldBuilder />}
            {activeTab === 'library' && <Library />}
            {activeTab === 'cover' && <CoverEditor />}
            {activeTab === 'ai' && <AIAssistant />}
          </div>
        </main>
      </div>
    </div>
  );
}
