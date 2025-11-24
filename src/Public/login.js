const forms = document.getElementById("loginForm");
const fields = forms.querySelectorAll("input");
const submitButton = forms.querySelector("button");

// activeForms

fields.forEach((node) => {
  node.addEventListener("input", () => {
    submitButton.disabled = node.value.trim() === "";
  });
});

// payloads config

forms.addEventListener("submit", async (e) => {
  e.preventDefault();

  const payload = {
    email: fields[0].value,
    password: fields[1].value,
  };

  const res = await fetch("/api/v1/user/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const result = await res.json();
  if (result.success) {
    window.location.href = "/api/v1/user/private";
  }
});
