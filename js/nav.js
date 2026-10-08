function initNav() {
  const burger = document.getElementById("burger");
  const links = document.getElementById("nav-links");
  burger.addEventListener("click", () => links.classList.toggle("open"));
  links.querySelectorAll("a").forEach(a =>
    a.addEventListener("click", () => links.classList.remove("open"))
  );
}
