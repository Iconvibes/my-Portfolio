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

// Contact form submission handling
document.querySelector('form').addEventListener('submit', function(e) {
  e.preventDefault();

  const method = document.getElementById('contact-method').value;
  const name = document.querySelector('input[placeholder="Your Name"]').value;
  const email = document.querySelector('input[placeholder="Your Email"]').value;
  const message = document.querySelector('textarea[placeholder="Your Message"]').value;

  let url = '';
  let msg = `Name: ${name}\nEmail: ${email}\nMessage: ${message}`;

  switch(method) {
    case 'whatsapp':
      url = `https://wa.me/2349137360986?text=${encodeURIComponent(msg)}`;
      if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        window.location.href = url;
        return;
      } else {
        window.open(url, '_blank');
        setTimeout(() => {
          alert('If WhatsApp did not open, please try on your mobile device or check your browser settings.');
        }, 1000);
        return;
      }
    case 'email':
      url = `mailto:ferdinardoluwajuwonlo@gmail.com?subject=Portfolio Contact&body=${encodeURIComponent(msg)}`;
      break;
    case 'linkedin':
      url = `https://www.linkedin.com/in/your-linkedin-username/`;
      alert('Please send your message via LinkedIn after connecting!');
      break;
    case 'facebook':
      url = `https://www.facebook.com/your-facebook-username/`;
      alert('Please send your message via Facebook after connecting!');
      break;
    case 'tiktok':
      url = `https://www.tiktok.com/@codeferd`;
      alert('Please send your message via TikTok after connecting!');
      break;
    default:
      alert('Please select a contact method.');
      return;
  }

  window.open(url, '_blank');
});

