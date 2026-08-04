export type Lang = "uz" | "ru" | "en";

export const LANGS: { code: Lang; label: string }[] = [
  { code: "uz", label: "UZ" },
  { code: "ru", label: "RU" },
  { code: "en", label: "EN" },
];

type Tri = Record<Lang, string>;

export const t = {
  role: { uz: "Full Stack Dasturchi", ru: "Full Stack Разработчик", en: "Full Stack Developer" },
  est: { uz: "Est. 2008 · Qo'qon", ru: "Est. 2008 · Коканд", en: "Est. 2008 · Kokand" },
  intro: {
    uz: "Zamonaviy web-ilovalar va tizimlar yarataman — toza kod, ishonchli arxitektura va foydalanuvchi tajribasiga alohida e'tibor bilan.",
    ru: "Создаю современные веб-приложения и системы — чистый код, надёжная архитектура и внимание к пользовательскому опыту.",
    en: "I build modern web apps and systems — clean code, solid architecture and a real focus on user experience.",
  },
  ctaProjects: { uz: "Loyihalar", ru: "Проекты", en: "Projects" },
  ctaContact: { uz: "Bog'lanish", ru: "Связаться", en: "Get in touch" },
  skillsTitle: { uz: "Ko'nikmalar", ru: "Навыки", en: "Skills" },
  projectsTitle: { uz: "Loyihalar", ru: "Проекты", en: "Projects" },
  selected: { uz: "selected", ru: "selected", en: "selected" },
  nowPlaying: { uz: "Hozir tinglayotganlarim", ru: "Сейчас слушаю", en: "Now playing" },
  soundtrack: {
    uz: "Kod ostidagi\nsoundtrack",
    ru: "Саундтрек\nпод код",
    en: "Soundtrack\nunder the code",
  },
  contactTitle: {
    uz: "Birgalikda\nishlaylik",
    ru: "Давайте\nработать вместе",
    en: "Let's work\ntogether",
  },
  contactDesc: {
    uz: "Loyiha g'oyangiz bormi yoki hamkorlik qilmoqchimisiz? Xabar yozing — imkon qadar tez javob beraman.",
    ru: "Есть идея проекта или хотите посотрудничать? Напишите — отвечу как можно скорее.",
    en: "Got a project idea or want to collaborate? Drop a message — I reply fast.",
  },
  writeMsg: { uz: "Xabar yozing", ru: "Напишите сообщение", en: "Write a message" },
  fName: { uz: "ISMINGIZ", ru: "ВАШЕ ИМЯ", en: "YOUR NAME" },
  fEmail: { uz: "EMAIL", ru: "EMAIL", en: "EMAIL" },
  fMsg: { uz: "XABAR", ru: "СООБЩЕНИЕ", en: "MESSAGE" },
  send: { uz: "Yuborish", ru: "Отправить", en: "Send" },
  sending: { uz: "Yuborilmoqda...", ru: "Отправка...", en: "Sending..." },
  sent: {
    uz: "Rahmat! Xabaringiz yuborildi.",
    ru: "Спасибо! Сообщение отправлено.",
    en: "Thanks! Your message was sent.",
  },
  failed: {
    uz: "Xatolik yuz berdi. Qayta urinib ko'ring.",
    ru: "Произошла ошибка. Попробуйте ещё раз.",
    en: "Something went wrong. Please try again.",
  },
  stack: { uz: "Texnik stack", ru: "Технологии", en: "Tech stack" },
  roleLabel: { uz: "Rol", ru: "Роль", en: "Role" },
  result: { uz: "Natija", ru: "Результат", en: "Outcome" },
  visit: { uz: "Saytga o'tish", ru: "Открыть сайт", en: "Visit site" },
  close: { uz: "Yopish", ru: "Закрыть", en: "Close" },
  details: { uz: "Batafsil", ru: "Подробнее", en: "Details" },
  city: { uz: "Qo'qon, O'zbekiston", ru: "Коканд, Узбекистан", en: "Kokand, Uzbekistan" },
  junior: { uz: "Junior", ru: "Junior", en: "Junior" },
} satisfies Record<string, Tri>;

