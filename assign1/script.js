document.addEventListener('DOMContentLoaded', () => {
    // Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-links li a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Dynamic Greeting based on time
    const greetingElement = document.querySelector('.greeting');
    const hour = new Date().getHours();
    let greetingText = "Hello, I'm";

    if (hour < 12) {
        greetingText = "Good Morning, I'm";
    } else if (hour < 18) {
        greetingText = "Good Afternoon, I'm";
    } else {
        greetingText = "Good Evening, I'm";
    }

    // Only update if it was strictly "Hello, I'm" to avoid overwriting if manually changed, 
    // but here we want the dynamic effect so we just set it.
    greetingElement.textContent = greetingText;

    // Scroll Animation (Intersection Observer)
    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('fade-in'); // Add initial class
        observer.observe(section);
    });

    // Contact Modal Logic
    const modal = document.getElementById('contactModal');
    const openModalBtn = document.getElementById('openContactModal');
    const closeBtn = document.querySelector('.close-btn');
    const contactForm = document.getElementById('contactForm');

    // Open Modal
    if (openModalBtn) {
        openModalBtn.addEventListener('click', () => {
            modal.classList.add('show');
        });
    }

    // Also open modal from nav link
    const contactLink = document.querySelector('a[href="#contact"]');
    if (contactLink) {
        contactLink.addEventListener('click', (e) => {
            e.preventDefault();
            modal.classList.add('show');
        });
    }

    // Also open modal from hero button (if it exists and still points to #contact)
    // The hero button is "Contact Me" <a href="#contact" class="btn secondary">Contact Me</a>
    const heroContactBtn = document.querySelector('.hero .btn.secondary[href="#contact"]');
    if (heroContactBtn) {
        heroContactBtn.addEventListener('click', (e) => {
            e.preventDefault();
            modal.classList.add('show');
        });
    }

    // Close Modal
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('show');
        });
    }

    // Close on outside click
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
        }
    });

    // Form Validation
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');

            // Validate Name
            if (nameInput.value.trim() === '') {
                setError(nameInput, 'Name cannot be empty');
                isValid = false;
            } else {
                setSuccess(nameInput);
            }

            // Validate Email
            if (emailInput.value.trim() === '') {
                setError(emailInput, 'Email cannot be empty');
                isValid = false;
            } else if (!isValidEmail(emailInput.value.trim())) {
                setError(emailInput, 'Provide a valid email address');
                isValid = false;
            } else {
                setSuccess(emailInput);
            }

            // Validate Message
            if (messageInput.value.trim() === '') {
                setError(messageInput, 'Message cannot be empty');
                isValid = false;
            } else {
                setSuccess(messageInput);
            }

            if (isValid) {
                // Here you would typically send the data to a server
                alert('Message sent successfully!');
                contactForm.reset();
                modal.classList.remove('show');
                // Creating a reset success state
                [nameInput, emailInput, messageInput].forEach(input => {
                    input.parentElement.classList.remove('success');
                });
            }
        });
    }

    function setError(input, message) {
        const formGroup = input.parentElement;
        const errorMsg = formGroup.querySelector('.error-msg');
        formGroup.classList.add('error');
        formGroup.classList.remove('success');
        errorMsg.innerText = message;
    }

    function setSuccess(input) {
        const formGroup = input.parentElement;
        formGroup.classList.add('success');
        formGroup.classList.remove('error');
    }

    function isValidEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
});
