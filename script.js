const STORAGE_KEY = "salary-tracker";

const INCOME_COLORS = ["#5eaf78", "#5eead4", "#8fd18c", "#d6b25e", "#7dd3fc", "#c4b5fd"];
const EXPENSE_COLORS = ["#e07a5f", "#f4a261", "#e9c46a", "#e76f51", "#c77dff", "#fb7185", "#94a3b8"];
const DEFAULT_CATEGORIES = [
  { id: "inc-salary", name: "Зарплата", type: "income", color: "#5eaf78" },
  { id: "inc-freelance", name: "Фриланс", type: "income", color: "#5eead4" },
  { id: "inc-other", name: "Другое", type: "income", color: "#d6b25e" },
  { id: "exp-food", name: "Еда", type: "expense", color: "#e07a5f" },
  { id: "exp-transport", name: "Транспорт", type: "expense", color: "#f4a261" },
  { id: "exp-home", name: "Жильё", type: "expense", color: "#e9c46a" },
  { id: "exp-health", name: "Здоровье", type: "expense", color: "#e76f51" },
  { id: "exp-fun", name: "Развлечения", type: "expense", color: "#c77dff" },
  { id: "exp-other", name: "Другое", type: "expense", color: "#fb7185" }
];

const CATEGORY_KEYS = {
  "inc-salary": "catSalary",
  "inc-freelance": "catFreelance",
  "inc-other": "catOther",
  "exp-food": "catFood",
  "exp-transport": "catTransport",
  "exp-home": "catHome",
  "exp-health": "catHealth",
  "exp-fun": "catFun",
  "exp-other": "catOther"
};

