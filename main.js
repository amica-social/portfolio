// Set current year in footer
document.getElementById('current-year').textContent = new Date().getFullYear();

// Mobile navigation toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a nav link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const navHeight = document.querySelector('nav').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = targetPosition - navHeight;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Portfolio category tabs
const categoryTabs = document.querySelectorAll('.category-tab');
const portfolioCategories = document.querySelectorAll('.portfolio-category');

// Initially hide all categories except the first one
portfolioCategories.forEach((category, index) => {
    if (index > 0) {
        category.style.display = 'none';
    }
});

categoryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs
        categoryTabs.forEach(t => t.classList.remove('active'));
        
        // Add active class to clicked tab
        tab.classList.add('active');
        
        const category = tab.getAttribute('data-category');
        
        // Show/hide categories based on selection
        if (category === 'all') {
            portfolioCategories.forEach(cat => {
                cat.style.display = 'block';
            });
        } else {
            portfolioCategories.forEach(cat => {
                if (cat.classList.contains(category)) {
                    cat.style.display = 'block';
                } else {
                    cat.style.display = 'none';
                }
            });
        }
    });
});

// Form submission handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Form validation
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        if (!name || !email || !message) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Here you would typically send the form data to a server
        // For now, just show a success message
        alert('Thank you for your message! I will get back to you soon.');
        this.reset();
    });
}

// Scroll reveal animation
window.addEventListener('scroll', revealElements);

function revealElements() {
    const elements = document.querySelectorAll('.portfolio-item, .expertise-item, .process-step, .testimonial, .service-item');
    const windowHeight = window.innerHeight;
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

// Add visible class for CSS animations
document.addEventListener('DOMContentLoaded', () => {
    // Add a CSS class for fade-in animations
    const style = document.createElement('style');
    style.textContent = `
        .portfolio-item, .expertise-item, .process-step, .testimonial, .service-item {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .portfolio-item.visible, .expertise-item.visible, .process-step.visible, .testimonial.visible, .service-item.visible {
            opacity: 1;
            transform: translateY(0);
        }
        
        .process-step:nth-child(2) { transition-delay: 0.2s; }
        .process-step:nth-child(3) { transition-delay: 0.4s; }
        .process-step:nth-child(4) { transition-delay: 0.6s; }
        .process-step:nth-child(5) { transition-delay: 0.8s; }
        
        .service-item:nth-child(2) { transition-delay: 0.2s; }
        .service-item:nth-child(3) { transition-delay: 0.4s; }
        .service-item:nth-child(4) { transition-delay: 0.6s; }
    `;
    document.head.appendChild(style);
    
    // Trigger initial reveal
    revealElements();
    
    // Add touch event listeners for mobile devices
    if ('ontouchstart' in window) {
        document.querySelectorAll('.portfolio-item').forEach(item => {
            item.addEventListener('touchstart', function() {
                this.classList.add('touch-active');
            });
            
            item.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.classList.remove('touch-active');
                }, 500);
            });
        });
        
        // Add touch-specific styles
        const touchStyle = document.createElement('style');
        touchStyle.textContent = `
            .portfolio-item.touch-active .portfolio-content {
                transform: translateY(0);
            }
        `;
        document.head.appendChild(touchStyle);
    }
    
    // Check for viewport size changes
    const checkResponsive = () => {
        const viewportWidth = window.innerWidth;
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        
        if (viewportWidth <= 768) {
            portfolioItems.forEach(item => {
                const content = item.querySelector('.portfolio-content');
                content.style.transform = 'translateY(0)';
                content.style.height = 'auto';
            });
        } else {
            portfolioItems.forEach(item => {
                const content = item.querySelector('.portfolio-content');
                content.style.transform = '';
                content.style.height = '';
            });
        }
    };
    
    // Run on load and resize
    checkResponsive();
    window.addEventListener('resize', checkResponsive);
});
