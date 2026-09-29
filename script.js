// ==========================================================
// OILA HISOB-KITOBI - KIRIM VA CHIQIM JAVASCRIPT
// ==========================================================

// LocalStorage kalitlari
const STORAGE_TRANSACTIONS = 'family_transactions_v2';
const STORAGE_BUDGET = 'family_monthly_budget_v2';
const STORAGE_THEME = 'family_app_theme';
const INITIALIZED_KEY = 'family_app_initialized_v2';

// Oylar ro'yxati (O'zbek tilida)
const monthNames = [
  'Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun',
  'Iyul', 'Avgust', 'Sentyabr', 'Oktyabr', 'Noyabr', 'Dekabr'
];

// Kategoriya SVG ikonkalari
const categoryIcons = {
  "O'qish": `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>`,
  "Transport": `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="8" rx="2"></rect><circle cx="7" cy="19" r="2"></circle><circle cx="17" cy="19" r="2"></circle><path d="M5 11l2-6h10l2 6"></path></svg>`,
  "Kitob": `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>`,
  "Kredit": `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"></rect><line x1="2" y1="10" x2="22" y2="10"></line></svg>`,
  "Oziq-ovqat": `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>`,
  "Kommunal": `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path></svg>`,
  "Salomatlik": `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>`,
  "Oylik maosh": `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>`,
  "Pensiya": `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`,
  "Tijorat": `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"></path><path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"></path></svg>`,
  "Qo'shimcha daromad": `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>`,
  "Sovg'a": `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 12 20 22 4 22 4 12"></polyline><rect x="2" y="7" width="20" height="5"></rect><line x1="12" y1="22" x2="12" y2="7"></line></svg>`,
  "Boshqa": `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`
};

const expenseCategories = ["Oziq-ovqat", "Kommunal", "Transport", "O'qish", "Salomatlik", "Kredit", "Kitob", "Boshqa"];
const incomeCategories = ["Oylik maosh", "Pensiya", "Tijorat", "Qo'shimcha daromad", "Sovg'a", "Boshqa"];

// Kategoriya ranglari (Aylana grafik uchun)
const categoryColors = {
  "Oziq-ovqat": "#f59e0b",
  "Kommunal": "#3b82f6",
  "Transport": "#10b981",
  "O'qish": "#8b5cf6",
  "Salomatlik": "#ef4444",
  "Kredit": "#f97316",
  "Kitob": "#06b6d4",
  "Boshqa": "#64748b"
};
const defaultPalette = ["#f59e0b", "#8b5cf6", "#3b82f6", "#10b981", "#ef4444", "#f97316", "#06b6d4", "#ec4899"];

// Joriy real sana (hech qanday qotirilgan sana emas)
const systemNow = new Date();
let currentSelectedYear = systemNow.getFullYear();
let currentSelectedMonth = systemNow.getMonth(); // 0 = Yanvar
let currentFilterType = 'all'; // all | expense | income
let currentAddType = 'expense'; // expense | income

// Dastur ma'lumotlari
let transactions = [];
let monthlyBudget = 5000000; // Standart oylik byudjet

// DOM elementlari
const themeToggleBtn = document.getElementById('themeToggleBtn');
const themeIcon = document.getElementById('themeIcon');
const currentMonthLabel = document.getElementById('currentMonthLabel');
const prevMonthBtn = document.getElementById('prevMonthBtn');
const nextMonthBtn = document.getElementById('nextMonthBtn');

const homeNetBalanceEl = document.getElementById('homeNetBalance');
const homeTotalIncomeEl = document.getElementById('homeTotalIncome');
const homeTotalExpenseEl = document.getElementById('homeTotalExpense');

const budgetSpentText = document.getElementById('budgetSpentText');
const budgetRemainingText = document.getElementById('budgetRemainingText');
const budgetFillBar = document.getElementById('budgetFillBar');
const budgetTotalLimit = document.getElementById('budgetTotalLimit');
const budgetWarningLabel = document.getElementById('budgetWarningLabel');

