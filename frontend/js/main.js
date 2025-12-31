// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a nav link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Add animation classes to elements when they come into view
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.post-card, .newsletter, .footer-section');

    elements.forEach((element, index) => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;

        if (elementPosition < screenPosition) {
            element.classList.add('animate-fadeInUp');
            element.style.animationDelay = `${index * 0.1}s`;
        }
    });
};

// Run animations on page load and scroll
window.addEventListener('load', animateOnScroll);
window.addEventListener('scroll', animateOnScroll);

// Newsletter form submission
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const email = emailInput.value.trim();

        if (email) {
            try {
                const response = await fetch('http://localhost:5000/api/subscribe', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email })
                });

                const data = await response.json();

                if (response.ok) {
                    alert(data.message);
                    emailInput.value = '';
                } else {
                    alert('Error: ' + data.message);
                }
            } catch (error) {
                console.error('Error subscribing:', error);
                alert('Failed to subscribe. Please try again later.');
            }
        }
    });
}

// Feedback form submission
const feedbackForm = document.querySelector('.feedback-form');
if (feedbackForm) {
    feedbackForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const nameInput = feedbackForm.querySelector('input[placeholder="Your name"]');
        const emailInput = feedbackForm.querySelector('input[placeholder="Your email"]');
        const feedbackInput = feedbackForm.querySelector('textarea[placeholder="Your feedback"]');

        const feedbackData = {
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            feedback: feedbackInput.value.trim()
        };

        try {
            const response = await fetch('http://localhost:5000/api/feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(feedbackData)
            });

            const data = await response.json();

            if (response.ok) {
                alert('Thank you for your feedback!');
                feedbackForm.reset();
            } else {
                alert('Error: ' + data.message);
            }
        } catch (error) {
            console.error('Error submitting feedback:', error);
            alert('Failed to send feedback. Please try again later.');
        }
    });
}

// Set current year in footer
const currentYear = new Date().getFullYear();
const yearElement = document.querySelector('.footer-bottom p');
if (yearElement) {
    yearElement.textContent = `© ${currentYear} MyBlog. All rights reserved.`;
}
