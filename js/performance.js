// Performance Optimization Manager

import { Utils } from './utils.js';

export class PerformanceManager {
    constructor() {
        this.imageObserver = null;
        this.loadedImages = new Set();
        this.criticalResources = new Map();
        
        this.init();
    }

    init() {
        this.setupLazyLoading();
        this.setupImageOptimization();
        this.setupCriticalResourceLoading();
        this.setupPerformanceMonitoring();
        this.setupPreloader();
    }

    setupLazyLoading() {
        // Setup intersection observer for lazy loading
        const imageObserverOptions = {
            root: null,
            rootMargin: '50px',
            threshold: 0.1
        };

        this.imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.loadImage(entry.target);
                    this.imageObserver.unobserve(entry.target);
                }
            });
        }, imageObserverOptions);

        // Observe all images with data-src
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => {
            this.imageObserver.observe(img);
        });
    }

    loadImage(img) {
        const src = img.getAttribute('data-src');
        if (src && !this.loadedImages.has(img)) {
            img.src = src;
            img.removeAttribute('data-src');
            this.loadedImages.add(img);
            
            img.addEventListener('load', () => {
                img.classList.add('loaded');
            });
        }
    }

    setupImageOptimization() {
        // Add loading="lazy" to images that don't have it
        const images = document.querySelectorAll('img:not([loading])');
        images.forEach(img => {
            img.setAttribute('loading', 'lazy');
        });

        // Add proper sizing attributes
        this.optimizeImageSizing();
    }

    optimizeImageSizing() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            if (!img.hasAttribute('width') || !img.hasAttribute('height')) {
                // Set default dimensions to prevent layout shift
                img.style.aspectRatio = '16/9';
                img.style.objectFit = 'cover';
            }
        });
    }

    setupCriticalResourceLoading() {
        // Preload critical resources
        this.preloadCriticalFonts();
        this.preloadCriticalImages();
        this.preloadCriticalStyles();
    }

    preloadCriticalFonts() {
        const criticalFonts = [
            'https://fonts.googleapis.com/css2?family=SF+Pro+Display:wght@300;400;500;600;700&display=swap'
        ];

        criticalFonts.forEach(fontUrl => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'style';
            link.href = fontUrl;
            link.crossOrigin = 'anonymous';
            document.head.appendChild(link);
        });
    }

    preloadCriticalImages() {
        // Preload above-the-fold images
        const criticalImages = [
            // Add any critical images here
        ];

        criticalImages.forEach(imageUrl => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = imageUrl;
            document.head.appendChild(link);
        });
    }

    preloadCriticalStyles() {
        // Inline critical CSS for faster rendering
        const criticalCSS = `
            .hero { display: block; }
            .nav-bar { display: block; }
            .page-wrapper { display: block; }
        `;

        const style = document.createElement('style');
        style.textContent = criticalCSS;
        document.head.insertBefore(style, document.head.firstChild);
    }

    setupPerformanceMonitoring() {
        // Monitor Core Web Vitals
        if ('PerformanceObserver' in window) {
            this.monitorLCP();
            this.monitorFID();
            this.monitorCLS();
        }

        // Monitor resource loading
        this.monitorResourceLoading();
    }

    monitorLCP() {
        try {
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                const lastEntry = entries[entries.length - 1];
                
                console.log('LCP:', lastEntry.startTime);
                
                // You can send this data to analytics
                this.reportMetric('LCP', lastEntry.startTime);
            });
            
            observer.observe({ entryTypes: ['largest-contentful-paint'] });
        } catch (error) {
            console.warn('LCP monitoring not supported:', error);
        }
    }

    monitorFID() {
        try {
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach(entry => {
                    console.log('FID:', entry.processingStart - entry.startTime);
                    this.reportMetric('FID', entry.processingStart - entry.startTime);
                });
            });
            
            observer.observe({ entryTypes: ['first-input'] });
        } catch (error) {
            console.warn('FID monitoring not supported:', error);
        }
    }

    monitorCLS() {
        try {
            let clsValue = 0;
            
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach(entry => {
                    if (!entry.hadRecentInput) {
                        clsValue += entry.value;
                        console.log('CLS:', clsValue);
                        this.reportMetric('CLS', clsValue);
                    }
                });
            });
            
            observer.observe({ entryTypes: ['layout-shift'] });
        } catch (error) {
            console.warn('CLS monitoring not supported:', error);
        }
    }

    monitorResourceLoading() {
        window.addEventListener('load', () => {
            const navigation = performance.getEntriesByType('navigation')[0];
            const resources = performance.getEntriesByType('resource');
            
            console.log('Page Load Time:', navigation.loadEventEnd - navigation.fetchStart);
            console.log('DOM Content Loaded:', navigation.domContentLoadedEventEnd - navigation.fetchStart);
            console.log('Resources Loaded:', resources.length);
            
            // Report slow resources
            resources.forEach(resource => {
                if (resource.duration > 1000) {
                    console.warn('Slow resource:', resource.name, resource.duration);
                }
            });
        });
    }

    reportMetric(name, value) {
        // Send metrics to analytics service
        if (typeof gtag !== 'undefined') {
            gtag('event', 'web_vitals', {
                event_category: 'Performance',
                event_label: name,
                value: Math.round(value)
            });
        }
        
        // You can also send to other analytics services
        console.log(`Performance Metric - ${name}:`, value);
    }

    setupPreloader() {
        this.createPreloader();
        this.handlePreloaderRemoval();
    }

    createPreloader() {
        if (document.getElementById('preloader')) return;

        const preloader = document.createElement('div');
        preloader.id = 'preloader';
        preloader.innerHTML = `
            <div class="preloader-content">
                <div class="preloader-spinner"></div>
                <p>Loading premium experience...</p>
            </div>
        `;

        document.body.insertBefore(preloader, document.body.firstChild);
    }

    handlePreloaderRemoval() {
        // Remove preloader when page is fully loaded
        window.addEventListener('load', () => {
            this.removePreloader();
        });

        // Fallback: remove preloader after maximum wait time
        setTimeout(() => {
            this.removePreloader();
        }, 5000);
    }

    removePreloader() {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.remove();
                document.body.classList.add('loaded');
            }, 500);
        }
    }

    // Resource optimization methods
    optimizeScrollPerformance() {
        // Use passive event listeners for scroll events
        const scrollElements = document.querySelectorAll('[data-scroll]');
        scrollElements.forEach(element => {
            element.addEventListener('scroll', this.handleScroll.bind(this), { 
                passive: true 
            });
        });
    }

    handleScroll(event) {
        // Throttled scroll handler
        Utils.throttle(() => {
            // Scroll logic here
        }, 16);
    }

    // Memory management
    cleanup() {
        if (this.imageObserver) {
            this.imageObserver.disconnect();
        }
        
        this.loadedImages.clear();
        this.criticalResources.clear();
    }

    // Public methods
    getPerformanceMetrics() {
        return {
            loadedImages: this.loadedImages.size,
            criticalResources: this.criticalResources.size,
            memoryUsage: this.getMemoryUsage()
        };
    }

    getMemoryUsage() {
        if ('memory' in performance) {
            return {
                used: performance.memory.usedJSHeapSize,
                total: performance.memory.totalJSHeapSize,
                limit: performance.memory.jsHeapSizeLimit
            };
        }
        return null;
    }

    // Force load all images (useful for testing)
    loadAllImages() {
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => {
            this.loadImage(img);
        });
    }
}