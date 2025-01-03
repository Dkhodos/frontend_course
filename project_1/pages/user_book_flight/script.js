import flights from '../../data/flights.js';
import destinations from '../../data/destinations.js';

document.addEventListener('DOMContentLoaded', function () {
  const tableBody = document.querySelector('.flight-table tbody');
  const originSelect = document.getElementById('origin');
  const destinationSelect = document.getElementById('destination');
  const filterButton = document.getElementById('filter-button');

  function populateTable(flights) {
    tableBody.innerHTML = ''; // Clear existing rows

    flights.forEach((flight) => {
      const row = document.createElement('tr');

      Object.values(flight).forEach((value) => {
        const cell = document.createElement('td');
        cell.textContent = value;
        row.appendChild(cell);
      });

      // Add the "Book" button
      const bookCell = document.createElement('td');
      const bookButton = document.createElement('button');
      bookButton.className = 'button book-link';
      bookButton.textContent = 'Book';
      bookButton.addEventListener('click', () => {
        window.location.href = `../book_flight/index.html?flightNumber=${flight.flightNumber}`;
      });
      bookCell.appendChild(bookButton);
      row.appendChild(bookCell);

      tableBody.appendChild(row);
    });
  }

  // Initial population of the table
  populateTable(flights);

  // Populate the origin and destination select options
  destinations.forEach((destination) => {
    const option = document.createElement('option');
    option.value = destination.code;
    option.textContent = `${destination.name} (${destination.code})`;
    originSelect.appendChild(option.cloneNode(true));
    destinationSelect.appendChild(option);
  });

  // Filter button click event
  filterButton.addEventListener('click', () => {
    const selectedOrigin = originSelect.value;
    const selectedDestination = destinationSelect.value;

    const filteredFlights = flights.filter((flight) => {
      const matchesOrigin = selectedOrigin
        ? flight.originCode === selectedOrigin
        : true;
      const matchesDestination = selectedDestination
        ? flight.destinationCode === selectedDestination
        : true;
      return matchesOrigin && matchesDestination;
    });

    if (filteredFlights.length === 0) {
      alert('No flights found for the selected criteria.');
    }

    populateTable(filteredFlights);
  });
});