export const stats: { value: string; label: Tri; tone: string }[] = [
  {
    value: "04",
    label: { uz: "Loyiha", ru: "Проекта", en: "Projects" },
    tone: "bg-primary text-primary-foreground",
  },
  {
    value: "09+",
    label: { uz: "Til / Freymvork", ru: "Языки / Фреймворки", en: "Languages / Frameworks" },
    tone: "bg-secondary text-secondary-foreground",
  },
  {
    value: "18",
    label: { uz: "Yosh", ru: "Возраст", en: "Years old" },
    tone: "bg-accent text-accent-foreground",
  },
  {
    value: "UZ",
    label: { uz: "Qo'qon", ru: "Коканд", en: "Kokand" },
    tone: "bg-rose text-rose-foreground",
  },
];

export const skills: { num: string; title: Tri; desc: Tri; tags: string[]; tone: string }[] = [
  {
    num: "01",
    title: { uz: "Frontend", ru: "Frontend", en: "Frontend" },
    desc: {
      uz: "Interaktiv va responsive interfeyslar",
      ru: "Интерактивные и адаптивные интерфейсы",
      en: "Interactive, responsive interfaces",
    },
    tags: ["HTML/CSS", "SCSS", "JavaScript", "React", "TailwindCSS"],
    tone: "bg-primary text-primary-foreground",
  },
  {
    num: "02",
    title: { uz: "Backend", ru: "Backend", en: "Backend" },
    desc: {
      uz: "Server arxitekturasi va API'lar",
      ru: "Серверная архитектура и API",
      en: "Server architecture and APIs",
    },
    tags: ["Python", "Django", "Node.js", "TypeScript"],
    tone: "bg-secondary text-secondary-foreground",
  },
  {
    num: "03",
    title: { uz: "Bot Dasturlash", ru: "Разработка ботов", en: "Bot Development" },
    desc: {
      uz: "Telegram botlar va avtomatlashtirish",
      ru: "Telegram-боты и автоматизация",
      en: "Telegram bots and automation",
    },
    tags: ["Aiogram", "Python", "Node.js"],
    tone: "bg-accent text-accent-foreground",
  },
  {
    num: "04",
    title: { uz: "Ma'lumotlar Bazasi", ru: "Базы данных", en: "Databases" },
    desc: {
      uz: "Backend-as-a-service va saqlash",
      ru: "Backend-as-a-service и хранение",
      en: "Backend-as-a-service and storage",
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
    },
    role: {
      uz: "Full stack dasturchi — arxitektura, API va interfeys.",
      ru: "Full stack разработчик — архитектура, API и интерфейс.",
      en: "Full stack developer — architecture, API and interface.",
    },
    result: {
      uz: "Barqaror ishlaydigan production platforma, modulli API va tez yuklanadigan interfeys.",
      ru: "Стабильная production-платформа, модульный API и быстро загружающийся интерфейс.",
      en: "A stable production platform with a modular API and a fast-loading interface.",
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
    },
    role: {
      uz: "Frontend yetakchisi — kurslar, foydalanuvchi panellari va autentifikatsiya oqimi.",
      ru: "Ведущий frontend — курсы, панели пользователей и поток аутентификации.",
      en: "Frontend lead — courses, user dashboards and the auth flow.",
    },
    result: {
      uz: "O'qituvchi va o'quvchi uchun alohida panel, SSR bilan tez sahifalar.",
      ru: "Отдельные панели для преподавателя и студента, быстрые страницы с SSR.",
      en: "Separate teacher and student dashboards with fast SSR pages.",
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
    },
    role: {
      uz: "Yakka dasturchi — API integratsiyasi, UI va deploy.",
      ru: "Единственный разработчик — интеграция API, UI и деплой.",
      en: "Solo developer — API integration, UI and deployment.",
    },
    result: {
      uz: "Real vaqt ob-havo ma'lumotlari, geolokatsiya va toza responsive UI.",
      ru: "Погода в реальном времени, геолокация и аккуратный адаптивный UI.",
      en: "Real-time weather data, geolocation and a clean responsive UI.",
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
    },
    role: {
      uz: "Yakka dasturchi — g'oya, mexanika va interfeys.",
      ru: "Единственный разработчик — идея, механики и интерфейс.",
      en: "Solo developer — concept, mechanics and interface.",
    },
    result: {
      uz: "XP, darajalar va vazifalar tizimi bilan kundalik odatlarni kuzatish.",
      ru: "Отслеживание привычек через систему XP, уровней и заданий.",
      en: "Habit tracking through an XP, levels and quests system.",
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
