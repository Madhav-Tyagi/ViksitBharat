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

// Scroll Animations
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.indicator-card, .table-row, .achievement-card, .source-card');
    const windowHeight = window.innerHeight;
    const triggerPoint = windowHeight * 0.8;

    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;

        if (elementPosition < triggerPoint) {
            element.classList.add('animate');
        }
    });
};

// Initialize animations on load
window.addEventListener('load', () => {
    animateOnScroll();
});

// Add scroll event listener
window.addEventListener('scroll', animateOnScroll);

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Add data labels for mobile table
const addDataLabels = () => {
    if (window.innerWidth <= 768) {
        const rows = document.querySelectorAll('.table-row');
        const headers = document.querySelectorAll('.header-item');
        
        const labels = [];
        headers.forEach(header => {
            labels.push(header.textContent);
        });
        
        rows.forEach(row => {
            const items = row.querySelectorAll('.row-item');
            items.forEach((item, index) => {
                item.setAttribute('data-label', labels[index]);
            });
        });
    }
};

// Initialize data labels
addDataLabels();
// Update on resize
window.addEventListener('resize', addDataLabels);

// Update copyright year
document.querySelector('.footer-bottom p').innerHTML = 
    `&copy; ${new Date().getFullYear()} Saksham Bharat. All Rights Reserved.`;