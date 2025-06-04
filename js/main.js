// Main JavaScript for Xcode CV
class XcodeCV {
  constructor() {
    this.currentFile = 'personal-info';
    this.currentNavTab = 'project';
    this.currentInspectorTab = 'file';
    this.isDarkMode = true;
    
    this.init();
  }
  
  init() {
    this.setupEventListeners();
    this.setupThemeToggle();
    this.setupKeyboardShortcuts();
    this.updateLineNumbers();
    this.initializeConsole();
  }
  
  setupEventListeners() {
    // File navigation
    document.querySelectorAll('.file-item').forEach(item => {
      item.addEventListener('click', (e) => {
        this.switchFile(e.currentTarget.dataset.file);
      });
    });
    
    // Navigator tabs
    document.querySelectorAll('.nav-tab').forEach(tab => {
      tab.addEventListener('click', (e) => {
        this.switchNavTab(e.currentTarget.dataset.tab);
      });
    });
    
    // Inspector tabs
    document.querySelectorAll('.inspector-tab').forEach(tab => {
      tab.addEventListener('click', (e) => {
        this.switchInspectorTab(e.currentTarget.dataset.tab);
      });
    });
    
    // Tab close buttons
    document.querySelectorAll('.tab-close').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.closeTab(e.currentTarget.closest('.tab'));
      });
    });
    
    // Search functionality
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.handleSearch(e.target.value);
      });
    }
    
    // Console controls
    document.querySelectorAll('.console-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        if (e.currentTarget.textContent.includes('Clear')) {
          this.clearConsole();
        }
      });
    });
    
    // Traffic lights
    document.querySelector('.traffic-light.close')?.addEventListener('click', () => {
      this.closeWindow();
    });
    
    document.querySelector('.traffic-light.minimize')?.addEventListener('click', () => {
      this.minimizeWindow();
    });
    
    document.querySelector('.traffic-light.maximize')?.addEventListener('click', () => {
      this.maximizeWindow();
    });
  }
  
  setupThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        this.toggleTheme();
      });
    }
  }
  
  setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      // Cmd/Ctrl + T for new tab
      if ((e.metaKey || e.ctrlKey) && e.key === 't') {
        e.preventDefault();
        this.openNewTab();
      }
      
      // Cmd/Ctrl + W for close tab
      if ((e.metaKey || e.ctrlKey) && e.key === 'w') {
        e.preventDefault();
        this.closeCurrentTab();
      }
      
      // Cmd/Ctrl + Shift + F for search
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === 'F') {
        e.preventDefault();
        this.focusSearch();
      }
      
      // Cmd/Ctrl + D for toggle theme
      if ((e.metaKey || e.ctrlKey) && e.key === 'd') {
        e.preventDefault();
        this.toggleTheme();
      }
      
      // Number keys for file switching
      if (e.key >= '1' && e.key <= '6' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        const fileMap = {
          '1': 'personal-info',
          '2': 'experience',
          '3': 'skills',
          '4': 'projects',
          '5': 'education',
          '6': 'contact'
        };
        this.switchFile(fileMap[e.key]);
      }
    });
  }
  
  switchFile(fileName) {
    if (!fileName) return;
    
    // Update active file item
    document.querySelectorAll('.file-item').forEach(item => {
      item.classList.remove('active');
    });
    document.querySelector(`[data-file="${fileName}"]`)?.classList.add('active');
    
    // Update active content
    document.querySelectorAll('.file-content').forEach(content => {
      content.classList.remove('active');
    });
    document.getElementById(`${fileName}-content`)?.classList.add('active');
    
    // Update tab
    this.updateTab(fileName);
    
    // Update inspector
    this.updateInspector(fileName);
    
    // Update line numbers
    this.updateLineNumbers();
    
    // Log to console
    this.logToConsole(`File opened: ${fileName}.swift`, 'info');
    
    this.currentFile = fileName;
  }
  
  switchNavTab(tabName) {
    if (!tabName) return;
    
    // Update active nav tab
    document.querySelectorAll('.nav-tab').forEach(tab => {
      tab.classList.remove('active');
    });
    document.querySelector(`[data-tab="${tabName}"]`)?.classList.add('active');
    
    // Update active nav panel
    document.querySelectorAll('.nav-panel').forEach(panel => {
      panel.classList.remove('active');
    });
    document.getElementById(`${tabName}-nav`)?.classList.add('active');
    
    this.currentNavTab = tabName;
  }
  
  switchInspectorTab(tabName) {
    if (!tabName) return;
    
    // Update active inspector tab
    document.querySelectorAll('.inspector-tab').forEach(tab => {
      tab.classList.remove('active');
    });
    document.querySelector(`[data-tab="${tabName}"]`)?.classList.add('active');
    
    // Update active inspector panel
    document.querySelectorAll('.inspector-panel').forEach(panel => {
      panel.classList.remove('active');
    });
    document.getElementById(`${tabName}-inspector`)?.classList.add('active');
    
    this.currentInspectorTab = tabName;
  }
  
  updateTab(fileName) {
    const fileNames = {
      'personal-info': { name: 'PersonalInfo.swift', icon: '👤' },
      'experience': { name: 'WorkExperience.swift', icon: '💼' },
      'skills': { name: 'TechnicalSkills.swift', icon: '⚡' },
      'projects': { name: 'KeyProjects.swift', icon: '🚀' },
      'education': { name: 'Education.swift', icon: '🎓' },
      'git-history': { name: 'CareerHistory.git', icon: '🌳' },
      'contact': { name: 'ContactInfo.swift', icon: '📞' }
    };
    
    const tab = document.querySelector('.tab');
    if (tab && fileNames[fileName]) {
      tab.dataset.file = fileName;
      tab.querySelector('.tab-icon').textContent = fileNames[fileName].icon;
      tab.querySelector('.tab-name').textContent = fileNames[fileName].name;
    }
  }
  
  updateInspector(fileName) {
    const fileInfo = {
      'personal-info': { type: 'Swift Source', lines: 20, size: '2.1 KB', class: 'PersonalInfo' },
      'experience': { type: 'Swift Source', lines: 35, size: '3.2 KB', class: 'WorkExperience' },
      'skills': { type: 'Swift Source', lines: 28, size: '2.8 KB', class: 'TechnicalSkills' },
      'projects': { type: 'Swift Source', lines: 42, size: '4.1 KB', class: 'KeyProjects' },
      'education': { type: 'Swift Source', lines: 25, size: '2.5 KB', class: 'Education' },
      'git-history': { type: 'Git Repository', lines: 48, size: '5.2 KB', class: 'CareerTimeline' },
      'contact': { type: 'Swift Source', lines: 30, size: '2.9 KB', class: 'ContactInfo' }
    };
    
    const info = fileInfo[fileName];
    if (info) {
      // Update file inspector
      const properties = document.querySelectorAll('#file-inspector .property-value');
      if (properties.length >= 3) {
        properties[0].textContent = info.type;
        properties[1].textContent = info.lines;
        properties[2].textContent = info.size;
      }
      
      // Update identity inspector
      const identityProperties = document.querySelectorAll('#identity-inspector .property-value');
      if (identityProperties.length >= 2) {
        identityProperties[0].textContent = `${fileName.charAt(0).toUpperCase() + fileName.slice(1).replace('-', '')}.swift`;
        identityProperties[1].textContent = info.class;
      }
    }
  }
  
  updateLineNumbers() {
    const activeContent = document.querySelector('.file-content.active');
    if (!activeContent) return;
    
    const lines = activeContent.textContent.split('\n').length;
    const lineNumbersContainer = document.querySelector('.line-numbers');
    
    if (lineNumbersContainer) {
      lineNumbersContainer.innerHTML = '';
      for (let i = 1; i <= lines; i++) {
        const lineNumber = document.createElement('div');
        lineNumber.className = 'line-number';
        lineNumber.textContent = i;
        lineNumbersContainer.appendChild(lineNumber);
      }
    }
  }
  
  updateLineNumbersAnimated(currentLine) {
    const lineNumbersContainer = document.querySelector('.line-numbers');
    if (!lineNumbersContainer) return;
    
    // Highlight current line being typed
    const lineNumbers = lineNumbersContainer.querySelectorAll('.line-number');
    lineNumbers.forEach((line, index) => {
      line.classList.toggle('current-line', index === currentLine - 1);
    });
  }
  
  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    document.documentElement.setAttribute('data-theme', this.isDarkMode ? 'dark' : 'light');
    this.logToConsole(`Theme switched to ${this.isDarkMode ? 'dark' : 'light'} mode`, 'info');
  }
  
  handleSearch(query) {
    const resultsContainer = document.querySelector('.search-results');
    if (!resultsContainer) return;
    
    resultsContainer.innerHTML = '';
    
    if (query.length < 2) return;
    
    // Simulate search results
    const mockResults = [
      { file: 'PersonalInfo.swift', line: '12', text: 'iOS Developer' },
      { file: 'WorkExperience.swift', line: '8', text: 'Senior iOS Developer' },
      { file: 'TechnicalSkills.swift', line: '15', text: 'Swift, Objective-C' }
    ].filter(result => 
      result.text.toLowerCase().includes(query.toLowerCase()) ||
      result.file.toLowerCase().includes(query.toLowerCase())
    );
    
    mockResults.forEach(result => {
      const resultElement = document.createElement('div');
      resultElement.className = 'search-result';
      resultElement.innerHTML = `
        <span class="result-file">${result.file}</span>
        <span class="result-line">Line ${result.line}: ${result.text}</span>
      `;
      resultsContainer.appendChild(resultElement);
    });
  }
  
  logToConsole(message, type = 'info') {
    const consoleContent = document.querySelector('.console-content');
    if (!consoleContent) return;
    
    const timestamp = new Date().toLocaleTimeString();
    const icons = {
      'info': 'ℹ️',
      'success': '✅',
      'warning': '⚠️',
      'error': '❌'
    };
    
    const consoleLine = document.createElement('div');
    consoleLine.className = `console-line ${type}`;
    consoleLine.innerHTML = `
      <span class="timestamp">${timestamp}</span>
      <span class="message">${icons[type] || 'ℹ️'} ${message}</span>
    `;
    
    consoleContent.appendChild(consoleLine);
    consoleContent.scrollTop = consoleContent.scrollHeight;
  }
  
  clearConsole() {
    const consoleContent = document.querySelector('.console-content');
    if (consoleContent) {
      consoleContent.innerHTML = '';
      this.logToConsole('Console cleared', 'info');
    }
  }
  
  closeWindow() {
    this.logToConsole('Window close requested', 'warning');
    // In a real app, this would close the window
    alert('Thanks for viewing my CV! 🚀');
  }
  
  minimizeWindow() {
    this.logToConsole('Window minimized', 'info');
    document.body.style.transform = 'scale(0.9)';
    setTimeout(() => {
      document.body.style.transform = 'scale(1)';
    }, 500);
  }
  
  maximizeWindow() {
    this.logToConsole('Window maximized', 'info');
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  }
  
  closeTab(tab) {
    if (tab) {
      tab.style.animation = 'slideInFromRight 0.2s ease-out reverse';
      setTimeout(() => {
        tab.remove();
      }, 200);
    }
  }
  
  closeCurrentTab() {
    const activeTab = document.querySelector('.tab.active');
    this.closeTab(activeTab);
  }
  
  openNewTab() {
    this.logToConsole('New tab opened', 'info');
    // In a more complex app, this would open a new file
  }
  
  focusSearch() {
    this.switchNavTab('search');
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
      searchInput.focus();
    }
  }
  
  initializeConsole() {
    // Initialize console with clean startup messages
    setTimeout(() => {
      this.logToConsole('CV loaded successfully', 'success');
    }, 500);
    
    setTimeout(() => {
      this.logToConsole('All technical skills validated', 'success');
    }, 1000);
    
    setTimeout(() => {
      this.logToConsole('Portfolio ready for viewing', 'info');
    }, 1500);
  }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.xcodeCV = new XcodeCV();
});