const I18N = {
  ru: {
    pageTitle: "Трекер доходов и расходов",
    eyebrow: "Личные финансы",
    appName: "Трекер",
    navLabel: "Разделы",
    dashboard: "Дашборд",
    transactions: "Операции",
    categories: "Категории",
    settings: "Настройки",
    period: "Период",
    thisMonth: "Этот месяц",
    thisYear: "Этот год",
    allTime: "Всё время",
    add: "Добавить",
    balance: "Баланс",
    income: "Доходы",
    expenses: "Расходы",
    chartBoth: "Доходы и расходы",
    donutTitle: "Расходы по категориям",
    type: "Тип",
    all: "Все",
    category: "Категория",
    allCategories: "Все категории",
    searchNote: "Поиск по заметке",
    searchPh: "Например, аванс",
    catIntro: "Доходы и расходы группируются по категориям.",
    newCat: "Новая категория",
    renameCat: "Переименовать категорию",
    name: "Название",
    catPh: "Например, Кафе",
    incomeOne: "Доход",
    expenseOne: "Расход",
    incomeTag: "доход",
    expenseTag: "расход",
    typeLocked: "Тип уже созданной категории нельзя изменить.",
    cancel: "Отмена",
    save: "Сохранить",
    language: "Язык",
    settingsLead: "Валюта по умолчанию — сум.",
    currencyLabel: "Обозначение валюты",
    currencyHint: "Суммы хранятся как числа. Смена валюты меняет только подпись, без пересчёта.",
    example: "Пример: {value}",
    newTx: "Новая операция",
    editTx: "Изменить операцию",
    txType: "Тип операции",
    amount: "Сумма",
    date: "Дата",
    note: "Заметка",
    notePh: "Необязательно",
    deletion: "Удаление",
    delete: "Удалить",
    edit: "Изменить",
    rename: "Переименовать",
    footer: "Данные хранятся локально в этом браузере.",
    barAria: "Столбчатый график. Доходы {income}, расходы {expense}.",
    donutAria: "Расходы по категориям, всего {total}.",
    donutEmptyAria: "Расходов за выбранный период нет.",
    noDataPeriod: "Нет данных за выбранный период",
    noExpenses: "Нет расходов",
    noExpensesPeriod: "Нет расходов за выбранный период",
    noCategories: "Нет категорий",
    incomeTip: "{label}: доход {amount}",
    expenseTip: "{label}: расход {amount}",
    uncategorized: "Без категории",
    noTxYet: "Пока нет операций",
    nothingFound: "Ничего не найдено.",
    emptyTxHint: "Пока нет операций. Добавьте первый доход или расход.",
    emptyCats: "Категорий пока нет.",
    errAmountEmpty: "Введите сумму.",
    errAmountFormat: "Введите сумму больше нуля, не больше двух знаков после запятой.",
    errAmountZero: "Введите сумму больше нуля.",
    errAmountBig: "Слишком большая сумма.",
    errCategory: "Выберите категорию.",
    errDate: "Укажите дату.",
    errName: "Введите название.",
    errDuplicate: "Такая категория уже есть.",
    errCurrency: "Укажите обозначение валюты.",
    toastSaveFail: "Не удалось сохранить данные в браузере",
    toastTxUpdated: "Операция обновлена",
    toastTxAdded: "Операция добавлена",
    toastTxDeleted: "Операция удалена",
    confirmDeleteTx: "Удалить эту операцию? Восстановить её будет нельзя.",
    cantDeleteCat: "Нельзя удалить категорию «{name}»: по ней есть операции.",
    confirmDeleteCat: "Удалить категорию «{name}»?",
    toastCatUpdated: "Категория обновлена",
    toastCatAdded: "Категория добавлена",
    toastCatDeleted: "Категория удалена",
    toastCurrency: "Валюта сохранена",
    yearCaption: "{year} год",
    billion: "млрд",
    million: "млн",
    thousand: "тыс",
    catSalary: "Зарплата",
    catFreelance: "Фриланс",
    catOther: "Другое",
    catFood: "Еда",
    catTransport: "Транспорт",
    catHome: "Жильё",
    catHealth: "Здоровье",
    catFun: "Развлечения"
  },
  uz: {
    pageTitle: "Daromad va xarajatlar kuzatuvi",
    eyebrow: "Shaxsiy moliya",
    appName: "Treker",
    navLabel: "Boʻlimlar",
    dashboard: "Panel",
    transactions: "Amaliyotlar",
    categories: "Toifalar",
    settings: "Sozlamalar",
    period: "Davr",
    thisMonth: "Shu oy",
    thisYear: "Shu yil",
    allTime: "Butun vaqt",
    add: "Qoʻshish",
    balance: "Balans",
    income: "Daromadlar",
    expenses: "Xarajatlar",
    chartBoth: "Daromad va xarajatlar",
    donutTitle: "Xarajatlar toifalar boʻyicha",
    type: "Turi",
    all: "Barchasi",
    category: "Toifa",
    allCategories: "Barcha toifalar",
    searchNote: "Izoh boʻyicha qidirish",
    searchPh: "Masalan, avans",
    catIntro: "Daromad va xarajatlar toifalar boʻyicha guruhlanadi.",
    newCat: "Yangi toifa",
    renameCat: "Toifani qayta nomlash",
    name: "Nomi",
    catPh: "Masalan, Kafe",
    incomeOne: "Daromad",
    expenseOne: "Xarajat",
    incomeTag: "daromad",
    expenseTag: "xarajat",
    typeLocked: "Yaratilgan toifa turini oʻzgartirib boʻlmaydi.",
    cancel: "Bekor qilish",
    save: "Saqlash",
    language: "Til",
    settingsLead: "Standart valyuta — soʻm.",
    currencyLabel: "Valyuta belgisi",
    currencyHint: "Summalar son sifatida saqlanadi. Valyutani almashtirish faqat yozuvni oʻzgartiradi, qayta hisoblamaydi.",
    example: "Namuna: {value}",
    newTx: "Yangi amaliyot",
    editTx: "Amaliyotni tahrirlash",
    txType: "Amaliyot turi",
    amount: "Summa",
    date: "Sana",
    note: "Izoh",
    notePh: "Ixtiyoriy",
    deletion: "Oʻchirish",
    delete: "Oʻchirish",
    edit: "Tahrirlash",
    rename: "Qayta nomlash",
    footer: "Maʼlumotlar shu brauzerda saqlanadi.",
    barAria: "Ustunli grafik. Daromadlar {income}, xarajatlar {expense}.",
    donutAria: "Xarajatlar toifalar boʻyicha, jami {total}.",
    donutEmptyAria: "Tanlangan davrda xarajat yoʻq.",
    noDataPeriod: "Tanlangan davrda maʼlumot yoʻq",
    noExpenses: "Xarajat yoʻq",
    noExpensesPeriod: "Tanlangan davrda xarajat yoʻq",
    noCategories: "Toifalar yoʻq",
    incomeTip: "{label}: daromad {amount}",
    expenseTip: "{label}: xarajat {amount}",
    uncategorized: "Toifasiz",
    noTxYet: "Hali amaliyot yoʻq",
    nothingFound: "Hech narsa topilmadi.",
    emptyTxHint: "Hali amaliyot yoʻq. Birinchi daromad yoki xarajatni qoʻshing.",
    emptyCats: "Hali toifalar yoʻq.",
    errAmountEmpty: "Summani kiriting.",
    errAmountFormat: "Noldan katta summani kiriting, verguldan keyin ikki belgigacha.",
    errAmountZero: "Noldan katta summani kiriting.",
    errAmountBig: "Summa juda katta.",
    errCategory: "Toifani tanlang.",
    errDate: "Sanani kiriting.",
    errName: "Nomini kiriting.",
    errDuplicate: "Bunday toifa allaqachon bor.",
    errCurrency: "Valyuta belgisini kiriting.",
    toastSaveFail: "Maʼlumotlarni brauzerga saqlab boʻlmadi",
    toastTxUpdated: "Amaliyot yangilandi",
    toastTxAdded: "Amaliyot qoʻshildi",
    toastTxDeleted: "Amaliyot oʻchirildi",
    confirmDeleteTx: "Bu amaliyot oʻchirilsinmi? Uni qaytarib boʻlmaydi.",
    cantDeleteCat: "«{name}» toifasini oʻchirib boʻlmaydi: unda amaliyotlar bor.",
    confirmDeleteCat: "«{name}» toifasi oʻchirilsinmi?",
    toastCatUpdated: "Toifa yangilandi",
    toastCatAdded: "Toifa qoʻshildi",
    toastCatDeleted: "Toifa oʻchirildi",
    toastCurrency: "Valyuta saqlandi",
    yearCaption: "{year}-yil",
    billion: "mlrd",
    million: "mln",
    thousand: "ming",
    catSalary: "Maosh",
    catFreelance: "Frilanser",
    catOther: "Boshqa",
    catFood: "Ovqat",
    catTransport: "Transport",
    catHome: "Uy-joy",
    catHealth: "Sogʻliq",
    catFun: "Koʻngilochar"
  },
  de: {
    pageTitle: "Einnahmen- und Ausgaben-Tracker",
    eyebrow: "Persönliche Finanzen",
    appName: "Tracker",
    navLabel: "Bereiche",
    dashboard: "Dashboard",
    transactions: "Vorgänge",
    categories: "Kategorien",
    settings: "Einstellungen",
    period: "Zeitraum",
    thisMonth: "Dieser Monat",
    thisYear: "Dieses Jahr",
    allTime: "Gesamte Zeit",
    add: "Hinzufügen",
    balance: "Saldo",
    income: "Einnahmen",
    expenses: "Ausgaben",
    chartBoth: "Einnahmen und Ausgaben",
    donutTitle: "Ausgaben nach Kategorie",
    type: "Typ",
    all: "Alle",
    category: "Kategorie",
    allCategories: "Alle Kategorien",
    searchNote: "Suche in der Notiz",
    searchPh: "Zum Beispiel Vorschuss",
    catIntro: "Einnahmen und Ausgaben werden nach Kategorien gruppiert.",
    newCat: "Neue Kategorie",
    renameCat: "Kategorie umbenennen",
    name: "Name",
    catPh: "Zum Beispiel Café",
    incomeOne: "Einnahme",
    expenseOne: "Ausgabe",
    incomeTag: "Einnahme",
    expenseTag: "Ausgabe",
    typeLocked: "Der Typ einer bestehenden Kategorie lässt sich nicht ändern.",
    cancel: "Abbrechen",
    save: "Speichern",
    language: "Sprache",
    settingsLead: "Standardwährung ist Sum.",
    currencyLabel: "Währungszeichen",
    currencyHint: "Beträge werden als Zahlen gespeichert. Ein Währungswechsel ändert nur die Bezeichnung, ohne Umrechnung.",
    example: "Beispiel: {value}",
    newTx: "Neuer Vorgang",
    editTx: "Vorgang ändern",
    txType: "Vorgangsart",
    amount: "Betrag",
    date: "Datum",
    note: "Notiz",
    notePh: "Optional",
    deletion: "Löschen",
    delete: "Löschen",
    edit: "Ändern",
    rename: "Umbenennen",
    footer: "Die Daten bleiben lokal in diesem Browser.",
    barAria: "Säulendiagramm. Einnahmen {income}, Ausgaben {expense}.",
    donutAria: "Ausgaben nach Kategorie, insgesamt {total}.",
    donutEmptyAria: "Keine Ausgaben im gewählten Zeitraum.",
    noDataPeriod: "Keine Daten im gewählten Zeitraum",
    noExpenses: "Keine Ausgaben",
    noExpensesPeriod: "Keine Ausgaben im gewählten Zeitraum",
    noCategories: "Keine Kategorien",
    incomeTip: "{label}: Einnahme {amount}",
    expenseTip: "{label}: Ausgabe {amount}",
    uncategorized: "Ohne Kategorie",
    noTxYet: "Noch keine Vorgänge",
    nothingFound: "Nichts gefunden.",
    emptyTxHint: "Noch keine Vorgänge. Fügen Sie die erste Einnahme oder Ausgabe hinzu.",
    emptyCats: "Noch keine Kategorien.",
    errAmountEmpty: "Geben Sie einen Betrag ein.",
    errAmountFormat: "Geben Sie einen Betrag größer als null ein, höchstens zwei Nachkommastellen.",
    errAmountZero: "Geben Sie einen Betrag größer als null ein.",
    errAmountBig: "Der Betrag ist zu groß.",
    errCategory: "Wählen Sie eine Kategorie.",
    errDate: "Geben Sie ein Datum an.",
    errName: "Geben Sie einen Namen ein.",
    errDuplicate: "Diese Kategorie gibt es schon.",
    errCurrency: "Geben Sie ein Währungszeichen ein.",
    toastSaveFail: "Die Daten konnten im Browser nicht gespeichert werden",
    toastTxUpdated: "Vorgang aktualisiert",
    toastTxAdded: "Vorgang hinzugefügt",
    toastTxDeleted: "Vorgang gelöscht",
    confirmDeleteTx: "Diesen Vorgang löschen? Er kann nicht wiederhergestellt werden.",
    cantDeleteCat: "Kategorie „{name}“ kann nicht gelöscht werden: es gibt dazu Vorgänge.",
    confirmDeleteCat: "Kategorie „{name}“ löschen?",
    toastCatUpdated: "Kategorie aktualisiert",
    toastCatAdded: "Kategorie hinzugefügt",
    toastCatDeleted: "Kategorie gelöscht",
    toastCurrency: "Währung gespeichert",
    yearCaption: "Jahr {year}",
    billion: "Mrd.",
    million: "Mio.",
    thousand: "Tsd.",
    catSalary: "Gehalt",
    catFreelance: "Freiberuf",
    catOther: "Sonstiges",
    catFood: "Essen",
    catTransport: "Transport",
    catHome: "Wohnen",
    catHealth: "Gesundheit",
    catFun: "Freizeit"
  }
};

