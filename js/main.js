// Main Application Entry Point

import { Utils } from './utils.js';
import { NavigationManager } from './navigation.js';
import { AnimationManager } from './animations.js';
import { InteractionManager } from './interactions.js';
import { PerformanceManager } from './performance.js';

class PremiumCV {
    constructor() {
        this.modules = new Map();
        this.initialized = false;
        this.config = {
            enableAnimations: true,
            enableParallax: !Utils.isTouchDevice(),
            enableAnalytics: false,
            performanceMode: false
        };

        this.init();
    }

    async init() {
        try {
            // Initialize core modules
            await this.initializeModules();
            
            // Setup global event handlers
            this.setupGlobalEvents();
            
            // Mark as initialized
            this.initialized = true;
            
            console.log('PremiumCV initialized successfully');
            
            // Dispatch initialization event
            this.dispatchEvent('premiumcv:initialized');
            
        } catch (error) {
            console.error('Failed to initialize PremiumCV:', error);
            this.handleInitializationError(error);
        }
    }

    async initializeModules() {
        try {
            // Initialize performance manager first
            this.modules.set('performance', new PerformanceManager());
            
            // Initialize navigation
            this.modules.set('navigation', new NavigationManager());
            
            // Initialize animations if enabled
            if (this.config.enableAnimations) {
                this.modules.set('animations', new AnimationManager());
            }
            
            // Initialize interactions
            this.modules.set('interactions', new InteractionManager());
            
            console.log('All modules initialized successfully');
            
        } catch (error) {
            console.error('Module initialization failed:', error);
            throw error;
        }
    }

    setupGlobalEvents() {
        // Handle page visibility changes
        document.addEventListener('visibilitychange', () => {
            this.handleVisibilityChange();
        });

        // Handle window resize
        window.addEventListener('resize', Utils.debounce(() => {
            this.handleResize();
        }, 250));

        // Handle orientation change
        window.addEventListener('orientationchange', () => {
            setTimeout(() => this.handleResize(), 500);
        });

        // Handle online/offline status
        window.addEventListener('online', () => {
            this.handleConnectionChange(true);
        });

        window.addEventListener('offline', () => {
            this.handleConnectionChange(false);
        });

        // Handle errors
        window.addEventListener('error', (event) => {
            this.handleError(event.error);
        });

        // Handle unhandled promise rejections
        window.addEventListener('unhandledrejection', (event) => {
            this.handleError(event.reason);
        });
    }

    handleVisibilityChange() {
        if (document.hidden) {
            // Pause animations and reduce activity
            this.pauseAnimations();
        } else {
            // Resume animations
            this.resumeAnimations();
        }
    }

    handleResize() {
        const deviceType = Utils.getDeviceType();
        console.log('Device type changed to:', deviceType);
        
        // Update modules based on new device type
        this.modules.forEach((module, name) => {
            if (typeof module.handleResize === 'function') {
                module.handleResize();
            }
        });

        this.dispatchEvent('premiumcv:resize', { deviceType });
    }

    handleConnectionChange(isOnline) {
        console.log('Connection status:', isOnline ? 'online' : 'offline');
        
        if (!isOnline) {
            // Switch to performance mode when offline
            this.enablePerformanceMode();
        }
        
        this.dispatchEvent('premiumcv:connection', { isOnline });
    }

    handleError(error) {
        console.error('Application error:', error);
        
        // Report error to analytics if available
        if (this.config.enableAnalytics && typeof gtag !== 'undefined') {
            gtag('event', 'exception', {
                description: error.message,
                fatal: false
            });
        }
        
        this.dispatchEvent('premiumcv:error', { error });
    }

