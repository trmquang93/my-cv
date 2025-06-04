// Interactive Elements Manager

import { Utils } from './utils.js';

export class InteractionManager {
    constructor() {
        this.activeSkills = new Set();
        this.cardEffects = new Map();
        
        this.init();
    }

    init() {
        this.setupCardInteractions();
        this.setupSkillInteractions();
        this.setupContactInteractions();
        this.setupKeyboardNavigation();
        this.setupAccessibility();
    }

    setupCardInteractions() {
        const cards = document.querySelectorAll(`
            .contact-card,
            .expertise-card,
            .job-card,
            .achievement-card,
            .education-card
        `);

        cards.forEach(card => {
            this.setupCardHoverEffects(card);
            this.setupCardClickEffects(card);
        });
    }

    setupCardHoverEffects(card) {
        let hoverTimeout;

        card.addEventListener('mouseenter', () => {
            clearTimeout(hoverTimeout);
            this.addCardHoverEffect(card);
        });

        card.addEventListener('mouseleave', () => {
            hoverTimeout = setTimeout(() => {
                this.removeCardHoverEffect(card);
            }, 100);
        });

        // Touch device support
        if (Utils.isTouchDevice()) {
            card.addEventListener('touchstart', () => {
                this.addCardHoverEffect(card);
            }, { passive: true });

            card.addEventListener('touchend', () => {
                setTimeout(() => {
                    this.removeCardHoverEffect(card);
                }, 300);
            }, { passive: true });
        }
    }

    setupCardClickEffects(card) {
        card.addEventListener('click', (e) => {
            this.createRippleEffect(card, e);
        });
    }

    addCardHoverEffect(card) {
        const effect = {
            transform: 'translateY(-8px) scale(1.02)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
        };

        Object.assign(card.style, effect);
        this.cardEffects.set(card, effect);
    }

    removeCardHoverEffect(card) {
        card.style.transform = 'translateY(0) scale(1)';
        card.style.boxShadow = '';
        card.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        
        this.cardEffects.delete(card);
    }

