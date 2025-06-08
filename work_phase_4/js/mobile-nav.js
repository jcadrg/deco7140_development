document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("mobile-menu-toggle");
  const navContainer = document.getElementById("nav-container");

  toggleBtn?.addEventListener("click", () => {
    navContainer.classList.toggle("show");
  });
});