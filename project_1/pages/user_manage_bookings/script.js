import bookings from '../../data/bookings.js';
import flights from '../../data/flights.js';
import destinations from '../../data/destinations.js';

document.addEventListener('DOMContentLoaded', function () {
  const mainContent = document.querySelector('.main-content');

  bookings.forEach((booking) => {
    const flight = flights.find((f) => f.flightNumber === booking.flightNumber);
    const destination = destinations.find(
      (d) => d.code === flight.destinationCode
    );

    if (flight) {
      const bookingDiv = document.createElement('div');
      bookingDiv.classList.add('booking');

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

      const bookingInfoDiv = document.createElement('div');
      bookingInfoDiv.classList.add('booking-info');
      bookingInfoDiv.innerHTML = `
        <p>
          <strong>Origin:</strong> ${flight.originCode}
          <strong>Boarding:</strong> ${flight.boardingDate} ${flight.boardingTime}
        </p>
        <p>
          <strong>Destination:</strong> ${flight.destinationCode}
          <strong>Landing:</strong> ${flight.arrivalDate} ${flight.arrivalTime}
        </p>
        <p><strong>No. of passengers:</strong> ${booking.passengerCount}</p>
      `;

      bookingDiv.appendChild(destinationImageDiv);
      bookingDiv.appendChild(bookingInfoDiv);
      mainContent.appendChild(bookingDiv);
    }
  });
});
