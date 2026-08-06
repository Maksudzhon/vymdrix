export type Lang = "uz" | "ru" | "en" | "ja";

export const LANGS: { code: Lang; label: string }[] = [
  { code: "uz", label: "UZ" },
  { code: "ru", label: "RU" },
  { code: "en", label: "EN" },
  { code: "ja", label: "JA" },
];

type Tri = Record<Lang, string>;

export const t = {
  role: {
    uz: "Full Stack Dasturchi",
    ru: "Full Stack Разработчик",
    en: "Full Stack Developer",
    ja: "フルスタック開発者",
  },
  est: {
    uz: "Est. 2008 · Qo'qon",
    ru: "Est. 2008 · Коканд",
    en: "Est. 2008 · Kokand",
    ja: "Est. 2008 · コーカンド",
  },
  intro: {
    uz: "Zamonaviy web-ilovalar va tizimlar yarataman — toza kod, ishonchli arxitektura va foydalanuvchi tajribasiga alohida e'tibor bilan.",
    ru: "Создаю современные веб-приложения и системы — чистый код, надёжная архитектура и внимание к пользовательскому опыту.",
    en: "I build modern web apps and systems — clean code, solid architecture and a real focus on user experience.",
    ja: "モダンなウェブアプリとシステムを作っています — クリーンなコード、堅実なアーキテクチャ、そしてユーザー体験へのこだわり。",
  },
  ctaProjects: { uz: "Loyihalar", ru: "Проекты", en: "Projects", ja: "プロジェクト" },
  ctaContact: { uz: "Bog'lanish", ru: "Связаться", en: "Get in touch", ja: "お問い合わせ" },
  skillsTitle: { uz: "Ko'nikmalar", ru: "Навыки", en: "Skills", ja: "スキル" },
  projectsTitle: { uz: "Loyihalar", ru: "Проекты", en: "Projects", ja: "プロジェクト" },
  selected: { uz: "selected", ru: "selected", en: "selected", ja: "selected" },
  nowPlaying: {
    uz: "Hozir tinglayotganlarim",
    ru: "Сейчас слушаю",
    en: "Now playing",
    ja: "再生中",
  },
  soundtrack: {
    uz: "Kod ostidagi\nsoundtrack",
    ru: "Саундтрек\nпод код",
    en: "Soundtrack\nunder the code",
    ja: "コードの下の\nサウンドトラック",
  },
  contactTitle: {
    uz: "Birgalikda\nishlaylik",
    ru: "Давайте\nработать вместе",
    en: "Let's work\ntogether",
    ja: "一緒に\n作りましょう",
  },
  contactDesc: {
    uz: "Loyiha g'oyangiz bormi yoki hamkorlik qilmoqchimisiz? Xabar yozing — imkon qadar tez javob beraman.",
    ru: "Есть идея проекта или хотите посотрудничать? Напишите — отвечу как можно скорее.",
    en: "Got a project idea or want to collaborate? Drop a message — I reply fast.",
    ja: "プロジェクトのアイデアやコラボのご相談は、お気軽にメッセージをどうぞ。すぐに返信します。",
  },
  writeMsg: {
    uz: "Xabar yozing",
    ru: "Напишите сообщение",
    en: "Write a message",
    ja: "メッセージを書く",
  },
  fName: { uz: "ISMINGIZ", ru: "ВАШЕ ИМЯ", en: "YOUR NAME", ja: "お名前" },
  fEmail: { uz: "EMAIL", ru: "EMAIL", en: "EMAIL", ja: "メール" },
  fMsg: { uz: "XABAR", ru: "СООБЩЕНИЕ", en: "MESSAGE", ja: "メッセージ" },
  send: { uz: "Yuborish", ru: "Отправить", en: "Send", ja: "送信" },
  sending: { uz: "Yuborilmoqda...", ru: "Отправка...", en: "Sending...", ja: "送信中..." },
  sent: {
    uz: "Rahmat! Xabaringiz yuborildi.",
    ru: "Спасибо! Сообщение отправлено.",
    en: "Thanks! Your message was sent.",
    ja: "ありがとうございます！メッセージを送信しました。",
  },
  failed: {
    uz: "Xatolik yuz berdi. Qayta urinib ko'ring.",
    ru: "Произошла ошибка. Попробуйте ещё раз.",
    en: "Something went wrong. Please try again.",
    ja: "エラーが発生しました。もう一度お試しください。",
  },
  stack: { uz: "Texnik stack", ru: "Технологии", en: "Tech stack", ja: "技術スタック" },
  roleLabel: { uz: "Rol", ru: "Роль", en: "Role", ja: "担当" },
  result: { uz: "Natija", ru: "Результат", en: "Outcome", ja: "成果" },
  visit: { uz: "Saytga o'tish", ru: "Открыть сайт", en: "Visit site", ja: "サイトを見る" },
  close: { uz: "Yopish", ru: "Закрыть", en: "Close", ja: "閉じる" },
  details: { uz: "Batafsil", ru: "Подробнее", en: "Details", ja: "詳細" },
  city: {
    uz: "Qo'qon, O'zbekiston",
    ru: "Коканд, Узбекистан",
    en: "Kokand, Uzbekistan",
    ja: "ウズベキスタン・コーカンド",
  },
  junior: { uz: "Junior", ru: "Junior", en: "Junior", ja: "ジュニア" },
  searchLabel: {
    uz: "Loyihalarni qidirish",
    ru: "Поиск проектов",
    en: "Search projects",
    ja: "プロジェクトを検索",
  },
  searchPlaceholder: {
    uz: "Qidirish: React, API, LMS...",
    ru: "Поиск: React, API, LMS...",
    en: "Search: React, API, LMS...",
    ja: "検索: React, API, LMS...",
  },
  filterByTech: {
    uz: "Texnologiya bo'yicha",
    ru: "По технологии",
    en: "Filter by tech",
    ja: "技術で絞り込む",
  },
  allTech: { uz: "Barchasi", ru: "Все", en: "All", ja: "すべて" },
  noResults: {
    uz: "Hech narsa topilmadi. Boshqa so'rov bilan urinib ko'ring.",
    ru: "Ничего не найдено. Попробуйте другой запрос.",
    en: "Nothing found. Try a different query.",
    ja: "見つかりませんでした。別のキーワードでお試しください。",
  },
  resetFilters: { uz: "Tozalash", ru: "Сбросить", en: "Reset", ja: "リセット" },
  found: { uz: "topildi", ru: "найдено", en: "found", ja: "件" },
  languageLabel: { uz: "Til tanlash", ru: "Выбор языка", en: "Select language", ja: "言語を選択" },
  playlistLabel: {
    uz: "Retro pleylist",
    ru: "Ретро плейлист",
    en: "Retro playlist",
    ja: "レトロ・プレイリスト",
  },
  play: { uz: "Ijro etish", ru: "Играть", en: "Play", ja: "再生" },
  pause: { uz: "Pauza", ru: "Пауза", en: "Pause", ja: "一時停止" },
  prevTrack: { uz: "Oldingi trek", ru: "Предыдущий трек", en: "Previous track", ja: "前の曲" },
  nextTrack: { uz: "Keyingi trek", ru: "Следующий трек", en: "Next track", ja: "次の曲" },
  seekLabel: { uz: "Trek bo'ylab o'tish", ru: "Перемотка трека", en: "Seek track", ja: "再生位置" },
  volumeLabel: { uz: "Ovoz balandligi", ru: "Громкость", en: "Volume", ja: "音量" },
  muteLabel: { uz: "Ovozni o'chirish", ru: "Выключить звук", en: "Mute", ja: "ミュート" },
  unmuteLabel: { uz: "Ovozni yoqish", ru: "Включить звук", en: "Unmute", ja: "ミュート解除" },
  partyOn: {
    uz: "Vegas vibe",
    ru: "Вегас вайб",
    en: "Vegas vibe",
    ja: "ベガスモード",
  },
  partyOff: {
    uz: "Vegas rejimi o'chirish",
    ru: "Выключить режим Вегас",
    en: "Turn off Vegas mode",
    ja: "ベガスモードをオフ",
  },
  scrollProgress: {
    uz: "Sahifa bo'ylab siljish",
    ru: "Прогресс прокрутки",
    en: "Page scroll progress",
    ja: "スクロールの進捗",
  },
  backToTop: {
    uz: "Yuqoriga",
    ru: "Наверх",
    en: "Back to top",
    ja: "トップへ戻る",
  },
  loading: {
    uz: "Yuklanmoqda...",
    ru: "Загрузка...",
    en: "Loading...",
    ja: "読み込み中...",
  },
} satisfies Record<string, Tri>;

