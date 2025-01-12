import bookings from '../../data/bookings.js';
import flights from '../../data/flights.js';
import destinations from '../../data/destinations.js';

document.addEventListener('DOMContentLoaded', function () {
  const mainContent = document.querySelector('.bookings-main-wrapper');

  bookings.forEach((booking) => {
    const flight = flights.find((f) => f.flightNumber === booking.flightNumber);
    const destination = destinations.find(
      (d) => d.code === flight?.destinationCode
    );

    if (flight) {
      const bookingDiv = document.createElement('div');
      bookingDiv.classList.add('booking');

      // Destination image section
      const destinationImageDiv = document.createElement('div');
      destinationImageDiv.classList.add('destination-image');

      if (destination && destination.imageUrl) {
        const img = document.createElement('img');
        img.src = destination.imageUrl;
        img.alt = destination.name;
        img.width = 100;
        img.height = 100;
        destinationImageDiv.appendChild(img);
      } else {
        destinationImageDiv.innerHTML = '<p>No Image</p>';
      }

      // Booking information section
      const bookingInfoDiv = document.createElement('div');
      bookingInfoDiv.classList.add('booking-info');

      bookingInfoDiv.innerHTML = `
        <div class="booking-info-data">
          <div class="booking-info-data-row">
            <span class="booking-info-data-label">Origin:</span>
            <span class="booking-info-data-value">${flight.originCode}</span>
            <span class="booking-info-data-label">Boarding:</span>
            <span class="booking-info-data-value">${flight.boardingDate} ${flight.boardingTime}</span>
          </div>
          <div class="booking-info-data-row">
            <span class="booking-info-data-label">Destination:</span>
            <span class="booking-info-data-value">${flight.destinationCode}</span>
            <span class="booking-info-data-label">Landing:</span>
            <span class="booking-info-data-value">${flight.arrivalDate} ${flight.arrivalTime}</span>
          </div>
          <div class="booking-info-data-row single-row">
            <span class="booking-info-data-label">No. of passengers:</span>
            <span class="booking-info-data-value">${booking.passengerCount}</span>
          </div>
        </div>
      `;

      bookingDiv.appendChild(destinationImageDiv);
      bookingDiv.appendChild(bookingInfoDiv);
      mainContent.appendChild(bookingDiv);
    }
  });
});
