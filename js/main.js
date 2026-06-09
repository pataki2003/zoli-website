/**
 * Nádasdi Zoltán - Személyi Edző Weboldal
 * JavaScript Functionality
 */

// ============================================
// NAVIGATION - Hamburger Menu Toggle
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            // Toggle active class on button
            navToggle.classList.toggle('active');
            
            // Toggle active class on menu
            navMenu.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navMenu.contains(event.target);
            const isClickOnToggle = navToggle.contains(event.target);
            
            if (!isClickInsideNav && !isClickOnToggle && navMenu.classList.contains('active')) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
});

// ============================================
// ACTIVE NAVIGATION LINK
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Get current page filename
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Get all navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Remove active class from all links
    navLinks.forEach(link => {
        link.classList.remove('active');
        
        // Get the href attribute
        const href = link.getAttribute('href');
        
        // Check if this link matches the current page
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
});

// ============================================
// CONTACT FORM VALIDATION AND SUBMISSION
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Clear previous errors
            clearErrors();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const goal = document.getElementById('goal').value;
            const message = document.getElementById('message').value.trim();
            const privacy = document.getElementById('privacy').checked;
            
            let isValid = true;
            
            // Validate name
            if (name === '') {
                showError('nameError', 'Kérlek add meg a neved!');
                isValid = false;
            } else if (name.length < 2) {
                showError('nameError', 'A név túl rövid!');
                isValid = false;
            }
            
            // Validate email
            if (email === '') {
                showError('emailError', 'Kérlek add meg az email címed!');
                isValid = false;
            } else if (!isValidEmail(email)) {
                showError('emailError', 'Kérlek adj meg egy érvényes email címet!');
                isValid = false;
            }
            
            // Validate goal
            if (goal === '') {
                showError('goalError', 'Kérlek válaszd ki, miben segíthetek!');
                isValid = false;
            }
            
            // Validate message
            if (message === '') {
                showError('messageError', 'Kérlek írj egy rövid üzenetet!');
                isValid = false;
            } else if (message.length < 10) {
                showError('messageError', 'Az üzenet túl rövid! Legalább 10 karakter szükséges.');
                isValid = false;
            }
            
            // Validate privacy checkbox
            if (!privacy) {
                showError('privacyError', 'Kérlek fogadd el az adatkezelési tájékoztatót!');
                isValid = false;
            }
            
            // If form is valid, show success message
            if (isValid) {
                // Hide form
                contactForm.style.display = 'none';
                
                // Show success message
                const successMessage = document.getElementById('successMessage');
                if (successMessage) {
                    successMessage.style.display = 'block';
                    
                    // Scroll to success message
                    successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
                
                // Log form data (in production, this would be sent to a server)
                console.log('Form submitted successfully:', {
                    name,
                    email,
                    phone,
                    goal,
                    message,
                    privacy
                });
                
                // Reset form
                contactForm.reset();
            }
        });
        
        // Send another message button
        const sendAnotherBtn = document.getElementById('sendAnother');
        if (sendAnotherBtn) {
            sendAnotherBtn.addEventListener('click', function() {
                // Hide success message
                const successMessage = document.getElementById('successMessage');
                if (successMessage) {
                    successMessage.style.display = 'none';
                }
                
                // Show form again
                contactForm.style.display = 'flex';
                
                // Scroll to form
                contactForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        }
    }
});

// ============================================
// NEWSLETTER FORM (if present on articles page)
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const newsletterForm = document.getElementById('newsletterForm');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email === '') {
                alert('Kérlek add meg az email címed!');
                return;
            }
            
            if (!isValidEmail(email)) {
                alert('Kérlek adj meg egy érvényes email címet!');
                return;
            }
            
            // In production, this would be sent to a server
            console.log('Newsletter subscription:', email);
            
            // Show success message
            alert('Köszönjük a feliratkozást! Hamarosan küldünk egy megerősítő emailt.');
            
            // Reset form
            newsletterForm.reset();
        });
    }
});

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Validate email format
 * @param {string} email - Email address to validate
 * @returns {boolean} - True if valid, false otherwise
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Show error message for a form field
 * @param {string} errorId - ID of the error element
 * @param {string} message - Error message to display
 */
function showError(errorId, message) {
    const errorElement = document.getElementById(errorId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
        
        // Add error styling to the input
        const inputId = errorId.replace('Error', '');
        const inputElement = document.getElementById(inputId);
        if (inputElement) {
            inputElement.style.borderColor = '#ef4444';
        }
    }
}

/**
 * Clear all error messages
 */
function clearErrors() {
    const errorElements = document.querySelectorAll('.form-error');
    errorElements.forEach(error => {
        error.textContent = '';
        error.classList.remove('show');
    });
    
    // Reset input border colors
    const inputs = document.querySelectorAll('.form-input, .form-select, .form-textarea');
    inputs.forEach(input => {
        input.style.borderColor = '';
    });
}

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Get all anchor links that start with #
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            const href = this.getAttribute('href');
            
            // Skip if href is just "#"
            if (href === '#') return;
            
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                event.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// ============================================
// HEADER SHADOW ON SCROLL
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.header');
    
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 10) {
                header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
            } else {
                header.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
            }
        });
    }
});

// ============================================
// FADE IN ANIMATION ON SCROLL (Optional Enhancement)
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe cards and sections
    const animatedElements = document.querySelectorAll('.card, .process-step, .faq-item, .article-card');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
});

// ============================================
// LOG INITIALIZATION
// ============================================
console.log('Nádasdi Zoltán - Személyi Edző weboldal betöltve ✓');
console.log('Minden funkció aktív és működik!');

// Made with Bob
