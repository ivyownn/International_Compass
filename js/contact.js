// contact.js (Contact page only)
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const messageBox = document.getElementById("form-message");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
      showMessage("Please fill in all fields before submitting.", "error");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!emailPattern.test(email)) {
      showMessage("Please enter a valid email address.", "error");
      return;
    }

    showMessage(`Thank you, ${name}! Your message has been sent.`, "success");
    form.reset();
  });

  function showMessage(text, type) {
    messageBox.textContent = text;
    messageBox.className = "";
    messageBox.classList.add(type === "success" ? "success" : "error", "show");
    setTimeout(() => messageBox.classList.remove("show"), 3000);
  }
});
