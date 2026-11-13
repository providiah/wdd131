// Temple Album interactions and dynamic footer information.
const menuButton = document.querySelector(".menu-button");
const navigation = document.querySelector("#primary-navigation");
const menuIcon = document.querySelector(".menu-icon");
const filterLinks = document.querySelectorAll("[data-filter]");
const templeCards = document.querySelectorAll(".temple-card");
const emptyMessage = document.querySelector(".empty-message");

// Set the copyright year and the document's last-modified date.
document.querySelector("#current-year").textContent = new Date().getFullYear();
const modifiedDate = new Date(document.lastModified);
document.querySelector("#last-modified").textContent =
  Number.isNaN(modifiedDate.getTime())
    ? "Date unavailable"
    : modifiedDate.toLocaleString(undefined, {
        year: "numeric", month: "long", day: "numeric"
      });

// Toggle the mobile navigation and update its accessible state.
menuButton.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
  menuIcon.textContent = isOpen ? "×" : "☰";
});

function closeMobileMenu() {
  navigation.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Open navigation menu");
  menuIcon.textContent = "☰";
}

// The five menu links filter the album without reloading the page.
filterLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const filter = link.dataset.filter;
    let visibleCount = 0;

    templeCards.forEach((card) => {
      const matches =
        filter === "all" ||
        card.dataset.year === filter ||
        card.dataset.size === filter;
      card.hidden = !matches;
      if (matches) visibleCount += 1;
    });

    filterLinks.forEach((item) => {
      item.classList.toggle("active", item === link);
      if (item === link) {
        item.setAttribute("aria-current", "page");
      } else {
        item.removeAttribute("aria-current");
      }
    });

    emptyMessage.hidden = visibleCount !== 0;
    closeMobileMenu();
  });
});

// Close the mobile menu with Escape for keyboard users.
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMobileMenu();
});

// If the viewport becomes desktop-sized, clear the mobile menu state.
window.addEventListener("resize", () => {
  if (window.matchMedia("(min-width: 700px)").matches) closeMobileMenu();
});
