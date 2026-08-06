document.addEventListener("DOMContentLoaded", function () {
  var contactForm = document.getElementById("contactForm");
  var formStatus = document.getElementById("formStatus");

  if (!contactForm) return;

  var allowedServices = [
    "Full Stack Development",
    "Frontend Development",
    "Backend Development",
    "Mobile App Development (React Native)",
    "WordPress",
    "Shopify",
    "Webflow",
    "Bubble.io",
    "Other",
  ];

  function showFormStatus(message, isError) {
    if (!formStatus) return;
    formStatus.textContent = message;
    formStatus.classList.remove("d-none", "success", "error");
    formStatus.classList.add(isError ? "error" : "success");
  }

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function validateField(field) {
    var value = field.value.trim();

    if (field.tagName === "SELECT") {
      return value !== "" && allowedServices.indexOf(value) !== -1;
    }

    var minLen = field.minLength > 0 ? field.minLength : 1;
    var fieldValid = value.length >= minLen;

    if (field.type === "email") {
      fieldValid = fieldValid && isValidEmail(value);
    }

    if (field.maxLength > 0 && value.length > field.maxLength) {
      fieldValid = false;
    }

    return fieldValid;
  }

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    var fields = contactForm.querySelectorAll("input[required], textarea[required], select[required]");
    var isValid = true;
    var firstInvalidField = null;

    fields.forEach(function (field) {
      var fieldValid = validateField(field);
      field.classList.toggle("is-invalid", !fieldValid);

      if (!fieldValid) {
        isValid = false;
        if (!firstInvalidField) firstInvalidField = field;
      }
    });

    if (!isValid) {
      contactForm.classList.add("was-validated");
      showFormStatus("Please fix the highlighted fields before sending.", true);
      if (firstInvalidField) firstInvalidField.focus();
      return;
    }

    contactForm.classList.remove("was-validated");
    if (formStatus) formStatus.classList.add("d-none");

    var submitBtn = contactForm.querySelector("button[type=submit]");
    var btnLabel = submitBtn.querySelector(".btn-label");
    var originalLabel = btnLabel.textContent;
    submitBtn.disabled = true;
    btnLabel.textContent = "Sending...";

    fetch(contactForm.getAttribute("action"), {
      method: "POST",
      headers: { Accept: "application/json" },
      body: new FormData(contactForm),
    })
      .then(function (response) {
        return response.json().catch(function () {
          return {
            success: response.ok,
            message: response.ok
              ? "Message sent successfully."
              : "Something went wrong. Please try again.",
          };
        });
      })
      .then(function (data) {
        showFormStatus(
          data.message ||
            (data.success ? "Message sent successfully." : "Something went wrong. Please try again."),
          !data.success
        );

        if (data.success) {
          contactForm.reset();
          contactForm.classList.remove("was-validated");
          contactForm.querySelectorAll(".is-invalid").forEach(function (field) {
            field.classList.remove("is-invalid");
          });
        }
      })
      .catch(function () {
        showFormStatus("Could not send your message. Please try again later.", true);
      })
      .finally(function () {
        submitBtn.disabled = false;
        btnLabel.textContent = originalLabel;
      });
  });

  contactForm.querySelectorAll("input, textarea, select").forEach(function (field) {
    field.addEventListener(field.tagName === "SELECT" ? "change" : "input", function () {
      if (contactForm.classList.contains("was-validated")) {
        field.classList.toggle("is-invalid", !validateField(field));
      } else {
        field.classList.remove("is-invalid");
      }
    });
  });
});
