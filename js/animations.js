// Animation Manager

import { Utils } from './utils.js';

export class AnimationManager {
    constructor() {
        this.observers = new Map();
        this.animatedElements = new Set();
        
        this.init();
    }

    init() {
        this.setupScrollAnimations();
        this.setupParallaxEffects();
        this.setupEntranceAnimations();
    }

    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.animatedElements.has(entry.target)) {
                    this.animatedElements.add(entry.target);
                    this.triggerAnimation(entry.target);
                }
            });
        }, observerOptions);

        // Store observer for cleanup
        this.observers.set('scroll', observer);

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

    triggerAnimation(element) {
        element.classList.add('animate-in');
        
        // Handle specific animation types
        if (element.classList.contains('expertise-grid') || 
            element.classList.contains('achievements-grid')) {
            this.staggerGridAnimation(element);
        }
        
        if (element.classList.contains('timeline-item')) {
            this.animateTimelineItem(element);
        }
        
        if (element.classList.contains('summary-stats')) {
            this.animateStats(element);
        }
    }

    staggerGridAnimation(grid) {
        const items = Array.from(grid.children);
        
        items.forEach((item, index) => {
            // Set initial state
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
            item.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            
            // Animate with delay
            setTimeout(() => {
                requestAnimationFrame(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                });
            }, index * 150);
        });
    }

    animateTimelineItem(item) {
        const marker = item.querySelector('.timeline-marker');
        const card = item.querySelector('.job-card');
        
        if (marker) {
            this.animateMarker(marker);
        }
        
        if (card) {
            this.animateCard(card);
        }
    }

    animateMarker(marker) {
        marker.style.transform = 'scale(0)';
        marker.style.transition = 'transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        
        setTimeout(() => {
            marker.style.transform = 'scale(1)';
        }, 200);
    }

    animateCard(card) {
        card.style.opacity = '0';
        card.style.transform = 'translateX(-30px)';
        card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateX(0)';
        }, 400);
    }

    animateStats(statsContainer) {
        const statNumbers = statsContainer.querySelectorAll('.stat-number');
        
        statNumbers.forEach(stat => {
            const finalValue = stat.textContent;
            const isNumber = /^\d+/.test(finalValue);
            
            if (isNumber) {
                const number = parseInt(finalValue.match(/\d+/)[0]);
                const suffix = finalValue.replace(/\d+/, '');
                
                Utils.animateNumber(stat, 0, number, 2000, suffix);
            }
        });
    }

    setupParallaxEffects() {
        if (Utils.isTouchDevice()) {
            // Disable parallax on touch devices for better performance
            return;
        }

        const hero = document.querySelector('.hero');
        
        if (hero) {
            const parallaxHandler = Utils.throttle(() => {
                const scrolled = window.pageYOffset;
                const parallax = scrolled * 0.3; // Reduced for better performance
                
                hero.style.transform = `translateY(${parallax}px)`;
            }, 16);

            window.addEventListener('scroll', parallaxHandler, { passive: true });
        }
    }

    setupEntranceAnimations() {
        const hero = document.querySelector('.hero');
        const nav = document.querySelector('.nav-bar');
        
        // Entrance animation for hero
        if (hero) {
            this.animateHeroEntrance(hero);
        }
        
        // Entrance animation for navigation
        if (nav) {
            this.animateNavEntrance(nav);
        }
    }

    animateHeroEntrance(hero) {
        hero.style.opacity = '0';
        hero.style.transform = 'translateY(30px)';
        hero.style.transition = 'all 1s cubic-bezier(0.4, 0, 0.2, 1)';
        
        setTimeout(() => {
            hero.style.opacity = '1';
            hero.style.transform = 'translateY(0)';
        }, 200);
    }

    animateNavEntrance(nav) {
        nav.style.opacity = '0';
        nav.style.transform = 'translateY(-100%)';
        nav.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        
        setTimeout(() => {
            nav.style.opacity = '1';
            nav.style.transform = 'translateY(0)';
        }, 800);
    }

    // Public methods
    animateElement(element, animationType = 'fadeInUp') {
        if (this.animatedElements.has(element)) return;
        
        this.animatedElements.add(element);
        element.classList.add('animate-in', `animate-${animationType}`);
    }

    resetAnimation(element) {
        this.animatedElements.delete(element);
        element.classList.remove('animate-in');
        element.style.opacity = '';
        element.style.transform = '';
    }

    // Cleanup method
    destroy() {
        this.observers.forEach(observer => {
            observer.disconnect();
        });
        this.observers.clear();
        this.animatedElements.clear();
    }
}