export const stats: { value: string; label: Tri; tone: string }[] = [
  {
    value: "04",
    label: { uz: "Loyiha", ru: "Проекта", en: "Projects", ja: "プロジェクト" },
    tone: "bg-primary text-primary-foreground",
  },
  {
    value: "09+",
    label: {
      uz: "Til / Freymvork",
      ru: "Языки / Фреймворки",
      en: "Languages / Frameworks",
      ja: "言語 / フレームワーク",
    },
    tone: "bg-secondary text-secondary-foreground",
  },
  {
    value: "18",
    label: { uz: "Yosh", ru: "Возраст", en: "Years old", ja: "歳" },
    tone: "bg-accent text-accent-foreground",
  },
  {
    value: "UZ",
    label: { uz: "Qo'qon", ru: "Коканд", en: "Kokand", ja: "コーカンド" },
    tone: "bg-rose text-rose-foreground",
  },
];

export const skills: { num: string; title: Tri; desc: Tri; tags: string[]; tone: string }[] = [
  {
    num: "01",
    title: { uz: "Frontend", ru: "Frontend", en: "Frontend", ja: "フロントエンド" },
    desc: {
      uz: "Interaktiv va responsive interfeyslar",
      ru: "Интерактивные и адаптивные интерфейсы",
      en: "Interactive, responsive interfaces",
      ja: "インタラクティブでレスポンシブなUI",
    },
    tags: ["HTML/CSS", "SCSS", "JavaScript", "React", "TailwindCSS"],
    tone: "bg-primary text-primary-foreground",
  },
  {
    num: "02",
    title: { uz: "Backend", ru: "Backend", en: "Backend", ja: "バックエンド" },
    desc: {
      uz: "Server arxitekturasi va API'lar",
      ru: "Серверная архитектура и API",
      en: "Server architecture and APIs",
      ja: "サーバー設計とAPI",
    },
    tags: ["Python", "Django", "Node.js", "TypeScript"],
    tone: "bg-secondary text-secondary-foreground",
  },
  {
    num: "03",
    title: {
      uz: "Bot Dasturlash",
      ru: "Разработка ботов",
      en: "Bot Development",
      ja: "ボット開発",
    },
    desc: {
      uz: "Telegram botlar va avtomatlashtirish",
      ru: "Telegram-боты и автоматизация",
      en: "Telegram bots and automation",
      ja: "Telegramボットと自動化",
    },
    tags: ["Aiogram", "Python", "Node.js"],
    tone: "bg-accent text-accent-foreground",
  },
  {
    num: "04",
    title: { uz: "Ma'lumotlar Bazasi", ru: "Базы данных", en: "Databases", ja: "データベース" },
    desc: {
      uz: "Backend-as-a-service va saqlash",
      ru: "Backend-as-a-service и хранение",
      en: "Backend-as-a-service and storage",
      ja: "BaaSとストレージ",
    },
    tags: ["MongoDB", "Firebase", "Supabase"],
    tone: "bg-rose text-rose-foreground",
  },
];