const $ = (id) => document.getElementById(id);

function lang() {
  return I18N[state?.settings?.language] ? state.settings.language : "ru";
}

function t(key, vars) {
  const pack = I18N[lang()] || I18N.ru;
  let text = pack[key] || I18N.ru[key] || key;
  if (vars) {
    Object.entries(vars).forEach(([name, value]) => {
      text = text.replaceAll(`{${name}}`, value);
    });
  }
  return text;
}

function localeTag() {
  return { ru: "ru-RU", uz: "uz-UZ", de: "de-DE" }[lang()];
}

function categoryLabel(category) {
  if (!category) return t("uncategorized");
  const key = CATEGORY_KEYS[category.id];
  if (!key) return category.name;
  const known = ["ru", "uz", "de"].map((code) => I18N[code][key]);
  return known.includes(category.name) ? t(key) : category.name;
}

const UZ_MONTHS = ["yanvar", "fevral", "mart", "aprel", "may", "iyun", "iyul", "avgust", "sentabr", "oktabr", "noyabr", "dekabr"];
const UZ_MONTHS_SHORT = ["yan", "fev", "mar", "apr", "may", "iyn", "iyl", "avg", "sen", "okt", "noy", "dek"];

function monthLabel(index, style) {
  if (lang() === "uz") {
    const name = (style === "short" ? UZ_MONTHS_SHORT : UZ_MONTHS)[index] || "";
    return name.charAt(0).toUpperCase() + name.slice(1);
  }
  const raw = new Intl.DateTimeFormat(localeTag(), { month: style }).format(new Date(2020, index, 1));
  return raw.replace(/\.$/, "");
}

function refreshChrome() {
  document.documentElement.lang = { ru: "ru", uz: "uz", de: "de" }[lang()];
  document.title = t("pageTitle");
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = t(el.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    el.placeholder = t(el.dataset.i18nPlaceholder);
  });
  document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
    el.setAttribute("aria-label", t(el.dataset.i18nAria));
  });
  const langSelect = $("language-select");
  if (langSelect && document.activeElement !== langSelect) langSelect.value = lang();
  $("tx-form-title").textContent = t(editingTxId ? "editTx" : "newTx");
  $("tx-submit").textContent = t(editingTxId ? "save" : "add");
  $("cat-form-title").textContent = t(editingCategoryId ? "renameCat" : "newCat");
  $("cat-submit").textContent = t(editingCategoryId ? "save" : "add");
}

let state = loadState();
let currentView = "dashboard";
let currentPeriod = "month";
let editingTxId = null;
let editingCategoryId = null;
let barHits = [];
let donutHits = [];
let toastTimer = 0;
let chartFrame = 0;

