import destinations from '../../data/destinations.js';

document.addEventListener('DOMContentLoaded', function () {
  const tableBody = document.querySelector('.destination-table tbody');

  destinations.forEach((destination) => {
    const row = document.createElement('tr');

    Object.values(destination).forEach((value) => {
      const cell = document.createElement('td');
      if (typeof value === 'string' && value.startsWith('http')) {
        const link = document.createElement('a');
        link.href = value;
        link.target = '_blank';
        link.textContent = value;
        cell.appendChild(link);
      } else {
        cell.textContent = value;
      }
      row.appendChild(cell);
    });

    tableBody.appendChild(row);
  });
});
