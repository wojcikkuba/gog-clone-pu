// POPRAWIONA SKŁADNIA I LOGIKA
document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("theme-toggle");
  const htmlElement = document.documentElement;
  const fontSizeKeys = { min: 100, max: 200, step: 25 };
  const root = document.documentElement;

  const updateFontSize = (size) => {
    root.style.fontSize = `${size}%`;
    localStorage.setItem("fontSize", size);
  };

  const currentSize = parseInt(localStorage.getItem("fontSize")) || 100;
  updateFontSize(currentSize);

  document.getElementById('font-increase').addEventListener('click', () => {
    const newSize = Math.min(fontSizeKeys.max, currentSize + fontSizeKeys.step);
    if(newSize !== currentSize) updateFontSize(newSize);
  });

  document.getElementById('font-reset').addEventListener('click', () => {
    updateFontSize(100);
  });

  const savedTheme =
    localStorage.getItem("theme") ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light");

  const applyTheme = (isDark) => {
    htmlElement.classList.toggle("dark-theme", isDark);
    themeToggle.checked = isDark;
  };

  applyTheme(savedTheme === "dark");

  themeToggle.addEventListener("change", (e) => {
    const isDark = e.target.checked;
    localStorage.setItem("theme", isDark ? "dark" : "light");
    applyTheme(isDark);
  });
});