const homeRecentListEl = document.getElementById('homeRecentList');
const statsMonthBadge = document.getElementById('statsMonthBadge');
const statsTotalIncomeEl = document.getElementById('statsTotalIncome');
const statsTotalExpenseEl = document.getElementById('statsTotalExpense');
const statsNetSavingEl = document.getElementById('statsNetSaving');
const circleChartContainer = document.getElementById('circleChartContainer');
const categoriesListEl = document.getElementById('categoriesList');

const historyCountText = document.getElementById('historyCountText');
const historyMonthName = document.getElementById('historyMonthName');
const historyExpenseListEl = document.getElementById('historyExpenseList');

// Forma elementlari
const transactionForm = document.getElementById('transactionForm');
const transactionAmountInput = document.getElementById('transactionAmount');
const transactionNameInput = document.getElementById('transactionName');
const transactionDateInput = document.getElementById('transactionDate');
const categoryChipsContainer = document.getElementById('categoryChipsContainer');
const selectedCategoryInput = document.getElementById('selectedCategory');
const errorMessageEl = document.getElementById('errorMessage');
const typeExpenseBtn = document.getElementById('typeExpenseBtn');
const typeIncomeBtn = document.getElementById('typeIncomeBtn');
const saveTransactionBtn = document.getElementById('saveTransactionBtn');

// Byudjet Modal elementlari
const budgetModal = document.getElementById('budgetModal');
const monthlyBudgetInput = document.getElementById('monthlyBudgetInput');
const openBudgetModalBtn = document.getElementById('openBudgetModalBtn');
const openBudgetModalBtnTop = document.getElementById('openBudgetModalBtnTop');
const closeBudgetModalBtn = document.getElementById('closeBudgetModalBtn');
const cancelBudgetBtn = document.getElementById('cancelBudgetBtn');
const saveBudgetBtn = document.getElementById('saveBudgetBtn');
const matchBudgetWithIncomeBtn = document.getElementById('matchBudgetWithIncomeBtn');
const modalIncomeSpan = document.getElementById('modalIncomeSpan');

// Navigatsiya elementlari
const tabContents = document.querySelectorAll('.tab-content');
const navButtons = document.querySelectorAll('.nav-btn');

/**
 * Mahalliy sanani YYYY-MM-DD ko'rinishida olish (UTC muammosisiz)
 */
