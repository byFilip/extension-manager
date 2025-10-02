import "./style.scss";
console.log("main loaded");

//   1.	First visit (no localStorage set yet):
// 	  •	The site reads the OS preference (prefers-color-scheme) and sets the theme accordingly.
// 	  •	This is your default behavior—your first impression matches the OS.
//  2.	User manually selects a theme on the site:
// 	  •	That selection is saved in localStorage (colorMode).
// 	  •	From now on, the site will use this stored preference regardless of OS changes.
//   3.	Reload / subsequent visits:
// 	  •	localStorage has priority over OS preference.
//  	•	So if the user picked “dark” before, the site stays dark even if the OS switches to light.
//  4.	If the user has never picked a theme:
//  	•	OS preference is applied.
//  	•	If OS changes, the site reacts dynamically.

// =====================
// Theme toggle
// =====================
const btn = document.querySelector(".header__button");
const moon = document.querySelector("#iconMoon");
const sun = document.querySelector("#iconSun");

// Apply theme and update icons + localStorage
function applyTheme(mode) {
  document.body.className = mode;
  if (mode === "dark") {
    moon.classList.add("is-hidden");
    sun.classList.remove("is-hidden");
    moon.setAttribute("aria-hidden", "true");
    sun.setAttribute("aria-hidden", "false");
  } else {
    moon.classList.remove("is-hidden");
    sun.classList.add("is-hidden");
    moon.setAttribute("aria-hidden", "false");
    sun.setAttribute("aria-hidden", "true");
  }
}

// Determine initial theme
function initializeTheme() {
  const stored = localStorage.getItem("colorMode");
  if (stored) {
    // Use user's saved preference
    applyTheme(stored);
  } else {
    // First visit → use OS preference
    const osPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    applyTheme(osPrefersDark ? "dark" : "light");
  }
}

// Toggle theme on button click
btn.addEventListener("click", () => {
  const current = document.body.classList.contains("dark") ? "dark" : "light";
  const next = current === "dark" ? "light" : "dark";

  applyTheme(next);
  // Save user's choice to localStorage
  localStorage.setItem("colorMode", next);
});

// Listen for OS preference changes **only if user has not made a selection**
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (e) => {
    const stored = localStorage.getItem("colorMode");
    if (!stored) {
      applyTheme(e.matches ? "dark" : "light");
    }
  });

// Initialize on page load
initializeTheme();

// =====================
// Card filtering
// =====================
const listAll = document.querySelector("#listAll");
const listActive = document.querySelector("#listActive");
const listInactive = document.querySelector("#listInactive");
const cards = document.querySelectorAll(".card");

function filterCards(filter) {
  cards.forEach((card) => {
    const activeRadio = card.querySelector('input[id^="active-"]');

    // Always hide removed cards
    if (card.classList.contains("is-removed")) {
      card.classList.add("is-hidden");
      return;
    }

    if (filter === "all") card.classList.remove("is-hidden");
    else if (filter === "active")
      card.classList.toggle("is-hidden", !activeRadio.checked);
    else if (filter === "inactive")
      card.classList.toggle("is-hidden", activeRadio.checked);
  });
}

function setActiveButton(activeBtn) {
  [listAll, listActive, listInactive].forEach((btn) =>
    btn.classList.remove("is-active")
  );
  activeBtn.classList.add("is-active");

  listAll.setAttribute(
    "aria-pressed",
    activeBtn === listAll ? "true" : "false"
  );
  listActive.setAttribute(
    "aria-pressed",
    activeBtn === listActive ? "true" : "false"
  );
  listInactive.setAttribute(
    "aria-pressed",
    activeBtn === listInactive ? "true" : "false"
  );
}

// List button event listeners
listAll.addEventListener("click", () => {
  setActiveButton(listAll);
  filterCards("all");
});
listActive.addEventListener("click", () => {
  setActiveButton(listActive);
  filterCards("active");
});
listInactive.addEventListener("click", () => {
  setActiveButton(listInactive);
  filterCards("inactive");
});

// =====================
// Remove and reset cards
// =====================
const removeBtns = document.querySelectorAll(".card__remove");
const resetBtn = document.querySelector("#resetBtn");

removeBtns.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    cards[index].classList.add("is-removed");
    // reapply filter after removing
    if (listAll.classList.contains("is-active")) filterCards("all");
    else if (listActive.classList.contains("is-active")) filterCards("active");
    else filterCards("inactive");
  });
});

resetBtn.addEventListener("click", () => {
  cards.forEach((card) => {
    card.classList.remove("is-removed", "is-hidden");
  });

  // reapply current filter
  if (listAll.classList.contains("is-active")) filterCards("all");
  else if (listActive.classList.contains("is-active")) filterCards("active");
  else filterCards("inactive");
});

// =====================
// React to card radio changes immediately
// =====================
cards.forEach((card) => {
  const radios = card.querySelectorAll('input[type="radio"]');
  radios.forEach((radio) => {
    radio.addEventListener("change", () => {
      // Apply current filter when a card changes
      if (listAll.classList.contains("is-active")) filterCards("all");
      else if (listActive.classList.contains("is-active"))
        filterCards("active");
      else filterCards("inactive");
    });
  });
});
