import flights from '../../data/flights.js';

document.addEventListener('DOMContentLoaded', function () {
  const tableBody = document.querySelector('.flight-table tbody');

  flights.forEach((flight) => {
    const row = document.createElement('tr');

    Object.values(flight).forEach((value) => {
      const cell = document.createElement('td');
      cell.textContent = value;
      row.appendChild(cell);
    });

    tableBody.appendChild(row);
  });
});
