const STORAGE_KEY = "salary-tracker.transactions";

const CATEGORIES = {
  income: ["Зарплата", "Подработка", "Подарок", "Другое"],
  expense: ["Еда", "Транспорт", "Жильё", "Здоровье", "Развлечения", "Другое"],
};

const EXPENSE_COLORS = {
  Еда: "#c45c26",
  Транспорт: "#2f6f8f",
  "Жильё": "#1e3a4c",
  Здоровье: "#6b8f71",
  Развлечения: "#b08968",
  Другое: "#8a8175",
};

const EXPENSE_COLORS_NIGHT = {
  Еда: "#e08a52",
  Транспорт: "#6eb0cc",
  "Жильё": "#b7c9d8",
  Здоровье: "#8fbf96",
  Развлечения: "#d4b08a",
  Другое: "#b7aea3",
};

const THEME_KEY = "salary-tracker.theme";

const MONTHS_SHORT = ["янв", "фев", "мар", "апр", "май", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"];
const MONTHS_FULL = [
  "январь", "февраль", "март", "апрель", "май", "июнь",
  "июль", "август", "сентябрь", "октябрь", "ноябрь", "декабрь",
];

const CURRENCY_KEY = "salary-tracker.currency";
const UZS_PER_RUB = 142.33;
let activeCurrency = "RUB";

function currencyMark(code) {
  return code === "UZS" ? "сум" : "₽";
}

function formatMoney(amount, currency = activeCurrency) {
  const digits = currency === "UZS" ? 0 : 2;
  const formatted = new Intl.NumberFormat("ru-RU", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(amount);
  return `${formatted} ${currencyMark(currency)}`;
}

function toActive(amount, currency) {
  const from = currency === "UZS" ? "UZS" : "RUB";
  if (from === activeCurrency) return amount;
  return from === "RUB" ? amount * UZS_PER_RUB : amount / UZS_PER_RUB;
}

function amountInActive(item) {
  return toActive(item.amount, item.currency);
}

function syncAmountLabel() {
  const editing = idInput.value
    ? loadTransactions().find((item) => item.id === idInput.value)
    : null;
  const code = editing?.currency === "UZS" ? "UZS" : (editing ? "RUB" : activeCurrency);
  document.querySelector("#amount-label").textContent = `Сумма, ${currencyMark(code)}`;
}

function setCurrency(code, redraw) {
  activeCurrency = code === "UZS" ? "UZS" : "RUB";
  localStorage.setItem(CURRENCY_KEY, activeCurrency);
  document.querySelectorAll("[data-currency]").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.currency === activeCurrency));
  });
  syncAmountLabel();
  if (redraw) render();
}

const form = document.querySelector("#transaction-form");
const formTitle = document.querySelector("#form-title");
const formError = document.querySelector("#form-error");
const idInput = document.querySelector("#transaction-id");
const amountInput = document.querySelector("#amount");
const categorySelect = document.querySelector("#category");
const dateInput = document.querySelector("#date");
const noteInput = document.querySelector("#note");
const saveButton = document.querySelector("#save-button");
const cancelEdit = document.querySelector("#cancel-edit");
const rows = document.querySelector("#transaction-rows");
const emptyList = document.querySelector("#empty-list");
const listPanel = document.querySelector(".list");
const dashboardPeriod = document.querySelector("#dashboard-period");
const filterType = document.querySelector("#filter-type");
const filterMonth = document.querySelector("#filter-month");
const monthlyCanvas = document.querySelector("#monthly-chart");
const shareCanvas = document.querySelector("#share-pie");
const shareLegend = document.querySelector("#share-legend");
const categoryCanvas = document.querySelector("#category-chart");
const categoryLegend = document.querySelector("#category-legend");
const themeToggle = document.querySelector("#theme-toggle");

