import {FormValidator} from "../../utils/formValidator.mjs";

(() => {
    const validator = new FormValidator({
        form: document.getElementById('destination-form'),
        validations: [
            {
                inputId: "destinationCode",
                errorMessage: "Destination code can't be empty!",
                validationCallback: (value) => value && value.length > 0,
            },
            {
                inputId: "destinationName",
                errorMessage: "Destination name can't be empty!",
                validationCallback: (value) => value && value.length > 0,
            },
            {
                inputId: "airportName",
                errorMessage: "Airport name can't be empty!",
                validationCallback: (value) => value && value.length > 0,
            },
            {
                inputId: "airportUrl",
                errorMessage: "Airport url must be a valid url",
                validationCallback: (value) => value && value.length > 0,
            },
            {
                inputId: "imageUrl",
                errorMessage: "Image url must be a valid url",
                validationCallback: (value) => value && value.length > 0,
            }
        ],
    });

    validator.start();
})();
