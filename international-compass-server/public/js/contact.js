document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const messageBox = document.getElementById("form-message");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
      showMessage("Please fill in all fields.", "error");
      return;
    }

    try {
      const res = await fetch("/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      const data = await res.json();

      if (data.success) {
        showMessage(
          `Thank you, ${name}! Your message has been sent.`,
          "success"
        );
        form.reset();
      } else {
        showMessage(data.message || "Something went wrong.", "error");
      }
    } catch (err) {
      console.error(err);
      showMessage("Server error. Please try again later.", "error");
    }
  });

  function showMessage(text, type) {
    messageBox.textContent = text;
    messageBox.className = type === "success" ? "success show" : "error show";
    setTimeout(() => messageBox.classList.remove("show"), 3000);
  }
});
