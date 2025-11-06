document.addEventListener('DOMContentLoaded', function() {
    // Selecteer de inputvelden en tekstvelden
    var inputFields = document.querySelectorAll("input, textarea");

    // Voeg event listeners toe voor het controleren van validiteit bij het verlaten van een veld
    inputFields.forEach(function(input) {
        input.addEventListener("blur", function() {
            // Controleer de validiteit van het veld en voeg een CSS-klasse toe voor visuele feedback
            if (!input.checkValidity()) {
                input.classList.add("invalid");
            } else {
                input.classList.remove("invalid");
            }
        });
    });

    // Haal referenties op naar de inputvelden en error-berichten
    var naamInput = document.getElementById('naam');
    var bedrijfInput = document.getElementById('bedrijf');
    var emailInput = document.getElementById('email');
    var onderwerpInput = document.getElementById('onderwerp');
    var berichtInput = document.getElementById('bericht');
    var naamError = document.getElementById('naamError');
    var bedrijfError = document.getElementById('bedrijfError');
    var emailError = document.getElementById('emailError');
    var onderwerpError = document.getElementById('onderwerpError');
    var berichtError = document.getElementById('berichtError');

    // Voeg event listeners toe voor validatie van elk inputveld bij het verlaten ervan
    naamInput.addEventListener('blur', function() {
        // Controleer of het naamveld geldig is en toon een foutmelding indien nodig
        if (!naamInput.validity.valid) {
            naamError.textContent = 'Vul alsjeblieft jouw naam in';
            naamError.style.visibility = 'visible'; // Toon de foutmelding
        } else {
            naamError.style.visibility = 'hidden'; // Verberg de foutmelding
        }
    });

    bedrijfInput.addEventListener('blur', function() {
        // Controleer of het bedrijfsveld geldig is en toon een foutmelding indien nodig
        if (!bedrijfInput.validity.valid) {
            bedrijfError.textContent = 'Vul alsjeblieft jouw bedrijf in';
            bedrijfError.style.visibility = 'visible'; // Toon de foutmelding
        } else {
            bedrijfError.style.visibility = 'hidden'; // Verberg de foutmelding
        }
    });

    emailInput.addEventListener('blur', function() {
        // Controleer of het e-mailveld geldig is en toon een foutmelding indien nodig
        if (!emailInput.validity.valid) {
            emailError.textContent = 'Vul alsjeblieft een geldig email-adres in';
            emailError.style.visibility = 'visible'; // Toon de foutmelding
        } else {
            emailError.style.visibility = 'hidden'; // Verberg de foutmelding
        }
    });

    onderwerpInput.addEventListener('blur', function() {
        // Controleer of het onderwerpveld geldig is en toon een foutmelding indien nodig
        if (!onderwerpInput.validity.valid) {
            onderwerpError.textContent = 'Vul alsjeblieft het onderwerp in';
            onderwerpError.style.visibility = 'visible'; // Toon de foutmelding
        } else {
            onderwerpError.style.visibility = 'hidden'; // Verberg de foutmelding
        }
    });

    berichtInput.addEventListener('blur', function() {
        // Controleer of het berichtveld geldig is en toon een foutmelding indien nodig
        if (!berichtInput.validity.valid) {
            berichtError.textContent = 'Vul alsjeblieft het bericht in';
            berichtError.style.visibility = 'visible'; // Toon de foutmelding
        } else {
            berichtError.style.visibility = 'hidden'; // Verberg de foutmelding
        }
    });

    // Nieuwe code toegevoegd
    inputFields.forEach(function(input) {
        input.addEventListener("blur", function() {
            // Controleer of het veld geldig is en pas de validatiestijl aan
            if (!input.checkValidity()) {
                input.classList.add("invalid");
            } else {
                input.classList.remove("invalid");
            }
        });
    });
});
