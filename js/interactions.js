// Interactive Features for Xcode CV
class InteractionManager {
  constructor() {
    this.draggedElement = null;
    this.resizing = false;
    this.autocompleteActive = false;
    
    this.init();
  }
  
  init() {
    this.setupDragAndDrop();
    this.setupResizablePanels();
    this.setupCodeInteractions();
    this.setupTooltips();
    this.setupAutocomplete();
    this.setupZoom();
  }
  
  setupDragAndDrop() {
    // Make file items draggable
    document.querySelectorAll('.file-item').forEach(item => {
      item.draggable = true;
      
      item.addEventListener('dragstart', (e) => {
        this.draggedElement = e.currentTarget;
        e.currentTarget.style.opacity = '0.5';
        e.dataTransfer.setData('text/plain', e.currentTarget.dataset.file);
      });
      
      item.addEventListener('dragend', (e) => {
        e.currentTarget.style.opacity = '1';
        this.draggedElement = null;
      });
    });
    
    // Make tab bar a drop zone
    const tabBar = document.querySelector('.tab-bar');
    if (tabBar) {
      tabBar.addEventListener('dragover', (e) => {
        e.preventDefault();
        tabBar.classList.add('drag-over');
      });
      
      tabBar.addEventListener('dragleave', (e) => {
        if (!tabBar.contains(e.relatedTarget)) {
          tabBar.classList.remove('drag-over');
        }
      });
      
      tabBar.addEventListener('drop', (e) => {
        e.preventDefault();
        tabBar.classList.remove('drag-over');
        
        const fileName = e.dataTransfer.getData('text/plain');
        if (fileName) {
          this.openFileInNewTab(fileName);
        }
      });
    }
  }
  
  setupResizablePanels() {
    // Create resize handles
    this.createResizeHandle('.sidebar', 'right');
    this.createResizeHandle('.inspector', 'left');
    
    // Panel collapse/expand
    this.setupPanelToggle('.sidebar', 'left');
    this.setupPanelToggle('.inspector', 'right');
  }
  
  createResizeHandle(selector, position) {
    const panel = document.querySelector(selector);
    if (!panel) return;
    
    const handle = document.createElement('div');
    handle.className = `resize-handle resize-handle-${position}`;
    handle.style.position = 'absolute';
    handle.style.top = '0';
    handle.style.height = '100%';
    handle.style.width = '4px';
    handle.style.cursor = 'col-resize';
    handle.style.backgroundColor = 'transparent';
    handle.style.zIndex = '10';
    
    if (position === 'right') {
      handle.style.right = '0';
    } else {
      handle.style.left = '0';
    }
    
    panel.style.position = 'relative';
    panel.appendChild(handle);
    
    let startX, startWidth;
    
    handle.addEventListener('mousedown', (e) => {
      this.resizing = true;
      startX = e.clientX;
      startWidth = parseInt(window.getComputedStyle(panel).width, 10);
      
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    });
    
    const handleMouseMove = (e) => {
      if (!this.resizing) return;
      
      const dx = e.clientX - startX;
      let newWidth;
      
      if (position === 'right') {
        newWidth = startWidth + dx;
      } else {
        newWidth = startWidth - dx;
      }
      
      // Set min/max widths
      newWidth = Math.max(150, Math.min(500, newWidth));
      panel.style.width = newWidth + 'px';
    };
    
    const handleMouseUp = () => {
      this.resizing = false;
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'auto';
      document.body.style.userSelect = 'auto';
    };
  }
  
