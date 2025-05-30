const menuBurger = document.getElementById("menu-burger");
const mobileMenu = document.getElementById("mobile-menu");
const closeMenu = document.getElementById("close-menu");

// Show mobile menu
menuBurger.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
  menuBurger.classList.toggle("hidden");
});

// hide mobile menu
closeMenu.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
  menuBurger.classList.toggle("hidden");
});

// Hide menu when any link is clicked
const mobileLinks = mobileMenu.querySelectorAll("a");
mobileLinks.forEach(link => {
  link.addEventListener("click", () => {
    mobileMenu.classList.add("hidden");
    menuBurger.classList.remove("hidden");
  });
});
