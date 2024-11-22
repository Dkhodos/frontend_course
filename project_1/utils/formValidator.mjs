export class FormValidator {
  /**
   * Creates a FormValidator instance.
   *
   * @param {Object} params - Parameters for form validation.
   * @param {HTMLFormElement} params.form - The form element to validate.
   * @param {Array<{inputId: string, validationCallback: Function, errorMessage?: string}>} params.validations - An array of validation rules.
   */
  constructor({ form, validations }) {
    this.form = form;
    this.validations = validations;
  }

  /**
   * Starts the form validation by setting up event listeners.
   */
  start() {
    // Attach the submit event listener
    this.form.addEventListener('submit', this.#onSubmit);

    // Attach input event listeners to clear errors on typing
    this.validations.forEach(({ inputId }) => {
      const inputElement = this.form.querySelector(`#${inputId}`);
      if (inputElement) {
        inputElement.addEventListener('input', () => this.#clearError(inputElement));
      }
    });
  }

  /**
   * Ends the form validation by removing all event listeners.
   */
  end() {
    // Remove the submit event listener
    this.form.removeEventListener('submit', this.#onSubmit);

    // Remove input event listeners
    this.validations.forEach(({ inputId }) => {
      const inputElement = this.form.querySelector(`#${inputId}`);
      if (inputElement) {
        inputElement.removeEventListener('input', () => this.#clearError(inputElement));
      }
    });
  }

  /**
   * Handles the form submission event.
   *
   * @param {Event} event - The submit event.
   */
  #onSubmit = (event) => {
    event.preventDefault();

    let allValid = true;
    const errorMessages = [];

    // Iterate over each validation rule
    this.validations.forEach(({ inputId, validationCallback, errorMessage }) => {
      const inputElement = this.form.querySelector(`#${inputId}`);

      if (!inputElement) {
        console.error(`Input element with id "${inputId}" not found.`);
        allValid = false;
        errorMessages.push(`Input element with id "${inputId}" not found.`);
        return;
      }

      // Extract the input's value and validate
      const value = inputElement.value;
      const isValid = validationCallback(value);

      if (isValid) {
        this.#clearError(inputElement);
      } else {
        allValid = false;
        this.#showError(inputElement);
        errorMessages.push(errorMessage || `Invalid input for ${inputId}.`);
      }
    });

    if (allValid) {
      // All validations passed, submit the form
      this.form.submit();
    } else {
      // Show all error messages in an alert
      alert(`Form validation failed:\n\n${errorMessages.join('\n')}`);
    }
  };

  /**
   * Adds the 'error' class to the input element to visually indicate an error.
   *
   * @param {HTMLElement} inputElement - The input element to mark as invalid.
   */
  #showError = (inputElement) => {
    inputElement.classList.add('error');
  };

  /**
   * Removes the 'error' class from the input element to clear the error indication.
   *
   * @param {HTMLElement} inputElement - The input element to clear errors from.
   */
  #clearError = (inputElement) => {
    inputElement.classList.remove('error');
  };
}