function cssVar(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

function expenseColor(name) {
  const palette = document.documentElement.dataset.theme === "night"
    ? EXPENSE_COLORS_NIGHT
    : EXPENSE_COLORS;
  return palette[name] || (document.documentElement.dataset.theme === "night" ? "#b7aea3" : "#8a8175");
}

function setTheme(theme, redraw) {
  const night = theme === "night";
  if (night) document.documentElement.dataset.theme = "night";
  else delete document.documentElement.dataset.theme;
  localStorage.setItem(THEME_KEY, night ? "night" : "day");
  themeToggle.setAttribute("aria-pressed", String(night));
  themeToggle.querySelector(".theme-label").textContent = night ? "Дневной режим" : "Ночной режим";
  if (redraw) render();
}

function loadTransactions() {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    if (!Array.isArray(raw)) return [];
    return raw.filter(isTransaction);
  } catch {
    return [];
  }
}

function saveTransactions(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

function isTransaction(item) {
  return item
    && (item.type === "income" || item.type === "expense")
    && typeof item.amount === "number"
    && item.amount > 0
    && typeof item.category === "string"
    && typeof item.date === "string";
}

function createTransaction(data) {
  const items = loadTransactions();
  items.push({
    id: crypto.randomUUID(),
    type: data.type,
    amount: data.amount,
    category: data.category,
    date: data.date,
    note: data.note,
    currency: activeCurrency,
  });
  saveTransactions(items);
}

function updateTransaction(id, data) {
  const items = loadTransactions().map((item) => (
    item.id === id ? { ...item, ...data, id } : item
  ));
  saveTransactions(items);
}

function deleteTransaction(id) {
  saveTransactions(loadTransactions().filter((item) => item.id !== id));
}

function monthKey(date) {
  return date.slice(0, 7);
}

function todayKey() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}

function monthTitle(key) {
  const [year, month] = key.split("-");
  const index = Number(month) - 1;
  return `${MONTHS_FULL[index]} ${year}`;
}

function monthShort(key) {
  const [year, month] = key.split("-");
  return `${MONTHS_SHORT[Number(month) - 1]} ${year.slice(2)}`;
}

function formatDate(iso) {
  const [year, month, day] = iso.split("-");
  return `${day}.${month}.${year}`;
}

function selectedType() {
  return form.querySelector('input[name="type"]:checked').value;
}

function fillCategories(type, selected) {
  categorySelect.innerHTML = "";
  CATEGORIES[type].forEach((name) => {
    const option = document.createElement("option");
    option.value = name;
    option.textContent = name;
    if (name === selected) option.selected = true;
    categorySelect.append(option);
  });
}

function readForm() {
  const amount = Number(amountInput.value);
  const date = dateInput.value;
  const type = selectedType();
  const category = categorySelect.value;
  if (!Number.isFinite(amount) || amount <= 0) {
    return { error: "Укажите сумму больше нуля." };
  }
  if (!CATEGORIES[type].includes(category)) {
    return { error: "Выберите категорию." };
  }
  if (!date) {
    return { error: "Укажите дату." };
  }
  return {
    data: {
      type,
      amount,
      category,
      date,
      note: noteInput.value.trim(),
    },
  };
}

function resetForm() {
  form.reset();
  idInput.value = "";
  formTitle.textContent = "Новая операция";
  saveButton.textContent = "Добавить";
  cancelEdit.hidden = true;
  formError.hidden = true;
  dateInput.value = todayKey();
  fillCategories("income");
  syncAmountLabel();
}

function startEdit(item) {
  idInput.value = item.id;
  form.querySelector(`input[name="type"][value="${item.type}"]`).checked = true;
  fillCategories(item.type, item.category);
  amountInput.value = String(item.amount);
  dateInput.value = item.date;
  noteInput.value = item.note || "";
  formTitle.textContent = "Изменить операцию";
  saveButton.textContent = "Сохранить";
  cancelEdit.hidden = false;
  formError.hidden = true;
  showTab("entry");
  syncAmountLabel();
  amountInput.focus();
  updateFormSignal();
}

