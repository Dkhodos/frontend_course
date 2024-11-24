document.addEventListener('DOMContentLoaded', function () {
  fetch('/pages/header/index.html')
    .then((response) => response.text())
    .then((data) => {
      document.querySelector('header').innerHTML = data;
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = '/pages/header/styles.css';
      document.head.appendChild(link);
    });

  fetch('/pages/footer/index.html')
    .then((response) => response.text())
    .then((data) => {
      document.querySelector('footer').innerHTML = data;
      const footerLink = document.createElement('link');
      footerLink.rel = 'stylesheet';
      footerLink.href = '/pages/footer/styles.css';
      document.head.appendChild(footerLink);
    });
});
