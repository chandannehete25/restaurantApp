document.addEventListener("DOMContentLoaded", () => {
    const form = document.forms["frm"];
  
    form.addEventListener("submit", (e) => {
      const name = form["name"].value.trim();
      const email = form["email"].value.trim();
      const contact = form["contact"].value.trim();
      const oldUsername = form["oldusername"].value.trim();
      const newUsername = form["username"].value.trim();
      const password = form["password"].value.trim();
  
      // Name validation
      if (name === "") {
        alert("Full Name is required.");
        form["name"].focus();
        e.preventDefault();
        return;
      }
  
      // Email validation
      const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
      if (!emailPattern.test(email)) {
        alert("Enter a valid email address.");
        form["email"].focus();
        e.preventDefault();
        return;
      }
  
      // Contact number validation
      const contactPattern = /^[0-9]{10}$/;
      if (!contactPattern.test(contact)) {
        alert("Contact number must be 10 digits.");
        form["contact"].focus();
        e.preventDefault();
        return;
      }
  
      // Username validation
      if (oldUsername === "") {
        alert("Old username is required.");
        form["oldusername"].focus();
        e.preventDefault();
        return;
      }
  
      if (newUsername === "") {
        alert("New username is required.");
        form["username"].focus();
        e.preventDefault();
        return;
      }
  
      if (newUsername === oldUsername) {
        alert("New username must be different from old username.");
        form["username"].focus();
        e.preventDefault();
        return;
      }
  
      // Password validation
      if (password.length < 6) {
        alert("Password must be at least 6 characters long.");
        form["password"].focus();
        e.preventDefault();
        return;
      }
      if (form["role"].value === "") {
        alert("Please select a role.");
        form["role"].focus();
        e.preventDefault();
        return;
      }
    });
  });
  