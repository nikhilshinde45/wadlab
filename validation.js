document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // stop default submit

    // Get values
    const password = document.querySelector('input[type="password"]').value;
    const confirmPassword = document.querySelectorAll('input[type="password"]')[1].value;
    const mobile = document.querySelector('input[type="tel"]').value;
    const dob = document.querySelector('input[type="date"]').value;
    const address = document.querySelector("textarea").value;
    const hobbies = document.querySelector('input[placeholder*="Comma"]').value;

    // 1️⃣ Date of birth should not be in future
    if (dob) {
      const selectedDate = new Date(dob);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate > today) {
        alert("Date of birth cannot be a future date");
        return;
      }
    }

    // 2️⃣ Password validation
    // At least 6 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/;

    if (!passwordRegex.test(password)) {
      alert("Password must be at least 6 characters and include uppercase, lowercase, number and special character");
      return;
    }

    // Confirm password match
    if (password !== confirmPassword) {
      alert("Password and Confirm Password do not match");
      return;
    }

    // 3️⃣ Mobile number validation
    const mobileRegex = /^\d{10}$/;

    if (!mobileRegex.test(mobile)) {
      alert("Mobile number must contain only digits and must be exactly 10 digits");
      return;
    }

    // 4️⃣ Address must not exceed 6 lines
    const addressLines = address.split("\n").length;

    if (addressLines > 6) {
      alert("Address must not exceed 6 lines");
      return;
    }

    // 5️⃣ Hobbies should be comma separated (if not empty)
    if (hobbies.trim() !== "") {
      // Check if it contains at least one comma when multiple hobbies are written
      if (!hobbies.includes(",")) {
        alert("Hobbies should be comma separated");
        return;
      }
    }

    // ✅ If all validations pass
    alert("Form submitted successfully");

    // You can reset form if you want
    // form.reset();
  });
});