  setupPanelToggle(selector, side) {
    const panel = document.querySelector(selector);
    if (!panel) return;
    
    // Add toggle button
    const toggle = document.createElement('button');
    toggle.className = `panel-toggle panel-toggle-${side}`;
    toggle.innerHTML = side === 'left' ? '◀' : '▶';
    toggle.style.position = 'absolute';
    toggle.style.top = '50%';
    toggle.style.transform = 'translateY(-50%)';
    toggle.style.width = '20px';
    toggle.style.height = '40px';
    toggle.style.border = 'none';
    toggle.style.background = 'var(--bg-tertiary)';
    toggle.style.color = 'var(--text-secondary)';
    toggle.style.cursor = 'pointer';
    toggle.style.zIndex = '20';
    toggle.style.borderRadius = side === 'left' ? '0 5px 5px 0' : '5px 0 0 5px';
    
    if (side === 'left') {
      toggle.style.right = '-20px';
    } else {
      toggle.style.left = '-20px';
    }
    
    panel.appendChild(toggle);
    
    let collapsed = false;
    let originalWidth = panel.style.width || window.getComputedStyle(panel).width;
    
    toggle.addEventListener('click', () => {
      if (collapsed) {
        panel.style.width = originalWidth;
        toggle.innerHTML = side === 'left' ? '◀' : '▶';
        toggle.style.transform = 'translateY(-50%)';
      } else {
        originalWidth = panel.style.width || window.getComputedStyle(panel).width;
        panel.style.width = '0';
        toggle.innerHTML = side === 'left' ? '▶' : '◀';
        toggle.style.transform = 'translateY(-50%)';
      }
      collapsed = !collapsed;
    });
  }
  
  setupCodeInteractions() {
    // Click on code elements for interaction
    document.addEventListener('click', (e) => {
      if (e.target.closest('.code-block')) {
        this.handleCodeClick(e);
      }
    });
    
    // Code selection highlighting
    document.addEventListener('mouseup', () => {
      this.highlightSelection();
    });
    
    // Line highlighting on hover
    this.setupLineHighlighting();
  }
  
  handleCodeClick(e) {
    const target = e.target;
    
    // Click on keywords, types, etc.
    if (target.classList.contains('keyword')) {
      this.showDefinition(target.textContent, 'keyword');
    } else if (target.classList.contains('type')) {
      this.showDefinition(target.textContent, 'type');
    } else if (target.classList.contains('function')) {
      this.showDefinition(target.textContent, 'function');
    } else if (target.classList.contains('property')) {
      this.showDefinition(target.textContent, 'property');
    }
  }
  
  showDefinition(text, type) {
    // Create a tooltip with definition
    const tooltip = document.createElement('div');
    tooltip.className = 'code-tooltip';
    tooltip.style.position = 'fixed';
    tooltip.style.background = 'var(--bg-tertiary)';
    tooltip.style.border = '1px solid var(--border-primary)';
    tooltip.style.borderRadius = 'var(--radius-md)';
    tooltip.style.padding = 'var(--spacing-sm)';
    tooltip.style.zIndex = '1000';
    tooltip.style.maxWidth = '300px';
    tooltip.style.fontSize = 'var(--font-size-sm)';
    tooltip.style.boxShadow = 'var(--shadow-medium)';
    
    const definitions = {
      'keyword': {
        'class': 'Defines a new class type',
        'let': 'Declares a constant value',
        'func': 'Defines a function',
        'import': 'Imports a module or framework',
        'static': 'Creates a type-level property or method',
        'return': 'Returns a value from a function'
      },
      'type': {
        'String': 'A sequence of characters',
        'Foundation': 'Core framework for data types and utilities',
        'ObservableObject': 'Protocol for observable data model',
        'UIKit': 'Framework for iOS user interface'
      },
      'function': {
        'getSummary': 'Returns professional summary text',
        'getMetrics': 'Returns achievement metrics dictionary',
        'getCurrentStatus': 'Returns current availability status'
      }
    };
    
    const definition = definitions[type]?.[text] || `${type}: ${text}`;
    tooltip.innerHTML = `
      <div style="font-weight: 600; color: var(--text-accent);">${text}</div>
      <div style="margin-top: 4px; color: var(--text-secondary);">${definition}</div>
    `;
    
    // Position tooltip
    const rect = event.target.getBoundingClientRect();
    tooltip.style.left = rect.left + 'px';
    tooltip.style.top = (rect.bottom + 5) + 'px';
    
    document.body.appendChild(tooltip);
    
    // Remove tooltip after delay or on click
    setTimeout(() => {
      if (tooltip.parentNode) {
        tooltip.remove();
      }
    }, 3000);
    
    document.addEventListener('click', () => {
      if (tooltip.parentNode) {
        tooltip.remove();
      }
    }, { once: true });
  }
  
