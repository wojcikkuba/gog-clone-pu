document.addEventListener("DOMContentLoaded", () => {
  const scrollToPromotions = () => {
    const promotionsSection = document.getElementById("promotions");
    if (promotionsSection) {
      promotionsSection.scrollIntoView({ behavior: "smooth" });
    } else {
      console.error("Sekcja 'promotions' nie została znaleziona.");
    }
  };
  window.scrollToPromotions = scrollToPromotions;

  const links = document.querySelectorAll("a[href^='#']");
  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  const scrollToTopButton = document.getElementById("scroll-to-top");
  const toggleScrollToTopButton = () => {
    if (window.scrollY > window.innerHeight) {
      scrollToTopButton.classList.add("visible");
    } else {
      scrollToTopButton.classList.remove("visible");
    }
  };
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  window.addEventListener("scroll", toggleScrollToTopButton);
  scrollToTopButton.addEventListener("click", scrollToTop);

  const contrastToggle = document.getElementById("contrast-toggle");
  const body = document.body;
  const icon = contrastToggle.querySelector("i");

  const toggleContrast = () => {
    const isHighContrast = body.classList.toggle("high-contrast");
    localStorage.setItem("highContrast", isHighContrast);
    icon.className = isHighContrast ? "fas fa-eye-slash" : "fas fa-eye";
  };

  contrastToggle.addEventListener("click", toggleContrast);

  const savedContrast = localStorage.getItem("highContrast") === "true";
  if (savedContrast) {
    body.classList.add("high-contrast");
    icon.className = "fas fa-eye-slash";
  }

  const htmlElement = document.documentElement;
  const fontSizeKeys = { min: 100, max: 200, step: 25 };
  const root = document.documentElement;

  const updateFontSize = (size) => {
    root.style.fontSize = `${size}%`;
    localStorage.setItem("fontSize", size);
  };

  let currentSize = parseInt(localStorage.getItem("fontSize")) || 100;
  updateFontSize(currentSize);

  document.getElementById('font-increase').addEventListener('click', () => {
    const newSize = Math.min(fontSizeKeys.max, currentSize + fontSizeKeys.step);
    if (newSize !== currentSize) {
      currentSize = newSize;
      updateFontSize(newSize);
    }
  });

  document.getElementById('font-reset').addEventListener('click', () => {
    currentSize = 100;
    updateFontSize(100);
  });

  const themeToggle = document.getElementById("theme-toggle");
  const savedTheme = localStorage.getItem("theme") ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

  const applyTheme = (isDark) => {
    htmlElement.setAttribute("data-theme", isDark ? "dark" : "light");
    themeToggle.checked = isDark;
  };

  applyTheme(savedTheme === "dark");

  themeToggle.addEventListener("change", (e) => {
    const isDark = e.target.checked;
    localStorage.setItem("theme", isDark ? "dark" : "light");
    applyTheme(isDark);
  });
});
