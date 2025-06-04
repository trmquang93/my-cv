// Navigation and File Management for Xcode CV
class NavigationManager {
  constructor() {
    this.fileHistory = [];
    this.currentIndex = -1;
    this.bookmarks = [];
    
    this.init();
  }
  
  init() {
    this.setupFileNavigation();
    this.setupBreadcrumb();
    this.setupQuickOpen();
    this.setupFileWatcher();
  }
  
  setupFileNavigation() {
    // File tree expansion/collapse
    document.querySelectorAll('.folder-item').forEach(folder => {
      folder.addEventListener('click', (e) => {
        if (e.target.classList.contains('folder-icon') || e.target.classList.contains('folder-name')) {
          this.toggleFolder(folder);
        }
      });
    });
    
    // File double-click for full focus
    document.querySelectorAll('.file-item').forEach(file => {
      file.addEventListener('dblclick', (e) => {
        this.focusFile(e.currentTarget.dataset.file);
      });
      
      // Context menu
      file.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        this.showContextMenu(e, file);
      });
    });
    
    // Back/Forward navigation
    window.addEventListener('popstate', (e) => {
      if (e.state && e.state.file) {
        this.navigateToFile(e.state.file, false);
      }
    });
  }
  
  setupBreadcrumb() {
    // Create breadcrumb navigation
    const tabBar = document.querySelector('.tab-bar');
    if (tabBar) {
      const breadcrumb = document.createElement('div');
      breadcrumb.className = 'breadcrumb';
      breadcrumb.innerHTML = `
        <span class="breadcrumb-item">QuangTranMinh_CV</span>
        <span class="breadcrumb-separator">›</span>
        <span class="breadcrumb-item current">PersonalInfo.swift</span>
      `;
      tabBar.insertBefore(breadcrumb, tabBar.firstChild);
    }
  }
  
  setupQuickOpen() {
    // Quick open with Cmd+O
    document.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'o') {
        e.preventDefault();
        this.showQuickOpen();
      }
      
      // Navigate with Cmd+Up/Down
      if ((e.metaKey || e.ctrlKey) && (e.key === 'ArrowUp' || e.key === 'ArrowDown')) {
        e.preventDefault();
        this.navigateFiles(e.key === 'ArrowUp' ? -1 : 1);
      }
    });
  }
  
  setupFileWatcher() {
    // Simulate file change watching
    setInterval(() => {
      this.checkFileChanges();
    }, 5000);
  }
  
  toggleFolder(folder) {
    const isExpanded = folder.classList.contains('expanded');
    const folderContents = folder.querySelector('.folder-contents');
    
    if (isExpanded) {
      folder.classList.remove('expanded');
      if (folderContents) {
        folderContents.style.maxHeight = '0';
        folderContents.style.opacity = '0';
      }
    } else {
      folder.classList.add('expanded');
      if (folderContents) {
        folderContents.style.maxHeight = folderContents.scrollHeight + 'px';
        folderContents.style.opacity = '1';
      }
    }
  }
  
  focusFile(fileName) {
    // Enter focus mode - hide sidebar and inspector
    const container = document.querySelector('.xcode-container');
    const sidebar = document.querySelector('.sidebar');
    const inspector = document.querySelector('.inspector');
    
    if (container && sidebar && inspector) {
      container.classList.add('focus-mode');
      sidebar.style.width = '0';
      inspector.style.width = '0';
      
      // Exit focus mode with Escape
      const exitFocus = (e) => {
        if (e.key === 'Escape') {
          this.exitFocusMode();
          document.removeEventListener('keydown', exitFocus);
        }
      };
      document.addEventListener('keydown', exitFocus);
      
      window.xcodeCV.logToConsole(`Entered focus mode for ${fileName}`, 'info');
    }
  }
  
  exitFocusMode() {
    const container = document.querySelector('.xcode-container');
    const sidebar = document.querySelector('.sidebar');
    const inspector = document.querySelector('.inspector');
    
    if (container && sidebar && inspector) {
      container.classList.remove('focus-mode');
      sidebar.style.width = '260px';
      inspector.style.width = '240px';
      
      window.xcodeCV.logToConsole('Exited focus mode', 'info');
    }
  }
  
  showContextMenu(event, file) {
    // Remove existing context menu
    const existingMenu = document.querySelector('.context-menu');
    if (existingMenu) {
      existingMenu.remove();
    }
    
    const menu = document.createElement('div');
    menu.className = 'context-menu';
    menu.style.position = 'fixed';
    menu.style.left = event.clientX + 'px';
    menu.style.top = event.clientY + 'px';
    menu.style.zIndex = '1000';
    menu.style.background = 'var(--bg-secondary)';
    menu.style.border = '1px solid var(--border-primary)';
    menu.style.borderRadius = 'var(--radius-md)';
    menu.style.padding = 'var(--spacing-xs)';
    menu.style.minWidth = '150px';
    menu.style.boxShadow = 'var(--shadow-medium)';
    
    const fileName = file.dataset.file;
    const menuItems = [
      { label: 'Open', action: () => window.xcodeCV.switchFile(fileName) },
      { label: 'Open in New Tab', action: () => this.openInNewTab(fileName) },
      { label: 'Add Bookmark', action: () => this.addBookmark(fileName) },
      { label: 'Show in Finder', action: () => this.showInFinder(fileName) },
      { label: 'Copy Path', action: () => this.copyPath(fileName) }
    ];
    
    menuItems.forEach(item => {
      const menuItem = document.createElement('div');
      menuItem.className = 'context-menu-item';
      menuItem.textContent = item.label;
      menuItem.style.padding = 'var(--spacing-xs) var(--spacing-sm)';
      menuItem.style.cursor = 'pointer';
      menuItem.style.borderRadius = 'var(--radius-sm)';
      menuItem.style.fontSize = 'var(--font-size-sm)';
      
      menuItem.addEventListener('click', () => {
        item.action();
        menu.remove();
      });
      
      menuItem.addEventListener('mouseenter', () => {
        menuItem.style.backgroundColor = 'var(--bg-hover)';
      });
      
      menuItem.addEventListener('mouseleave', () => {
        menuItem.style.backgroundColor = 'transparent';
      });
      
      menu.appendChild(menuItem);
    });
    
    document.body.appendChild(menu);
    
    // Close menu when clicking outside
    const closeMenu = (e) => {
      if (!menu.contains(e.target)) {
        menu.remove();
        document.removeEventListener('click', closeMenu);
      }
    };
    
    setTimeout(() => {
      document.addEventListener('click', closeMenu);
    }, 0);
  }
  
  showQuickOpen() {
    // Create quick open overlay
    const overlay = document.createElement('div');
    overlay.className = 'quick-open-overlay';
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    overlay.style.zIndex = '10000';
    overlay.style.display = 'flex';
    overlay.style.alignItems = 'flex-start';
    overlay.style.justifyContent = 'center';
    overlay.style.paddingTop = '20vh';
    
    const quickOpen = document.createElement('div');
    quickOpen.className = 'quick-open';
    quickOpen.style.background = 'var(--bg-secondary)';
    quickOpen.style.border = '1px solid var(--border-primary)';
    quickOpen.style.borderRadius = 'var(--radius-lg)';
    quickOpen.style.width = '500px';
    quickOpen.style.maxWidth = '90vw';
    quickOpen.style.boxShadow = 'var(--shadow-heavy)';
    
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Type file name to open...';
    input.style.width = '100%';
    input.style.padding = 'var(--spacing-lg)';
    input.style.border = 'none';
    input.style.background = 'transparent';
    input.style.color = 'var(--text-primary)';
    input.style.fontSize = 'var(--font-size-lg)';
    input.style.outline = 'none';
    
    const results = document.createElement('div');
    results.className = 'quick-open-results';
    results.style.maxHeight = '300px';
    results.style.overflowY = 'auto';
    
    const files = [
      { name: 'PersonalInfo.swift', key: 'personal-info' },
      { name: 'WorkExperience.swift', key: 'experience' },
      { name: 'TechnicalSkills.swift', key: 'skills' },
      { name: 'KeyProjects.swift', key: 'projects' },
      { name: 'Education.swift', key: 'education' },
      { name: 'ContactInfo.swift', key: 'contact' }
    ];
    
    input.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase();
      results.innerHTML = '';
      
      const filteredFiles = files.filter(file => 
        file.name.toLowerCase().includes(query)
      );
      
      filteredFiles.forEach((file, index) => {
        const item = document.createElement('div');
        item.className = 'quick-open-item';
        item.textContent = file.name;
        item.style.padding = 'var(--spacing-sm) var(--spacing-lg)';
        item.style.cursor = 'pointer';
        item.style.borderBottom = '1px solid var(--border-primary)';
        
        if (index === 0) {
          item.classList.add('selected');
          item.style.backgroundColor = 'var(--bg-selected)';
        }
        
        item.addEventListener('click', () => {
          window.xcodeCV.switchFile(file.key);
          overlay.remove();
        });
        
        results.appendChild(item);
      });
    });
    
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        overlay.remove();
      } else if (e.key === 'Enter') {
        const selected = results.querySelector('.selected');
        if (selected) {
          selected.click();
        }
      }
    });
    
    quickOpen.appendChild(input);
    quickOpen.appendChild(results);
    overlay.appendChild(quickOpen);
    document.body.appendChild(overlay);
    
    // Focus input and show all files initially
    input.focus();
    input.dispatchEvent(new Event('input'));
    
    // Close overlay when clicking outside
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.remove();
      }
    });
  }
  
  navigateFiles(direction) {
    const files = ['personal-info', 'experience', 'skills', 'projects', 'education', 'contact'];
    const currentIndex = files.indexOf(window.xcodeCV.currentFile);
    let newIndex = currentIndex + direction;
    
    if (newIndex < 0) newIndex = files.length - 1;
    if (newIndex >= files.length) newIndex = 0;
    
    window.xcodeCV.switchFile(files[newIndex]);
  }
  
  navigateToFile(fileName, addToHistory = true) {
    if (addToHistory) {
      // Add to browser history
      history.pushState({ file: fileName }, '', `#${fileName}`);
      
      // Add to internal history
      this.fileHistory.push(fileName);
      this.currentIndex = this.fileHistory.length - 1;
    }
    
    window.xcodeCV.switchFile(fileName);
  }
  
  addBookmark(fileName) {
    if (!this.bookmarks.includes(fileName)) {
      this.bookmarks.push(fileName);
      window.xcodeCV.logToConsole(`Bookmarked ${fileName}`, 'success');
    }
  }
  
  openInNewTab(fileName) {
    // In a real editor, this would open in a new tab
    window.xcodeCV.logToConsole(`Would open ${fileName} in new tab`, 'info');
    window.xcodeCV.switchFile(fileName);
  }
  
  showInFinder(fileName) {
    window.xcodeCV.logToConsole(`Would show ${fileName} in Finder`, 'info');
  }
  
  copyPath(fileName) {
    const path = `/Users/quang/Documents/CV/${fileName}.swift`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(path);
      window.xcodeCV.logToConsole(`Copied path: ${path}`, 'success');
    }
  }
  
  checkFileChanges() {
    // Simulate file change detection
    const hasChanges = Math.random() < 0.1; // 10% chance
    
    if (hasChanges) {
      const files = ['personal-info', 'experience', 'skills', 'projects', 'education', 'contact'];
      const changedFile = files[Math.floor(Math.random() * files.length)];
      
      // Add indicator for unsaved changes
      const fileItem = document.querySelector(`[data-file="${changedFile}"]`);
      if (fileItem && !fileItem.classList.contains('modified')) {
        fileItem.classList.add('modified');
        const fileName = fileItem.querySelector('.file-name');
        if (fileName && !fileName.textContent.includes('•')) {
          fileName.textContent = '• ' + fileName.textContent;
        }
      }
    }
  }
}

// Initialize navigation manager
document.addEventListener('DOMContentLoaded', () => {
  window.navigationManager = new NavigationManager();
});