export type Project = {
  idx: string;
  name: string;
  year: string;
  desc: Tri;
  role: Tri;
  result: Tri;
  stack: string[];
  href: string;
  tone: string;
};

export const projects: Project[] = [
  {
    idx: "01",
    name: "MindSphere",
    year: "2025",
    desc: {
      uz: "TypeScript va Node.js asosida qurilgan platforma — zamonaviy backend arxitekturasi bilan.",
      ru: "Платформа на TypeScript и Node.js с современной backend-архитектурой.",
      en: "A platform built on TypeScript and Node.js with a modern backend architecture.",
      ja: "TypeScriptとNode.jsで構築した、モダンなバックエンド設計のプラットフォーム。",
    },
    role: {
      uz: "Full stack dasturchi — arxitektura, API va interfeys.",
      ru: "Full stack разработчик — архитектура, API и интерфейс.",
      en: "Full stack developer — architecture, API and interface.",
      ja: "フルスタック開発 — 設計、API、UIまで担当。",
    },
    result: {
      uz: "Barqaror ishlaydigan production platforma, modulli API va tez yuklanadigan interfeys.",
      ru: "Стабильная production-платформа, модульный API и быстро загружающийся интерфейс.",
      en: "A stable production platform with a modular API and a fast-loading interface.",
      ja: "安定した本番プラットフォーム、モジュール型APIと高速なUIを実現。",
    },
    stack: ["TypeScript", "Node.js", "REST API"],
    href: "https://www.mindsphere.uz/",
    tone: "bg-primary text-primary-foreground",
  },
  {
    idx: "02",
    name: "MindSphere LMS",
    year: "2025",
    desc: {
      uz: "Next.js va TypeScript'da qurilgan Learning Management System — ta'lim jarayonini boshqarish uchun.",
      ru: "LMS на Next.js и TypeScript для управления учебным процессом.",
      en: "A Learning Management System on Next.js and TypeScript for running courses.",
      ja: "Next.jsとTypeScriptで作った学習管理システム（LMS）。",
    },
    role: {
      uz: "Frontend yetakchisi — kurslar, foydalanuvchi panellari va autentifikatsiya oqimi.",
      ru: "Ведущий frontend — курсы, панели пользователей и поток аутентификации.",
      en: "Frontend lead — courses, user dashboards and the auth flow.",
      ja: "フロントエンドリード — コース、ダッシュボード、認証フロー。",
    },
    result: {
      uz: "O'qituvchi va o'quvchi uchun alohida panel, SSR bilan tez sahifalar.",
      ru: "Отдельные панели для преподавателя и студента, быстрые страницы с SSR.",
      en: "Separate teacher and student dashboards with fast SSR pages.",
      ja: "講師用・受講者用の個別ダッシュボードとSSRによる高速ページ。",
    },
    stack: ["TypeScript", "Next.js", "SSR"],
    href: "https://www.mindsphere.space/",
    tone: "bg-secondary text-secondary-foreground",
  },
  {
    idx: "03",
    name: "Weather System Assistant",
    year: "2024",
    desc: {
      uz: "TypeScript va Node.js bilan yaratilgan aqlli ob-havo yordamchisi ilovasi.",
      ru: "Умный погодный ассистент на TypeScript и Node.js.",
      en: "A smart weather assistant app built with TypeScript and Node.js.",
      ja: "TypeScriptとNode.jsで作ったスマート天気アシスタント。",
    },
    role: {
      uz: "Yakka dasturchi — API integratsiyasi, UI va deploy.",
      ru: "Единственный разработчик — интеграция API, UI и деплой.",
      en: "Solo developer — API integration, UI and deployment.",
      ja: "個人開発 — API連携、UI、デプロイ。",
    },
    result: {
      uz: "Real vaqt ob-havo ma'lumotlari, geolokatsiya va toza responsive UI.",
      ru: "Погода в реальном времени, геолокация и аккуратный адаптивный UI.",
      en: "Real-time weather data, geolocation and a clean responsive UI.",
      ja: "リアルタイムの天気データ、位置情報、洗練されたレスポンシブUI。",
    },
    stack: ["TypeScript", "Node.js", "Weather API"],
    href: "https://weather-system-assistant-3-9-3bymorvi.netlify.app/",
    tone: "bg-accent text-accent-foreground",
  },
  {
    idx: "04",
    name: "GamifiedLife",
    year: "2024",
    desc: {
      uz: "Kundalik hayotni o'yinlashtirish orqali samaradorlikni oshiruvchi JavaScript ilovasi.",
      ru: "JavaScript-приложение, которое повышает продуктивность через геймификацию дня.",
      en: "A JavaScript app that boosts productivity by gamifying daily life.",
      ja: "日常をゲーム化して生産性を高めるJavaScriptアプリ。",
    },
    role: {
      uz: "Yakka dasturchi — g'oya, mexanika va interfeys.",
      ru: "Единственный разработчик — идея, механики и интерфейс.",
      en: "Solo developer — concept, mechanics and interface.",
      ja: "個人開発 — 企画、ゲーム設計、UI。",
    },
    result: {
      uz: "XP, darajalar va vazifalar tizimi bilan kundalik odatlarni kuzatish.",
      ru: "Отслеживание привычек через систему XP, уровней и заданий.",
      en: "Habit tracking through an XP, levels and quests system.",
      ja: "XP・レベル・クエストで習慣を記録。",
    },
    stack: ["JavaScript", "LocalStorage"],
    href: "https://gamified-life-morvi.vercel.app/",
    tone: "bg-rose text-rose-foreground",
  },
];

export const marquee = [
  "HTML",
  "CSS",
  "SCSS",
  "JAVASCRIPT",
  "TYPESCRIPT",
  "REACT",
  "NEXT.JS",
  "TAILWIND",
  "PYTHON",
  "DJANGO",
  "NODE.JS",
  "AIOGRAM",
  "MONGODB",
  "FIREBASE",
  "SUPABASE",
];

export const socials = [
  { label: "Telegram", handle: "@vymdrix", href: "https://t.me/vymdrix" },
  { label: "GitHub", handle: "maksudzhon", href: "https://github.com/maksudzhon" },
  { label: "Instagram", handle: "@mvkimov_", href: "https://www.instagram.com/mvkimov_/" },
];

export const FORMSPREE_URL = "https://formspree.io/f/mlgqqvpe";
