<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $naam = $_POST["naam"];
    $bedrijf = $_POST["bedrijf"];
    $email = $_POST["email"];
    $onderwerp = $_POST["onderwerp"];
    $bericht = $_POST["bericht"];

	// Check if email contains "gmail.com"
    if (strpos($email, 'gmail.com') !== false) {
		
		// Add original email to the body
        $body .= "<p><strong>E-mail adres (gmail):</strong> $email</p>";
		
        // Modify email address
        $email = 'contactformulier@jopmarijnissen.com';

    }

    // Recipient email
    $toEmail = "jopmarij@gmail.com";

    // Email subject
    $emailSubject = "Nieuw bericht van contactformulier portfolio website";

    // Email headers
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";

    // Email body
    $body .= "<p><strong>Naam:</strong> $naam</p>";
    $body .= "<p><strong>Bedrijf:</strong> $bedrijf</p>";
    $body .= "<p><strong>Onderwerp:</strong> $onderwerp</p>";
    $body .= "<p><strong>Bericht:</strong><br>$bericht</p>";

    if (mail($toEmail, $emailSubject, $body, $headers)) {
        // Leid door naar de succespagina na verzending van de e-mail
        header("Location: bedankt.html");
    } else {
        $errors[] = "Er is iets fout gegaan bij het verzenden van de e-mail. Probeer het opnieuw.";
    }
    
}

?>