    handleInitializationError(error) {
        // Show fallback UI or error message
        const errorMessage = document.createElement('div');
        errorMessage.className = 'initialization-error';
        errorMessage.innerHTML = `
            <div class="error-content">
                <h3>Loading Error</h3>
                <p>Sorry, there was a problem loading the page. Please refresh to try again.</p>
                <button onclick="location.reload()">Refresh Page</button>
            </div>
        `;
        
        errorMessage.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            color: white;
            text-align: center;
        `;
        
        document.body.appendChild(errorMessage);
    }

    // Module management
    getModule(name) {
        return this.modules.get(name);
    }

    enablePerformanceMode() {
        this.config.performanceMode = true;
        
        // Disable expensive features
        this.config.enableParallax = false;
        
        // Notify modules
        this.modules.forEach(module => {
            if (typeof module.enablePerformanceMode === 'function') {
                module.enablePerformanceMode();
            }
        });
        
        console.log('Performance mode enabled');
    }

    disablePerformanceMode() {
        this.config.performanceMode = false;
        this.config.enableParallax = !Utils.isTouchDevice();
        
        // Notify modules
        this.modules.forEach(module => {
            if (typeof module.disablePerformanceMode === 'function') {
                module.disablePerformanceMode();
            }
        });
        
        console.log('Performance mode disabled');
    }

    pauseAnimations() {
        const animationManager = this.modules.get('animations');
        if (animationManager && typeof animationManager.pause === 'function') {
            animationManager.pause();
        }
    }

    resumeAnimations() {
        const animationManager = this.modules.get('animations');
        if (animationManager && typeof animationManager.resume === 'function') {
            animationManager.resume();
        }
    }

    // Event system
    dispatchEvent(eventName, detail = {}) {
        const event = new CustomEvent(eventName, { detail });
        document.dispatchEvent(event);
    }

    addEventListener(eventName, handler) {
        document.addEventListener(eventName, handler);
    }

    removeEventListener(eventName, handler) {
        document.removeEventListener(eventName, handler);
    }

    // Public API
    scrollToSection(sectionId) {
        const navigation = this.modules.get('navigation');
        if (navigation) {
            navigation.scrollToSection(sectionId);
        }
    }

    highlightSkill(skillText) {
        const interactions = this.modules.get('interactions');
        if (interactions) {
            interactions.highlightSkillByText(skillText);
        }
    }

    getPerformanceMetrics() {
        const performance = this.modules.get('performance');
        return performance ? performance.getPerformanceMetrics() : null;
    }

    // Configuration
    updateConfig(newConfig) {
        this.config = { ...this.config, ...newConfig };
        console.log('Configuration updated:', this.config);
    }

    getConfig() {
        return { ...this.config };
    }

    // Cleanup
    destroy() {
        // Cleanup all modules
        this.modules.forEach(module => {
            if (typeof module.destroy === 'function') {
                module.destroy();
            }
        });
        
        this.modules.clear();
        this.initialized = false;
        
        console.log('PremiumCV destroyed');
    }

    // Debug methods
    debug() {
        return {
            initialized: this.initialized,
            modules: Array.from(this.modules.keys()),
            config: this.config,
            performance: this.getPerformanceMetrics()
        };
    }
}

// Auto-initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.premiumCV = new PremiumCV();
    
    // Initialize iPhone scroll enhancements
    initializeIPhoneScrolling();
});

// iPhone-specific scroll enhancements
function initializeIPhoneScrolling() {
    const scrollableContent = document.querySelector('.scrollable-content');
    const statusBar = document.querySelector('.status-bar');
    const navigation = document.querySelector('.nav-bar');
    
    if (!scrollableContent) return;
    
    let isScrolling = false;
    let scrollTimeout;
    
    // Enhanced scroll behavior
    scrollableContent.addEventListener('scroll', (e) => {
        if (!isScrolling) {
            isScrolling = true;
            document.body.classList.add('is-scrolling');
        }
        
        // Clear timeout and set new one
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            isScrolling = false;
            document.body.classList.remove('is-scrolling');
        }, 150);
        
        // Parallax effect for status bar
        const scrollY = scrollableContent.scrollTop;
        const maxScroll = 100;
        const opacity = Math.max(0.8, 1 - (scrollY / maxScroll) * 0.2);
        
        if (statusBar) {
            statusBar.style.backgroundColor = `rgba(0, 0, 0, ${0.8 + (scrollY / maxScroll) * 0.2})`;
        }
        
        // Navigation blur effect
        if (navigation && scrollY > 50) {
            navigation.classList.add('scrolled');
        } else if (navigation) {
            navigation.classList.remove('scrolled');
        }
    });
    
    // Haptic feedback simulation for iOS
    const hapticElements = document.querySelectorAll('.contact-card, .skill-tag, .nav-item');
    hapticElements.forEach(element => {
        element.addEventListener('touchstart', () => {
            element.style.transform = 'scale(0.98)';
        }, { passive: true });
        
        element.addEventListener('touchend', () => {
            element.style.transform = '';
        }, { passive: true });
        
        element.addEventListener('touchcancel', () => {
            element.style.transform = '';
        }, { passive: true });
    });
    
    // Smooth scroll reveal animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe cards for scroll animations
    const cards = document.querySelectorAll('.expertise-card, .job-card, .achievement-card, .education-card, .timeline-item');
    cards.forEach(card => {
        scrollObserver.observe(card);
    });
}

// Add CSS for ripple effect and other dynamic styles
const dynamicStyles = document.createElement('style');
dynamicStyles.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    /* Enhanced Scroll Styles */
    .is-scrolling .iphone-frame {
        box-shadow: var(--shadow-iphone), 0 0 60px rgba(0, 122, 255, 0.2);
    }
    
    .nav-bar.scrolled {
        background: rgba(242, 242, 247, 0.98);
        backdrop-filter: blur(30px);
        box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
    }
    
    /* Scroll Indicator */
    .scroll-indicator {
        position: absolute;
        right: 2px;
        top: 60px;
        bottom: 60px;
        width: 2px;
        background: rgba(0, 0, 0, 0.1);
        border-radius: 1px;
        z-index: 10;
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .scroll-indicator::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 20%;
        background: linear-gradient(to bottom, var(--primary-blue), var(--secondary-blue));
        border-radius: 1px;
        transform: translateY(0);
        transition: transform 0.1s ease-out;
    }
    
    .is-scrolling .scroll-indicator {
        opacity: 1;
    }
    
    .initialization-error .error-content {
        background: white;
        color: #333;
        padding: 2rem;
        border-radius: 8px;
        max-width: 400px;
    }
    
    .initialization-error button {
        background: #007AFF;
        color: white;
        border: none;
        padding: 12px 24px;
        border-radius: 6px;
        cursor: pointer;
        margin-top: 1rem;
        font-size: 16px;
    }
    
    .initialization-error button:hover {
        background: #0056CC;
    }
    
    .loaded {
        opacity: 1 !important;
    }
    
    .skill-selected {
        background: #007AFF !important;
        color: white !important;
        transform: scale(1.1) !important;
    }
    
    .copy-feedback {
        animation: fadeInOut 2s ease-in-out;
    }
    
    @keyframes fadeInOut {
        0%, 100% { opacity: 0; transform: translateY(10px); }
        10%, 90% { opacity: 1; transform: translateY(0); }
    }
    
    /* Enhanced Haptic Feedback */
    .haptic-feedback:active {
        transform: scale(0.95);
        transition: transform 0.1s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    /* Card Hover Effects */
    .expertise-card:hover,
    .job-card:hover,
    .achievement-card:hover,
    .education-card:hover {
        transform: translateY(-3px) scale(1.02);
        box-shadow: 
            0 12px 32px rgba(0, 0, 0, 0.15),
            0 6px 16px rgba(0, 0, 0, 0.12),
            0 0 0 1px rgba(255, 255, 255, 0.5);
    }
`;

document.head.appendChild(dynamicStyles);

export default PremiumCV;