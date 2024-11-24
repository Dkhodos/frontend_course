import { SelectOptionsInjector } from '../../utils/selectOptionsInjector.mjs';
import { FormValidator } from '../../utils/formValidator.mjs';
import destinations from '../../data/destinations.js';
import Flight from '../../classes/flight.js';

(() => {
  const injector = new SelectOptionsInjector();

  const originOptions = destinations.map((destination) => ({
    label: destination.name + ' (' + destination.code + ')',
    value: destination.code,
  }));

  injector.inject({
    select: document.getElementById('origin'),
    options: originOptions,
  });

  injector.inject({
    select: document.getElementById('destination'),
    options: originOptions,
  });
})();

(() => {
  const flightForm = document.getElementById('flight-form');

  const flightValidator = new FormValidator({
    form: flightForm,
    validations: [
      {
        inputId: 'flightNo',
        errorMessage: "Flight number can't be empty!",
        validationCallback: (value) => value && value.length > 0,
      },
      {
        inputId: 'origin',
        errorMessage: "Origin can't be empty!",
        validationCallback: (value) => value && value.length > 0,
      },
      {
        inputId: 'destination',
        errorMessage: "Destination can't be empty!",
        validationCallback: (value) => value && value.length > 0,
      },
      {
        inputId: 'boardingDate',
        errorMessage: 'Boarding date must be a valid date',
        validationCallback: (value) => value && value.length > 0,
      },
      {
        inputId: 'boardingTime',
        errorMessage: 'Boarding time must be a valid time',
        validationCallback: (value) => value && value.length > 0,
      },
      {
        inputId: 'arrivalDate',
        errorMessage: 'Arrival date must be a valid date',
        validationCallback: (value) => value && value.length > 0,
      },
      {
        inputId: 'arrivalTime',
        errorMessage: 'Arrival time must be a valid time',
        validationCallback: (value) => value && value.length > 0,
      },
      {
        inputId: 'seats',
        errorMessage: 'Seat count must be a valid number',
        validationCallback: (value) => value && !isNaN(value) && value > 0,
      },
    ],
    onValidSubmit: () => {
      const newFlight = new Flight(
        flightForm.flightNo.value,
        flightForm.origin.value,
        flightForm.destination.value,
        flightForm.boardingDate.value,
        flightForm.boardingTime.value,
        flightForm.arrivalDate.value,
        flightForm.arrivalTime.value,
        flightForm.seats.value
      );

      alert(`New flight added: ${JSON.stringify(newFlight, null, 2)}`);
      window.location.href = '/pages/admin_manage_flights/index.html';
    },
  });

  flightValidator.start();
})();