  highlightSelection() {
    const selection = window.getSelection();
    if (selection.toString().length > 0) {
      // Log selected text to console
      window.xcodeCV.logToConsole(`Selected: "${selection.toString()}"`, 'info');
    }
  }
  
  setupLineHighlighting() {
    const lineNumbers = document.querySelector('.line-numbers');
    const codeContent = document.querySelector('.code-content');
    
    if (!lineNumbers || !codeContent) return;
    
    lineNumbers.addEventListener('mouseenter', (e) => {
      if (e.target.classList.contains('line-number')) {
        const lineNum = e.target.textContent;
        e.target.style.backgroundColor = 'var(--bg-hover)';
        
        // Highlight corresponding code line
        const lines = codeContent.querySelectorAll('.code-block')[0]?.textContent.split('\n');
        if (lines && lines[lineNum - 1]) {
          window.xcodeCV.logToConsole(`Line ${lineNum}: "${lines[lineNum - 1].trim()}"`, 'info');
        }
      }
    });
    
    lineNumbers.addEventListener('mouseleave', (e) => {
      if (e.target.classList.contains('line-number')) {
        e.target.style.backgroundColor = 'transparent';
      }
    });
  }
  
  setupTooltips() {
    // Add tooltips to various elements
    const tooltipElements = [
      { selector: '.traffic-light.close', text: 'Close Window (⌘W)' },
      { selector: '.traffic-light.minimize', text: 'Minimize Window (⌘M)' },
      { selector: '.traffic-light.maximize', text: 'Maximize Window (⌘⌃F)' },
      { selector: '#themeToggle', text: 'Toggle Theme (⌘D)' },
      { selector: '.nav-tab[data-tab="project"]', text: 'Project Navigator (⌘1)' },
      { selector: '.nav-tab[data-tab="search"]', text: 'Search Navigator (⌘2)' },
      { selector: '.nav-tab[data-tab="issues"]', text: 'Issue Navigator (⌘3)' }
    ];
    
    tooltipElements.forEach(({ selector, text }) => {
      const element = document.querySelector(selector);
      if (element) {
        this.addTooltip(element, text);
      }
    });
  }
  
  addTooltip(element, text) {
    let tooltip;
    
    element.addEventListener('mouseenter', (e) => {
      tooltip = document.createElement('div');
      tooltip.className = 'tooltip';
      tooltip.textContent = text;
      tooltip.style.position = 'fixed';
      tooltip.style.background = 'var(--bg-tertiary)';
      tooltip.style.color = 'var(--text-primary)';
      tooltip.style.padding = 'var(--spacing-xs) var(--spacing-sm)';
      tooltip.style.borderRadius = 'var(--radius-sm)';
      tooltip.style.fontSize = 'var(--font-size-xs)';
      tooltip.style.zIndex = '10000';
      tooltip.style.pointerEvents = 'none';
      tooltip.style.whiteSpace = 'nowrap';
      tooltip.style.boxShadow = 'var(--shadow-light)';
      
      const rect = element.getBoundingClientRect();
      tooltip.style.left = (rect.left + rect.width / 2) + 'px';
      tooltip.style.top = (rect.bottom + 5) + 'px';
      tooltip.style.transform = 'translateX(-50%)';
      
      document.body.appendChild(tooltip);
    });
    
    element.addEventListener('mouseleave', () => {
      if (tooltip && tooltip.parentNode) {
        tooltip.remove();
      }
    });
  }
  
