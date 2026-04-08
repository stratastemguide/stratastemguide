// Optimization Config
gsap.config({
    force3D: true,
    nullTargetWarn: false
});



// 


// Magnetic Physics for Buttons
document.querySelectorAll('.magnetic').forEach(el => {
    el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(el, { x: x * 0.4, y: y * 0.4, duration: 0.15, ease: 'power2.out' });
    });
    el.addEventListener('mouseleave', () => {
        gsap.to(el, { x: 0, y: 0, duration: 0.3, ease: 'power2.out' });
    });
});

// Performance Optimized 3D Tilt
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const xPercent = (e.clientX - rect.left) / rect.width - 0.5;
        const yPercent = (e.clientY - rect.top) / rect.height - 0.5;
        
        gsap.to(card, {
            rotationY: xPercent * 5,
            rotationX: -yPercent * 5,
            duration: 0.2,
            ease: "power2.out",
            perspective: 1000
        });
    });
    card.addEventListener('mouseleave', () => {
        gsap.to(card, { rotationY: 0, rotationX: 0, duration: 0.2 });
    });
});

// Global Parallax & Grid Shine
document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    document.documentElement.style.setProperty('--mouse-x', `${x}%`);
    document.documentElement.style.setProperty('--mouse-y', `${y}%`);

    const px = (e.clientX / window.innerWidth - 0.5) * 40;
    const py = (e.clientY / window.innerHeight - 0.5) * 40;
    gsap.to('.blob-1', { x: px, y: py, duration: 4 });
    gsap.to('.blob-2', { x: -px, y: -py, duration: 4 });
    gsap.to('.blob-3', { x: py, y: px, duration: 4 });
});

// Navbar menu logic moved to navbar.js


// Smooth Reveal Animations
gsap.utils.toArray('.reveal').forEach((el) => {
    gsap.from(el, {
        scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            toggleActions: "play none none none"
        },
        y: 20,
        opacity: 0,
        duration: 0.4,
        ease: 'power2.out'
    });
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});
// AI Chat Drawer Logic
const chatbotDrawer = document.getElementById('chatbot-drawer');
const drawerClose = document.querySelector('.drawer-close');

if (chatbotDrawer && drawerClose) {
    document.querySelectorAll('.chatbot-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            chatbotDrawer.classList.toggle('active');
            
            // Disable body scroll when drawer is open
            if (chatbotDrawer.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        });
    });

    drawerClose.addEventListener('click', () => {
        chatbotDrawer.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    // Close drawer on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && chatbotDrawer.classList.contains('active')) {
            chatbotDrawer.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

// Reviews Infinite Marquee
const track = document.querySelector('.reviews-track');
if (track) {
    // Clone cards for seamless loop
    const originalCards = track.innerHTML;
    track.innerHTML += originalCards; // Double the content
    
    const trackWidth = track.scrollWidth;
    
    const loop = gsap.to(track, {
        x: -(trackWidth / 2),
        duration: 30,
        ease: "none",
        repeat: -1,
        onReverseComplete: () => {
            gsap.set(track, { x: 0 });
        }
    });

    // Pause on hover
    track.addEventListener('mouseenter', () => loop.pause());
    track.addEventListener('mouseleave', () => loop.play());
    
    // Handle window resize
    window.addEventListener('resize', () => {
        loop.invalidate(); // Recalculates values
    });
}

// Back to Top Button Logic
function initScrollTop() {
    // Don't show Back to Top on the home page (index.html)
    if (window.navbarConfig && window.navbarConfig.activePage === 'home') {
        return;
    }
    
    let scrollTopBtn = document.querySelector('.scroll-top');
    
    // Create button if it doesn't exist in the HTML
    if (!scrollTopBtn) {
        scrollTopBtn = document.createElement('a');
        scrollTopBtn.className = 'scroll-top';
        scrollTopBtn.setAttribute('aria-label', 'Back to top');
        scrollTopBtn.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 15l-6-6-6 6"></path>
            </svg>
        `;
        document.body.appendChild(scrollTopBtn);
    }

    // Toggle Visibility on Scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    }, { passive: true });

    // Smooth Scroll to Top
    scrollTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize on load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollTop);
} else {
    initScrollTop();
}