function showTab(name) {
  document.querySelectorAll("[data-tab]").forEach((tab) => {
    const selected = tab.dataset.tab === name;
    tab.setAttribute("aria-selected", String(selected));
    tab.tabIndex = selected ? 0 : -1;
  });
  document.querySelectorAll(".tab-panel").forEach((panel) => {
    const active = panel.id === `panel-${name}`;
    panel.classList.toggle("is-active", active);
    panel.hidden = !active;
  });
  if (name === "charts") {
    requestAnimationFrame(() => redrawCharts(loadTransactions()));
  }
}

function assessBalance(income, expense) {
  if (income <= 0 && expense <= 0) return null;
  if (expense > income) {
    return {
      level: "danger",
      text: income <= 0
        ? "Есть расходы, а доходов за период нет"
        : `Расходы больше доходов на ${formatMoney(expense - income)}`,
    };
  }
  if (income > 0 && expense / income >= 0.8) {
    return {
      level: "warn",
      text: `Расходы уже ${Math.round((expense / income) * 100)}% дохода, осталось ${formatMoney(income - expense)}`,
    };
  }
  return null;
}

function paintSignal(node, state) {
  if (!state) {
    node.hidden = true;
    node.removeAttribute("data-level");
    return;
  }
  node.hidden = false;
  node.dataset.level = state.level;
  const text = node.querySelector("p") || node;
  if (node.id === "form-signal") node.textContent = state.text;
  else document.querySelector("#signal-text").textContent = state.text;
}

function renderSignal(income, expense) {
  const state = assessBalance(income, expense);
  const signal = document.querySelector("#signal");
  paintSignal(signal, state);
  document.querySelector("#signal-badge").hidden = !state;
}

function updateFormSignal() {
  const node = document.querySelector("#form-signal");
  const amount = Number(amountInput.value);
  const date = dateInput.value;
  if (!Number.isFinite(amount) || amount <= 0 || !date) {
    node.hidden = true;
    return;
  }
  const items = loadTransactions().filter((item) => item.id !== idInput.value && monthKey(item.date) === monthKey(date));
  const next = totals(items);
  const editing = idInput.value
    ? loadTransactions().find((item) => item.id === idInput.value)
    : null;
  const entryCurrency = editing?.currency || activeCurrency;
  const converted = toActive(amount, entryCurrency);
  if (selectedType() === "expense") next.expense += converted;
  else next.income += converted;
  paintSignal(node, assessBalance(next.income, next.expense));
}

function redrawCharts(items) {
  drawMonthly(lastMonths(items));
  const periodTotals = totals(items.filter((item) => inPeriod(item, dashboardPeriod.value || "all")));
  drawSharePie(periodTotals.income, periodTotals.expense);
  drawCategories(categorySlices(items));
}

function totals(items) {
  return items.reduce((sum, item) => {
    sum[item.type] += amountInActive(item);
    return sum;
  }, { income: 0, expense: 0 });
}

function inPeriod(item, period) {
  return period === "all" || monthKey(item.date) === period;
}

function monthOptions(items) {
  const keys = new Set(items.map((item) => monthKey(item.date)));
  keys.add(monthKey(todayKey()));
  return [...keys].sort().reverse();
}

function renderPeriodSelects(items) {
  const dashValue = dashboardPeriod.value || "all";
  const filterValue = filterMonth.value || "all";
  const months = monthOptions(items);

  dashboardPeriod.innerHTML = "";
  filterMonth.innerHTML = "";

  const allDash = new Option("Все время", "all");
  const allFilter = new Option("Все", "all");
  dashboardPeriod.append(allDash);
  filterMonth.append(allFilter);

  months.forEach((key) => {
    dashboardPeriod.append(new Option(monthTitle(key), key));
    filterMonth.append(new Option(monthTitle(key), key));
  });

  dashboardPeriod.value = [...dashboardPeriod.options].some((option) => option.value === dashValue)
    ? dashValue
    : "all";
  filterMonth.value = [...filterMonth.options].some((option) => option.value === filterValue)
    ? filterValue
    : "all";
}

