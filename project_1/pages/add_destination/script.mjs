import { FormValidator } from '../../utils/formValidator.mjs';
import destinations from '../../data/destinations.js';
import Destination from '../../classes/destination.js';

(() => {
  const form = document.getElementById('destination-form');

  const validator = new FormValidator({
    form: form,
    validations: [
      {
        inputId: 'destinationCode',
        errorMessage: "Destination code can't be empty!",
        validationCallback: (value) => value && value.length > 0,
      },
      {
        inputId: 'destinationName',
        errorMessage: "Destination name can't be empty!",
        validationCallback: (value) => value && value.length > 0,
      },
      {
        inputId: 'airportName',
        errorMessage: "Airport name can't be empty!",
        validationCallback: (value) => value && value.length > 0,
      },
      {
        inputId: 'airportUrl',
        errorMessage: 'Airport URL must be a valid URL',
        validationCallback: (value) =>
          value && value.length > 0 && isValidURL(value),
      },
      {
        inputId: 'imageUrl',
        errorMessage: 'Image URL must be a valid URL',
        validationCallback: (value) =>
          value && value.length > 0 && isValidURL(value),
      },
      {
        inputId: 'email',
        errorMessage: 'Email must be a valid email address',
        validationCallback: (value) =>
          value && value.length > 0 && isValidEmail(value),
      },
    ],
    onValidSubmit: () => {
      const newDestination = new Destination(
        form.destinationCode.value,
        form.destinationName.value,
        form.airportName.value,
        form.airportUrl.value,
        form.imageUrl.value,
        form.email.value
      );

      // Retrieve existing destinations from localStorage
      const storedDestinations =
        JSON.parse(localStorage.getItem('destinations')) || [];
      storedDestinations.push(newDestination);

      // Save updated destinations to localStorage
      localStorage.setItem('destinations', JSON.stringify(storedDestinations));

      alert(
        `New destination added: ${JSON.stringify(newDestination, null, 2)}`
      );
      window.location.href = '/pages/admin_manage_destinations/index.html';
    },
  });

  validator.start();

  function isValidURL(url) {
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  }

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
})();
