        // Mobile Menu Toggle
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');

        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Toggle body scroll when menu is open
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });



 // Animate progress metrics
        function animateValue(id, start, end, duration) {
            let obj = document.getElementById(id);
            let startTimestamp = null;
            const step = (timestamp) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                obj.innerHTML = Math.floor(progress * (end - start) + start + (id === "digitalUsers" ? "M" : "%"));
                if (progress < 1) {
                    window.requestAnimationFrame(step);
                }
            };
            window.requestAnimationFrame(step);
        }
        
        // Start animations when section is in view
        window.addEventListener('scroll', function() {
            const progressSection = document.querySelector('.progress-section');
            const position = progressSection.getBoundingClientRect();
            
            if(position.top < window.innerHeight && position.bottom >= 0) {
                animateValue("literacyRate", 75, 94, 2000);
                animateValue("gdpGrowth", 4, 6.7, 2000);
                animateValue("renewableEnergy", 20, 42, 2000);
                animateValue("digitalUsers", 500, 800, 2000);
                // Remove event listener after animation
                window.removeEventListener('scroll', this);
            }
        });

        // Animate values when section is visible
function animateMetrics() {
  animateValue("literacyRate", 75, 94, 2000); // Starts at 75%, ends at 94%
  animateValue("gdpGrowth", 4, 6.7, 2000);    // Starts at 4%, ends at 6.7%
  animateValue("renewableEnergy", 20, 42, 2000); // Starts at 20%, ends at 42%
  animateValue("digitalUsers", 500, 800, 2000);  // Starts at 500M, ends at 800M
}

// Helper function for animation
function animateValue(id, start, end, duration) {
  let obj = document.getElementById(id);
  let startTime = null;
  
  const update = (timestamp) => {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    const value = Math.floor(progress * (end - start) + start);
    obj.textContent = value + (id === "digitalUsers" ? "M" : "%");
    if (progress < 1) window.requestAnimationFrame(update);
  };
  
  window.requestAnimationFrame(update);
}

// Trigger on scroll
window.addEventListener('scroll', function() {
  const section = document.querySelector('.progress-section');
  const rect = section.getBoundingClientRect();
  if (rect.top < window.innerHeight && rect.bottom >= 0) {
    animateMetrics();
    window.removeEventListener('scroll', this); // Run once
  }
});

document.querySelector('.footer-bottom p').innerHTML = 
  `&copy; ${new Date().getFullYear()} Viksit Bharat. All Rights Reserved.`;


  // Dark Mode Toggle
const darkModeToggle = document.getElementById('darkModeToggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Check for saved user preference or use system preference
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
    document.body.classList.add('dark-mode');
    darkModeToggle.classList.add('active');
}

// Toggle dark mode
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    darkModeToggle.classList.toggle('active');
    
    // Save user preference
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
});

// Update copyright year (existing code)
document.querySelector('.footer-bottom p').innerHTML = 
    `&copy; ${new Date().getFullYear()} Viksit Bharat. All Rights Reserved.`;


// Scroll Animation for all elements
function animateOnScroll() {
  const elements = document.querySelectorAll('[data-animate]');
  const windowHeight = window.innerHeight;
  const triggerOffset = windowHeight * 0.8; // Start animation when element is 80% in view

  elements.forEach(element => {
    const elementPosition = element.getBoundingClientRect().top;
    
    if (elementPosition < triggerOffset) {
      element.classList.add('animated');
    }
  });
}

// Initialize on load
window.addEventListener('load', animateOnScroll);

// Run on scroll with throttling for performance
let isScrolling;
window.addEventListener('scroll', () => {
  clearTimeout(isScrolling);
  isScrolling = setTimeout(animateOnScroll, 50);
});