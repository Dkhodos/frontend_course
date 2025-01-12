export class SelectOptionsInjector {
  /**
   * Injects options into a <select> element.
   *
   * @param {Object} params - Parameters for the injection.
   * @param {HTMLSelectElement} params.select - The <select> element to populate.
   * @param {Array<{label: string, value: string}>} params.options - An array of options to inject.
   */
  inject({ select, options }) {
    if (!(select instanceof HTMLSelectElement)) {
      throw new Error('The "select" parameter must be an HTMLSelectElement.');
    }

    if (!Array.isArray(options)) {
      throw new Error('The "options" parameter must be an array.');
    }

    // Clear existing options
    this.#clearOptions(select);

    // Populate new options
    this.#populateOptions(select, options);
  }

  /**
   * Clears all existing options from the <select> element.
   *
   * @param {HTMLSelectElement} select - The <select> element to clear.
   * @private
   */
  #clearOptions(select) {
    select.innerHTML = '';
  }

  /**
   * Populates the <select> element with new options.
   *
   * @param {HTMLSelectElement} select - The <select> element to populate.
   * @param {Array<{label: string, value: string}>} options - An array of options to inject.
   * @private
   */
  #populateOptions(select, options) {
    options.forEach(({ label, value }) => {
      if (typeof label !== 'string' || typeof value !== 'string') {
        throw new Error(
          'Each option must have a "label" and "value" of type string.'
        );
      }

      const optionElement = document.createElement('option');
      optionElement.value = value;
      optionElement.textContent = label;

      select.appendChild(optionElement);
    });
  }
}