function renderCards(items) {
  const period = dashboardPeriod.value || "all";
  const current = totals(items.filter((item) => inPeriod(item, period)));
  const all = totals(items);
  const balance = current.income - current.expense;
  const allBalance = all.income - all.expense;
  const periodLabel = period === "all" ? "за всё время" : `за ${monthTitle(period)}`;

  document.querySelector("#income-total").textContent = formatMoney(current.income);
  document.querySelector("#expense-total").textContent = formatMoney(current.expense);
  document.querySelector("#balance-total").textContent = formatMoney(balance);
  document.querySelector("#income-note").textContent = period === "all"
    ? "за всё время"
    : `${periodLabel} · всего ${formatMoney(all.income)}`;
  document.querySelector("#expense-note").textContent = period === "all"
    ? "за всё время"
    : `${periodLabel} · всего ${formatMoney(all.expense)}`;
  document.querySelector("#balance-note").textContent = period === "all"
    ? "доход минус расход"
    : `${periodLabel} · всего ${formatMoney(allBalance)}`;
  renderSignal(current.income, current.expense);
}

function lastMonths(items) {
  const buckets = new Map();
  items.forEach((item) => {
    const key = monthKey(item.date);
    if (!buckets.has(key)) buckets.set(key, { key, income: 0, expense: 0 });
    buckets.get(key)[item.type] += amountInActive(item);
  });
  return [...buckets.values()]
    .sort((a, b) => a.key.localeCompare(b.key))
    .slice(-6)
    .map((bucket) => ({ ...bucket, label: monthShort(bucket.key) }));
}

function categorySlices(items) {
  const sums = new Map();
  items
    .filter((item) => item.type === "expense" && inPeriod(item, dashboardPeriod.value || "all"))
    .forEach((item) => {
      sums.set(item.category, (sums.get(item.category) || 0) + amountInActive(item));
    });
  const total = [...sums.values()].reduce((sum, value) => sum + value, 0);
  return [...sums.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([name, value]) => ({
      name,
      value,
      color: expenseColor(name),
      share: total ? Math.round((value / total) * 100) : 0,
    }));
}

function fitCanvas(canvas) {
  const rect = canvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  const width = Math.max(rect.width, 1);
  const height = Math.max(rect.height, 1);
  canvas.width = Math.round(width * dpr);
  canvas.height = Math.round(height * dpr);
  const ctx = canvas.getContext("2d");
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return { ctx, width, height };
}

function compactMoney(value) {
  if (value >= 1_000_000) return `${(value / 1_000_000).toLocaleString("ru-RU", { maximumFractionDigits: 1 })} млн`;
  if (value >= 1000) return `${(value / 1000).toLocaleString("ru-RU", { maximumFractionDigits: 1 })} тыс`;
  return Math.round(value).toLocaleString("ru-RU");
}

function drawMonthly(months) {
  const frame = monthlyCanvas.parentElement;
  frame.classList.toggle("is-empty", months.length === 0);
  if (!months.length) return;

  const { ctx, width, height } = fitCanvas(monthlyCanvas);
  ctx.clearRect(0, 0, width, height);

  const max = Math.max(...months.flatMap((month) => [month.income, month.expense]), 1);
  ctx.font = "12px Segoe UI, sans-serif";
  const axisLabels = [0, 1, 2, 3, 4].map((step) => compactMoney(max * (1 - step / 4)));
  const labelWidth = Math.max(...axisLabels.map((label) => ctx.measureText(label).width));
  const pad = { top: 12, right: 8, bottom: 32, left: Math.ceil(labelWidth) + 14 };
  const plotW = width - pad.left - pad.right;
  const plotH = height - pad.top - pad.bottom;

  ctx.textAlign = "right";
  ctx.textBaseline = "middle";
  ctx.strokeStyle = cssVar("--chart-grid");
  ctx.fillStyle = cssVar("--muted");
  ctx.lineWidth = 1;

  for (let step = 0; step <= 4; step += 1) {
    const y = pad.top + (plotH * step) / 4;
    ctx.beginPath();
    ctx.moveTo(pad.left, y);
    ctx.lineTo(width - pad.right, y);
    ctx.stroke();
    ctx.fillText(axisLabels[step], pad.left - 8, y);
  }

  const groupW = plotW / months.length;
  const barW = Math.min(16, groupW * 0.26);

  months.forEach((month, index) => {
    const center = pad.left + groupW * index + groupW / 2;
    const incomeH = (month.income / max) * plotH;
    const expenseH = (month.expense / max) * plotH;

    ctx.fillStyle = cssVar("--income");
    ctx.fillRect(center - barW - 2, pad.top + plotH - incomeH, barW, incomeH);
    ctx.fillStyle = cssVar("--expense");
    ctx.fillRect(center + 2, pad.top + plotH - expenseH, barW, expenseH);

    ctx.fillStyle = cssVar("--chart-label");
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillText(month.label, center, pad.top + plotH + 10);
  });
}