    createRippleEffect(element, event) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
            z-index: 1;
        `;

        // Ensure element has relative positioning
        const originalPosition = element.style.position;
        if (!originalPosition || originalPosition === 'static') {
            element.style.position = 'relative';
        }

        element.appendChild(ripple);

        // Remove ripple after animation
        setTimeout(() => {
            ripple.remove();
            if (!originalPosition) {
                element.style.position = '';
            }
        }, 600);
    }

    setupSkillInteractions() {
        const skillTags = document.querySelectorAll('.skill-tag');
        
        skillTags.forEach(tag => {
            this.setupSkillHover(tag);
            this.setupSkillClick(tag);
        });
    }

    setupSkillHover(tag) {
        tag.addEventListener('mouseenter', () => {
            if (!this.activeSkills.has(tag)) {
                this.highlightSkill(tag, false);
            }
        });

        tag.addEventListener('mouseleave', () => {
            if (!this.activeSkills.has(tag)) {
                this.unhighlightSkill(tag);
            }
        });
    }

    setupSkillClick(tag) {
        tag.addEventListener('click', () => {
            this.toggleSkillSelection(tag);
        });
    }

    toggleSkillSelection(tag) {
        if (this.activeSkills.has(tag)) {
            this.activeSkills.delete(tag);
            this.unhighlightSkill(tag);
        } else {
            this.activeSkills.add(tag);
            this.highlightSkill(tag, true);
        }
    }

    highlightSkill(tag, isPermanent = false) {
        tag.style.background = '#007AFF';
        tag.style.color = 'white';
        tag.style.transform = 'scale(1.05) translateY(-2px)';
        tag.style.transition = 'all 0.2s ease';
        tag.style.boxShadow = '0 4px 12px rgba(0, 122, 255, 0.3)';
        
        if (isPermanent) {
            tag.classList.add('skill-selected');
        }
    }

    unhighlightSkill(tag) {
        tag.style.background = '';
        tag.style.color = '';
        tag.style.transform = '';
        tag.style.boxShadow = '';
        tag.classList.remove('skill-selected');
    }

    setupContactInteractions() {
        const contactCards = document.querySelectorAll('.contact-card');
        
        contactCards.forEach(card => {
            this.setupContactClick(card);
        });
    }

    setupContactClick(card) {
        card.addEventListener('click', async () => {
            await this.handleContactCopy(card);
        });

        // Add visual feedback for clickable cards
        card.style.cursor = 'pointer';
        card.setAttribute('role', 'button');
        card.setAttribute('tabindex', '0');
    }

    async handleContactCopy(card) {
        const value = card.querySelector('.contact-value')?.textContent?.trim();
        
        if (!value) return;

        const success = await Utils.copyToClipboard(value);
        
        if (success) {
            this.showCopyFeedback(card, 'Copied!');
            Utils.createNotification(`${value} copied to clipboard`);
        } else {
            this.showCopyFeedback(card, 'Copy failed', 'error');
            Utils.createNotification('Failed to copy to clipboard', 'error');
        }
    }

    showCopyFeedback(card, message, type = 'success') {
        const feedback = document.createElement('div');
        feedback.textContent = message;
        feedback.className = `copy-feedback copy-feedback--${type}`;
        
        feedback.style.cssText = `
            position: absolute;
            top: -40px;
            left: 50%;
            transform: translateX(-50%);
            background: ${type === 'success' ? '#007AFF' : '#FF3B30'};
            color: white;
            padding: 8px 16px;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 600;
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: none;
        `;
        
        card.style.position = 'relative';
        card.appendChild(feedback);
        
        requestAnimationFrame(() => {
            feedback.style.opacity = '1';
        });
        
        setTimeout(() => {
            feedback.style.opacity = '0';
            setTimeout(() => {
                feedback.remove();
            }, 300);
        }, 2000);
    }

    setupKeyboardNavigation() {
        // Track keyboard usage
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });

        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });

        // Handle Enter/Space on interactive elements
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                const target = e.target;
                
                if (target.classList.contains('contact-card') || 
                    target.classList.contains('skill-tag')) {
                    e.preventDefault();
                    target.click();
                }
            }
        });
    }

    setupAccessibility() {
        // Add ARIA labels and roles where needed
        const contactCards = document.querySelectorAll('.contact-card');
        contactCards.forEach(card => {
            const label = card.querySelector('.contact-label')?.textContent;
            if (label) {
                card.setAttribute('aria-label', `Copy ${label}`);
            }
        });

        const skillTags = document.querySelectorAll('.skill-tag');
        skillTags.forEach(tag => {
            tag.setAttribute('role', 'button');
            tag.setAttribute('aria-label', `Toggle ${tag.textContent} skill`);
        });

        // Add focus indicators
        this.setupFocusIndicators();
    }

    setupFocusIndicators() {
        const focusableElements = document.querySelectorAll(`
            .nav-item,
            .contact-card,
            .skill-tag,
            button,
            a
        `);

        focusableElements.forEach(element => {
            element.addEventListener('focus', () => {
                element.style.outline = '2px solid #007AFF';
                element.style.outlineOffset = '2px';
            });

            element.addEventListener('blur', () => {
                element.style.outline = '';
                element.style.outlineOffset = '';
            });
        });
    }

    // Public methods
    clearAllSkillSelections() {
        this.activeSkills.forEach(tag => {
            this.unhighlightSkill(tag);
        });
        this.activeSkills.clear();
    }

    getSelectedSkills() {
        return Array.from(this.activeSkills).map(tag => tag.textContent.trim());
    }

    highlightSkillByText(skillText) {
        const skillTag = Array.from(document.querySelectorAll('.skill-tag'))
            .find(tag => tag.textContent.trim() === skillText);
        
        if (skillTag) {
            this.activeSkills.add(skillTag);
            this.highlightSkill(skillTag, true);
        }
    }
}