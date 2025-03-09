// Obsługa przełącznika
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

// Sprawdź zapisaną preferencję
const savedTheme = localStorage.getItem('theme') || 
  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

  if(savedTheme === 'dark') {
    htmlElement.setAttribute('data-theme', 'dark');
    themeToggle.checked = true;
  } else {
    htmlElement.removeAttribute('data-theme'); // Dodano czyszczenie atrybutu
    themeToggle.checked = false; // Dodano wymuszenie stanu przełącznika
  }

// Dodaj obsługę kliknięcia
themeToggle.addEventListener('change', function() {
    if(this.checked) {
      htmlElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      htmlElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    }
});
