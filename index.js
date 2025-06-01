//animations for the loader and main content

window.addEventListener('DOMContentLoaded', () => {
  const loader = document.getElementById('loader');
  const loaderLogo = document.getElementById('loader-logo');
  const navLogo = document.getElementById('nav-logo');
  const mainContent = document.getElementById('main-content');

  setTimeout(() => {
    // Animate logo to nav position
    const navRect = navLogo.getBoundingClientRect();
    loaderLogo.classList.add('logo-animate-to-nav');
    loaderLogo.style.top = navRect.top + 'px';
    loaderLogo.style.left = navRect.left + 'px';
    loaderLogo.style.width = navLogo.offsetWidth + 'px';
    loaderLogo.style.height = navLogo.offsetHeight + 'px';

    // Fade out loader and fade in main content at the same time as logo moves
    loader.style.opacity = 0;
    mainContent.classList.add('show');

    setTimeout(() => {
      loader.style.display = 'none';
    }, 500); // match logo-move and fade duration
  }, 1500); // Loader bounce duration before movement starts
});


//mobile menu toggle functionality
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

