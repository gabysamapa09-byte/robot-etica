// Menú móvil (sin cargar el JS de Bootstrap para ahorrar peso)
const toggle = document.getElementById("navToggle");
const menu = document.getElementById("menu");

toggle.addEventListener("click", () => {
  const open = menu.classList.toggle("show");
  toggle.setAttribute("aria-expanded", String(open));
});

// Cerrar el menú al pulsar un enlace
menu.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    menu.classList.remove("show");
    toggle.setAttribute("aria-expanded", "false");
  })
);

// Validación sencilla del formulario
const form = document.getElementById("form");
const msg = document.getElementById("formMsg");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const nombre = form.nombre.value.trim();
  const email = form.email.value.trim();
  const mensaje = form.mensaje.value.trim();

  if (!nombre || !/^\S+@\S+\.\S+$/.test(email) || !mensaje) {
    msg.textContent = "Por favor completa todos los campos con un correo válido.";
    msg.className = "mt-3 mb-0 text-center text-danger";
    return;
  }
  msg.textContent = "¡Gracias, " + nombre + "! Tu opinión fue registrada (demo).";
  msg.className = "mt-3 mb-0 text-center text-success";
  form.reset();
});
