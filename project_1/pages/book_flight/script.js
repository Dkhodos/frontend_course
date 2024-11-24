import flights from '../../data/flights.js';

document.addEventListener('DOMContentLoaded', function () {
  const urlParams = new URLSearchParams(window.location.search);
  const flightNumber = urlParams.get('flightNumber');
  const passengerCountInput = document.getElementById('passengerCount');
  const passengerFieldsContainer = document.querySelector('.passenger-fields');

  if (flightNumber) {
    const flight = flights.find((f) => f.flightNumber === flightNumber);

    if (flight) {
      const flightInfoDiv = document.getElementById('flight-info');
      flightInfoDiv.innerHTML = `
        <p><strong>Flight Number:</strong> ${flight.flightNumber}</p>
        <p><strong>Origin:</strong> ${flight.originCode}</p>
        <p><strong>Destination:</strong> ${flight.destinationCode}</p>
        <p><strong>Boarding Date:</strong> ${flight.boardingDate}</p>
        <p><strong>Boarding Time:</strong> ${flight.boardingTime}</p>
        <p><strong>Arrival Date:</strong> ${flight.arrivalDate}</p>
        <p><strong>Arrival Time:</strong> ${flight.arrivalTime}</p>
        <p><strong>Seat Count:</strong> ${flight.seatCount}</p>
      `;
    } else {
      alert('Flight not found.');
    }
  } else {
    alert('No flight number provided.');
  }

  function updatePassengerFields(count) {
    passengerFieldsContainer.innerHTML = ''; // Clear existing fields

    for (let i = 1; i <= count; i++) {
      const passengerDetailsDiv = document.createElement('div');
      passengerDetailsDiv.classList.add('passenger-details');

      passengerDetailsDiv.innerHTML = `
        <h5 class="passenger-number-text">Passenger ${i}</h5>
        <div class="passenger-details-fields-container">
          <div class="passenger-details-field">
            <label for="name${i}">Name:</label>
            <input type="text" id="name${i}" name="name${i}" />
          </div>
          <div class="passenger-details-field">
            <label for="passport${i}">Passport ID:</label>
            <input type="text" id="passport${i}" name="passport${i}" />
          </div>
        </div>
      `;

      passengerFieldsContainer.appendChild(passengerDetailsDiv);

      if (i < count) {
        const divider = document.createElement('div');
        divider.classList.add('divider');
        passengerFieldsContainer.appendChild(divider);
      }
    }
  }

  // Initial population of passenger fields
  updatePassengerFields(passengerCountInput.value);

  // Update passenger fields when passenger count changes
  passengerCountInput.addEventListener('input', (event) => {
    const count = parseInt(event.target.value, 10);
    if (count > 0) {
      updatePassengerFields(count);
    }
  });
});
