// Advanced Features: AI Assistant, Smart Recommendations, Download Options
class AdvancedFeaturesManager {
  constructor() {
    this.aiKnowledgeBase = this.buildKnowledgeBase();
    this.userInteractions = [];
    this.currentRecommendations = [];
    
    this.init();
  }
  
  init() {
    this.setupAIAssistant();
    this.setupDownloadOptions();
    this.setupSmartRecommendations();
    this.setupGitHistory();
    this.trackUserBehavior();
  }
  
  // AI Assistant Implementation
  setupAIAssistant() {
    const aiToggle = document.getElementById('aiToggle');
    const aiChat = document.getElementById('aiChat');
    const aiClose = document.getElementById('aiClose');
    const aiSend = document.getElementById('aiSend');
    const aiInput = document.getElementById('aiInput');
    
    aiToggle.addEventListener('click', () => {
      aiChat.classList.toggle('active');
      if (aiChat.classList.contains('active')) {
        this.logUserInteraction('ai_opened');
        aiInput.focus();
      }
    });
    
    aiClose.addEventListener('click', () => {
      aiChat.classList.remove('active');
    });
    
    aiSend.addEventListener('click', () => {
      this.handleAIQuery();
    });
    
    aiInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.handleAIQuery();
      }
    });
    
    // Setup suggestion buttons
    document.querySelectorAll('.ai-suggestion').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const question = e.currentTarget.dataset.question;
        this.simulateUserMessage(question);
        this.generateAIResponse(question);
      });
    });
  }
  
  handleAIQuery() {
    const aiInput = document.getElementById('aiInput');
    const query = aiInput.value.trim();
    
    if (!query) return;
    
    this.logUserInteraction('ai_query', { query });
    this.simulateUserMessage(query);
    this.generateAIResponse(query);
    
    aiInput.value = '';
  }
  
  simulateUserMessage(message) {
    const aiMessages = document.getElementById('aiMessages');
    const messageEl = document.createElement('div');
    messageEl.className = 'ai-message ai-message-user';
    messageEl.innerHTML = `
      <div class="ai-message-content">${message}</div>
    `;
    aiMessages.appendChild(messageEl);
    aiMessages.scrollTop = aiMessages.scrollHeight;
  }
  
  generateAIResponse(query) {
    // Simulate AI thinking delay
    this.showTypingIndicator();
    
    setTimeout(() => {
      this.hideTypingIndicator();
      const response = this.getAIResponse(query);
      this.displayAIResponse(response);
    }, 1000 + Math.random() * 1000);
  }
  
  showTypingIndicator() {
    const aiMessages = document.getElementById('aiMessages');
    const typingEl = document.createElement('div');
    typingEl.className = 'ai-message ai-message-bot typing-indicator';
    typingEl.innerHTML = `
      <div class="ai-message-content">
        <div class="typing-dots">
          <span></span><span></span><span></span>
        </div>
      </div>
    `;
    aiMessages.appendChild(typingEl);
    aiMessages.scrollTop = aiMessages.scrollHeight;
  }
  
  hideTypingIndicator() {
    const typing = document.querySelector('.typing-indicator');
    if (typing) typing.remove();
  }
  
  displayAIResponse(response) {
    const aiMessages = document.getElementById('aiMessages');
    const messageEl = document.createElement('div');
    messageEl.className = 'ai-message ai-message-bot';
    messageEl.innerHTML = `
      <div class="ai-message-content">${response}</div>
    `;
    aiMessages.appendChild(messageEl);
    aiMessages.scrollTop = aiMessages.scrollHeight;
  }
  
  getAIResponse(query) {
    const lowerQuery = query.toLowerCase();
    
    // Achievement questions
    if (lowerQuery.includes('achievement') || lowerQuery.includes('biggest')) {
      return `🏆 Quang's biggest achievement is leading the development of 10+ iOS applications with 4.5+ App Store ratings while managing cross-functional teams of 20+ developers. He successfully handled 100K+ concurrent users with <0.5% crash rates - that's exceptional reliability!`;
    }
    
    // Remote work questions
    if (lowerQuery.includes('remote') || lowerQuery.includes('work from home')) {
      return `🌍 Quang excels at remote work! He has 3+ years of remote development experience with international teams. He's fluent in English, expert in asynchronous communication, and has successfully collaborated across different time zones. His current role at CBTW involves working with a distributed 10-person team.`;
    }
    
    // Technology questions
    if (lowerQuery.includes('technology') || lowerQuery.includes('tech') || lowerQuery.includes('love')) {
      return `⚡ Quang is passionate about Swift and modern iOS development! He specializes in SwiftUI, Swift Concurrency, and Combine. He also loves clean architecture patterns like MVVM and VIPER. His 10+ years of experience spans from Objective-C to cutting-edge iOS technologies.`;
    }
    
    // Leadership questions
    if (lowerQuery.includes('leadership') || lowerQuery.includes('manage') || lowerQuery.includes('team')) {
      return `👥 Quang has extensive leadership experience! At Unit Vietnam, he managed 5+ concurrent mobile projects while coordinating cross-functional teams of 20+ developers. He's skilled at stakeholder management, product strategy, and balancing technical feasibility with business objectives.`;
    }
    
    // Experience questions
    if (lowerQuery.includes('experience') || lowerQuery.includes('years')) {
      return `📱 Quang has 10+ years of comprehensive mobile development experience. He started as an iOS Developer at LBPro Poland, grew into Product Manager & Senior iOS Developer at Unit Vietnam (7 years), and is currently a Senior iOS Developer at CBTW working on the Shahid streaming platform.`;
    }
    
    // Skills questions
    if (lowerQuery.includes('skill') || lowerQuery.includes('can do')) {
      return `🔧 Quang's core skills include: Swift & Objective-C (10+ years), SwiftUI & modern iOS frameworks, product management, team leadership, and AI/ML integration with Core ML. He's also experienced with cross-platform development and security implementations.`;
    }
    
    // Default response
    return `🤖 That's a great question! Based on Quang's CV, I can tell you he's an experienced mobile technical leader with 10+ years in iOS development. He's currently at CBTW working on streaming platforms, previously led teams at Unit Vietnam, and has delivered 10+ successful apps. Would you like to know more about any specific aspect of his experience?`;
  }
  
  // Smart Recommendations System
  setupSmartRecommendations() {
    this.generatePersonalizedRecommendations();
    this.setupRecommendationsPanel();
    
    // Show recommendations after user browses for a while
    setTimeout(() => {
      this.showSmartRecommendations();
    }, 30000); // Show after 30 seconds
  }
  
  generatePersonalizedRecommendations() {
    const roles = [
      {
        role: 'Senior iOS Developer',
        description: 'Perfect match! Focus on technical expertise and app development',
        sections: ['TechnicalSkills.swift', 'KeyProjects.swift', 'WorkExperience.swift'],
        match: 95
      },
      {
        role: 'Product Manager',
        description: 'Great fit with leadership and product strategy experience',
        sections: ['WorkExperience.swift', 'KeyProjects.swift'],
        match: 90
      },
      {
        role: 'Technical Lead',
        description: 'Excellent leadership and architectural experience',
        sections: ['WorkExperience.swift', 'TechnicalSkills.swift'],
        match: 92
      },
      {
        role: 'Mobile Architect',
        description: 'Strong architectural and scalability expertise',
        sections: ['TechnicalSkills.swift', 'KeyProjects.swift'],
        match: 88
      }
    ];
    
    this.currentRecommendations = roles;
  }
  
  setupRecommendationsPanel() {
    const panel = document.getElementById('recommendationsPanel');
    const closeBtn = document.getElementById('recommendationsClose');
    
    closeBtn.addEventListener('click', () => {
      panel.classList.remove('active');
    });
    
    // Setup section tag clicks
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('section-tag')) {
        const sectionName = e.target.textContent.replace('.swift', '');
        const fileMap = {
          'PersonalInfo': 'personal-info',
          'WorkExperience': 'experience',
          'TechnicalSkills': 'skills',
          'KeyProjects': 'projects',
          'Education': 'education',
          'ContactInfo': 'contact'
        };
        
        const fileName = fileMap[sectionName];
        if (fileName && window.xcodeCV) {
          window.xcodeCV.switchFile(fileName);
          panel.classList.remove('active');
        }
      }
    });
  }
  
  showSmartRecommendations() {
    const panel = document.getElementById('recommendationsPanel');
    const content = document.getElementById('recommendationsContent');
    
    // Pick a random recommendation
    const recommendation = this.currentRecommendations[
      Math.floor(Math.random() * this.currentRecommendations.length)
    ];
    
    content.innerHTML = `
      <div class="recommendation-item">
        <div class="recommendation-role">${recommendation.role} (${recommendation.match}% match)</div>
        <div class="recommendation-text">${recommendation.description}</div>
        <div class="recommendation-sections">
          ${recommendation.sections.map(section => 
            `<span class="section-tag">${section}</span>`
          ).join('')}
        </div>
      </div>
    `;
    
    panel.classList.add('active');
    
    // Auto-hide after 10 seconds
    setTimeout(() => {
      panel.classList.remove('active');
    }, 10000);
  }
  
  // Download Options Implementation
  setupDownloadOptions() {
    const downloadToggle = document.getElementById('downloadToggle');
    const downloadMenu = document.getElementById('downloadMenu');
    
    downloadToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      downloadMenu.classList.toggle('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('#downloadToggle') && !e.target.closest('#downloadMenu')) {
        downloadMenu.classList.remove('active');
      }
    });
    
    // Setup download options
    document.querySelectorAll('.download-option').forEach(option => {
      option.addEventListener('click', (e) => {
        const format = e.currentTarget.dataset.format;
        this.initiateDownload(format);
        downloadMenu.classList.remove('active');
      });
    });
  }
  
  initiateDownload(format) {
    this.logUserInteraction('download_requested', { format });
    
    switch (format) {
      case 'pdf-traditional':
        this.downloadTraditionalPDF();
        break;
      case 'pdf-modern':
        this.downloadModernPDF();
        break;
      case 'interactive':
        this.downloadInteractiveHTML();
        break;
      case 'json':
        this.downloadJSONData();
        break;
    }
    
    window.xcodeCV.logToConsole(`Generating ${format} export...`, 'info');
  }
  
  downloadTraditionalPDF() {
    // Simulate PDF generation
    setTimeout(() => {
      const link = document.createElement('a');
      link.href = 'data:application/pdf;base64,'; // Would contain actual PDF data
      link.download = 'Quang_Tran_Minh_CV_Traditional.pdf';
      // document.body.appendChild(link);
      // link.click();
      // document.body.removeChild(link);
      
      // For demo purposes, show success message
      window.xcodeCV.logToConsole('Traditional PDF would be downloaded here', 'success');
      alert('Traditional PDF export feature would download here!\n\nIn a real implementation, this would generate a clean, ATS-friendly PDF resume.');
    }, 2000);
  }
  
  downloadModernPDF() {
    setTimeout(() => {
      window.xcodeCV.logToConsole('Modern PDF would be downloaded here', 'success');
      alert('Modern PDF export feature would download here!\n\nThis would create a visually enhanced PDF with colors and modern styling.');
    }, 2000);
  }
  
  downloadInteractiveHTML() {
    setTimeout(() => {
      window.xcodeCV.logToConsole('Interactive HTML would be downloaded here', 'success');
      alert('Interactive HTML export would download here!\n\nThis would create a standalone version of this interactive CV.');
    }, 2000);
  }
  
  downloadJSONData() {
    const cvData = this.extractCVData();
    const dataStr = JSON.stringify(cvData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = 'Quang_Tran_Minh_CV_Data.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    window.xcodeCV.logToConsole('JSON data exported successfully', 'success');
  }
  
  extractCVData() {
    return {
      personalInfo: {
        name: "Quang Tran Minh",
        title: "Mobile Technical Leader & Product Management Expert",
        location: "Hanoi, Vietnam",
        email: "trmquang3103@gmail.com",
        phone: "+84-969-993-103"
      },
      experience: [
        {
          title: "Senior iOS Developer",
          company: "CBTW",
          duration: "2+ years",
          current: true,
          responsibilities: [
            "Developed iOS application for Shahid streaming platform",
            "Collaborated in international environment with 10-person team"
          ]
        },
        {
          title: "Product Manager & Senior iOS Developer",
          company: "Unit Vietnam", 
          duration: "7 years",
          current: false,
          responsibilities: [
            "Managed 5+ concurrent mobile projects simultaneously",
            "Led product strategy development for multiple iOS applications"
          ]
        }
      ],
      skills: {
        languages: ["Swift", "Objective-C", "C/C++", "JavaScript"],
        frameworks: ["SwiftUI", "Swift Concurrency", "Combine"],
        architecture: ["MVVM", "MVP", "VIPER", "Clean Architecture"]
      },
      achievements: {
        appsDelivered: 10,
        averageRating: 4.5,
        concurrentUsers: "100K+",
        crashRate: "<0.5%"
      }
    };
  }
  
  // Git History Interactions
  setupGitHistory() {
    // Add interactive elements to git history
    document.addEventListener('click', (e) => {
      if (e.target.closest('.commit-line')) {
        const commitLine = e.target.closest('.commit-line');
        this.showCommitDetails(commitLine);
      }
    });
  }
  
  showCommitDetails(commitLine) {
    const hash = commitLine.querySelector('.hash')?.textContent;
    const message = commitLine.querySelector('.message')?.textContent;
    
    if (hash && message) {
      window.xcodeCV.logToConsole(`Viewing commit ${hash}: ${message}`, 'info');
      
      // Could expand to show more details
      commitLine.style.background = 'var(--bg-selected)';
      setTimeout(() => {
        commitLine.style.background = '';
      }, 1000);
    }
  }
  
  // User Behavior Tracking
  trackUserBehavior() {
    // Track which sections users spend most time on
    let currentSection = 'personal-info';
    let sectionStartTime = Date.now();
    
    document.addEventListener('click', (e) => {
      if (e.target.closest('.file-item')) {
        const newSection = e.target.closest('.file-item').dataset.file;
        if (newSection !== currentSection) {
          const timeSpent = Date.now() - sectionStartTime;
          this.logUserInteraction('section_time', {
            section: currentSection,
            timeSpent: timeSpent
          });
          
          currentSection = newSection;
          sectionStartTime = Date.now();
          
          // Update recommendations based on behavior
          this.updateRecommendationsBasedOnBehavior();
        }
      }
    });
  }
  
  updateRecommendationsBasedOnBehavior() {
    const timeSpentOnSections = this.userInteractions
      .filter(i => i.type === 'section_time')
      .reduce((acc, i) => {
        acc[i.data.section] = (acc[i.data.section] || 0) + i.data.timeSpent;
        return acc;
      }, {});
    
    // If user spends a lot of time on technical skills, recommend technical roles
    if (timeSpentOnSections['skills'] > 10000) { // 10 seconds
      this.currentRecommendations.unshift({
        role: 'Senior Technical Expert',
        description: 'Based on your interest in technical skills',
        sections: ['TechnicalSkills.swift', 'KeyProjects.swift'],
        match: 96
      });
    }
  }
  
  logUserInteraction(type, data = {}) {
    this.userInteractions.push({
      type,
      data,
      timestamp: Date.now()
    });
    
    // Keep only last 100 interactions
    if (this.userInteractions.length > 100) {
      this.userInteractions = this.userInteractions.slice(-100);
    }
  }
  
  buildKnowledgeBase() {
    return {
      experience: {
        totalYears: 10,
        currentRole: "Senior iOS Developer at CBTW",
        previousRoles: ["Product Manager & Senior iOS Developer at Unit Vietnam", "iOS Developer at LBPro Poland"],
        achievements: [
          "10+ iOS applications with 4.5+ App Store ratings",
          "Led teams of 20+ developers",
          "Managed 5+ concurrent projects",
          "100K+ concurrent users with <0.5% crash rates"
        ]
      },
      skills: {
        primary: ["Swift", "iOS Development", "Product Management"],
        frameworks: ["SwiftUI", "Combine", "Core ML"],
        architecture: ["MVVM", "VIPER", "Clean Architecture"],
        leadership: ["Team Management", "Stakeholder Communication", "Project Coordination"]
      },
      personality: {
        workStyle: "Remote collaboration expert",
        communication: "Fluent English, cross-cultural experience",
        approach: "Technical excellence with business focus"
      }
    };
  }
}

// Add CSS for typing indicator
const typingStyles = `
  .typing-dots {
    display: flex;
    gap: 4px;
    align-items: center;
  }
  
  .typing-dots span {
    width: 6px;
    height: 6px;
    background: var(--text-secondary);
    border-radius: 50%;
    animation: typingDot 1.4s infinite ease-in-out;
  }
  
  .typing-dots span:nth-child(1) { animation-delay: -0.32s; }
  .typing-dots span:nth-child(2) { animation-delay: -0.16s; }
  .typing-dots span:nth-child(3) { animation-delay: 0s; }
  
  @keyframes typingDot {
    0%, 80%, 100% {
      transform: scale(0.8);
      opacity: 0.5;
    }
    40% {
      transform: scale(1);
      opacity: 1;
    }
  }
`;

// Add styles to document
const styleSheet = document.createElement('style');
styleSheet.textContent = typingStyles;
document.head.appendChild(styleSheet);

// Initialize advanced features
document.addEventListener('DOMContentLoaded', () => {
  window.advancedFeatures = new AdvancedFeaturesManager();
});