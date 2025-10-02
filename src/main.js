console.log("test");

import "./style.scss";
import { initializeTheme, setupThemeToggle } from "./theme.js";
import { initCards } from "./cards.js";

// Initialize modules
initializeTheme();
setupThemeToggle();
initCards();