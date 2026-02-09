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

function initPortfolioFilter() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const portfolioCards = document.querySelectorAll('.portfolio-card');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Aktivní tlačítko
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      const filterValue = button.getAttribute('data-filter');
      
      // Počítadlo pro stagger efekt
      let visibleIndex = 0;
      
      portfolioCards.forEach((card, index) => {
        const cardCategory = card.getAttribute('data-category');
        const shouldShow = filterValue === 'all' || cardCategory === filterValue;
        
        if (shouldShow) {
          // Zobraz kartu s postupným zpožděním
          card.style.display = 'block';
          
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, visibleIndex * 100); // Každá karta o 100ms později
          
          visibleIndex++;
        } else {
          // Skryj kartu
          card.style.opacity = '0';
          card.style.transform = 'scale(0.8)';
          
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

document.addEventListener('DOMContentLoaded', initPortfolioFilter);

const visibleCards = document.querySelectorAll('.portfolio-card[style*="display: block"], .portfolio-card:not([style*="display: none"])');
document.getElementById('project-count').textContent = visibleCards.length;

const portfolioCards = document.querySelectorAll('.portfolio-card');
const loadMoreBtn = document.getElementById('load-more-btn');
let itemsToShow = 3;

portfolioCards.forEach((card, index) => {
  if (index >= itemsToShow) {
    card.classList.add('hidden');
  }
});

loadMoreBtn.addEventListener('click', () => {
  portfolioCards.forEach(card => {
    card.classList.remove('hidden');
    card.style.display = 'block';
  });
  loadMoreBtn.style.display = 'none';
});

const modal = document.getElementById('project-modal');
const modalClose = document.querySelector('.modal-close');

// Kliknutí na kartu otevře modal
document.querySelectorAll('.portfolio-card').forEach(card => {
  card.addEventListener('click', () => {
    // Získej data z karty
    const img = card.querySelector('img').src;
    const title = card.querySelector('.portfolio-title').textContent;
    const description = card.querySelector('.portfolio-description').textContent;
    
    // Naplň modal
    document.getElementById('modal-image').src = img;
    document.getElementById('modal-title').textContent = title;
    document.getElementById('modal-description').textContent = description;
    
    // Zobraz modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Zablokuj scroll
  });
});

// Zavření modalu
modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});

function closeModal() {
  modal.classList.remove('active');
  document.body.style.overflow = 'auto'; // Obnov scroll
}

// Zavři modal při ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('active')) {
    closeModal();
  }
});