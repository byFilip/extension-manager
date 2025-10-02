console.log("cards loaded");

export function initCards() {
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
      else if (listActive.classList.contains("is-active"))
        filterCards("active");
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
}
