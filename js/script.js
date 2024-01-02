// Global Query Selectors
const openMenu = document.getElementById('open-menu');
const closeMenu = document.getElementById('close-menu');
const toggleMenu = document.getElementById('toggle-menu');
const scrollLock = document.getElementById('main');
const main = document.getElementById('main');

openMenu.addEventListener('click', () => {
  // Add the active class which will slide the toggle menu into the viewport.
  toggleMenu.classList.add('active');
});

closeMenu.addEventListener('click', () => {
  // REmove the active class which will slide the toggle menu out of the viewport.
  toggleMenu.classList.remove('active');
});

toggleMenu.addEventListener('click', function () {
  scrollLock.classList.toggle('lock-scroll');
});

// When the main content is clicked or dragged on when the menu contains the active class, remove the active class, scroll lock, and page blur.
scrollLock.addEventListener('click', function (event) {
  if (
    toggleMenu.classList.contains('active') &&
    !toggleMenu.contains(event.target) &&
    !openMenu.contains(event.target)
  ) {
    toggleMenu.classList.remove('active');
    scrollLock.classList.remove('lock-scroll');
    main.classList.remove('blur');
  }
});

// Prevent closing the menu when clicking inside the menu
toggleMenu.addEventListener('click', function (event) {
  event.stopPropagation();
});

const navigationLinks = toggleMenu.querySelectorAll('a');
navigationLinks.forEach(function (link) {
  link.addEventListener('click', function (event) {
    // Prevent default bahvaiour of links to allow more control over the document.
    event.preventDefault();
    toggleMenu.classList.remove('active');

    const targetId = link.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }

    setTimeout(function () {
      scrollLock.classList.remove('lock-scroll');
    }, 100);
  });
});

/*

Active Link Intersect Oserver Code

Observer code to determine if a section href is intersecting in the viewport, iterate through each link to determine which class is active while removing the previously active class once a new section intersects.

*/

const navLinks = document.querySelectorAll('.navigation__links ol li a');

navLinks.forEach((link) => {
  const targetId = link.getAttribute('href');
  const targetSection = document.querySelector(targetId);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((navLink) => {
            navLink.classList.remove('active');
          });
          link.classList.add('active');
        }
      });
    },
    {
      // Margin sensitivity to add or remove active classes once an intersect is observered.
      rootMargin: '-40% 0px 20% 0px',
    }
  );

  observer.observe(targetSection);
});

/* 

Navigation Window Scroll Code - 
Hide & Show navigation functionality. Depending on the window position, the navigation will transition into and out of the viewport.

*/

// This variable will store the current scroll position in the document.
let scrollPosition;
// Select the header navigation element from the DOM.
let headerNav = document.getElementById('header-nav');
// Add an event listener to the window object waiting for a scroll, once a scroll occurs, call the function.
window.addEventListener('scroll', function () {
  main.classList.remove('blur');
  //Get the location of the scroll position.
  let scrollTop = window.screenY || document.documentElement.scrollTop;
  // IF the scroll location is greater than the current scroll position (0 by default), set the header navigation position to a negative number to transition it off screen.
  if (scrollTop > scrollPosition) {
    headerNav.style.cssText = 'top: -100px';
    toggleMenu.classList.remove('active');
  }
  // ELSE the header navigation position will be set back its default value.
  else {
    headerNav.style.top = '0';
    toggleMenu.classList.remove('active');
  }
  // Update the new scroll position and set it to the initial scroll position variable, this way the function can continue to check the value.
  scrollPosition = scrollTop;
});


/*

Blur Functionaility Code 

*/

openMenu.addEventListener('click', function () {
  main.classList.add('blur');
});

closeMenu.addEventListener('click', function () {
  main.classList.remove('blur');
});

// Function to check if the screen size is mobile
function isMobileScreen() {
  return window.innerWidth <= 768; // Adjust the breakpoint as needed
}

// Function to handle toggling the blur class based on screen size
function toggleBlurClass() {
  if (toggleMenu.classList.contains('active') && isMobileScreen()) {
    main.classList.add('blur');
  } else {
    main.classList.remove('blur');
  }
}

/* Resume Link Functionality */

const resumeLinkContainer = document.getElementById('resume-link-container');

resumeLinkContainer.addEventListener('click', function () {
  // Once the container is clicked, the link will be opened in a new tab.
  window.open('https://c-blouin.github.io/christopherblouin/pdfs/christopher-blouin-2023-resume.pdf', '_blank');
});

/* 

Fade & Slide in Animation Code

Thank you to Fireship for this useful Scroll Animations reference, check it out here. https://www.youtube.com/watch?v=T33NN_pPeNI&t=13s

*/

// This code observes intersecting elements in the viewport, when an element is intersecting, the "slide-animation" class is added to the element, which triggers the animation from the CSS styles.
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    // console.log(entry);
    // Add the class to an intersecting element.
    if (entry.isIntersecting) {
      entry.target.classList.add("slide-animation");
    }
    // Once the element is not intersecting, remove the class. This can repeat as the user scrolls up and down the page.
    else {
      entry.target.classList.remove("slide-animation");
    }
  });
});

// Select all elements with the class of "hidden" and "vertical-hidden" and add them to the observer, to check if the slide-animation class should be added or removed.
const hiddenElements = document.querySelectorAll(".hidden, .vertical-hidden");
hiddenElements.forEach((el) => observer.observe(el));