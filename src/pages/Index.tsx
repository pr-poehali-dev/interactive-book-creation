import { useState } from 'react';
import Icon from '@/components/ui/icon';
import BookEditor from '@/components/BookEditor';
import CharactersPanel from '@/components/CharactersPanel';
import WorldBuilder from '@/components/WorldBuilder';
import Library from '@/components/Library';
import AIAssistant from '@/components/AIAssistant';
import ProfileScreen from '@/components/ProfileScreen';
import BookReader from '@/components/BookReader';
import { BOOKS, type Book } from '@/data/books';

type Tab = 'library' | 'editor' | 'ai' | 'characters' | 'world' | 'profile';

const TABS: { id: Tab; label: string; icon: string; color: string }[] = [
  { id: 'library', label: 'Книги', icon: 'BookOpen', color: '#60a5fa' },
  { id: 'editor', label: 'Редактор', icon: 'PenLine', color: '#f0a832' },
  { id: 'ai', label: 'AI', icon: 'Sparkles', color: '#f472b6' },
  { id: 'characters', label: 'Герои', icon: 'Users', color: '#d946ef' },
  { id: 'world', label: 'Мир', icon: 'Globe', color: '#10b981' },
  { id: 'profile', label: 'Профиль', icon: 'User', color: '#f0a832' },
];

const TAB_TITLES: Record<Tab, string> = {
  library: 'Библиотека',
  editor: 'Редактор',
  ai: 'AI-помощник',
  characters: 'Персонажи',
  world: 'Конструктор мира',
  profile: 'Мой профиль',
};

export default function Index() {
  const [activeTab, setActiveTab] = useState<Tab>('library');
  const [readingBook, setReadingBook] = useState<Book | null>(null);
  const currentTab = TABS.find(t => t.id === activeTab)!;

  // Full-screen reader overlay
  if (readingBook) {
    return <BookReader book={readingBook} onClose={() => setReadingBook(null)} />;
  }

  return (
    <div
      className="bg-mesh flex flex-col overflow-hidden"
      style={{ height: '100dvh', maxWidth: '430px', margin: '0 auto', position: 'relative' }}
    >
      {/* Ambient glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 left-0 w-64 h-64 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, #f0a832, transparent)', opacity: 0.05 }} />
        <div className="absolute bottom-24 right-0 w-56 h-56 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, #d946ef, transparent)', opacity: 0.05 }} />
      </div>

      {/* Header */}
      <header
        className="relative z-10 flex-shrink-0 flex items-center justify-between px-4 border-b border-border/30 glass"
        style={{ paddingTop: 'max(14px, env(safe-area-inset-top))', paddingBottom: '12px' }}
      >
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-gold to-magenta flex items-center justify-center">
            <span className="text-ink text-sm font-bold font-display">С</span>
          </div>
          <div>
            <span className="font-display text-base font-semibold text-shimmer block leading-none">Сказочник</span>
            <span className="text-[10px] text-muted-foreground font-body leading-none">Твоя творческая студия</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg glass border border-emerald-500/20 text-[10px] font-body text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Сохранено
          </div>
          <button
            onClick={() => setActiveTab('profile')}
            className="w-8 h-8 rounded-full bg-gold/20 border border-gold/30 flex items-center justify-center text-gold text-xs font-bold font-display active:scale-95 transition-all"
          >
            А
          </button>
        </div>
      </header>

      {/* Section title bar */}
      <div className="relative z-10 flex-shrink-0 px-4 py-2.5 border-b border-border/20 flex items-center gap-2 glass">
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center"
          style={{ background: `${currentTab.color}20`, border: `1px solid ${currentTab.color}30` }}
        >
          <Icon name={currentTab.icon} size={14} style={{ color: currentTab.color }} />
        </div>
        <h1 className="font-display text-xl leading-none" style={{ color: currentTab.color }}>
          {TAB_TITLES[activeTab]}
        </h1>

        {/* Cover editor link in editor */}
        {activeTab === 'editor' && (
          <button
            onClick={() => {/* открыть cover */}}
            className="ml-auto px-2.5 py-1 rounded-lg glass border border-violet/20 text-violet text-[10px] font-body flex items-center gap-1"
          >
            <Icon name="Image" size={10} />
            Обложка
          </button>
        )}
      </div>

      {/* Content area */}
      <main
        className="relative z-10 flex-1 overflow-y-auto"
        style={{ paddingBottom: 'calc(72px + max(8px, env(safe-area-inset-bottom)))' }}
      >
        <div className="p-4">
          {activeTab === 'library' && <Library />}
          {activeTab === 'editor' && <BookEditor />}
          {activeTab === 'characters' && <CharactersPanel />}
          {activeTab === 'world' && <WorldBuilder />}
          {activeTab === 'ai' && <AIAssistant />}
          {activeTab === 'profile' && (
            <ProfileScreen books={BOOKS} onReadBook={(book) => setReadingBook(book)} />
          )}
        </div>
      </main>

      {/* Bottom navigation */}
      <nav
        className="relative z-20 glass border-t border-border/40 flex items-center px-1"
        style={{
          position: 'fixed',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          maxWidth: '430px',
          paddingBottom: 'max(8px, env(safe-area-inset-bottom))',
          paddingTop: '6px',
        }}
      >
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex-1 flex flex-col items-center gap-0.5 transition-all"
              style={{ minHeight: '56px', paddingTop: '4px' }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200"
                style={{
                  background: isActive ? `${tab.color}20` : 'transparent',
                  border: isActive ? `1px solid ${tab.color}30` : '1px solid transparent',
                  transform: isActive ? 'scale(1.08)' : 'scale(1)',
                }}
              >
                <Icon name={tab.icon} size={20} style={{ color: isActive ? tab.color : 'rgba(255,255,255,0.3)' }} />
              </div>
              <span className="text-[9px] font-body leading-none transition-all"
                style={{ color: isActive ? tab.color : 'rgba(255,255,255,0.25)' }}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}