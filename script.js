// 1. Smooth Scroll pro odkazy v menu
document.querySelectorAll('.nav-link').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// 2. Intersection Observer pro ANIMACE a AKTIVNÍ MENU
const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        // Spuštění animace
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            
            // Pokud chceme, aby se menu zvýraznilo podle sekce
            if (entry.target.tagName === 'SECTION') {
                const id = entry.target.getAttribute('id');
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        }
    });
}, observerOptions);

// Sledujeme všechny sekce pro menu a všechny prvky s animací
document.querySelectorAll('section, [data-animate]').forEach(el => {
    observer.observe(el);
});