// Modern Enterprise Interactions

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Spotlight Effect for Cards
    const cardsContainer = document.getElementById('cards');
    const cards = document.querySelectorAll('.card');

    if (cardsContainer) {
        cardsContainer.onmousemove = e => {
            for(const card of cards) {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                card.style.setProperty("--mouse-x", `${x}px`);
                card.style.setProperty("--mouse-y", `${y}px`);
            };
        }
    }

    // 2. Scroll Animation Observer
    const observerOptions = {
        threshold: 0.1, // Trigger when 10% of element is visible
        rootMargin: "0px 0px -50px 0px" // Trigger slightly before bottom
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Elements to animate
    const animatedElements = document.querySelectorAll('.card, .section-header, .membership-showcase, footer');
    animatedElements.forEach(el => observer.observe(el));

    // 3. Header Glass Effect
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 4. Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 5. Hero Parallax
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const blobs = document.querySelectorAll('.blob');
        
        blobs.forEach((blob, index) => {
            const speed = index === 0 ? 0.2 : -0.1;
            blob.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // 6. 3D Holographic Tilt for Membership Card
    const membershipCard = document.querySelector('.membership-showcase');

    if (membershipCard) {
        membershipCard.addEventListener('mousemove', (e) => {
            const rect = membershipCard.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Calculate rotation (max 5 degrees for subtlety)
            // Rotate Y based on X position (left/right tilt)
            // Rotate X based on Y position (up/down tilt) - Note the negative sign for natural feel
            const xRotation = -((y - rect.height / 2) / rect.height * 5);
            const yRotation = ((x - rect.width / 2) / rect.width * 5);
            
            membershipCard.style.transform = `perspective(1000px) rotateX(${xRotation}deg) rotateY(${yRotation}deg) scale(1.02)`;
            membershipCard.style.transition = 'transform 0.1s ease';
        });

        membershipCard.addEventListener('mouseleave', () => {
            // Reset to flat state
            membershipCard.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
            membershipCard.style.transition = 'transform 0.5s ease';
        });
    }
    
    console.log("TravelWealth Enterprise Animations Initialized");

});
