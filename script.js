// select the elements you want to modify
const header = document.querySelector('header');
const navLinks = document.querySelectorAll('nav ul li a');

// set up a function to modify elements based on screen size
function adjustForScreenSize() {
  // get the width of the screen
  const screenWidth = window.innerWidth;

  if (screenWidth >= 1280) {
    // adjust for screens larger than 1280px
    header.style.fontSize = '36px';
    navLinks.forEach(link => {
      link.style.padding = '20px';
    });
  } else if (screenWidth >= 980) {
    // adjust for screens between 980px and 1280px
    header.style.fontSize = '32px';
    navLinks.forEach(link => {
      link.style.padding = '16px';
    });
  } else if (screenWidth >= 768) {
    // adjust for screens between 768px and 980px
    header.style.fontSize = '28px';
    navLinks.forEach(link => {
      link.style.padding = '12px';
    });
  } else if (screenWidth >= 480) {
    // adjust for screens between 480px and 768px
    header.style.fontSize = '24px';
    navLinks.forEach(link => {
      link.style.padding = '8px';
    });
  } else {
    // adjust for screens smaller than 480px
    header.style.fontSize = '20px';
    navLinks.forEach(link => {
      link.style.padding = '4px';
    });
  }
}

// call the function initially
adjustForScreenSize();

// call the function on window resize
window.addEventListener('resize', adjustForScreenSize);

const hamburgerBtn = document.querySelector('.hamburger-label');
const hiddenMenu = document.querySelector('.hidden-menu');
const menuLinks = document.querySelectorAll('.hidden-menu a');

hamburgerBtn.addEventListener('click', function() {
  hiddenMenu.classList.toggle('show');
  hamburgerBtn.classList.toggle('clicked');
});

menuLinks.forEach(function(link) {
  link.addEventListener('click', function() {
    menuLinks.forEach(function(link) {
      link.classList.remove('clicked');
    });
    this.classList.add('clicked');
  });
});
