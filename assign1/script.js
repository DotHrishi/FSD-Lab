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
});
