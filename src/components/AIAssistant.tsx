import { useState, useRef, useEffect } from 'react';
import Icon from '@/components/ui/icon';

type Message = {
  id: number;
  role: 'user' | 'ai';
  text: string;
  typing?: boolean;
};

const PROMPTS = [
  { icon: '⚡', label: 'Драматичная сцена', prompt: 'Напиши драматичную сцену столкновения двух персонажей' },
  { icon: '💬', label: 'Диалог', prompt: 'Создай живой диалог с конфликтом и подтекстом' },
  { icon: '🌍', label: 'Описание мира', prompt: 'Опиши локацию с деталями и атмосферой' },
  { icon: '🎭', label: 'Поворот сюжета', prompt: 'Придумай неожиданный поворот истории' },
  { icon: '✨', label: 'Улучшить текст', prompt: 'Улучши этот отрывок: сделай его ярче и выразительнее' },
  { icon: '👤', label: 'Биография', prompt: 'Придумай предысторию для персонажа с тайнами и травмами' },
];

const AI_RESPONSES = [
  `Северный ветер нёс запах грозы, когда она впервые увидела его лицо в отражении тёмных вод. Не лицо врага — лицо зеркала...

Воздух между ними был натянут, как струна перед разрывом. Каждое слово — осколок. Каждый взгляд — приговор.`,
  `— Ты думаешь, я не знаю, что ты ищешь? — голос Каэ был тих, но в нём звенело что-то острое, как сталь в ножнах.
— Я ищу правду.
— Правда — это роскошь для тех, у кого есть время умирать медленно.`,
  `Город жил двойной жизнью. Днём — рынки, голоса, запах специй и горячего металла. Ночью — шёпот в переулках, огни там, где их быть не должно, и тени, движущиеся против ветра.`,
];

let responseIdx = 0;

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0, role: 'ai',
      text: 'Привет! Я твой литературный AI-помощник. Расскажи, что нужно — напишу сцену, диалог, опишу локацию или придумаю поворот сюжета.',
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (text: string) => {
    if (!text.trim() || isTyping) return;
    const userMsg: Message = { id: Date.now(), role: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const response = AI_RESPONSES[responseIdx % AI_RESPONSES.length];
    responseIdx++;
    let displayed = '';
    let i = 0;
    const aiId = Date.now() + 1;
    setMessages(prev => [...prev, { id: aiId, role: 'ai', text: '', typing: true }]);

    const interval = setInterval(() => {
      displayed += response[i];
      i++;
      setMessages(prev => prev.map(m => m.id === aiId ? { ...m, text: displayed } : m));
      if (i >= response.length) {
        clearInterval(interval);
        setMessages(prev => prev.map(m => m.id === aiId ? { ...m, typing: false } : m));
        setIsTyping(false);
      }
    }, 18);
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <div className="flex flex-col h-full gap-4">
      {/* Quick prompts */}
      <div className="flex gap-2 flex-wrap">
        {PROMPTS.map((p) => (
          <button
            key={p.label}
            onClick={() => sendMessage(p.prompt)}
            className="px-3 py-1.5 rounded-xl glass border border-border/40 text-xs font-body text-foreground/70 hover:text-foreground hover:border-gold/20 hover:bg-gold/5 transition-all flex items-center gap-1.5"
          >
            <span>{p.icon}</span>
            {p.label}
          </button>
        ))}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto flex flex-col gap-4 pr-2">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 animate-fade-up ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            {/* Avatar */}
            <div
              className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-sm ${
                msg.role === 'ai'
                  ? 'bg-violet/20 border border-violet/30 text-violet'
                  : 'bg-gold/20 border border-gold/30 text-gold'
              }`}
            >
              {msg.role === 'ai' ? <Icon name="Sparkles" size={14} /> : <Icon name="User" size={14} />}
            </div>

            {/* Bubble */}
            <div
              className={`max-w-[75%] p-4 rounded-2xl text-sm font-body leading-relaxed ${
                msg.role === 'ai'
                  ? 'glass border border-border/40 text-foreground/90 rounded-tl-sm'
                  : 'bg-gold/10 border border-gold/20 text-foreground rounded-tr-sm'
              }`}
            >
              <div style={{ whiteSpace: 'pre-wrap' }}>
                {msg.text}
                {msg.typing && <span className="inline-block w-0.5 h-4 bg-violet ml-0.5 animate-pulse" />}
              </div>
              {!msg.typing && msg.role === 'ai' && msg.id !== 0 && (
                <div className="mt-3 pt-3 border-t border-border/30 flex gap-2">
                  <button className="text-xs text-muted-foreground hover:text-gold transition-colors flex items-center gap-1">
                    <Icon name="Copy" size={10} /> Скопировать
                  </button>
                  <button className="text-xs text-muted-foreground hover:text-violet transition-colors flex items-center gap-1">
                    <Icon name="RefreshCw" size={10} /> Переписать
                  </button>
                  <button className="text-xs text-muted-foreground hover:text-magenta transition-colors flex items-center gap-1">
                    <Icon name="Plus" size={10} /> В редактор
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground font-body animate-fade-in">
            <div className="flex gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-violet animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-violet animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-violet animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
            AI пишет...
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="glass-gold rounded-2xl p-3 border border-gold/15">
        <textarea
          className="w-full bg-transparent text-sm font-body text-foreground placeholder:text-muted-foreground outline-none resize-none leading-relaxed"
          placeholder="Опиши, что написать — сцену, диалог, описание..."
          rows={2}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKey}
        />
        <div className="flex justify-between items-center mt-2">
          <span className="text-xs text-muted-foreground font-body">Enter — отправить · Shift+Enter — новая строка</span>
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || isTyping}
            className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-gold to-magenta text-ink font-body text-sm font-medium disabled:opacity-40 hover:opacity-90 transition-all flex items-center gap-1.5"
          >
            <Icon name="Send" size={13} />
            Отправить
          </button>
        </div>
      </div>
    </div>
  );
}
