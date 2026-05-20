document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Dynamic Year in Footer ---
    const yearSpan = document.getElementById('year');
    if(yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // --- 2. Scroll Animations (Intersection Observer) ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));


    // --- 3. Language Toggle (Arabic / English) ---
    const langToggleBtn = document.getElementById('lang-toggle');
    const htmlEl = document.documentElement;

    let currentLang = 'ar'; // Default

    function updateLanguage() {
        if (currentLang === 'ar') {
            htmlEl.setAttribute('lang', 'ar');
            htmlEl.setAttribute('dir', 'rtl');
            langToggleBtn.textContent = 'English';
        } else {
            htmlEl.setAttribute('lang', 'en');
            htmlEl.setAttribute('dir', 'ltr');
            langToggleBtn.textContent = 'عربي';
        }

        // Update all elements with data-lang attributes
        const translatableElements = document.querySelectorAll('[data-lang-ar]');
        translatableElements.forEach(el => {
            if (currentLang === 'ar') {
                el.textContent = el.getAttribute('data-lang-ar');
            } else {
                el.textContent = el.getAttribute('data-lang-en');
            }
        });
    }

    if(langToggleBtn) {
        langToggleBtn.addEventListener('click', () => {
            currentLang = currentLang === 'ar' ? 'en' : 'ar';
            updateLanguage();
        });
    }

    // --- 4. Click Tracking Placeholder ---
    const ctaLinks = document.querySelectorAll('.cta-link');
    ctaLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            console.log("CTA clicked:", window.location.href);
            // Optionally could add analytics code here
        });
    });

});