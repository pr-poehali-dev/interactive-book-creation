export type BookStatus = 'draft' | 'writing' | 'done' | 'published';

export type Chapter = {
  id: number;
  title: string;
  words: number;
  status: 'done' | 'progress' | 'empty';
  content: string;
  effect: 'none' | 'dramatic' | 'mystery' | 'epic' | 'romantic';
};

export type Character = {
  id: number;
  name: string;
  role: string;
  archetype: string;
  traits: string[];
  color: string;
  description: string;
  backstory: string;
  connections: { characterId: number; type: string }[];
  imageUrl?: string;
};

export type Location = {
  id: number;
  name: string;
  type: string;
  color: string;
  desc: string;
  connections: string[];
  mood: string;
};

export type Book = {
  id: number;
  title: string;
  genre: string;
  chapters: Chapter[];
  words: number;
  progress: number;
  color: string;
  status: BookStatus;
  updated: string;
  tags: string[];
  coverPalette: number;
  description: string;
  characters: Character[];
  locations: Location[];
  publishDestination?: string;
};

export const BOOKS: Book[] = [
  {
    id: 1,
    title: 'Пепел Звёздного Тракта',
    genre: 'Фэнтези',
    progress: 72,
    color: '#f0a832',
    status: 'writing',
    updated: '2 часа назад',
    tags: ['магия', 'приключения', 'тёмный герой'],
    coverPalette: 0,
    description: 'История о магессе-изгнаннице, которая ищет правду о своём прошлом среди руин древней цивилизации.',
    words: 34500,
    chapters: [
      { id: 1, title: 'Пролог', words: 342, status: 'done', effect: 'mystery',
        content: `Ветер нёс запах старых страниц и чего-то ещё — чего-то, что нельзя было назвать словами, но что каждый писатель узнавал с первого вздоха.\n\nМир менялся. Это знали все — маги и торговцы, стражники и воры. Но никто не знал, что именно меняется. И именно это незнание было страшнее любой правды.` },
      { id: 2, title: 'Начало пути', words: 1204, status: 'done', effect: 'dramatic',
        content: `Северный ветер нёс запах грозы, когда она впервые увидела его лицо в отражении тёмных вод. Не лицо врага — лицо зеркала.\n\nАэлин остановилась у края пропасти. Позади — пылающая Академия. Впереди — неизвестность, которая почему-то казалась лучше любого известного пути.\n\n— Ты думаешь, я не знаю, что ты ищешь? — голос Каэ был тих, но в нём звенело что-то острое, как сталь в ножнах.\n— Я ищу правду.\n— Правда — это роскошь для тех, у кого есть время умирать медленно.` },
      { id: 3, title: 'Первое испытание', words: 856, status: 'progress', effect: 'epic',
        content: `Город жил двойной жизнью. Днём — рынки, голоса, запах специй и горячего металла. Ночью — шёпот в переулках, огни там, где их быть не должно, и тени, движущиеся против ветра.\n\nАэлин шла по Северному Кварталу, натянув капюшон глубже. Каждый переулок помнил её шаги. Каждый камень хранил чью-то тайну.` },
      { id: 4, title: 'Тёмный лес', words: 0, status: 'empty', effect: 'mystery', content: '' },
      { id: 5, title: 'Финал', words: 0, status: 'empty', effect: 'dramatic', content: '' },
    ],
    characters: [
      {
        id: 1, name: 'Аэлин Страдивари', role: 'Главный герой', archetype: 'Герой-изгнанник',
        traits: ['смелая', 'импульсивная', 'верная'], color: '#f0a832',
        description: 'Бывший придворный маг, изгнанная за нарушение кодекса. Ищет правду о своём прошлом.',
        backstory: 'Воспитана в Академии с трёх лет. Её мать была казнена за запрещённую магию, но Аэлин узнала об этом лишь в 20 лет. С тех пор она ищет артефакт, способный изменить прошлое — или открыть глаза на настоящее.',
        connections: [{ characterId: 2, type: 'Противостояние' }, { characterId: 3, type: 'Дружба' }],
        imageUrl: undefined,
      },
      {
        id: 2, name: 'Лорд Каэ', role: 'Антагонист', archetype: 'Тёмный наставник',
        traits: ['хитрый', 'харизматичный', 'безжалостный'], color: '#8b5cf6',
        description: 'Архимаг с тысячелетней историей. Его истинные цели неизвестны никому.',
        backstory: 'Один из основателей Академии. Говорят, он пережил три эпохи и заключил сделку с существами, о которых запрещено говорить вслух. Возможно, он — единственный, кто знает правду об Аэлин.',
        connections: [{ characterId: 1, type: 'Противостояние' }, { characterId: 3, type: 'Враждебность' }],
        imageUrl: undefined,
      },
      {
        id: 3, name: 'Торин', role: 'Союзник', archetype: 'Верный друг',
        traits: ['надёжный', 'остроумный', 'скрытный'], color: '#d946ef',
        description: 'Вор и контрабандист с золотым сердцем. Знает каждый переулок Северного Квартала.',
        backstory: 'Бывший ученик Академии, отчисленный за кражу запрещённых манускриптов. Не жалеет об этом ни секунды. Работает на трёх нанимателей одновременно — и никого из них не подводит.',
        connections: [{ characterId: 1, type: 'Дружба' }, { characterId: 2, type: 'Враждебность' }],
        imageUrl: undefined,
      },
    ],
    locations: [
      { id: 1, name: 'Северный Квартал', type: 'Город', color: '#f0a832', mood: 'Напряжённая',
        desc: 'Лабиринт узких улочек и торговых рядов. Здесь правят контрабандисты и информаторы.',
        connections: ['Академия магов', 'Чёрный рынок'] },
      { id: 2, name: 'Академия магов', type: 'Институт', color: '#8b5cf6', mood: 'Торжественная',
        desc: 'Великая башня знаний. За её стенами хранятся тайны, которые могут изменить мир.',
        connections: ['Северный Квартал', 'Запретный лес'] },
      { id: 3, name: 'Запретный лес', type: 'Природа', color: '#10b981', mood: 'Мистическая',
        desc: 'Древний лес, где живут духи прошлого. Время течёт иначе под его сводами.',
        connections: ['Академия магов', 'Руины Древних'] },
      { id: 4, name: 'Руины Древних', type: 'Заброшенное', color: '#d946ef', mood: 'Зловещая',
        desc: 'Остатки цивилизации, исчезнувшей тысячу лет назад.',
        connections: ['Запретный лес'] },
    ],
  },
  {
    id: 2,
    title: 'Тень Последнего Маяка',
    genre: 'Мистика',
    progress: 100,
    color: '#8b5cf6',
    status: 'done',
    updated: '3 дня назад',
    tags: ['детектив', 'сверхъестественное'],
    coverPalette: 1,
    description: 'Детектив расследует серию исчезновений в приморском городе, где маяк гаснет каждую ночь.',
    words: 22100,
    chapters: [
      { id: 1, title: 'Прибытие', words: 3200, status: 'done', effect: 'mystery',
        content: `Поезд прибыл в Карраклиф в три часа ночи. Именно тогда, когда маяк погас.\n\nДетектив Марк Вольский вышел на пустой перрон и почувствовал, как город смотрит на него. Не люди — город. Камни, туман, морская соль.` },
      { id: 2, title: 'Первая жертва', words: 4100, status: 'done', effect: 'dramatic',
        content: `Её нашли на рассвете — там, где прибой встречается с камнями. Никаких следов. Только цветок в руке, который не растёт на этом берегу.` },
    ],
    characters: [
      {
        id: 1, name: 'Марк Вольский', role: 'Главный герой', archetype: 'Детектив',
        traits: ['наблюдательный', 'замкнутый', 'упрямый'], color: '#8b5cf6',
        description: 'Детектив с даром видеть то, что другие не замечают.',
        backstory: 'Потерял напарника три года назад при невыясненных обстоятельствах. С тех пор работает один.',
        connections: [],
        imageUrl: undefined,
      },
    ],
    locations: [],
  },
  {
    id: 3,
    title: 'Дочь Ледяного Ветра',
    genre: 'Романтика',
    progress: 38,
    color: '#d946ef',
    status: 'writing',
    updated: '1 нед. назад',
    tags: ['любовь', 'драма', 'зима'],
    coverPalette: 3,
    description: 'История запретной любви среди вечных снегов северного королевства.',
    words: 11300,
    chapters: [
      { id: 1, title: 'Метель', words: 2800, status: 'done', effect: 'romantic',
        content: `Снег падал так тихо, словно небо хотело что-то сказать, но не решалось. Эйра стояла у окна и смотрела, как белое поглощает мир.` },
    ],
    characters: [],
    locations: [],
  },
];
