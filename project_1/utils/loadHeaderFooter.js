document.addEventListener("DOMContentLoaded", function() {
  fetch('/pages/header/index.html')
    .then(response => response.text())
    .then(data => {
      document.querySelector('header').innerHTML = data;
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = '/pages/header/styles.css';
      document.head.appendChild(link);
    });
});