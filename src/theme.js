console.log("theme loaded");
// =====================
// Theme toggle
// =====================

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

const btn = document.querySelector(".header__button");
const moon = document.querySelector("#iconMoon");
const sun = document.querySelector("#iconSun");

// Apply theme and update icons + localStorage
export function applyTheme(mode) {
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
export function initializeTheme() {
  const stored = localStorage.getItem("colorMode");
  if (stored) {
    applyTheme(stored);
  } else {
    const osPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    applyTheme(osPrefersDark ? "dark" : "light");
  }
}

// Toggle theme on button click
export function setupThemeToggle() {
  btn.addEventListener("click", () => {
    const current = document.body.classList.contains("dark") ? "dark" : "light";
    const next = current === "dark" ? "light" : "dark";

    applyTheme(next);
    localStorage.setItem("colorMode", next);
  });

  // React to OS changes only if user hasn’t chosen a theme
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      const stored = localStorage.getItem("colorMode");
      if (!stored) {
        applyTheme(e.matches ? "dark" : "light");
      }
    });
}