function drawSharePie(income, expense) {
  const frame = shareCanvas.parentElement;
  const slices = [
    { name: "Доход", value: income, color: cssVar("--income") },
    { name: "Расход", value: expense, color: cssVar("--expense") },
  ].filter((slice) => slice.value > 0);
  const total = income + expense;
  frame.classList.toggle("is-empty", total <= 0);
  shareLegend.innerHTML = "";
  if (total <= 0) return;

  const { ctx, width, height } = fitCanvas(shareCanvas);
  ctx.clearRect(0, 0, width, height);
  const radius = Math.min(width, height) * 0.42;
  const cx = width / 2;
  const cy = height / 2;
  let angle = -Math.PI / 2;

  slices.forEach((slice) => {
    const sweep = (slice.value / total) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, radius, angle, angle + sweep);
    ctx.closePath();
    ctx.fillStyle = slice.color;
    ctx.fill();

    if (slice.value / total >= 0.12) {
      const mid = angle + sweep / 2;
      ctx.fillStyle = "#fffdf8";
      ctx.font = "600 13px Segoe UI, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(`${Math.round((slice.value / total) * 100)}%`, cx + Math.cos(mid) * radius * 0.62, cy + Math.sin(mid) * radius * 0.62);
    }
    angle += sweep;
  });

  slices.forEach((slice) => {
    const item = document.createElement("li");
    const share = Math.round((slice.value / total) * 100);
    item.innerHTML = `<span><i class="dot" style="background:${slice.color}"></i>${slice.name}</span><b>${share}%</b>`;
    shareLegend.append(item);
  });
}

function drawCategories(slices) {
  const frame = categoryCanvas.parentElement;
  frame.classList.toggle("is-empty", slices.length === 0);
  categoryLegend.innerHTML = "";
  if (!slices.length) return;

  const { ctx, width, height } = fitCanvas(categoryCanvas);
  ctx.clearRect(0, 0, width, height);

  const total = slices.reduce((sum, slice) => sum + slice.value, 0);
  const radius = Math.min(width, height) * 0.38;
  const inner = radius * 0.62;
  const cx = width / 2;
  const cy = height / 2;
  let angle = -Math.PI / 2;
  const gap = slices.length > 1 ? 0.03 : 0;

  ctx.lineWidth = radius - inner;
  slices.forEach((slice) => {
    const sweep = Math.max((slice.value / total) * Math.PI * 2 - gap, 0.01);
    ctx.beginPath();
    ctx.strokeStyle = slice.color;
    ctx.arc(cx, cy, (radius + inner) / 2, angle, angle + sweep);
    ctx.stroke();
    angle += (slice.value / total) * Math.PI * 2;
  });

    ctx.fillStyle = cssVar("--ink");
    ctx.font = "600 16px Segoe UI, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(compactMoney(total), cx, cy - 8);
    ctx.fillStyle = cssVar("--muted");
  ctx.font = "12px Segoe UI, sans-serif";
  ctx.fillText("расход", cx, cy + 12);

  slices.forEach((slice) => {
    const item = document.createElement("li");
    item.innerHTML = `<span><i class="dot" style="background:${slice.color}"></i>${slice.name}</span><b>${slice.share}%</b>`;
    categoryLegend.append(item);
  });
}

