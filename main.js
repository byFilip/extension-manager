import "./style.scss";

// Toggle theme
/* 
The first time the page is loaded, the color mode set on the preference 
is used and set as 'default' in the local storage. 
Changing the default preferences works the same way as changing the 
color mode using the buttons, if the page is loaded.
When the page is reloaded, whatever is the value set on the local storage
has precedence over the values in the preference. If the preference
changed after the page was visited - and the page is not loaded - 
the last value saved on the local storage is loaded. 
*/

const btn = document.querySelector(".header__button");
const moon = document.querySelector("#iconMoon");
const sun = document.querySelector("#iconSun");

// Apply classes + icons
function applyTheme(mode) {
  document.body.className = mode;
  localStorage.setItem("colorMode", mode);

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

// Load theme on startup
const stored = localStorage.getItem("colorMode");
if (stored) {
  applyTheme(stored);
} else {
  applyTheme(
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  );
}

// Toggle theme on button click
btn.addEventListener("click", () => {
  const current = document.body.classList.contains("dark") ? "dark" : "light";
  applyTheme(current === "dark" ? "light" : "dark");
});

// React to system preference change
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (e) => {
    applyTheme(e.matches ? "dark" : "light");
  });


// Toggle card filter

const listAll = document.querySelector("#listAll");
const listActive = document.querySelector("#listActive");
const listInactive = document.querySelector("#listInactive");
const cards = document.querySelectorAll(".card");

// Helper: filter cards based on button pressed
function filterCards(filter) {
  cards.forEach((card) => {
    const activeRadio = card.querySelector('input[id^="active-"]');

    // "All" → show all cards
    if (filter === "all") {
      card.classList.remove("is-hidden");
    }

    // "Active" → show if active radio is checked
    else if (filter === "active") {
      if (activeRadio.checked) {
        card.classList.remove("is-hidden");
      } else {
        card.classList.add("is-hidden");
      }
    }

    // "Inactive" → show if active radio is NOT checked
    else if (filter === "inactive") {
      if (!activeRadio.checked) {
        card.classList.remove("is-hidden");
      } else {
        card.classList.add("is-hidden");
      }
    }
  });
}

// Event listeners for buttons
listAll.addEventListener("click", () => {
  listAll.classList.add("is-active");
  listActive.classList.remove("is-active");
  listInactive.classList.remove("is-active");

  listAll.setAttribute("aria-pressed", "true");
  listActive.setAttribute("aria-pressed", "false");
  listInactive.setAttribute("aria-pressed", "false");

  filterCards("all");
});

listActive.addEventListener("click", () => {
  listAll.classList.remove("is-active");
  listActive.classList.add("is-active");
  listInactive.classList.remove("is-active");

  listAll.setAttribute("aria-pressed", "false");
  listActive.setAttribute("aria-pressed", "true");
  listInactive.setAttribute("aria-pressed", "false");

  filterCards("active");
});

listInactive.addEventListener("click", () => {
  listAll.classList.remove("is-active");
  listActive.classList.remove("is-active");
  listInactive.classList.add("is-active");

  listAll.setAttribute("aria-pressed", "false");
  listActive.setAttribute("aria-pressed", "false");
  listInactive.setAttribute("aria-pressed", "true");

  filterCards("inactive");
});


// Remove and reset cards
const removeBtns = document.querySelectorAll(".card__remove");
const resetBtn = document.querySelector("#resetBtn");

// Remove individual cards
removeBtns.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    cards[index].classList.add("is-hidden");
  });
});

// Reset all cards
resetBtn.addEventListener("click", () => {
  cards.forEach(card => card.classList.remove("is-hidden"));
});
