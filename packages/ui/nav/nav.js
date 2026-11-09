/** Opens and closes the full-screen menu panel; Escape closes it. */
const toggle = document.querySelector(".nav__toggle");

function setOpen(open) {
  document.body.classList.toggle("nav-open", open);
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
}

toggle.addEventListener("click", () => setOpen(!document.body.classList.contains("nav-open")));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setOpen(false);
});