  setupAutocomplete() {
    // Simulate autocomplete in search
    const searchInput = document.querySelector('.search-input');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', (e) => {
      const value = e.target.value;
      if (value.length >= 2) {
        this.showAutocomplete(e.target, value);
      } else {
        this.hideAutocomplete();
      }
    });
    
    searchInput.addEventListener('blur', () => {
      setTimeout(() => this.hideAutocomplete(), 150);
    });
  }
  
  showAutocomplete(input, query) {
    this.hideAutocomplete();
    
    const suggestions = [
      'iOS Developer',
      'Swift',
      'Product Manager',
      'Technical Leadership',
      'Mobile Development',
      'Objective-C',
      'SwiftUI',
      'Unit Vietnam',
      'CBTW',
      'Core ML'
    ].filter(item => item.toLowerCase().includes(query.toLowerCase()));
    
    if (suggestions.length === 0) return;
    
    const autocomplete = document.createElement('div');
    autocomplete.className = 'autocomplete';
    autocomplete.style.position = 'absolute';
    autocomplete.style.top = '100%';
    autocomplete.style.left = '0';
    autocomplete.style.right = '0';
    autocomplete.style.background = 'var(--bg-primary)';
    autocomplete.style.border = '1px solid var(--border-primary)';
    autocomplete.style.borderTop = 'none';
    autocomplete.style.borderRadius = '0 0 var(--radius-sm) var(--radius-sm)';
    autocomplete.style.maxHeight = '150px';
    autocomplete.style.overflowY = 'auto';
    autocomplete.style.zIndex = '100';
    
    suggestions.forEach(suggestion => {
      const item = document.createElement('div');
      item.className = 'autocomplete-item';
      item.textContent = suggestion;
      item.style.padding = 'var(--spacing-sm)';
      item.style.cursor = 'pointer';
      item.style.fontSize = 'var(--font-size-sm)';
      
      item.addEventListener('mouseenter', () => {
        item.style.backgroundColor = 'var(--bg-hover)';
      });
      
      item.addEventListener('mouseleave', () => {
        item.style.backgroundColor = 'transparent';
      });
      
      item.addEventListener('click', () => {
        input.value = suggestion;
        input.dispatchEvent(new Event('input'));
        this.hideAutocomplete();
      });
      
      autocomplete.appendChild(item);
    });
    
    const container = input.closest('.search-container');
    if (container) {
      container.style.position = 'relative';
      container.appendChild(autocomplete);
      this.autocompleteActive = true;
    }
  }
  
  hideAutocomplete() {
    const autocomplete = document.querySelector('.autocomplete');
    if (autocomplete) {
      autocomplete.remove();
      this.autocompleteActive = false;
    }
  }
  
  setupZoom() {
    // Zoom functionality with Cmd +/-
    let zoomLevel = 1;
    const minZoom = 0.5;
    const maxZoom = 2;
    
    document.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && (e.key === '+' || e.key === '=')) {
        e.preventDefault();
        zoomLevel = Math.min(maxZoom, zoomLevel + 0.1);
        this.applyZoom(zoomLevel);
      } else if ((e.metaKey || e.ctrlKey) && e.key === '-') {
        e.preventDefault();
        zoomLevel = Math.max(minZoom, zoomLevel - 0.1);
        this.applyZoom(zoomLevel);
      } else if ((e.metaKey || e.ctrlKey) && e.key === '0') {
        e.preventDefault();
        zoomLevel = 1;
        this.applyZoom(zoomLevel);
      }
    });
    
    // Mouse wheel zoom (with Cmd/Ctrl)
    document.addEventListener('wheel', (e) => {
      if (e.metaKey || e.ctrlKey) {
        e.preventDefault();
        
        if (e.deltaY < 0) {
          zoomLevel = Math.min(maxZoom, zoomLevel + 0.05);
        } else {
          zoomLevel = Math.max(minZoom, zoomLevel - 0.05);
        }
        
        this.applyZoom(zoomLevel);
      }
    });
  }
  
  applyZoom(level) {
    const codeEditor = document.querySelector('.code-editor');
    if (codeEditor) {
      codeEditor.style.transform = `scale(${level})`;
      codeEditor.style.transformOrigin = 'top left';
      
      window.xcodeCV.logToConsole(`Zoom level: ${Math.round(level * 100)}%`, 'info');
    }
  }
  
  openFileInNewTab(fileName) {
    // Simulate opening file in new tab
    window.xcodeCV.logToConsole(`Opening ${fileName} in new tab`, 'info');
    window.xcodeCV.switchFile(fileName);
  }
}

// Initialize interaction manager
document.addEventListener('DOMContentLoaded', () => {
  window.interactionManager = new InteractionManager();
});