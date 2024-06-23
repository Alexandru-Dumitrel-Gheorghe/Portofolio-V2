function sendMail() {
  // Obține valorile din câmpurile formularului
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var message = document.getElementById("message").value;

  // Verifică dacă toate câmpurile sunt completate
  if (name === "" || email === "" || message === "") {
    // Afisează un mesaj de eroare în cazul în care nu sunt completate toate câmpurile
    document.getElementById("contact-message").classList.add("color-dark");
    document.getElementById("contact-message").textContent =
      "Please fill in all fields.";
    return;
  }

  // Parametrii pentru trimiterea mesajului prin EmailJS
  var params = {
    from_name: name,
    from_email: email,
    message: message,
  };

  // ID-ul serviciului și șablonului EmailJS
  const serviceID = "service_23u5gpo";
  const templateID = "template_1egnqkb";

  // Trimiterea mesajului folosind EmailJS
  emailjs.send(serviceID, templateID, params).then(
    function (response) {
      console.log("Email sent:", response);
      // Resetează formularul după trimitere
      document.getElementById("contact-form").reset();
      // Afisează un mesaj de confirmare
      document.getElementById("contact-message").classList.remove("color-dark");
      document.getElementById("contact-message").textContent =
        "Nachricht erfolgreich versendet!";
    },
    function (error) {
      console.error("Error sending email:", error);
      // Afisează un mesaj de eroare în cazul unei probleme
      document.getElementById("contact-message").classList.add("color-dark");
      document.getElementById("contact-message").textContent =
        "Oops! Something went wrong. Please try again later.";
    }
  );

  // Previne trimiterea formularului în mod implicit
  return false;
}