function getLocalDateString(d = new Date()) {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Boshlang'ich ma'lumotlarni yuklash va sog'lomlashtirish
 */
function loadInitialData() {
  const isInit = localStorage.getItem(INITIALIZED_KEY);

  if (!isInit) {
    const curY = currentSelectedYear;
    const curM = String(currentSelectedMonth + 1).padStart(2, '0');

    const initialData = [
      { id: '1', type: 'income', name: "Oylik maosh", amount: 5500000, category: "Oylik maosh", date: `${curY}-${curM}-05` },
      { id: '2', type: 'expense', name: "Oziq-ovqat xaridi", amount: 450000, category: "Oziq-ovqat", date: `${curY}-${curM}-10` },
      { id: '3', type: 'expense', name: "Kommunal to'lovlar", amount: 180000, category: "Kommunal", date: `${curY}-${curM}-12` },
      { id: '4', type: 'expense', name: "O'qish to'lovlari", amount: 300000, category: "O'qish", date: `${curY}-${curM}-15` },
      { id: '5', type: 'expense', name: "Taxi va yo'l kira", amount: 25000, category: "Transport", date: `${curY}-${curM}-18` },
      { id: '6', type: 'expense', name: "Dorixona / Salomatlik", amount: 65000, category: "Salomatlik", date: `${curY}-${curM}-20` },
      { id: '7', type: 'expense', name: "Kitob xaridi", amount: 50000, category: "Kitob", date: `${curY}-${curM}-22` },
      { id: '8', type: 'expense', name: "Kredit to'lovi", amount: 400000, category: "Kredit", date: `${curY}-${curM}-25` }
    ];

    monthlyBudget = 5000000;
    transactions = initialData;

    localStorage.setItem(STORAGE_TRANSACTIONS, JSON.stringify(transactions));
    localStorage.setItem(STORAGE_BUDGET, monthlyBudget.toString());
    localStorage.setItem(INITIALIZED_KEY, 'true');
  } else {
    const savedTrans = localStorage.getItem(STORAGE_TRANSACTIONS);
    transactions = savedTrans ? JSON.parse(savedTrans) : [];

    // Eski ma'lumotlar strukturasini tekshirish va to'g'irlash
    let needsResave = false;
    transactions.forEach(t => {
      if (!t.type) {
        t.type = 'expense';
        needsResave = true;
      }
      if (!t.date) {
        t.date = getLocalDateString();
        needsResave = true;
      }
    });

    if (needsResave) {
      saveTransactions();
    }

    const savedBudget = localStorage.getItem(STORAGE_BUDGET);
    monthlyBudget = (savedBudget && !isNaN(Number(savedBudget))) ? Number(savedBudget) : 5000000;
  }
}

/**
 * Ma'lumotlarni saqlash
 */
function saveTransactions() {
  localStorage.setItem(STORAGE_TRANSACTIONS, JSON.stringify(transactions));
}

function saveBudget() {
  localStorage.setItem(STORAGE_BUDGET, monthlyBudget.toString());
}

/**
 * Raqamlarni kiritayotganda vergul bilan ajratish (Masalan: 3,000,000)
 */
function formatNumberWithCommas(value) {
  if (value === null || value === undefined || value === '') return '';
  const cleanNumber = value.toString().replace(/\D/g, '');
  if (!cleanNumber) return '';
  return cleanNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * Summani formatlash (Masalan: 3,000,000 so'm)
 */
function formatCurrency(amount) {
  const rounded = Math.round(Number(amount) || 0);
  const formatted = rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return `${formatted} so'm`;
}

/**
 * Tanlangan oy bo'yicha amallarni filtrlash
 */
function getSelectedMonthTransactions() {
  return transactions.filter(item => {
    if (!item.date) return true;
    const parts = item.date.split('-');
    if (parts.length >= 2) {
      const y = parseInt(parts[0], 10);
      const m = parseInt(parts[1], 10) - 1; // 0-indexed
      return y === currentSelectedYear && m === currentSelectedMonth;
    }
    return true;
  });
}

/**
 * Sahifalar (Tabs) almashishi
 */
function switchTab(targetTabId) {
  tabContents.forEach(tab => {
    tab.classList.toggle('active', tab.id === targetTabId);
  });

  navButtons.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === targetTabId);
  });

  const container = document.querySelector('.app-container');
  if (container) {
    container.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

/**
 * Amal turi (Chiqim yoki Kirim) ni o'rnatish
 */
function setAddType(type) {
  currentAddType = type;
  const heroLabel = document.querySelector('.hero-label');

  if (type === 'income') {
    typeIncomeBtn.classList.add('active');
    typeExpenseBtn.classList.remove('active');
    if (saveTransactionBtn) {
      saveTransactionBtn.textContent = "Kirimni saqlash";
      saveTransactionBtn.style.background = "linear-gradient(135deg, #10b981 0%, #059669 100%)";
      saveTransactionBtn.style.color = "#ffffff";
    }
    if (heroLabel) {
      heroLabel.textContent = "Kirim (daromad) summasi";
    }
    renderCategoryChips('income');
  } else {
    typeExpenseBtn.classList.add('active');
    typeIncomeBtn.classList.remove('active');
    if (saveTransactionBtn) {
      saveTransactionBtn.textContent = "Chiqimni saqlash";
      saveTransactionBtn.style.background = "var(--yellow-gradient)";
      saveTransactionBtn.style.color = "var(--text-dark)";
    }
    if (heroLabel) {
      heroLabel.textContent = "Chiqim (xarajat) summasi";
    }
    renderCategoryChips('expense');
  }
  hideError();
}

/**
 * Kategoriya chiplarini ko'rsatish
 */
function renderCategoryChips(type) {
  categoryChipsContainer.textContent = '';
  const categories = (type === 'income') ? incomeCategories : expenseCategories;

  categories.forEach((cat, index) => {
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'category-chip';
    if (index === 0) {
      chip.classList.add('active');
      selectedCategoryInput.value = cat;
    }
    chip.textContent = cat;
    chip.dataset.category = cat;

    chip.addEventListener('click', () => {
      document.querySelectorAll('.category-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      selectedCategoryInput.value = cat;
      hideError();
    });

    categoryChipsContainer.appendChild(chip);
  });
}

/**
 * Amal kartasini yaratish
 */
function createTransactionCard(item) {
  const card = document.createElement('div');
  card.className = 'activity-card';

  // Chap tomon
  const left = document.createElement('div');
  left.className = 'activity-left';

  const isIncome = item.type === 'income';
  const iconCircle = document.createElement('div');
  iconCircle.className = `activity-icon-circle ${isIncome ? 'income' : ''}`;
  iconCircle.innerHTML = categoryIcons[item.category] || categoryIcons['Boshqa'];

  const texts = document.createElement('div');
  texts.className = 'activity-texts';

  const nameEl = document.createElement('span');
  nameEl.className = 'activity-name';
  nameEl.textContent = item.name;

  const metaEl = document.createElement('span');
  metaEl.className = 'activity-meta';
  const displayDate = item.date ? item.date : getLocalDateString();
  metaEl.textContent = `${item.category} • ${displayDate}`;

  texts.appendChild(nameEl);
  texts.appendChild(metaEl);

  left.appendChild(iconCircle);
  left.appendChild(texts);

  // O'ng tomon
  const right = document.createElement('div');
  right.className = 'activity-right';

  const amountEl = document.createElement('span');
  amountEl.className = `activity-amount ${isIncome ? 'income' : 'expense'}`;
  const sign = isIncome ? '+' : '-';
  amountEl.textContent = `${sign} ${formatCurrency(item.amount)}`;

  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'activity-delete-btn';
  deleteBtn.title = "O'chirish";
  deleteBtn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>`;

  deleteBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    deleteTransaction(item.id);
  });

  right.appendChild(amountEl);
  right.appendChild(deleteBtn);

  card.appendChild(left);
  card.appendChild(right);

  return card;
}

/**
 * Bo'sh holat ko'rinishi
 */
function createEmptyState(message = "Bu oyda hali hech qanday amal kiritilmagan") {
  const box = document.createElement('div');
  box.className = 'empty-state-box';
  box.innerHTML = `
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#52525b" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="8" y1="12" x2="16" y2="12"></line>
    </svg>
    <p>${message}</p>
  `;
  return box;
}

/**
 * 1. Bosh sahifani yangilash
 */
function renderHomeTab(monthItems, totalIncome, totalExpense, netBalance) {
  // Oy nomi
  currentMonthLabel.textContent = `${monthNames[currentSelectedMonth]} ${currentSelectedYear}`;

  // Balans va Kirim/Chiqim ko'rsatkichlari
  homeNetBalanceEl.textContent = formatCurrency(netBalance);
  homeTotalIncomeEl.textContent = `+ ${formatCurrency(totalIncome)}`;
  homeTotalExpenseEl.textContent = `- ${formatCurrency(totalExpense)}`;

  // Byudjet kartasini yangilash
  budgetTotalLimit.textContent = formatCurrency(monthlyBudget);
  const spentPercent = monthlyBudget > 0 ? (totalExpense / monthlyBudget) * 100 : 0;
  const remainingBudget = monthlyBudget - totalExpense;

  budgetSpentText.textContent = `Ishlatildi: ${formatCurrency(totalExpense)} (${spentPercent.toFixed(1)}%)`;

  if (remainingBudget >= 0) {
    budgetRemainingText.textContent = `Qoldi: ${formatCurrency(remainingBudget)}`;
    budgetRemainingText.style.color = 'var(--yellow-accent)';
    budgetWarningLabel.textContent = "Me'yorda";
    budgetWarningLabel.className = 'budget-status-good';
  } else {
    budgetRemainingText.textContent = `Oshib ketdi: ${formatCurrency(Math.abs(remainingBudget))}`;
    budgetRemainingText.style.color = 'var(--danger-color)';
    budgetWarningLabel.textContent = "Byudjetdan oshdi!";
    budgetWarningLabel.className = 'budget-status-warn';
  }

  budgetFillBar.style.width = `${Math.min(100, Math.max(0, spentPercent))}%`;
  if (spentPercent > 90) {
    budgetFillBar.style.background = 'var(--danger-color)';
  } else {
    budgetFillBar.style.background = 'var(--yellow-gradient)';
  }

  // So'nggi amallar (oxirgi 5 ta)
  homeRecentListEl.textContent = '';
  if (monthItems.length === 0) {
    homeRecentListEl.appendChild(createEmptyState());
  } else {
    const recent = monthItems.slice(0, 5);
    recent.forEach(item => {
      homeRecentListEl.appendChild(createTransactionCard(item));
    });
  }
}

/**
 * 2. Statistika sahifasini yangilash (Aylana Grafik Donut Chart bilan)
 */
function renderStatsTab(monthItems, totalIncome, totalExpense, netBalance) {
  statsMonthBadge.textContent = `${monthNames[currentSelectedMonth]} ${currentSelectedYear} hisoboti`;
  statsTotalIncomeEl.textContent = `+ ${formatCurrency(totalIncome)}`;
  statsTotalExpenseEl.textContent = `- ${formatCurrency(totalExpense)}`;
  statsNetSavingEl.textContent = formatCurrency(netBalance);

  categoriesListEl.textContent = '';
  circleChartContainer.textContent = '';

  // Faqat chiqimlar bo'yicha kategoriyalar
  const expenseItems = monthItems.filter(item => item.type === 'expense' || !item.type);

  if (expenseItems.length === 0 || totalExpense <= 0) {
    categoriesListEl.appendChild(createEmptyState("Bu oyda xarajatlar mavjud emas"));
    circleChartContainer.innerHTML = `
      <div class="donut-visual" style="background: var(--bg-card-subtle);">
        <div class="donut-center">
          <span class="donut-center-label">Xarajat yo'q</span>
          <span class="donut-center-amount">0 so'm</span>
        </div>
      </div>
    `;
    return;
  }

  // Har bir kategoriya summasini hisoblash
  const categoryTotals = {};
  expenseItems.forEach(item => {
    categoryTotals[item.category] = (categoryTotals[item.category] || 0) + item.amount;
  });

  const activeCategories = Object.keys(categoryTotals)
    .filter(cat => categoryTotals[cat] > 0)
    .sort((a, b) => categoryTotals[b] - categoryTotals[a]);

  // Aylana Grafik (Donut Chart) - conic-gradient hisoblash
  let currentDegree = 0;
  const gradientStops = [];

  const legendContainer = document.createElement('div');
  legendContainer.className = 'donut-legend';

  activeCategories.forEach((cat, index) => {
    const amount = categoryTotals[cat];
    const percent = (amount / totalExpense) * 100;
    const color = categoryColors[cat] || defaultPalette[index % defaultPalette.length];

    const nextDegree = currentDegree + (percent * 3.6);
    gradientStops.push(`${color} ${currentDegree.toFixed(2)}deg ${nextDegree.toFixed(2)}deg`);
    currentDegree = nextDegree;

    // Legend elementi
    const legendItem = document.createElement('div');
    legendItem.className = 'legend-item';

    const dot = document.createElement('span');
    dot.className = 'legend-dot';
    dot.style.backgroundColor = color;

    const name = document.createElement('span');
    name.className = 'legend-name';
    name.textContent = cat;

    const percentText = document.createElement('span');
    percentText.className = 'legend-percent';
    percentText.textContent = `${percent.toFixed(1).replace('.0', '')}%`;

    legendItem.appendChild(dot);
    legendItem.appendChild(name);
    legendItem.appendChild(percentText);

    legendContainer.appendChild(legendItem);
  });

  // Donut aylanasi
  const donutVisual = document.createElement('div');
  donutVisual.className = 'donut-visual';
  donutVisual.style.background = `conic-gradient(${gradientStops.join(', ')})`;

  // Donut markazi
  const donutCenter = document.createElement('div');
  donutCenter.className = 'donut-center';

  const centerLabel = document.createElement('span');
  centerLabel.className = 'donut-center-label';
  centerLabel.textContent = 'Jami Chiqim';

  const centerAmount = document.createElement('span');
  centerAmount.className = 'donut-center-amount';
  centerAmount.textContent = formatCurrency(totalExpense);

  donutCenter.appendChild(centerLabel);
  donutCenter.appendChild(centerAmount);
  donutVisual.appendChild(donutCenter);

  circleChartContainer.appendChild(donutVisual);
  circleChartContainer.appendChild(legendContainer);

  // Kategoriyalar bo'yicha progress barlar
  activeCategories.forEach((cat, index) => {
    const amount = categoryTotals[cat];
    const rawPercent = (amount / totalExpense) * 100;
    const formattedPercent = rawPercent.toFixed(1).replace('.0', '') + '%';
    const color = categoryColors[cat] || defaultPalette[index % defaultPalette.length];

    const itemEl = document.createElement('div');
    itemEl.className = 'breakdown-item';

    const row = document.createElement('div');
    row.className = 'breakdown-row';

    const title = document.createElement('span');
    title.className = 'breakdown-title';
    title.textContent = cat;

    const numbers = document.createElement('span');
    numbers.className = 'breakdown-numbers';
    numbers.style.color = color;
    numbers.textContent = `${formatCurrency(amount)} (${formattedPercent})`;

    row.appendChild(title);
    row.appendChild(numbers);

    const track = document.createElement('div');
    track.className = 'breakdown-track';

    const fill = document.createElement('div');
    fill.className = 'breakdown-fill';
    fill.style.width = `${Math.min(100, Math.max(2, rawPercent))}%`;
    fill.style.background = color;

    track.appendChild(fill);

    itemEl.appendChild(row);
    itemEl.appendChild(track);

    categoriesListEl.appendChild(itemEl);
  });
}

/**
 * 3. Barcha amallar sahifasini yangilash
 */
function renderHistoryTab(monthItems) {
  historyMonthName.textContent = `${monthNames[currentSelectedMonth]} ${currentSelectedYear}`;
  historyExpenseListEl.textContent = '';

  let filtered = monthItems;
  if (currentFilterType !== 'all') {
    filtered = monthItems.filter(item => item.type === currentFilterType);
  }

  historyCountText.textContent = `${filtered.length} ta amal`;

  if (filtered.length === 0) {
    historyExpenseListEl.appendChild(createEmptyState("Amallar topilmadi"));
    return;
  }

  filtered.forEach(item => {
    historyExpenseListEl.appendChild(createTransactionCard(item));
  });
}

/**
 * Butun dasturni qayta yangilash
 */
function renderApp() {
  const monthItems = getSelectedMonthTransactions();

  // Hisob-kitoblar
  const totalIncome = monthItems
    .filter(i => i.type === 'income')
    .reduce((sum, i) => sum + (Number(i.amount) || 0), 0);

  const totalExpense = monthItems
    .filter(i => (i.type === 'expense' || !i.type))
    .reduce((sum, i) => sum + (Number(i.amount) || 0), 0);

  const netBalance = totalIncome - totalExpense;

  renderHomeTab(monthItems, totalIncome, totalExpense, netBalance);
  renderStatsTab(monthItems, totalIncome, totalExpense, netBalance);
  renderHistoryTab(monthItems);
}

/**
 * Amalni o'chirish
 */
function deleteTransaction(id) {
  transactions = transactions.filter(item => item.id !== id);
  saveTransactions();
  renderApp();
}

/**
 * Xato xabarini ko'rsatish
 */
function showError(msg) {
  errorMessageEl.textContent = msg;
  errorMessageEl.style.display = 'block';
}

function hideError() {
  errorMessageEl.textContent = '';
  errorMessageEl.style.display = 'none';
}

// ================= HODISALAR (EVENT LISTENERS) =================

// Oy o'zgartirish (Navigator)
prevMonthBtn.addEventListener('click', () => {
  currentSelectedMonth--;
  if (currentSelectedMonth < 0) {
    currentSelectedMonth = 11;
    currentSelectedYear--;
  }
  renderApp();
});

nextMonthBtn.addEventListener('click', () => {
  currentSelectedMonth++;
  if (currentSelectedMonth > 11) {
    currentSelectedMonth = 0;
    currentSelectedYear++;
  }
  renderApp();
});

// Pastki navigatsiya tugmalari
navButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    switchTab(btn.dataset.tab);
  });
});

// Orqaga qaytish tugmalari
document.querySelectorAll('.back-to-home').forEach(btn => {
  btn.addEventListener('click', () => switchTab('tab-home'));
});

// Tezkor harakatlar tugmalari
document.getElementById('quickActionAdd').addEventListener('click', () => {
  setAddType('expense');
  switchTab('tab-add');
});

const quickAddIncomeBtn = document.getElementById('quickAddIncomeBtn');
const quickAddExpenseBtn = document.getElementById('quickAddExpenseBtn');

if (quickAddIncomeBtn) {
  quickAddIncomeBtn.addEventListener('click', () => {
    setAddType('income');
    switchTab('tab-add');
  });
}

if (quickAddExpenseBtn) {
  quickAddExpenseBtn.addEventListener('click', () => {
    setAddType('expense');
    switchTab('tab-add');
  });
}

document.getElementById('quickActionStats').addEventListener('click', () => switchTab('tab-stats'));
document.getElementById('quickActionHistory').addEventListener('click', () => switchTab('tab-history'));
document.getElementById('seeAllBtn').addEventListener('click', () => switchTab('tab-history'));

// Byudjet modalini ochish
function openBudgetModal() {
  monthlyBudgetInput.value = formatNumberWithCommas(monthlyBudget);

  // Bu oylik jami kirimni hisoblash
  const monthItems = getSelectedMonthTransactions();
  const totalIncome = monthItems
    .filter(i => i.type === 'income')
    .reduce((s, i) => s + (Number(i.amount) || 0), 0);

  if (modalIncomeSpan) {
    modalIncomeSpan.textContent = formatCurrency(totalIncome);
  }

  budgetModal.style.display = 'flex';
}

function closeBudgetModal() {
  budgetModal.style.display = 'none';
}

openBudgetModalBtn.addEventListener('click', openBudgetModal);
openBudgetModalBtnTop.addEventListener('click', openBudgetModal);
document.getElementById('quickActionBudget').addEventListener('click', openBudgetModal);
closeBudgetModalBtn.addEventListener('click', closeBudgetModal);
cancelBudgetBtn.addEventListener('click', closeBudgetModal);

// Byudjet inputida yozish paytida vergul bilan ajratish
monthlyBudgetInput.addEventListener('input', (e) => {
  e.target.value = formatNumberWithCommas(e.target.value);
});

// Byudjet tezkor tugmalari (presets)
document.querySelectorAll('.preset-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    monthlyBudgetInput.value = formatNumberWithCommas(btn.dataset.val);
  });
});

// Byudjetni ushbu oylik kirimga tenglash tugmasi
if (matchBudgetWithIncomeBtn) {
  matchBudgetWithIncomeBtn.addEventListener('click', () => {
    const monthItems = getSelectedMonthTransactions();
    const totalIncome = monthItems
      .filter(i => i.type === 'income')
      .reduce((s, i) => s + (Number(i.amount) || 0), 0);

    if (totalIncome > 0) {
      monthlyBudgetInput.value = formatNumberWithCommas(totalIncome);
    } else {
      alert("Bu oyda hali kirim (daromad) kiritilmagan. Avval kirim qo'shing yoki byudjetni qo'lda belgilang.");
    }
  });
}

// Byudjetni saqlash
saveBudgetBtn.addEventListener('click', () => {
  const cleanStr = monthlyBudgetInput.value.replace(/\D/g, '').trim();
  const val = Number(cleanStr);
  if (!cleanStr || isNaN(val) || val <= 0) {
    alert("Iltimos, 0 dan katta to'g'ri byudjet summasini kiriting!");
    return;
  }
  monthlyBudget = val;
  saveBudget();
  closeBudgetModal();
  renderApp();
});

// Amal turi tanlash (Chiqim / Kirim)
typeExpenseBtn.addEventListener('click', () => setAddType('expense'));
typeIncomeBtn.addEventListener('click', () => setAddType('income'));

// Tarix filtrlari (Barchasi / Chiqim / Kirim)
document.querySelectorAll('.filter-pill').forEach(pill => {
  pill.addEventListener('click', () => {
    document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
    pill.classList.add('active');
    currentFilterType = pill.dataset.filter;
    renderApp();
  });
});

// Amal qo'shish formasi
transactionForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const cleanAmount = transactionAmountInput.value.replace(/\D/g, '').trim();
  const amount = Number(cleanAmount);
  const name = transactionNameInput.value.trim();
  const dateVal = transactionDateInput.value;
  const category = selectedCategoryInput.value;

  if (!cleanAmount || isNaN(amount) || amount <= 0) {
    showError("Iltimos, 0 dan katta to'g'ri summa kiriting.");
    transactionAmountInput.focus();
    return;
  }

  if (!name) {
    showError("Iltimos, amal nomini yozing.");
    transactionNameInput.focus();
    return;
  }

  if (!category) {
    showError("Iltimos, kategoriyalardan birini tanlang.");
    return;
  }

  hideError();

  const dateToSave = dateVal || getLocalDateString();

  const newTransaction = {
    id: Date.now().toString(),
    type: currentAddType, // 'expense' yoki 'income'
    name: name,
    amount: amount,
    category: category,
    date: dateToSave
  };

  // Agar yangi amal boshqa oyga kiritilgan bo'lsa, avtomatik o'sha oyga o'tish
  const parts = dateToSave.split('-');
  if (parts.length >= 2) {
    currentSelectedYear = parseInt(parts[0], 10);
    currentSelectedMonth = parseInt(parts[1], 10) - 1;
  }

  transactions.unshift(newTransaction);
  saveTransactions();
  renderApp();

  // Formani tozalash
  transactionAmountInput.value = '';
  transactionNameInput.value = '';
  initDateInput();
  renderCategoryChips(currentAddType);

  // Bosh sahifaga qaytish
  switchTab('tab-home');
});

// Summa kiritilayotganda real-time vergul bilan ajratish
transactionAmountInput.addEventListener('input', (e) => {
  hideError();
  e.target.value = formatNumberWithCommas(e.target.value);
});
transactionNameInput.addEventListener('input', hideError);

// ================= MAVZU BOSHQARUVI (LIGHT / DARK THEME) =================
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem(STORAGE_THEME, theme);
  updateThemeIcon(theme);
}

function updateThemeIcon(theme) {
  if (!themeIcon) return;
  if (theme === 'light') {
    themeIcon.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
    if (themeToggleBtn) themeToggleBtn.setAttribute('title', "Qorong'u rejimga o'tish");
  } else {
    themeIcon.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
    if (themeToggleBtn) themeToggleBtn.setAttribute('title', "Yorug' rejimga o'tish");
  }
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
  const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
  applyTheme(nextTheme);
}

function initTheme() {
  const savedTheme = localStorage.getItem(STORAGE_THEME) || 'dark';
  applyTheme(savedTheme);
}

if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', toggleTheme);
}

// Sana inputiga bugungi mahalliy sanani qo'yish
function initDateInput() {
  transactionDateInput.value = getLocalDateString();
}

// Dasturni ishga tushirish
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  loadInitialData();
  initDateInput();
  setAddType('expense');
  renderApp();
});
