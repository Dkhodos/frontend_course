import { FormValidator } from '../../utils/formValidator.mjs';
import flights from '../../data/flights.js';

document.addEventListener('DOMContentLoaded', function () {
  const urlParams = new URLSearchParams(window.location.search);
  const flightNumber = urlParams.get('flightNumber');
  const passengerCountInput = document.getElementById('passengerCount');
  const passengerFieldsContainer = document.querySelector('.passenger-fields');
  const bookingForm = document.querySelector('.booking-form');
  let availableSeats = 0;

  if (flightNumber) {
    const flight = flights.find((f) => f.flightNumber === flightNumber);

    if (flight) {
      availableSeats = flight.seatCount;
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
        <div class="passenger-number-text">
          <h5>Passenger ${i}</h5>
          <div class="passenger-image">
              <img src="../../public/passenger.svg" alt="passenger image">
          </div>
        </div>
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

  function validatePassengerFields() {
    const passengerCount = parseInt(passengerCountInput.value, 10);
    const passengers = [];
    let allValid = true;

    for (let i = 1; i <= passengerCount; i++) {
      const nameInput = document.getElementById(`name${i}`);
      const passportIdInput = document.getElementById(`passport${i}`);
      const name = nameInput.value.trim();
      const passportId = passportIdInput.value.trim();

      if (!name || !passportId) {
        nameInput.classList.add('error');
        passportIdInput.classList.add('error');
        allValid = false;
      } else {
        nameInput.classList.remove('error');
        passportIdInput.classList.remove('error');
        passengers.push({ name, passportId });
      }
    }

    if (!allValid) {
      alert('Please fill in all passenger fields.');
      return false;
    }

    return passengers;
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

  const bookingValidator = new FormValidator({
    form: bookingForm,
    validations: [
      {
        inputId: 'passengerCount',
        errorMessage:
          'Passenger count must be a valid number (Check available seats)',
        validationCallback: (value) =>
          value && !isNaN(value) && value > 0 && value <= availableSeats,
      },
    ],
    onValidSubmit: () => {
      const passengers = validatePassengerFields();
      if (passengers) {
        const booking = {
          flightNumber,
          passengers,
        };

        alert(`Booking created: ${JSON.stringify(booking, null, 2)}`);
      }
    },
  });

  bookingValidator.start();
});
