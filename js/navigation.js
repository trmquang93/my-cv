// Navigation Module

import { Utils } from './utils.js';

export class NavigationManager {
    constructor() {
        this.sections = document.querySelectorAll('section[id]');
        this.navItems = document.querySelectorAll('.nav-item');
        this.currentSection = null;
        this.isScrolling = false;
        
        this.init();
    }

    init() {
        this.setupSmoothScrolling();
        this.setupNavigationHighlighting();
        this.setupMobileNavigation();
    }

    setupSmoothScrolling() {
        this.navItems.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleNavClick(link);
            });
        });
    }

    handleNavClick(link) {
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            this.isScrolling = true;
            Utils.scrollToElement(targetSection, 80);
            
            // Update active state immediately
            this.updateActiveNavItem(link);
            
            // Reset scrolling flag after animation
            setTimeout(() => {
                this.isScrolling = false;
            }, 1000);
        }
    }

    setupNavigationHighlighting() {
        const highlightNavItem = Utils.throttle(() => {
            if (this.isScrolling) return;
            
            const scrollPosition = window.scrollY + 100;
            let currentSection = null;
            
            this.sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    currentSection = section;
                }
            });
            
            if (currentSection && currentSection !== this.currentSection) {
                this.currentSection = currentSection;
                const sectionId = currentSection.getAttribute('id');
                
                this.navItems.forEach(item => {
                    const isActive = item.getAttribute('href') === `#${sectionId}`;
                    item.classList.toggle('active', isActive);
                });
            }
        }, 100);

        window.addEventListener('scroll', highlightNavItem);
    }

    updateActiveNavItem(activeLink) {
        this.navItems.forEach(item => {
            item.classList.remove('active');
        });
        activeLink.classList.add('active');
    }

    setupMobileNavigation() {
        // Handle mobile menu if needed
        const nav = document.querySelector('.nav-bar');
        
        if (nav) {
            // Add mobile navigation toggle if screen is small
            this.handleMobileNav(nav);
        }
    }

    handleMobileNav(nav) {
        // Create mobile menu toggle button if needed
        if (window.innerWidth <= 768) {
            this.createMobileToggle(nav);
        }
        
        // Handle resize events
        window.addEventListener('resize', Utils.debounce(() => {
            this.handleMobileNav(nav);
        }, 250));
    }

    createMobileToggle(nav) {
        let toggle = nav.querySelector('.mobile-nav-toggle');
        
        if (!toggle && window.innerWidth <= 768) {
            toggle = document.createElement('button');
            toggle.className = 'mobile-nav-toggle';
            toggle.innerHTML = '☰';
            toggle.setAttribute('aria-label', 'Toggle navigation');
            
            toggle.style.cssText = `
                display: block;
                background: none;
                border: none;
                font-size: 1.5rem;
                color: var(--primary-blue);
                cursor: pointer;
                padding: 8px;
                border-radius: 4px;
                transition: background-color 0.2s ease;
            `;
            
            const navContent = nav.querySelector('.nav-content');
            navContent.style.display = 'none';
            
            nav.appendChild(toggle);
            
            toggle.addEventListener('click', () => {
                const isHidden = navContent.style.display === 'none';
                navContent.style.display = isHidden ? 'flex' : 'none';
                toggle.innerHTML = isHidden ? '✕' : '☰';
            });
        }
    }

    // Public methods for external use
    scrollToSection(sectionId) {
        const section = document.querySelector(`#${sectionId}`);
        if (section) {
            Utils.scrollToElement(section, 80);
        }
    }

    getCurrentSection() {
        return this.currentSection;
    }

    highlightSection(sectionId) {
        const targetNav = document.querySelector(`.nav-item[href="#${sectionId}"]`);
        if (targetNav) {
            this.updateActiveNavItem(targetNav);
        }
    }
}