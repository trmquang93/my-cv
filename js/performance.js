// Performance Optimization for Xcode CV
class PerformanceManager {
  constructor() {
    this.observers = new Map();
    this.rafId = null;
    this.metrics = {
      fps: 0,
      renderTime: 0,
      memoryUsage: 0
    };
    
    this.init();
  }
  
  init() {
    this.setupIntersectionObserver();
    this.setupPerformanceMonitoring();
    this.setupLazyLoading();
    this.setupVirtualScrolling();
    this.optimizeAnimations();
  }
  
  setupIntersectionObserver() {
    // Optimize rendering by only animating visible elements
    const observerOptions = {
      root: null,
      rootMargin: '50px',
      threshold: 0.1
    };
    
    const visibilityObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const element = entry.target;
        
        if (entry.isIntersecting) {
          element.classList.add('in-viewport');
          this.enableAnimations(element);
        } else {
          element.classList.remove('in-viewport');
          this.disableAnimations(element);
        }
      });
    }, observerOptions);
    
    // Observe all animated elements
    document.querySelectorAll('.file-item, .tab, .console-line, .property-item').forEach(el => {
      visibilityObserver.observe(el);
    });
    
    this.observers.set('visibility', visibilityObserver);
  }
  
  setupPerformanceMonitoring() {
    // Monitor FPS and performance metrics
    let frameCount = 0;
    let lastTime = performance.now();
    
    const measurePerformance = (currentTime) => {
      frameCount++;
      
      if (currentTime - lastTime >= 1000) {
        this.metrics.fps = frameCount;
        frameCount = 0;
        lastTime = currentTime;
        
        // Update performance display if needed
        this.updatePerformanceDisplay();
      }
      
      this.rafId = requestAnimationFrame(measurePerformance);
    };
    
    this.rafId = requestAnimationFrame(measurePerformance);
    
    // Monitor memory usage if available
    if ('memory' in performance) {
      setInterval(() => {
        this.metrics.memoryUsage = performance.memory.usedJSHeapSize / 1048576; // MB
      }, 2000);
    }
  }
  
  setupLazyLoading() {
    // Lazy load non-critical content
    const lazyObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.loadContent(entry.target);
          lazyObserver.unobserve(entry.target);
        }
      });
    });
    
    // Mark content for lazy loading
    document.querySelectorAll('.file-content:not(.active)').forEach(content => {
      content.dataset.lazy = 'true';
      lazyObserver.observe(content);
    });
    
    this.observers.set('lazy', lazyObserver);
  }
  
  setupVirtualScrolling() {
    // Implement virtual scrolling for large content
    const codeContent = document.querySelector('.code-content');
    if (!codeContent) return;
    
    const virtualScroll = {
      itemHeight: 22, // Line height in pixels
      visibleItems: 0,
      totalItems: 0,
      scrollTop: 0,
      startIndex: 0,
      endIndex: 0
    };
    
    const updateVirtualScroll = () => {
      const containerHeight = codeContent.clientHeight;
      virtualScroll.visibleItems = Math.ceil(containerHeight / virtualScroll.itemHeight);
      virtualScroll.startIndex = Math.floor(virtualScroll.scrollTop / virtualScroll.itemHeight);
      virtualScroll.endIndex = Math.min(
        virtualScroll.startIndex + virtualScroll.visibleItems + 2,
        virtualScroll.totalItems
      );
      
      this.renderVisibleLines(virtualScroll);
    };
    
    codeContent.addEventListener('scroll', () => {
      virtualScroll.scrollTop = codeContent.scrollTop;
      requestAnimationFrame(updateVirtualScroll);
    });
  }
  
  optimizeAnimations() {
    // Use will-change property strategically
    const optimizeElement = (element, properties) => {
      element.style.willChange = properties.join(', ');
      
      // Remove will-change after animation
      element.addEventListener('transitionend', () => {
        element.style.willChange = 'auto';
      }, { once: true });
    };
    
    // Optimize frequently animated elements
    document.querySelectorAll('.file-item').forEach(item => {
      item.addEventListener('mouseenter', () => {
        optimizeElement(item, ['transform', 'background-color']);
      });
    });
    
    document.querySelectorAll('.tab').forEach(tab => {
      tab.addEventListener('mouseenter', () => {
        optimizeElement(tab, ['transform', 'box-shadow']);
      });
    });
    
    // Use CSS containment for isolated components
    document.querySelectorAll('.sidebar, .inspector, .editor-container').forEach(panel => {
      panel.style.contain = 'layout style paint';
    });
  }
  
  enableAnimations(element) {
    element.style.transition = '';
    element.classList.remove('animations-disabled');
  }
  
  disableAnimations(element) {
    if (!element.classList.contains('in-viewport')) {
      element.style.transition = 'none';
      element.classList.add('animations-disabled');
    }
  }
  
  loadContent(element) {
    if (element.dataset.lazy === 'true') {
      // Simulate content loading
      element.style.opacity = '0';
      
      setTimeout(() => {
        element.style.transition = 'opacity 0.3s ease';
        element.style.opacity = '1';
        element.dataset.lazy = 'false';
      }, 100);
    }
  }
  
  renderVisibleLines(virtualScroll) {
    // Optimize line number rendering for large files
    const lineNumbers = document.querySelector('.line-numbers');
    if (!lineNumbers) return;
    
    const fragment = document.createDocumentFragment();
    
    for (let i = virtualScroll.startIndex; i < virtualScroll.endIndex; i++) {
      const lineNumber = document.createElement('div');
      lineNumber.className = 'line-number';
      lineNumber.textContent = i + 1;
      lineNumber.style.transform = `translateY(${i * virtualScroll.itemHeight}px)`;
      fragment.appendChild(lineNumber);
    }
    
    // Replace content efficiently
    if (lineNumbers.children.length > virtualScroll.visibleItems * 2) {
      lineNumbers.innerHTML = '';
      lineNumbers.appendChild(fragment);
    }
  }
  
  updatePerformanceDisplay() {
    // Show performance metrics in console (development mode)
    if (this.metrics.fps < 30) {
      window.xcodeCV?.logToConsole(`Low FPS detected: ${this.metrics.fps}`, 'warning');
    }
    
    if (this.metrics.memoryUsage > 50) {
      window.xcodeCV?.logToConsole(`High memory usage: ${this.metrics.memoryUsage.toFixed(1)}MB`, 'warning');
    }
  }
  
  // Debounce utility for expensive operations
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
  
  // Throttle utility for scroll events
  throttle(func, limit) {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
  
  // Optimize CSS animations
  optimizeCSSAnimations() {
    // Prefer transform and opacity for animations
    const style = document.createElement('style');
    style.textContent = `
      /* Hardware acceleration hints */
      .file-item,
      .tab,
      .traffic-light,
      .control-btn {
        transform: translateZ(0);
        backface-visibility: hidden;
        perspective: 1000px;
      }
      
      /* Optimize transitions */
      .file-item {
        transition: transform 0.2s ease, background-color 0.2s ease;
      }
      
      .tab {
        transition: transform 0.2s ease, box-shadow 0.2s ease;
      }
      
      /* Reduce paint complexity */
      .code-block {
        will-change: scroll-position;
      }
    `;
    document.head.appendChild(style);
  }
  
  // Bundle size optimization
  async loadModuleWhenNeeded(moduleName) {
    // Dynamic import for non-critical features
    try {
      switch (moduleName) {
        case 'search':
          return await import('./search-module.js');
        case 'themes':
          return await import('./theme-module.js');
        default:
          return null;
      }
    } catch (error) {
      console.warn(`Failed to load module: ${moduleName}`, error);
      return null;
    }
  }
  
  // Memory management
  cleanup() {
    // Clean up observers
    this.observers.forEach(observer => observer.disconnect());
    this.observers.clear();
    
    // Cancel animation frames
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }
    
    // Clear particles if they exist
    if (window.animationManager?.particles) {
      window.animationManager.particles.length = 0;
    }
  }
  
  // Preload critical resources
  preloadResources() {
    // Preload fonts
    const fontLinks = [
      'https://fonts.googleapis.com/css2?family=SF+Mono:wght@400;500;600&display=swap',
      'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'
    ];
    
    fontLinks.forEach(href => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'style';
      link.href = href;
      document.head.appendChild(link);
    });
  }
  
  // Optimize scroll performance
  optimizeScrolling() {
    let ticking = false;
    
    const optimizedScrollHandler = this.throttle((e) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          // Handle scroll events efficiently
          this.handleScroll(e);
          ticking = false;
        });
        ticking = true;
      }
    }, 16); // ~60fps
    
    document.querySelectorAll('.code-content, .navigator-content, .inspector-content').forEach(container => {
      container.addEventListener('scroll', optimizedScrollHandler, { passive: true });
    });
  }
  
  handleScroll(e) {
    const container = e.target;
    const scrollPercent = container.scrollTop / (container.scrollHeight - container.clientHeight);
    
    // Update scroll indicators efficiently
    const indicator = container.querySelector('.scroll-progress');
    if (indicator) {
      indicator.style.height = (scrollPercent * 100) + '%';
    }
  }
  
  // Resource prefetching
  prefetchNextContent() {
    const currentFile = window.xcodeCV?.currentFile;
    const files = ['personal-info', 'experience', 'skills', 'projects', 'education', 'contact'];
    const currentIndex = files.indexOf(currentFile);
    const nextIndex = (currentIndex + 1) % files.length;
    const nextFile = files[nextIndex];
    
    // Prefetch next file content
    const nextContent = document.getElementById(`${nextFile}-content`);
    if (nextContent && nextContent.dataset.lazy === 'true') {
      this.loadContent(nextContent);
    }
  }
}

// Initialize performance manager
document.addEventListener('DOMContentLoaded', () => {
  window.performanceManager = new PerformanceManager();
  
  // Setup performance optimizations
  window.performanceManager.optimizeCSSAnimations();
  window.performanceManager.preloadResources();
  window.performanceManager.optimizeScrolling();
  
  // Cleanup on page unload
  window.addEventListener('beforeunload', () => {
    window.performanceManager.cleanup();
  });
});