function renderTable(items) {
  const type = filterType.value;
  const month = filterMonth.value;
  const visible = items
    .filter((item) => (type === "all" || item.type === type) && inPeriod(item, month))
    .sort((a, b) => b.date.localeCompare(a.date) || b.id.localeCompare(a.id));

  rows.innerHTML = "";
  const noData = items.length === 0;
  const filteredOut = !noData && visible.length === 0;
  listPanel.classList.toggle("is-empty", noData || filteredOut);
  emptyList.hidden = !(noData || filteredOut);
  emptyList.textContent = noData
    ? "Пока нет операций. Добавьте доход или расход — они появятся в таблице и на графиках."
    : "Нет операций по этому фильтру.";

  visible.forEach((item) => {
    const tr = document.createElement("tr");
    const sign = item.type === "income" ? "+" : "−";
    tr.innerHTML = `
      <td>${formatDate(item.date)}</td>
      <td><span class="tag tag-${item.type}">${item.type === "income" ? "Доход" : "Расход"}</span></td>
      <td>${escapeHtml(item.category)}</td>
      <td>${item.note ? escapeHtml(item.note) : "—"}</td>
      <td class="amount amount-${item.type}">${sign}${formatMoney(amountInActive(item))}${item.currency && item.currency !== activeCurrency ? `<span class="original">${formatMoney(item.amount, item.currency)}</span>` : ""}</td>
      <td>
        <div class="row-actions">
          <button type="button" class="ghost" data-edit="${item.id}">Изменить</button>
          <button type="button" class="ghost" data-delete="${item.id}">Удалить</button>
        </div>
      </td>
    `;
    rows.append(tr);
  });
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function render() {
  const items = loadTransactions();
  renderPeriodSelects(items);
  renderCards(items);
  if (!document.querySelector("#panel-charts").hidden) redrawCharts(items);
  renderTable(items);
  updateFormSignal();
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const result = readForm();
  if (result.error) {
    formError.hidden = false;
    formError.textContent = result.error;
    return;
  }
  if (idInput.value) updateTransaction(idInput.value, result.data);
  else createTransaction(result.data);
  resetForm();
  render();
  showTab("journal");
});

form.addEventListener("change", (event) => {
  if (event.target.name === "type") fillCategories(selectedType());
  updateFormSignal();
});

form.addEventListener("input", updateFormSignal);

document.querySelector(".tabs").addEventListener("click", (event) => {
  const tab = event.target.closest("[data-tab]");
  if (tab) showTab(tab.dataset.tab);
});

document.querySelector(".currency-switch").addEventListener("click", (event) => {
  const button = event.target.closest("[data-currency]");
  if (button) setCurrency(button.dataset.currency, true);
});

cancelEdit.addEventListener("click", resetForm);

rows.addEventListener("click", (event) => {
  const editId = event.target.closest("[data-edit]")?.dataset.edit;
  const deleteId = event.target.closest("[data-delete]")?.dataset.delete;
  const items = loadTransactions();
  if (editId) {
    const item = items.find((entry) => entry.id === editId);
    if (item) startEdit(item);
  }
  if (deleteId) {
    const item = items.find((entry) => entry.id === deleteId);
    if (!item) return;
    const label = `${item.category}, ${formatMoney(item.amount, item.currency)}`;
    if (window.confirm(`Удалить операцию «${label}»?`)) {
      deleteTransaction(deleteId);
      if (idInput.value === deleteId) resetForm();
      render();
    }
  }
});

themeToggle.addEventListener("click", () => {
  const night = document.documentElement.dataset.theme === "night";
  setTheme(night ? "day" : "night", true);
});

dashboardPeriod.addEventListener("change", render);
filterType.addEventListener("change", render);
filterMonth.addEventListener("change", render);
window.addEventListener("resize", () => {
  if (!document.querySelector("#panel-charts").hidden) redrawCharts(loadTransactions());
});

const savedTheme = localStorage.getItem(THEME_KEY);
const initialTheme = savedTheme || (matchMedia("(prefers-color-scheme: dark)").matches ? "night" : "day");
setTheme(initialTheme, false);
setCurrency(localStorage.getItem(CURRENCY_KEY) === "UZS" ? "UZS" : "RUB", false);
resetForm();
render();
