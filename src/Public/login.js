const forms = document.getElementById("loginForm");
const fields = forms.querySelectorAll("input");
const submitButton = forms.querySelector("button");

// activeForms

fields.forEach((node) => {
  node.addEventListener("input", () => {
    submitButton.disabled = node.value.trim() === "";
  });
});

// Error alert
const errors = document.getElementById("errortrigger");

// payloads config

forms.addEventListener("submit", async (e) => {
  e.preventDefault();

  const payload = {
    email: fields[0].value,
    password: fields[1].value,
  };

  const res = await fetch("/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const result = await res.json();
  if (result.success) {
    window.location.reload();
  } else {
    errors.checked = true;
    setTimeout(() => {
      errors.checked = false;
    }, 3000);
  }
});
