document.addEventListener('DOMContentLoaded', function () {
  fetch('/components/header/index.html')
    .then((response) => response.text())
    .then((data) => {
      document.querySelector('header').innerHTML = data;
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = '/components/header/styles.css';
      document.head.appendChild(link);
    });

  fetch('/components/footer/index.html')
    .then((response) => response.text())
    .then((data) => {
      document.querySelector('footer').innerHTML = data;
      const footerLink = document.createElement('link');
      footerLink.rel = 'stylesheet';
      footerLink.href = '/components/footer/styles.css';
      document.head.appendChild(footerLink);
    });

  fetch('/components/fonts/index.html')
  .then((response) => response.text())
  .then((data) => {
    // Create a container to parse the fetched HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = data;

    // Append each element from the fetched HTML into the <head>
    Array.from(tempDiv.children).forEach((child) => {
      document.head.appendChild(child);
    });
  })
  .catch((error) => {
    console.error('Error fetching fonts:', error);
  });
});
