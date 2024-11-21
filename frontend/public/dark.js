// Отримуємо елементи
const themeToggleCheckbox = document.getElementById('themeToggleCheckbox');

// Перевіряємо, чи є збережена тема у LocalStorage
const currentTheme = localStorage.getItem('theme');

// Встановлюємо тему при завантаженні сторінки
if (currentTheme === 'dark') {
  document.body.classList.add('dark-mode');
  themeToggleCheckbox.checked = true;
} else {
  document.body.classList.remove('dark-mode');
  themeToggleCheckbox.checked = false;
}

// Слухаємо кліки на перемикачі
themeToggleCheckbox.addEventListener('change', () => {
  if (themeToggleCheckbox.checked) {
    document.body.classList.add('dark-mode');
    localStorage.setItem('theme', 'dark');
  } else {
    document.body.classList.remove('dark-mode');
    localStorage.setItem('theme', 'light');
  }
});
