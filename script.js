// Apple-Inspired Premium CV JavaScript

class PremiumCV {
    constructor() {
        this.init();
    }

    init() {
        this.setupSmoothScrolling();
        this.setupNavigationHighlighting();
        this.setupScrollAnimations();
        this.setupParallaxEffects();
        this.setupInteractiveElements();
        this.setupKeyboardNavigation();
        this.setupPreloader();
    }

    // Smooth scrolling for navigation links
    setupSmoothScrolling() {
        const navLinks = document.querySelectorAll('.nav-item');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offset = 80; // Account for sticky nav
                    const targetPosition = targetSection.offsetTop - offset;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Dynamic navigation highlighting based on scroll position
    setupNavigationHighlighting() {
        const sections = document.querySelectorAll('section[id]');
        const navItems = document.querySelectorAll('.nav-item');
        
        const highlightNavItem = () => {
            const scrollPosition = window.scrollY + 100;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    navItems.forEach(item => {
                        item.classList.remove('active');
                        if (item.getAttribute('href') === `#${sectionId}`) {
                            item.classList.add('active');
                        }
                    });
                }
            });
        };

        window.addEventListener('scroll', this.throttle(highlightNavItem, 100));
    }

    // Scroll-triggered animations
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // Stagger animations for grid items
                    if (entry.target.classList.contains('expertise-grid') || 
                        entry.target.classList.contains('achievements-grid')) {
                        this.staggerGridAnimation(entry.target);
                    }
                    
                    // Timeline animations
                    if (entry.target.classList.contains('timeline-item')) {
                        this.animateTimelineItem(entry.target);
                    }
                    
                    // Stats counter animation
                    if (entry.target.classList.contains('summary-stats')) {
                        this.animateStats(entry.target);
                    }
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const animateElements = document.querySelectorAll(`
            .summary-card,
            .expertise-grid,
            .timeline-item,
            .achievements-grid,
            .education-grid,
            .summary-stats
        `);

        animateElements.forEach(el => {
            observer.observe(el);
        });
    }

    // Stagger animation for grid items
    staggerGridAnimation(grid) {
        const items = grid.children;
        Array.from(items).forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '0';
                item.style.transform = 'translateY(30px)';
                item.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                
                requestAnimationFrame(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                });
            }, index * 150);
        });
    }

    // Timeline item animation
    animateTimelineItem(item) {
        const marker = item.querySelector('.timeline-marker');
        const card = item.querySelector('.job-card');
        
        if (marker) {
            marker.style.transform = 'scale(0)';
            marker.style.transition = 'transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            
            setTimeout(() => {
                marker.style.transform = 'scale(1)';
            }, 200);
        }
        
        if (card) {
            card.style.opacity = '0';
            card.style.transform = 'translateX(-30px)';
            card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateX(0)';
            }, 400);
        }
    }

    // Animated stats counter
    animateStats(statsContainer) {
        const statNumbers = statsContainer.querySelectorAll('.stat-number');
        
        statNumbers.forEach(stat => {
            const finalValue = stat.textContent;
            const isNumber = /^\d+/.test(finalValue);
            
            if (isNumber) {
                const number = parseInt(finalValue.match(/\d+/)[0]);
                const suffix = finalValue.replace(/\d+/, '');
                let current = 0;
                const increment = number / 50;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= number) {
                        current = number;
                        clearInterval(timer);
                    }
                    stat.textContent = Math.floor(current) + suffix;
                }, 30);
            }
        });
    }

    // Parallax effects for hero section
    setupParallaxEffects() {
        const hero = document.querySelector('.hero');
        
        window.addEventListener('scroll', this.throttle(() => {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            
            if (hero) {
                hero.style.transform = `translateY(${parallax}px)`;
            }
        }, 16));
    }

    // Interactive elements
    setupInteractiveElements() {
        // Add hover effects to cards
        const cards = document.querySelectorAll(`
            .contact-card,
            .expertise-card,
            .job-card,
            .achievement-card,
            .education-card
        `);

        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.addCardHoverEffect(card);
            });

            card.addEventListener('mouseleave', () => {
                this.removeCardHoverEffect(card);
            });
        });

        // Skill tag interactions
        const skillTags = document.querySelectorAll('.skill-tag');
        skillTags.forEach(tag => {
            tag.addEventListener('click', () => {
                this.highlightSkill(tag);
            });
        });

        // Contact card click to copy
        const contactCards = document.querySelectorAll('.contact-card');
        contactCards.forEach(card => {
            card.addEventListener('click', () => {
                this.copyContactInfo(card);
            });
        });
    }

    // Card hover effect
    addCardHoverEffect(card) {
        card.style.transform = 'translateY(-8px) scale(1.02)';
        card.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.15)';
        card.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    }

    removeCardHoverEffect(card) {
        card.style.transform = 'translateY(0) scale(1)';
        card.style.boxShadow = '';
        card.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    }

    // Skill highlighting
    highlightSkill(tag) {
        // Remove previous highlights
        document.querySelectorAll('.skill-tag.highlighted').forEach(t => {
            t.classList.remove('highlighted');
        });
        
        // Add highlight to clicked tag
        tag.classList.add('highlighted');
        
        // Add temporary highlight style
        tag.style.background = '#007AFF';
        tag.style.color = 'white';
        tag.style.transform = 'scale(1.1)';
        tag.style.transition = 'all 0.2s ease';
        
        setTimeout(() => {
            tag.style.transform = 'scale(1)';
        }, 200);
    }

    // Copy contact information
    copyContactInfo(card) {
        const value = card.querySelector('.contact-value')?.textContent;
        if (value && navigator.clipboard) {
            navigator.clipboard.writeText(value).then(() => {
                this.showCopyNotification(card);
            });
        }
    }

    // Show copy notification
    showCopyNotification(card) {
        const notification = document.createElement('div');
        notification.textContent = 'Copied!';
        notification.style.cssText = `
            position: absolute;
            top: -40px;
            left: 50%;
            transform: translateX(-50%);
            background: #007AFF;
            color: white;
            padding: 8px 16px;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 600;
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        card.style.position = 'relative';
        card.appendChild(notification);
        
        requestAnimationFrame(() => {
            notification.style.opacity = '1';
        });
        
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 2000);
    }

    // Keyboard navigation
    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });

        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });
    }

    // Preloader
    setupPreloader() {
        window.addEventListener('load', () => {
            const preloader = document.getElementById('preloader');
            if (preloader) {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.remove();
                }, 500);
            }
            
            // Initialize entrance animations
            this.initEntranceAnimations();
        });
    }

    // Entrance animations
    initEntranceAnimations() {
        const hero = document.querySelector('.hero');
        const nav = document.querySelector('.nav-bar');
        
        if (hero) {
            hero.style.opacity = '0';
            hero.style.transform = 'translateY(30px)';
            hero.style.transition = 'all 1s cubic-bezier(0.4, 0, 0.2, 1)';
            
            setTimeout(() => {
                hero.style.opacity = '1';
                hero.style.transform = 'translateY(0)';
            }, 200);
        }
        
        if (nav) {
            nav.style.opacity = '0';
            nav.style.transform = 'translateY(-100%)';
            nav.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            
            setTimeout(() => {
                nav.style.opacity = '1';
                nav.style.transform = 'translateY(0)';
            }, 800);
        }
    }

    // Utility function for throttling
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
}

// Initialize the CV when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PremiumCV();
});

// Add CSS for animations that need to be applied via JavaScript
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    .keyboard-navigation *:focus {
        outline: 2px solid #007AFF !important;
        outline-offset: 2px !important;
    }
    
    .animate-in {
        animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .skill-tag.highlighted {
        position: relative;
        z-index: 10;
    }
    
    /* Loading animation for avatar */
    .avatar-ring {
        animation: rotate 3s linear infinite;
    }
    
    @keyframes rotate {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
    
    /* Smooth transitions for all interactive elements */
    .contact-card,
    .expertise-card,
    .job-card,
    .achievement-card,
    .education-card,
    .skill-tag,
    .nav-item {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    /* Enhanced hover states */
    .contact-card:hover {
        cursor: pointer;
    }
    
    .skill-tag:hover {
        cursor: pointer;
        transform: translateY(-2px);
    }
    
    /* Timeline animations */
    .timeline-item {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .timeline-item.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    /* Stats animation */
    .stat-number {
        transition: all 0.3s ease;
    }
    
    /* Preloader styles */
    #preloader {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #007AFF 0%, #5AC8FA 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        transition: opacity 0.5s ease;
    }
    
    .preloader-content {
        text-align: center;
        color: white;
    }
    
    .preloader-spinner {
        width: 50px;
        height: 50px;
        border: 3px solid rgba(255, 255, 255, 0.3);
        border-top: 3px solid white;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 0 auto 20px;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;

document.head.appendChild(animationStyles);

// Add preloader HTML
const preloaderHTML = `
    <div id="preloader">
        <div class="preloader-content">
            <div class="preloader-spinner"></div>
            <p>Loading premium experience...</p>
        </div>
    </div>
`;

document.body.insertAdjacentHTML('afterbegin', preloaderHTML);