function uid() {
  if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
  return `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function freshState() {
  return {
    settings: { currency: "сум", language: "ru" },
    categories: DEFAULT_CATEGORIES.map((category) => ({ ...category })),
    transactions: []
  };
}

function isHexColor(value) {
  return typeof value === "string" && /^#[0-9a-fA-F]{6}$/.test(value);
}

function isValidISODate(iso) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return false;
  const [year, month, day] = iso.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
}

function loadState() {
  const base = freshState();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return base;
    const data = JSON.parse(raw);
    const currency = typeof data?.settings?.currency === "string"
      ? data.settings.currency.replace(/[\u0000-\u001F]/g, "").trim().slice(0, 12)
      : "";
    if (currency) base.settings.currency = currency;
    if (data?.settings?.language === "ru" || data?.settings?.language === "uz" || data?.settings?.language === "de") {
      base.settings.language = data.settings.language;
    }

    if (Array.isArray(data?.categories)) {
      const categories = [];
      const seen = new Set();
      data.categories.forEach((category) => {
        const name = typeof category?.name === "string" ? category.name.trim().slice(0, 32) : "";
        const type = category?.type === "income" || category?.type === "expense" ? category.type : "";
        const id = category?.id != null ? String(category.id) : "";
        if (!name || !type || !id || seen.has(id)) return;
        seen.add(id);
        categories.push({
          id,
          name,
          type,
          color: isHexColor(category.color) ? category.color : nextColor(type, categories)
        });
      });
      if (categories.length) base.categories = categories;
    }

    if (Array.isArray(data?.transactions)) {
      const seen = new Set();
      base.transactions = data.transactions.filter((tx) => {
        const id = tx?.id != null ? String(tx.id) : "";
        const type = tx?.type === "income" || tx?.type === "expense" ? tx.type : "";
        const amount = Number(tx?.amount);
        if (!id || seen.has(id) || !type || !Number.isFinite(amount) || amount <= 0 || !isValidISODate(tx?.date)) return false;
        seen.add(id);
        return true;
      }).map((tx) => ({
        id: String(tx.id),
        type: tx.type,
        amount: Math.round(Number(tx.amount) * 100) / 100,
        categoryId: tx.categoryId != null ? String(tx.categoryId) : "",
        date: tx.date,
        note: typeof tx.note === "string" ? tx.note.slice(0, 140) : "",
        createdAt: typeof tx.createdAt === "string" ? tx.createdAt : tx.date
      }));
    }
  } catch {
    return freshState();
  }
  return base;
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    toast(t("toastSaveFail"));
  }
}

function nextColor(type, categories = state.categories) {
  const palette = type === "income" ? INCOME_COLORS : EXPENSE_COLORS;
  const used = categories.filter((category) => category.type === type).map((category) => category.color);
  return palette.find((color) => !used.includes(color)) || palette[used.length % palette.length];
}

function formatMoney(amount, currency = state.settings.currency) {
  const abs = Math.abs(Number(amount) || 0);
  const cents = Math.round(abs * 100) % 100;
  const formatted = new Intl.NumberFormat("ru-RU", {
    minimumFractionDigits: cents ? 2 : 0,
    maximumFractionDigits: 2
  }).format(abs).replace(/\u00a0|\u202f/g, " ");
  return `${formatted} ${currency}`;
}

function signedMoney(amount, type) {
  const sign = type === "income" ? "+" : "−";
  return `${sign}${formatMoney(amount)}`;
}

function compactNumber(value) {
  const abs = Math.abs(value);
  const trim = (number) => {
    const rounded = Math.abs(number) >= 10 ? Math.round(number) : Math.round(number * 10) / 10;
    return String(rounded).replace(".", ",");
  };
  if (abs >= 1000000000) return `${trim(abs / 1000000000)} ${t("billion")}`;
  if (abs >= 1000000) return `${trim(abs / 1000000)} ${t("million")}`;
  if (abs >= 1000) return `${trim(abs / 1000)} ${t("thousand")}`;
  return trim(abs);
}

function todayISO() {
  const date = new Date();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

function formatDate(iso) {
  const [year, month, day] = iso.split("-").map(Number);
  if (lang() === "uz") return `${day} ${monthLabel(month - 1, "short")} ${year}`;
  return new Intl.DateTimeFormat(localeTag(), {
    day: "numeric",
    month: "short",
    year: "numeric"
  }).format(new Date(year, month - 1, day));
}

function parseAmount(value) {
  const raw = String(value).trim();
  if (!raw) return { error: "errAmountEmpty" };
  const normalized = raw.replace(/[\s\u00a0\u202f]/g, "").replace(",", ".");
  if (!/^\d+(\.\d{0,2})?$/.test(normalized)) {
    return { error: "errAmountFormat" };
  }
  const num = Math.round(Number(normalized) * 100) / 100;
  if (!Number.isFinite(num) || num <= 0) return { error: "errAmountZero" };
  if (num > 1000000000000) return { error: "errAmountBig" };
  return { value: num };
}

function periodBounds(period) {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  if (period === "month") {
    const last = new Date(year, now.getMonth() + 1, 0).getDate();
    return { from: `${year}-${month}-01`, to: `${year}-${month}-${String(last).padStart(2, "0")}` };
  }
  if (period === "year") return { from: `${year}-01-01`, to: `${year}-12-31` };
  return { from: null, to: null };
}

function inPeriod(date, bounds) {
  if (!bounds.from) return true;
  return date >= bounds.from && date <= bounds.to;
}

function periodTransactions() {
  const bounds = periodBounds(currentPeriod);
  return state.transactions.filter((tx) => inPeriod(tx.date, bounds));
}

function totalsOf(list) {
  return list.reduce((acc, tx) => {
    acc[tx.type] = Math.round((acc[tx.type] + tx.amount) * 100) / 100;
    return acc;
  }, { income: 0, expense: 0 });
}

function periodCaption() {
  const now = new Date();
  if (currentPeriod === "month") {
    if (lang() === "uz") return `${monthLabel(now.getMonth(), "long")} ${now.getFullYear()}`;
    const name = new Intl.DateTimeFormat(localeTag(), { month: "long", year: "numeric" }).format(now);
    return name.charAt(0).toUpperCase() + name.slice(1);
  }
  if (currentPeriod === "year") return t("yearCaption", { year: now.getFullYear() });
  return t("allTime");
}

function txCountLabel(total) {
  if (!total) return t("noTxYet");
  if (lang() === "de") return total === 1 ? "1 Vorgang" : `${total} Vorgänge`;
  if (lang() === "uz") return `${total} ta amaliyot`;
  return `${total} ${plural(total, "операция", "операции", "операций")}`;
}

function plural(count, one, few, many) {
  const n10 = count % 10;
  const n100 = count % 100;
  if (n10 === 1 && n100 !== 11) return one;
  if (n10 >= 2 && n10 <= 4 && (n100 < 12 || n100 > 14)) return few;
  return many;
}

function categoryById(id) {
  return state.categories.find((category) => category.id === id) || null;
}

function themeColors() {
  const style = getComputedStyle(document.documentElement);
  const pick = (name) => style.getPropertyValue(name).trim();
  return {
    text: pick("--text"),
    muted: pick("--muted"),
    line: pick("--line"),
    income: pick("--income-bar"),
    expense: pick("--expense-bar")
  };
}

function setupCanvas(canvas) {
  const rect = canvas.getBoundingClientRect();
  if (rect.width < 2 || rect.height < 2) return null;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.round(rect.width * dpr);
  canvas.height = Math.round(rect.height * dpr);
  const ctx = canvas.getContext("2d");
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, rect.width, rect.height);
  return { ctx, w: rect.width, h: rect.height };
}

function roundTopRect(ctx, x, y, w, h, r) {
  const radius = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x, y + h);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.lineTo(x + w - radius, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
  ctx.lineTo(x + w, y + h);
  ctx.closePath();
}

function eachMonth(fromIso, toIso) {
  let year = Number(fromIso.slice(0, 4));
  let month = Number(fromIso.slice(5, 7));
  const endYear = Number(toIso.slice(0, 4));
  const endMonth = Number(toIso.slice(5, 7));
  const months = [];
  while (year < endYear || (year === endYear && month <= endMonth)) {
    months.push({ year, month });
    month += 1;
    if (month > 12) {
      month = 1;
      year += 1;
    }
  }
  return months;
}

function sumInto(bucket, tx) {
  if (tx.type === "income") bucket.income = Math.round((bucket.income + tx.amount) * 100) / 100;
  else bucket.expense = Math.round((bucket.expense + tx.amount) * 100) / 100;
}

function buildBuckets() {
  const txs = periodTransactions();
  const now = new Date();

  if (currentPeriod === "month") {
    const year = now.getFullYear();
    const month = now.getMonth();
    const days = new Date(year, month + 1, 0).getDate();
    const buckets = [];
    for (let day = 1; day <= days; day += 1) {
      const key = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      buckets.push({ key, label: formatDate(key), shortLabel: String(day), income: 0, expense: 0 });
    }
    txs.forEach((tx) => {
      const bucket = buckets.find((item) => item.key === tx.date);
      if (bucket) sumInto(bucket, tx);
    });
    return buckets;
  }

  if (currentPeriod === "year") {
    const year = now.getFullYear();
    const buckets = Array.from({ length: 12 }, (_, index) => ({
      key: `${year}-${String(index + 1).padStart(2, "0")}`,
      label: `${monthLabel(index, "long")} ${year}`,
      shortLabel: monthLabel(index, "short"),
      income: 0,
      expense: 0
    }));
    txs.forEach((tx) => {
      const bucket = buckets.find((item) => item.key === tx.date.slice(0, 7));
      if (bucket) sumInto(bucket, tx);
    });
    return buckets;
  }

  if (!txs.length) return [];
  const dates = txs.map((tx) => tx.date).sort();
  const span = eachMonth(dates[0], dates[dates.length - 1]);
  if (span.length > 24) {
    const fromYear = span[0].year;
    const toYear = span[span.length - 1].year;
    const buckets = [];
    for (let year = fromYear; year <= toYear; year += 1) {
      buckets.push({ key: String(year), label: String(year), shortLabel: String(year), income: 0, expense: 0 });
    }
    txs.forEach((tx) => {
      const bucket = buckets.find((item) => item.key === tx.date.slice(0, 4));
      if (bucket) sumInto(bucket, tx);
    });
    return buckets;
  }

  const sameYear = span[0].year === span[span.length - 1].year;
  const buckets = span.map(({ year, month }) => ({
    key: `${year}-${String(month).padStart(2, "0")}`,
    label: `${monthLabel(month - 1, "long")} ${year}`,
    shortLabel: sameYear ? monthLabel(month - 1, "short") : `${monthLabel(month - 1, "short")} ${String(year).slice(2)}`,
    income: 0,
    expense: 0
  }));
  txs.forEach((tx) => {
    const bucket = buckets.find((item) => item.key === tx.date.slice(0, 7));
    if (bucket) sumInto(bucket, tx);
  });
  return buckets;
}

function drawBarChart() {
  const canvas = $("bar-canvas");
  const setup = setupCanvas(canvas);
  barHits = [];
  if (!setup) return;
  const { ctx, w, h } = setup;
  const colors = themeColors();
  const buckets = buildBuckets();
  const totals = totalsOf(periodTransactions());
  canvas.setAttribute("aria-label", t("barAria", { income: formatMoney(totals.income), expense: formatMoney(totals.expense) }));

  if (!buckets.length) {
    ctx.fillStyle = colors.muted;
    ctx.font = "14px Segoe UI, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(t("noDataPeriod"), w / 2, h / 2);
    return;
  }

  const narrow = w < 520;
  const pad = { top: 12, right: 8, bottom: narrow ? 24 : 28, left: narrow ? 52 : 72 };
  const plotW = w - pad.left - pad.right;
  const plotH = h - pad.top - pad.bottom;
  if (plotW <= 0 || plotH <= 0) return;

  const maxVal = buckets.reduce((max, bucket) => Math.max(max, bucket.income, bucket.expense), 0);
  ctx.font = `${narrow ? 10 : 12}px Segoe UI, sans-serif`;
  ctx.textBaseline = "middle";
  ctx.lineWidth = 1;

  if (maxVal === 0) {
    const base = pad.top + plotH;
    ctx.strokeStyle = colors.line;
    ctx.beginPath();
    ctx.moveTo(pad.left, base);
    ctx.lineTo(w - pad.right, base);
    ctx.stroke();
    ctx.fillStyle = colors.muted;
    ctx.textAlign = "center";
    ctx.font = "14px Segoe UI, sans-serif";
    ctx.fillText(t("noDataPeriod"), pad.left + plotW / 2, pad.top + plotH / 2);
    return;
  }

  const padded = maxVal * 1.12;
  const pow = 10 ** Math.floor(Math.log10(padded));
  const step = padded / pow;
  const nice = step <= 1 ? 1 : step <= 2 ? 2 : step <= 5 ? 5 : 10;
  const yMax = nice * pow;

  ctx.textAlign = "right";
  ctx.fillStyle = colors.muted;
  ctx.strokeStyle = colors.line;
  for (let i = 0; i <= 4; i += 1) {
    const value = (yMax / 4) * i;
    const y = pad.top + plotH - (value / yMax) * plotH;
    ctx.beginPath();
    ctx.moveTo(pad.left, y);
    ctx.lineTo(w - pad.right, y);
    ctx.stroke();
    ctx.fillText(compactNumber(value), pad.left - 8, y);
  }

  const groupW = plotW / buckets.length;
  const gap = groupW > 18 ? 3 : 1;
  const barW = Math.max(1, Math.min(16, (groupW - gap - 2) / 2));
  const base = pad.top + plotH;
  let lastLabel = -Infinity;
  ctx.textAlign = "center";
  ctx.textBaseline = "top";

  buckets.forEach((bucket) => {
    const cx = pad.left + buckets.indexOf(bucket) * groupW + groupW / 2;
    const pair = barW * 2 + gap;
    const incomeX = cx - pair / 2;
    const expenseX = incomeX + barW + gap;
    const incomeH = (bucket.income / yMax) * plotH;
    const expenseH = (bucket.expense / yMax) * plotH;

    if (incomeH > 0) {
      ctx.fillStyle = colors.income;
      roundTopRect(ctx, incomeX, base - incomeH, barW, incomeH, 4);
      ctx.fill();
      barHits.push({
        x: incomeX,
        y: base - incomeH,
        w: barW,
        h: incomeH,
        text: t("incomeTip", { label: bucket.label, amount: formatMoney(bucket.income) })
      });
    }
    if (expenseH > 0) {
      ctx.fillStyle = colors.expense;
      roundTopRect(ctx, expenseX, base - expenseH, barW, expenseH, 4);
      ctx.fill();
      barHits.push({
        x: expenseX,
        y: base - expenseH,
        w: barW,
        h: expenseH,
        text: t("expenseTip", { label: bucket.label, amount: formatMoney(bucket.expense) })
      });
    }

    if (cx - lastLabel >= (narrow ? 26 : 32)) {
      ctx.fillStyle = colors.muted;
      ctx.font = `${narrow ? 10 : 12}px Segoe UI, sans-serif`;
      ctx.fillText(bucket.shortLabel, cx, base + 8);
      lastLabel = cx;
    }
  });
}

function expenseSlices() {
  const map = new Map();
  periodTransactions().filter((tx) => tx.type === "expense").forEach((tx) => {
    const category = categoryById(tx.categoryId);
    const key = category ? category.id : "missing";
    const current = map.get(key) || {
      name: category ? categoryLabel(category) : t("uncategorized"),
      color: category ? category.color : "#94a3b8",
      value: 0
    };
    current.value = Math.round((current.value + tx.amount) * 100) / 100;
    map.set(key, current);
  });
  return [...map.values()].sort((a, b) => b.value - a.value);
}

function formatPercent(part, total) {
  if (!total) return "0%";
  const rounded = Math.round((part / total) * 1000) / 10;
  return `${String(rounded).replace(".", ",")}%`;
}

function drawDonut() {
  const canvas = $("donut-canvas");
  const setup = setupCanvas(canvas);
  donutHits = [];
  if (!setup) return;
  const { ctx, w, h } = setup;
  const colors = themeColors();
  const slices = expenseSlices();
  const total = slices.reduce((sum, slice) => Math.round((sum + slice.value) * 100) / 100, 0);
  canvas.setAttribute("aria-label", total
    ? t("donutAria", { total: formatMoney(total) })
    : t("donutEmptyAria"));

  const cx = w / 2;
  const cy = h / 2;
  const radius = Math.min(w, h) * 0.34;
  const line = Math.max(18, Math.min(w, h) * 0.11);
  ctx.lineWidth = line;

  fillDonutLegend(slices, total);

  if (!total) {
    ctx.strokeStyle = colors.line;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = colors.muted;
    ctx.font = "13px Segoe UI, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(t("noExpenses"), cx, cy);
    return;
  }

  const gap = slices.length > 1 ? 0.03 : 0;
  let angle = -Math.PI / 2;
  slices.forEach((slice) => {
    const sweep = Math.max((slice.value / total) * Math.PI * 2 - gap, 0.01);
    const start = angle;
    const end = angle + sweep;
    ctx.strokeStyle = slice.color;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, start, end);
    ctx.stroke();
    donutHits.push({
      cx,
      cy,
      inner: radius - line / 2,
      outer: radius + line / 2,
      start,
      end,
      text: `${slice.name}: ${formatMoney(slice.value)} (${formatPercent(slice.value, total)})`
    });
    angle = end + gap;
  });

  ctx.fillStyle = colors.muted;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = "12px Segoe UI, sans-serif";
  ctx.fillText(t("expenses"), cx, cy - 12);
  const amount = formatMoney(total);
  let size = 16;
  ctx.font = `650 ${size}px Segoe UI, sans-serif`;
  while (ctx.measureText(amount).width > radius * 1.35 && size > 10) {
    size -= 1;
    ctx.font = `650 ${size}px Segoe UI, sans-serif`;
  }
  ctx.fillStyle = colors.text;
  ctx.fillText(amount, cx, cy + 10);
}

function fillDonutLegend(slices, total) {
  const legend = $("donut-legend");
  legend.replaceChildren();
  if (!total) {
    const item = document.createElement("li");
    item.className = "empty-line";
    item.textContent = t("noExpensesPeriod");
    legend.appendChild(item);
    return;
  }
  slices.forEach((slice) => {
    const item = document.createElement("li");
    const swatch = document.createElement("i");
    swatch.className = "swatch";
    swatch.style.background = slice.color;
    const name = document.createElement("span");
    name.textContent = slice.name;
    const money = document.createElement("span");
    money.className = "legend-money";
    money.textContent = `${formatMoney(slice.value)} · ${formatPercent(slice.value, total)}`;
    item.append(swatch, name, money);
    legend.appendChild(item);
  });
}

function drawCharts() {
  if (currentView !== "dashboard") return;
  hideTip();
  drawBarChart();
  drawDonut();
}

function scheduleCharts() {
  cancelAnimationFrame(chartFrame);
  chartFrame = requestAnimationFrame(drawCharts);
}

function hideTip() {
  $("chart-tip").hidden = true;
}

function showTip(event, text) {
  const tip = $("chart-tip");
  tip.textContent = text;
  tip.hidden = false;
  const margin = 12;
  const rect = tip.getBoundingClientRect();
  let left = event.clientX + 14;
  let top = event.clientY + 14;
  if (left + rect.width > window.innerWidth - margin) left = event.clientX - rect.width - 14;
  if (top + rect.height > window.innerHeight - margin) top = event.clientY - rect.height - 14;
  tip.style.left = `${Math.max(margin, left)}px`;
  tip.style.top = `${Math.max(margin, top)}px`;
}

function angleInSweep(angle, start, end) {
  const tau = Math.PI * 2;
  const norm = (value) => ((value % tau) + tau) % tau;
  const a = norm(angle);
  const s = norm(start);
  const e = norm(end);
  if (s <= e) return a >= s && a <= e;
  return a >= s || a <= e;
}

function bindChartHover(canvas, hitTest) {
  canvas.addEventListener("mousemove", (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const hit = hitTest(x, y);
    canvas.style.cursor = hit ? "pointer" : "default";
    if (hit) showTip(event, hit.text);
    else hideTip();
  });
  canvas.addEventListener("mouseleave", () => {
    canvas.style.cursor = "default";
    hideTip();
  });
}

function moveNavPill() {
  const nav = document.querySelector(".nav");
  const pill = document.querySelector(".nav-pill");
  const active = nav && nav.querySelector(".is-active");
  if (!nav || !pill || !active) return;
  const navRect = nav.getBoundingClientRect();
  const rect = active.getBoundingClientRect();
  const style = getComputedStyle(nav);
  const borderLeft = parseFloat(style.borderLeftWidth) || 0;
  const borderTop = parseFloat(style.borderTopWidth) || 0;
  if (!pill.classList.contains("is-ready")) pill.style.transition = "none";
  pill.style.width = `${rect.width}px`;
  pill.style.height = `${rect.height}px`;
  pill.style.transform = `translate(${rect.left - navRect.left - borderLeft}px, ${rect.top - navRect.top - borderTop}px)`;
  pill.classList.add("is-ready");
  if (pill.style.transition === "none") {
    requestAnimationFrame(() => {
      pill.style.transition = "";
    });
  }
}

function showView(name) {
  if (!name || name === currentView) {
    moveNavPill();
    return;
  }
  const prev = document.getElementById(`view-${currentView}`);
  const next = document.getElementById(`view-${name}`);
  document.querySelectorAll(".view.is-leaving").forEach((view) => {
    view.classList.remove("is-leaving");
    view.hidden = true;
  });
  currentView = name;
  document.querySelectorAll(".nav button").forEach((button) => {
    const active = button.dataset.view === name;
    button.classList.toggle("is-active", active);
    if (active) button.setAttribute("aria-current", "page");
    else button.removeAttribute("aria-current");
  });
  moveNavPill();
  hideTip();
  if (next) next.hidden = false;
  if (prev && prev !== next) {
    prev.classList.add("is-leaving");
    const hidePrev = () => {
      prev.classList.remove("is-leaving");
      if (prev.id !== `view-${currentView}`) prev.hidden = true;
    };
    prev.addEventListener("animationend", (event) => {
      if (event.target !== prev || event.animationName !== "view-out") return;
      hidePrev();
    }, { once: true });
    window.setTimeout(() => {
      if (prev.classList.contains("is-leaving")) hidePrev();
    }, 380);
  }
  if (name === "dashboard") scheduleCharts();
}

function closeDialog(dialog) {
  if (!dialog || !dialog.open || dialog.classList.contains("is-closing")) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) {
    dialog.close();
    return;
  }
  dialog.classList.add("is-closing");
  let done = false;
  const finish = () => {
    if (done) return;
    done = true;
    if (dialog.open) dialog.close();
    dialog.classList.remove("is-closing");
  };
  dialog.addEventListener("transitionend", (event) => {
    if (event.target === dialog && event.propertyName === "opacity") finish();
  }, { once: true });
  window.setTimeout(finish, 420);
}

function renderDashboard() {
  const totals = totalsOf(periodTransactions());
  const balance = Math.round((totals.income - totals.expense) * 100) / 100;
  $("period-caption").textContent = periodCaption();
  const balanceEl = $("stat-balance");
  const incomeEl = $("stat-income");
  const expenseEl = $("stat-expense");
  balanceEl.textContent = `${balance < 0 ? "−" : ""}${formatMoney(balance)}`;
  incomeEl.textContent = formatMoney(totals.income);
  expenseEl.textContent = formatMoney(totals.expense);
  balanceEl.classList.toggle("is-expense", balance < 0);
  balanceEl.classList.toggle("is-income", balance > 0);
  incomeEl.classList.add("is-income");
  expenseEl.classList.add("is-expense");
  const slices = expenseSlices();
  const total = slices.reduce((sum, slice) => Math.round((sum + slice.value) * 100) / 100, 0);
  fillDonutLegend(slices, total);
  scheduleCharts();
}

function selectedType() {
  return document.querySelector('input[name="tx-type"]:checked').value;
}

function fillCategorySelect(type, selectedId) {
  const select = $("tx-category");
  const list = state.categories.filter((category) => category.type === type);
  select.replaceChildren();
  if (!list.length) {
    const option = document.createElement("option");
    option.value = "";
    option.textContent = t("noCategories");
    select.appendChild(option);
    return;
  }
  list.forEach((category) => {
    const option = document.createElement("option");
    option.value = category.id;
    option.textContent = categoryLabel(category);
    select.appendChild(option);
  });
  if (selectedId && list.some((category) => category.id === selectedId)) select.value = selectedId;
}

function renderCategoryFilter() {
  const select = $("tx-category-filter");
  const current = select.value || "all";
  const type = $("tx-type-filter").value;
  select.replaceChildren();
  const all = document.createElement("option");
  all.value = "all";
  all.textContent = t("allCategories");
  select.appendChild(all);
  state.categories
    .filter((category) => type === "all" || category.type === type)
    .forEach((category) => {
      const option = document.createElement("option");
      option.value = category.id;
      const label = categoryLabel(category);
      option.textContent = type === "all"
        ? `${label} · ${t(category.type === "income" ? "incomeTag" : "expenseTag")}`
        : label;
      select.appendChild(option);
    });
  select.value = [...select.options].some((option) => option.value === current) ? current : "all";
}

function filteredTransactions() {
  const type = $("tx-type-filter").value;
  const categoryId = $("tx-category-filter").value;
  const query = $("tx-search").value.trim().toLowerCase();
  return state.transactions
    .filter((tx) => type === "all" || tx.type === type)
    .filter((tx) => categoryId === "all" || tx.categoryId === categoryId)
    .filter((tx) => !query || tx.note.toLowerCase().includes(query))
    .sort((a, b) => {
      if (a.date !== b.date) return a.date < b.date ? 1 : -1;
      return a.createdAt < b.createdAt ? 1 : -1;
    });
}

function renderTransactionList() {
  const list = $("tx-list");
  const rows = filteredTransactions();
  const total = state.transactions.length;
  $("tx-count").textContent = txCountLabel(total);
  list.replaceChildren();
  if (!rows.length) {
    const empty = document.createElement("p");
    empty.className = "empty";
    empty.textContent = total ? t("nothingFound") : t("emptyTxHint");
    list.appendChild(empty);
    return;
  }
  rows.forEach((tx) => {
    const category = categoryById(tx.categoryId);
    const row = document.createElement("article");
    row.className = "tx-row";
    if (tx.id === editingTxId) row.classList.add("is-editing");

    const date = document.createElement("p");
    date.className = "tx-date";
    date.textContent = formatDate(tx.date);

    const cat = document.createElement("div");
    cat.className = "tx-cat";
    const swatch = document.createElement("i");
    swatch.className = "swatch";
    swatch.style.background = category ? category.color : "#94a3b8";
    const name = document.createElement("span");
    name.textContent = category ? categoryLabel(category) : t("uncategorized");
    cat.append(swatch, name);

    const note = document.createElement("p");
    note.className = "tx-note";
    note.textContent = tx.note || "—";

    const amount = document.createElement("p");
    amount.className = `amount is-${tx.type}`;
    amount.textContent = signedMoney(tx.amount, tx.type);

    const actions = document.createElement("div");
    actions.className = "row-actions";
    const edit = document.createElement("button");
    edit.type = "button";
    edit.className = "btn small ghost";
    edit.textContent = t("edit");
    edit.dataset.action = "edit";
    edit.dataset.id = tx.id;
    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "btn small danger";
    remove.textContent = t("delete");
    remove.dataset.action = "delete";
    remove.dataset.id = tx.id;
    actions.append(edit, remove);
    row.append(date, cat, note, amount, actions);
    list.appendChild(row);
  });
}

function setFormError(id, message) {
  const el = $(id);
  el.textContent = message || "";
  el.hidden = !message;
}

function openTransaction(tx) {
  editingTxId = tx ? tx.id : null;
  $("tx-form-title").textContent = t(tx ? "editTx" : "newTx");
  $("tx-submit").textContent = t(tx ? "save" : "add");
  const type = tx ? tx.type : "income";
  document.querySelector(`input[name="tx-type"][value="${type}"]`).checked = true;
  $("tx-amount").value = tx ? String(tx.amount).replace(".", ",") : "";
  $("tx-date").value = tx ? tx.date : todayISO();
  $("tx-note").value = tx ? tx.note : "";
  fillCategorySelect(type, tx && tx.categoryId);
  setFormError("tx-error", "");
  const dialog = $("tx-dialog");
  if (!dialog.open) dialog.showModal();
  $("tx-amount").focus();
  renderTransactionList();
}

function saveTransaction(event) {
  event.preventDefault();
  const type = selectedType();
  const parsed = parseAmount($("tx-amount").value);
  if (parsed.error) {
    setFormError("tx-error", t(parsed.error));
    return;
  }
  const categoryId = $("tx-category").value;
  const category = categoryById(categoryId);
  if (!category || category.type !== type) {
    setFormError("tx-error", t("errCategory"));
    return;
  }
  const date = $("tx-date").value;
  if (!isValidISODate(date)) {
    setFormError("tx-error", t("errDate"));
    return;
  }
  const note = $("tx-note").value.trim().slice(0, 140);
  const wasEdit = Boolean(editingTxId);
  if (wasEdit) {
    const tx = state.transactions.find((item) => item.id === editingTxId);
    if (!tx) return;
    Object.assign(tx, { type, amount: parsed.value, categoryId, date, note });
  } else {
    state.transactions.push({
      id: uid(),
      type,
      amount: parsed.value,
      categoryId,
      date,
      note,
      createdAt: new Date().toISOString()
    });
  }
  editingTxId = null;
  saveState();
  closeDialog($("tx-dialog"));
  renderAll();
  toast(t(wasEdit ? "toastTxUpdated" : "toastTxAdded"));
}

async function deleteTransaction(id) {
  const tx = state.transactions.find((item) => item.id === id);
  if (!tx) return;
  const ok = await confirmAction(t("confirmDeleteTx"));
  if (!ok) return;
  state.transactions = state.transactions.filter((item) => item.id !== id);
  if (editingTxId === id) {
    editingTxId = null;
    if ($("tx-dialog").open) closeDialog($("tx-dialog"));
  }
  saveState();
  renderAll();
  toast(t("toastTxDeleted"));
}

function resetCategoryForm() {
  editingCategoryId = null;
  $("cat-type").disabled = false;
  $("cat-form").reset();
  $("cat-type").value = "expense";
  $("cat-form-title").textContent = t("newCat");
  $("cat-submit").textContent = t("add");
  $("cat-cancel").hidden = true;
  $("cat-hint").hidden = true;
  setFormError("cat-error", "");
}

function renderCategoryList() {
  const list = $("cat-list");
  list.replaceChildren();
  if (!state.categories.length) {
    const empty = document.createElement("p");
    empty.className = "empty";
    empty.textContent = t("emptyCats");
    list.appendChild(empty);
    return;
  }
  const ordered = [...state.categories].sort((a, b) => {
    if (a.type !== b.type) return a.type === "income" ? -1 : 1;
    return categoryLabel(a).localeCompare(categoryLabel(b), localeTag());
  });
  ordered.forEach((category) => {
    const row = document.createElement("article");
    row.className = "cat-row";
    if (category.id === editingCategoryId) row.classList.add("is-editing");

    const nameWrap = document.createElement("div");
    nameWrap.className = "cat-name";
    const swatch = document.createElement("i");
    swatch.className = "swatch";
    swatch.style.background = category.color;
    const name = document.createElement("strong");
    name.textContent = categoryLabel(category);
    nameWrap.append(swatch, name);

    const badge = document.createElement("span");
    badge.className = `badge ${category.type}`;
    badge.textContent = t(category.type === "income" ? "incomeOne" : "expenseOne");

    const actions = document.createElement("div");
    actions.className = "row-actions";
    const edit = document.createElement("button");
    edit.type = "button";
    edit.className = "btn small ghost";
    edit.textContent = t("rename");
    edit.dataset.action = "edit";
    edit.dataset.id = category.id;
    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "btn small danger";
    remove.textContent = t("delete");
    remove.dataset.action = "delete";
    remove.dataset.id = category.id;
    actions.append(edit, remove);
    row.append(nameWrap, badge, actions);
    list.appendChild(row);
  });
}

function editCategory(id) {
  const category = categoryById(id);
  if (!category) return;
  editingCategoryId = id;
  $("cat-name").value = categoryLabel(category);
  $("cat-type").value = category.type;
  $("cat-type").disabled = true;
  $("cat-form-title").textContent = t("renameCat");
  $("cat-submit").textContent = t("save");
  $("cat-cancel").hidden = false;
  $("cat-hint").hidden = false;
  setFormError("cat-error", "");
  renderCategoryList();
  $("cat-name").focus();
}

function saveCategory(event) {
  event.preventDefault();
  const name = $("cat-name").value.trim().slice(0, 32);
  if (!name) {
    setFormError("cat-error", t("errName"));
    return;
  }
  const existing = editingCategoryId ? categoryById(editingCategoryId) : null;
  if (editingCategoryId && !existing) return;
  const type = existing ? existing.type : $("cat-type").value;
  const duplicate = state.categories.some((category) => {
    if (category.id === editingCategoryId || category.type !== type) return false;
    const next = name.toLowerCase();
    return category.name.toLowerCase() === next || categoryLabel(category).toLowerCase() === next;
  });
  if (duplicate) {
    setFormError("cat-error", t("errDuplicate"));
    return;
  }
  let storedName = name;
  if (existing && CATEGORY_KEYS[existing.id] && name === t(CATEGORY_KEYS[existing.id])) storedName = existing.name;
  if (existing) existing.name = storedName;
  else state.categories.push({ id: uid(), name, type, color: nextColor(type) });
  const wasEdit = Boolean(existing);
  saveState();
  resetCategoryForm();
  renderAll();
  toast(t(wasEdit ? "toastCatUpdated" : "toastCatAdded"));
}

async function deleteCategory(id) {
  const category = categoryById(id);
  if (!category) return;
  if (state.transactions.some((tx) => tx.categoryId === id)) {
    toast(t("cantDeleteCat", { name: categoryLabel(category) }));
    return;
  }
  const ok = await confirmAction(t("confirmDeleteCat", { name: categoryLabel(category) }));
  if (!ok) return;
  state.categories = state.categories.filter((item) => item.id !== id);
  if (editingCategoryId === id) resetCategoryForm();
  saveState();
  renderAll();
  toast(t("toastCatDeleted"));
}

function updateCurrencyPreview() {
  const label = $("currency-input").value.trim() || state.settings.currency;
  $("currency-preview").textContent = t("example", { value: formatMoney(1250000, label) });
}

function renderSettings() {
  const input = $("currency-input");
  if (document.activeElement !== input) input.value = state.settings.currency;
  updateCurrencyPreview();
}

function saveSettings(event) {
  event.preventDefault();
  const currency = $("currency-input").value.replace(/[\u0000-\u001F]/g, "").trim().slice(0, 12);
  if (!currency) {
    setFormError("settings-status", t("errCurrency"));
    return;
  }
  setFormError("settings-status", "");
  state.settings.currency = currency;
  saveState();
  renderAll();
  toast(t("toastCurrency"));
}

function renderAll() {
  refreshChrome();
  renderDashboard();
  renderCategoryFilter();
  renderTransactionList();
  renderCategoryList();
  renderSettings();
  requestAnimationFrame(moveNavPill);
}

function toast(message) {
  const el = $("toast");
  el.textContent = message;
  el.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    el.hidden = true;
  }, 3200);
}

function confirmAction(message) {
  const dialog = $("confirm-dialog");
  $("confirm-text").textContent = message;
  if (!dialog.open) dialog.showModal();
  return new Promise((resolve) => {
    const ok = $("confirm-ok");
    const cancel = $("confirm-cancel");
    let settled = false;
    const finish = (value) => {
      if (settled) return;
      settled = true;
      ok.removeEventListener("click", onOk);
      cancel.removeEventListener("click", onCancel);
      dialog.removeEventListener("close", onClose);
      resolve(value);
    };
    const onOk = () => {
      finish(true);
      closeDialog(dialog);
    };
    const onCancel = () => {
      finish(false);
      closeDialog(dialog);
    };
    const onClose = () => finish(false);
    ok.addEventListener("click", onOk);
    cancel.addEventListener("click", onCancel);
    dialog.addEventListener("close", onClose);
  });
}

function bindEvents() {
  document.querySelectorAll(".nav button").forEach((button) => {
    button.addEventListener("click", () => showView(button.dataset.view));
  });

  $("period-select").addEventListener("change", () => {
    currentPeriod = $("period-select").value;
    renderDashboard();
  });

  $("dash-add").addEventListener("click", () => openTransaction(null));
  $("tx-add").addEventListener("click", () => openTransaction(null));
  $("tx-cancel").addEventListener("click", () => {
    editingTxId = null;
    closeDialog($("tx-dialog"));
    renderTransactionList();
  });
  $("tx-dialog").addEventListener("click", (event) => {
    if (event.target === $("tx-dialog")) {
      editingTxId = null;
      closeDialog($("tx-dialog"));
      renderTransactionList();
    }
  });
  document.querySelectorAll("dialog").forEach((dialog) => {
    dialog.addEventListener("cancel", (event) => {
      event.preventDefault();
      closeDialog(dialog);
    });
  });
  $("tx-dialog").addEventListener("close", () => {
    editingTxId = null;
    renderTransactionList();
  });
  $("tx-form").addEventListener("submit", saveTransaction);
  document.querySelectorAll('input[name="tx-type"]').forEach((input) => {
    input.addEventListener("change", () => fillCategorySelect(selectedType()));
  });

  $("tx-type-filter").addEventListener("change", () => {
    renderCategoryFilter();
    renderTransactionList();
  });
  $("tx-category-filter").addEventListener("change", renderTransactionList);
  $("tx-search").addEventListener("input", renderTransactionList);

  $("tx-list").addEventListener("click", (event) => {
    const button = event.target.closest("button[data-action]");
    if (!button) return;
    if (button.dataset.action === "edit") {
      openTransaction(state.transactions.find((tx) => tx.id === button.dataset.id));
    } else {
      deleteTransaction(button.dataset.id);
    }
  });

  $("cat-form").addEventListener("submit", saveCategory);
  $("cat-cancel").addEventListener("click", () => {
    resetCategoryForm();
    renderCategoryList();
  });
  $("cat-list").addEventListener("click", (event) => {
    const button = event.target.closest("button[data-action]");
    if (!button) return;
    if (button.dataset.action === "edit") editCategory(button.dataset.id);
    else deleteCategory(button.dataset.id);
  });

  $("settings-form").addEventListener("submit", saveSettings);
  $("language-select").addEventListener("change", () => {
    const value = $("language-select").value;
    if (value !== "ru" && value !== "uz" && value !== "de") return;
    state.settings.language = value;
    saveState();
    renderAll();
  });
  $("currency-input").addEventListener("input", () => {
    setFormError("settings-status", "");
    updateCurrencyPreview();
  });

  bindChartHover($("bar-canvas"), (x, y) => (
    barHits.find((hit) => x >= hit.x && x <= hit.x + hit.w && y >= hit.y && y <= hit.y + hit.h)
  ));
  bindChartHover($("donut-canvas"), (x, y) => (
    donutHits.find((item) => {
      const dx = x - item.cx;
      const dy = y - item.cy;
      const dist = Math.hypot(dx, dy);
      if (dist < item.inner || dist > item.outer) return false;
      if (item.end - item.start >= Math.PI * 2 - 0.05) return true;
      return angleInSweep(Math.atan2(dy, dx), item.start, item.end);
    })
  ));

  const chartGrid = document.querySelector(".chart-grid");
  if (window.ResizeObserver && chartGrid) {
    new ResizeObserver(() => {
      if (currentView === "dashboard") scheduleCharts();
    }).observe(chartGrid);
  } else {
    window.addEventListener("resize", scheduleCharts);
  }
  window.addEventListener("scroll", hideTip, true);
  window.addEventListener("resize", moveNavPill);
  if (window.ResizeObserver) new ResizeObserver(moveNavPill).observe(document.querySelector(".nav"));
}

function init() {
  bindEvents();
  renderAll();
  moveNavPill();
}

init();
