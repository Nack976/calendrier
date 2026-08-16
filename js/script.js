/* ============================================================
   CALENDRIER DE L'AVENT — logique
   Tout le contenu éditable se trouve dans js/data.js
   ============================================================ */

(function () {
  "use strict";

  const MONTH_NAMES = ["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre"];

  /* ----------------------------------------------------------
     0. Date "aujourd'hui", avec surcharge de test via ?date=
        Exemple : monsite.com/?date=2025-12-15
     ---------------------------------------------------------- */
  function getToday() {
    const params = new URLSearchParams(window.location.search);
    const override = params.get("date");
    if (override && /^\d{4}-\d{2}-\d{2}$/.test(override)) {
      const [y, m, d] = override.split("-").map(Number);
      return new Date(y, m - 1, d);
    }
    return new Date();
  }

  function stripTime(date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  function getUnlockDate(entry) {
    if (entry.unlockDate) {
      const [y, m, d] = entry.unlockDate.split("-").map(Number);
      return new Date(y, m - 1, d);
    }
    return new Date(CALENDAR_YEAR, 11, entry.day); // décembre = mois 11
  }

  const today = stripTime(getToday());

  /* ----------------------------------------------------------
     1. Positions des 24 ornements sur la silhouette du sapin
        (organisées en rangées, du sommet vers la base)
     ---------------------------------------------------------- */
  function buildPositions() {
    const rows = [
      { count: 2, y: 11, spread: 16 },
      { count: 3, y: 23, spread: 28 },
      { count: 4, y: 38, spread: 42 },
      { count: 4, y: 54, spread: 56 },
      { count: 5, y: 70, spread: 70 },
      { count: 6, y: 88, spread: 84 }
    ];
    const positions = [];
    rows.forEach((row, rowIndex) => {
      for (let i = 0; i < row.count; i++) {
        const left = 50 - row.spread / 2 + (row.spread * (i + 0.5)) / row.count;
        const jitter = (i % 2 === 0 ? -1 : 1) * 1.6;
        positions.push({ top: row.y + jitter, left: left });
      }
      void rowIndex;
    });
    return positions;
  }

  /* ----------------------------------------------------------
     2. Rendu des cases sur le sapin
     ---------------------------------------------------------- */
  const ornamentsLayer = document.getElementById("ornaments");
  const positions = buildPositions();
  let openedDays = [];
  try {
    openedDays = JSON.parse(localStorage.getItem("advent-opened") || "[]");
  } catch (e) {
    openedDays = [];
  }

  function persistOpened() {
    try {
      localStorage.setItem("advent-opened", JSON.stringify(openedDays));
    } catch (e) { /* stockage indisponible, tant pis */ }
  }

  CALENDAR_DAYS
    .slice()
    .sort((a, b) => a.day - b.day)
    .forEach((entry, index) => {
      const pos = positions[index] || { top: 50, left: 50 };
      const unlockDate = stripTime(getUnlockDate(entry));
      const isUnlocked = today.getTime() >= unlockDate.getTime();
      const isToday = today.getTime() === unlockDate.getTime();

      const cell = document.createElement("button");
      cell.type = "button";
      cell.className = "day-cell " + (isUnlocked ? "available" : "locked");
      if (isToday) cell.classList.add("today");
      if (openedDays.includes(entry.day)) cell.classList.add("opened");
      cell.style.top = pos.top + "%";
      cell.style.left = pos.left + "%";
      cell.setAttribute("aria-label", "Jour " + entry.day + (isUnlocked ? "" : " (verrouillé)"));
      cell.innerHTML = '<span class="num">' + entry.day + "</span>";

      cell.addEventListener("click", function () {
        if (isUnlocked) {
          openDay(entry, cell);
        } else {
          const monthLabel = MONTH_NAMES[unlockDate.getMonth()];
          showToast("Patience… ce cadeau sera disponible le " + unlockDate.getDate() + " " + monthLabel + " 🎄");
        }
      });

      ornamentsLayer.appendChild(cell);
    });

  /* ----------------------------------------------------------
     3. Toast pour les cases verrouillées
     ---------------------------------------------------------- */
  const toastEl = document.getElementById("toast");
  let toastTimer = null;
  function showToast(message) {
    toastEl.textContent = message;
    toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove("show"), 2600);
  }

  /* ----------------------------------------------------------
     4. Modal d'ouverture d'une case
     ---------------------------------------------------------- */
  const overlay = document.getElementById("modal-overlay");
  const modalDay = document.getElementById("modal-day");
  const modalTitle = document.getElementById("modal-title");
  const modalDesc = document.getElementById("modal-desc");
  const modalLink = document.getElementById("modal-link");
  const modalClose = document.getElementById("modal-close");

  function openDay(entry, cellEl) {
    cellEl.classList.add("opening");
    setTimeout(() => cellEl.classList.remove("opening"), 600);

    if (!openedDays.includes(entry.day)) {
      openedDays.push(entry.day);
      persistOpened();
    }
    cellEl.classList.add("opened");

    modalDay.textContent = "Jour " + entry.day;
    modalTitle.textContent = entry.title || ("Jour " + entry.day);
    if (entry.description) {
      modalDesc.textContent = entry.description;
      modalDesc.style.display = "";
    } else {
      modalDesc.style.display = "none";
    }
    if (entry.link) {
      modalLink.href = entry.link;
      modalLink.textContent = entry.linkText || "Découvrir";
      modalLink.style.display = "";
    } else {
      modalLink.style.display = "none";
    }

    overlay.classList.add("show");
    modalClose.focus();
  }

  function closeModal() {
    overlay.classList.remove("show");
  }
  modalClose.addEventListener("click", closeModal);
  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) closeModal();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeModal();
  });

  /* ----------------------------------------------------------
     5. Lumières scintillantes décoratives sur le sapin
     ---------------------------------------------------------- */
  const lightsLayer = document.getElementById("lights");
  const LIGHT_COUNT = 46;
  for (let i = 0; i < LIGHT_COUNT; i++) {
    const t = i / LIGHT_COUNT;
    const row = Math.min(5, Math.floor(t * 6));
    const rowSpreads = [18, 30, 44, 56, 68, 84];
    const rowYs = [11, 24, 38, 53, 68, 83];
    const left = 50 + (Math.sin(i * 12.9898) * 0.5) * rowSpreads[row];
    const top = rowYs[row] + Math.cos(i * 7.233) * 4;
    const dot = document.createElement("span");
    dot.className = "light-dot";
    dot.style.left = left + "%";
    dot.style.top = top + "%";
    dot.style.animationDelay = (i % 10) * 0.22 + "s";
    if (i % 3 === 0) dot.style.background = "#ffe4a8";
    else if (i % 3 === 1) dot.style.background = "#ffb3a0";
    else dot.style.background = "#f7f3e6";
    lightsLayer.appendChild(dot);
  }

  /* ----------------------------------------------------------
     6. Neige animée (canvas, légère et peu coûteuse)
     ---------------------------------------------------------- */
  const canvas = document.getElementById("snow-canvas");
  const ctx = canvas.getContext("2d");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let flakes = [];
  let w, h;

  function resizeCanvas() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  function initFlakes() {
    const count = Math.min(90, Math.floor((w * h) / 22000));
    flakes = new Array(count).fill(0).map(() => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 2 + 0.6,
      speed: Math.random() * 0.6 + 0.25,
      drift: Math.random() * 0.6 - 0.3,
      opacity: Math.random() * 0.5 + 0.3
    }));
  }
  function drawFlakes() {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "#f4f2ea";
    flakes.forEach((f) => {
      ctx.globalAlpha = f.opacity;
      ctx.beginPath();
      ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
      ctx.fill();
      f.y += f.speed;
      f.x += f.drift;
      if (f.y > h) { f.y = -4; f.x = Math.random() * w; }
      if (f.x > w) f.x = 0;
      if (f.x < 0) f.x = w;
    });
    ctx.globalAlpha = 1;
    if (!reduceMotion) requestAnimationFrame(drawFlakes);
  }

  resizeCanvas();
  initFlakes();
  window.addEventListener("resize", () => { resizeCanvas(); initFlakes(); });
  if (!reduceMotion) requestAnimationFrame(drawFlakes);
  else drawFlakes();
})();
