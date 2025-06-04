// Advanced Animations for Xcode CV
class AnimationManager {
  constructor() {
    this.animationQueue = [];
    this.isAnimating = false;
    this.particles = [];
    
    this.init();
  }
  
  init() {
    this.setupPageLoadAnimations();
    this.setupScrollAnimations();
    this.setupParticleSystem();
    this.setupAdvancedTransitions();
    this.setupCodeAnimations();
  }
  
  setupPageLoadAnimations() {
    // Staggered load animation for all components
    const components = [
      { selector: '.window-chrome', delay: 0 },
      { selector: '.sidebar', delay: 100 },
      { selector: '.editor-container', delay: 200 },
      { selector: '.inspector', delay: 300 },
      { selector: '.bottom-panel', delay: 400 }
    ];
    
    components.forEach(({ selector, delay }) => {
      const element = document.querySelector(selector);
      if (element) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
          element.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
        }, delay);
      }
    });
    
    // Animate file items with stagger
    setTimeout(() => {
      this.animateFileItems();
    }, 500);
  }
  
  animateFileItems() {
    const fileItems = document.querySelectorAll('.file-item');
    fileItems.forEach((item, index) => {
      item.style.opacity = '0';
      item.style.transform = 'translateX(-20px)';
      
      setTimeout(() => {
        item.style.transition = 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
        item.style.opacity = '1';
        item.style.transform = 'translateX(0)';
      }, index * 50);
    });
  }
  
  setupScrollAnimations() {
    // Smooth scrolling for code content
    const codeContent = document.querySelector('.code-content');
    if (codeContent) {
      codeContent.style.scrollBehavior = 'smooth';
      
      // Add scroll indicators
      this.createScrollIndicators(codeContent);
    }
    
    // Parallax effect for background elements
    this.setupParallax();
  }
  
  createScrollIndicators(container) {
    const indicator = document.createElement('div');
    indicator.className = 'scroll-indicator';
    indicator.style.position = 'absolute';
    indicator.style.right = '0';
    indicator.style.top = '0';
    indicator.style.width = '3px';
    indicator.style.height = '100%';
    indicator.style.background = 'linear-gradient(to bottom, var(--bg-accent), transparent)';
    indicator.style.opacity = '0';
    indicator.style.transition = 'opacity 0.3s ease';
    indicator.style.zIndex = '10';
    
    const progress = document.createElement('div');
    progress.className = 'scroll-progress';
    progress.style.width = '100%';
    progress.style.height = '0%';
    progress.style.background = 'var(--text-accent)';
    progress.style.transition = 'height 0.1s ease';
    
    indicator.appendChild(progress);
    container.style.position = 'relative';
    container.appendChild(indicator);
    
    container.addEventListener('scroll', () => {
      const scrollPercent = (container.scrollTop / (container.scrollHeight - container.clientHeight)) * 100;
      progress.style.height = scrollPercent + '%';
      indicator.style.opacity = container.scrollTop > 10 ? '1' : '0';
    });
  }
  
  setupParallax() {
    // Create subtle parallax effect for background patterns
    const createParallaxLayer = (selector, speed) => {
      const element = document.querySelector(selector);
      if (element) {
        window.addEventListener('scroll', () => {
          const scrolled = window.pageYOffset;
          element.style.transform = `translateY(${scrolled * speed}px)`;
        });
      }
    };
    
    // Apply to different layers with different speeds
    createParallaxLayer('.sidebar', 0.1);
    createParallaxLayer('.inspector', -0.1);
  }
  
  setupParticleSystem() {
    // Create floating particles for visual interest
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '1';
    canvas.style.opacity = '0.1';
    
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Create particles
    for (let i = 0; i < 20; i++) {
      this.particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.2
      });
    }
    
    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      this.particles.forEach(particle => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Wrap around edges
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.y > canvas.height) particle.y = 0;
        if (particle.y < 0) particle.y = canvas.height;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(86, 156, 214, ${particle.opacity})`;
        ctx.fill();
      });
      
      requestAnimationFrame(animateParticles);
    };
    
    animateParticles();
  }
  
  setupAdvancedTransitions() {
    // Advanced hover effects
    this.setupMagneticButtons();
    this.setupRippleEffect();
    this.setupMorphingButtons();
  }
  
  setupMagneticButtons() {
    const magneticElements = document.querySelectorAll('.traffic-light, .control-btn, .nav-tab, .inspector-tab');
    
    magneticElements.forEach(element => {
      element.addEventListener('mousemove', (e) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        const moveX = x * 0.1;
        const moveY = y * 0.1;
        
        element.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;
      });
      
      element.addEventListener('mouseleave', () => {
        element.style.transform = 'translate(0, 0) scale(1)';
      });
    });
  }
  
  setupRippleEffect() {
    const rippleElements = document.querySelectorAll('.file-item, .tab, .console-btn');
    
    rippleElements.forEach(element => {
      element.addEventListener('click', (e) => {
        const rect = element.getBoundingClientRect();
        const ripple = document.createElement('div');
        
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(86, 156, 214, 0.3)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s linear';
        ripple.style.pointerEvents = 'none';
        
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = size + 'px';
        ripple.style.height = size + 'px';
        ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
        ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
        
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);
        
        setTimeout(() => {
          ripple.remove();
        }, 600);
      });
    });
    
    // Add ripple keyframes
    if (!document.querySelector('#ripple-styles')) {
      const style = document.createElement('style');
      style.id = 'ripple-styles';
      style.textContent = `
        @keyframes ripple {
          to {
            transform: scale(2);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }
  }
  
  setupMorphingButtons() {
    const morphButtons = document.querySelectorAll('.nav-tab, .inspector-tab');
    
    morphButtons.forEach(button => {
      const originalText = button.textContent;
      
      button.addEventListener('mouseenter', () => {
        if (!button.classList.contains('active')) {
          button.style.transform = 'scale(1.05) rotateX(5deg)';
          button.style.transition = 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
        }
      });
      
      button.addEventListener('mouseleave', () => {
        button.style.transform = 'scale(1) rotateX(0deg)';
      });
    });
  }
  
  setupCodeAnimations() {
    // Typing animation for code
    this.setupTypewriter();
    
    // Syntax highlighting animation
    this.setupSyntaxAnimation();
    
    // Line number animations
    this.setupLineNumberAnimations();
  }
  
  setupTypewriter() {
    // Advanced typewriter effect that preserves syntax highlighting
    document.addEventListener('click', (e) => {
      if (e.target.closest('.file-item')) {
        setTimeout(() => {
          this.smartTypewriterEffect();
        }, 100);
      }
    });
  }
  
  smartTypewriterEffect() {
    const activeCodeBlock = document.querySelector('.file-content.active .code-block');
    if (!activeCodeBlock || activeCodeBlock.dataset.animating === 'true') return;
    
    activeCodeBlock.dataset.animating = 'true';
    const originalHTML = activeCodeBlock.innerHTML;
    
    // Parse the HTML to extract text content and structure
    const parsedContent = this.parseHTMLForTypewriter(originalHTML);
    
    // Clear the code block and start animation
    activeCodeBlock.innerHTML = '';
    
    let currentIndex = 0;
    let currentLine = 1;
    const speed = 18; // milliseconds per character (faster for better UX)
    
    const typeNext = () => {
      if (currentIndex < parsedContent.length) {
        const item = parsedContent[currentIndex];
        
        if (item.type === 'text') {
          // Add text character by character
          this.addTextCharacter(activeCodeBlock, item.content, item.className);
        } else if (item.type === 'newline') {
          // Add line break and update line tracking
          activeCodeBlock.appendChild(document.createTextNode('\n'));
          currentLine++;
          // Update line number highlighting
          if (window.xcodeCV) {
            window.xcodeCV.updateLineNumbersAnimated(currentLine);
          }
        }
        
        currentIndex++;
        
        // Variable speed - faster for whitespace, slower for code
        let nextSpeed = speed;
        if (currentIndex < parsedContent.length) {
          const nextItem = parsedContent[currentIndex];
          if (nextItem.type === 'text' && nextItem.content === ' ') {
            nextSpeed = speed / 2; // Faster for spaces
          } else if (nextItem.type === 'newline') {
            nextSpeed = speed * 2; // Slight pause at line breaks
          }
        }
        
        setTimeout(typeNext, nextSpeed);
      } else {
        // Animation complete
        activeCodeBlock.dataset.animating = 'false';
        
        // Remove any remaining cursors
        const cursors = document.querySelectorAll('.typing-cursor');
        cursors.forEach(cursor => cursor.remove());
        
        // Ensure final HTML is correct
        activeCodeBlock.innerHTML = originalHTML;
        
        // Update line numbers to final state
        if (window.xcodeCV) {
          window.xcodeCV.updateLineNumbers();
        }
        
        // Log completion
        if (window.xcodeCV) {
          window.xcodeCV.logToConsole('File loaded successfully', 'success');
        }
      }
    };
    
    typeNext();
  }
  
  parseHTMLForTypewriter(html) {
    const parsed = [];
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    
    const processNode = (node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent;
        // Split text into characters, preserving line breaks
        for (let i = 0; i < text.length; i++) {
          const char = text[i];
          if (char === '\n') {
            parsed.push({ type: 'newline' });
          } else if (char.trim() !== '' || char === ' ') {
            parsed.push({
              type: 'text',
              content: char,
              className: node.parentElement ? node.parentElement.className : ''
            });
          }
        }
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        // Process child nodes
        for (let child of node.childNodes) {
          processNode(child);
        }
      }
    };
    
    for (let child of tempDiv.childNodes) {
      processNode(child);
    }
    
    return parsed;
  }
  
  addTextCharacter(container, char, className) {
    // Find or create the appropriate span for this character
    let targetSpan = null;
    const lastChild = container.lastElementChild;
    
    if (lastChild && lastChild.className === className) {
      // Continue adding to existing span
      targetSpan = lastChild;
    } else {
      // Create new span
      targetSpan = document.createElement('span');
      if (className) {
        targetSpan.className = className;
      }
      container.appendChild(targetSpan);
    }
    
    // Add character with typing cursor effect
    const currentText = targetSpan.textContent || '';
    targetSpan.textContent = currentText + char;
    
    // Add temporary cursor
    this.addTypingCursor(targetSpan);
  }
  
  addTypingCursor(element) {
    // Remove existing cursor
    const existingCursor = document.querySelector('.typing-cursor');
    if (existingCursor) {
      existingCursor.remove();
    }
    
    // Add new cursor
    const cursor = document.createElement('span');
    cursor.className = 'typing-cursor';
    cursor.textContent = '|';
    cursor.style.animation = 'blink 1s infinite';
    cursor.style.color = 'var(--text-accent)';
    cursor.style.fontWeight = 'normal';
    
    // Insert cursor after current element
    element.parentNode.insertBefore(cursor, element.nextSibling);
    
    // Remove cursor after short delay
    setTimeout(() => {
      if (cursor.parentNode) {
        cursor.remove();
      }
    }, 100);
  }
  
  setupSyntaxAnimation() {
    // Animate syntax highlighting on file switch
    document.addEventListener('click', (e) => {
      if (e.target.closest('.file-item')) {
        setTimeout(() => {
          this.animateSyntaxHighlighting();
        }, 100);
      }
    });
  }
  
  animateSyntaxHighlighting() {
    const activeCodeBlock = document.querySelector('.file-content.active .code-block');
    if (!activeCodeBlock) return;
    
    const syntaxElements = activeCodeBlock.querySelectorAll('.keyword, .string, .comment, .type, .property, .number, .function');
    
    syntaxElements.forEach((element, index) => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(5px)';
      
      setTimeout(() => {
        element.style.transition = 'all 0.3s ease';
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }, index * 20);
    });
  }
  
  setupLineNumberAnimations() {
    const lineNumbersContainer = document.querySelector('.line-numbers');
    if (!lineNumbersContainer) return;
    
    // Animate line numbers on scroll
    const codeContent = document.querySelector('.code-content');
    if (codeContent) {
      codeContent.addEventListener('scroll', () => {
        const scrollTop = codeContent.scrollTop;
        const lineHeight = 1.6 * 13; // Approximate line height
        const visibleStart = Math.floor(scrollTop / lineHeight);
        
        const lineNumbers = lineNumbersContainer.querySelectorAll('.line-number');
        lineNumbers.forEach((lineNumber, index) => {
          const distance = Math.abs(index - visibleStart);
          const opacity = Math.max(0.3, 1 - distance * 0.1);
          lineNumber.style.opacity = opacity;
        });
      });
    }
  }
  
  // Utility methods for complex animations
  animateSequence(animations) {
    this.animationQueue.push(...animations);
    if (!this.isAnimating) {
      this.processAnimationQueue();
    }
  }
  
  processAnimationQueue() {
    if (this.animationQueue.length === 0) {
      this.isAnimating = false;
      return;
    }
    
    this.isAnimating = true;
    const animation = this.animationQueue.shift();
    
    animation.execute(() => {
      setTimeout(() => {
        this.processAnimationQueue();
      }, animation.delay || 0);
    });
  }
  
  createGlowEffect(element, color = 'var(--text-accent)') {
    element.style.boxShadow = `0 0 20px ${color}`;
    element.style.transition = 'box-shadow 0.3s ease';
    
    setTimeout(() => {
      element.style.boxShadow = 'none';
    }, 1000);
  }
  
  pulseElement(element, iterations = 3) {
    let count = 0;
    const pulse = () => {
      if (count >= iterations) return;
      
      element.style.transform = 'scale(1.05)';
      setTimeout(() => {
        element.style.transform = 'scale(1)';
        count++;
        if (count < iterations) {
          setTimeout(pulse, 200);
        }
      }, 150);
    };
    
    pulse();
  }
  
  shakeElement(element) {
    element.style.animation = 'shake 0.5s ease-in-out';
    
    setTimeout(() => {
      element.style.animation = '';
    }, 500);
    
    // Add shake keyframes if not exists
    if (!document.querySelector('#shake-styles')) {
      const style = document.createElement('style');
      style.id = 'shake-styles';
      style.textContent = `
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
      `;
      document.head.appendChild(style);
    }
  }
}

// Initialize animation manager
document.addEventListener('DOMContentLoaded', () => {
  window.animationManager = new AnimationManager();
});