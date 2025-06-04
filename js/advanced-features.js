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
    window.xcodeCV.logToConsole('Generating traditional PDF...', 'info');
    
    // Create a clean PDF-style HTML content
    const pdfContent = this.generateTraditionalPDFContent();
    
    // Use browser's print functionality to generate PDF
    const printWindow = window.open('', '_blank');
    printWindow.document.write(pdfContent);
    printWindow.document.close();
    
    setTimeout(() => {
      printWindow.print();
      window.xcodeCV.logToConsole('Traditional PDF ready for download', 'success');
    }, 1000);
  }
  
  downloadModernPDF() {
    window.xcodeCV.logToConsole('Generating modern PDF...', 'info');
    
    const pdfContent = this.generateModernPDFContent();
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(pdfContent);
    printWindow.document.close();
    
    setTimeout(() => {
      printWindow.print();
      window.xcodeCV.logToConsole('Modern PDF ready for download', 'success');
    }, 1000);
  }
  
  downloadInteractiveHTML() {
    window.xcodeCV.logToConsole('Generating interactive HTML...', 'info');
    
    const htmlContent = this.generateInteractiveHTML();
    const htmlBlob = new Blob([htmlContent], { type: 'text/html' });
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(htmlBlob);
    link.download = 'Quang_Tran_Minh_CV_Interactive.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    window.xcodeCV.logToConsole('Interactive HTML downloaded successfully', 'success');
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
        phone: "84-969-993-103",
        workingHours: "Flexible working hours",
        linkedin: "LinkedIn",
        github: "GitHub"
      },
      summary: "Experienced Mobile Technical Leader with 10+ years of comprehensive mobile development expertise and proven product management capabilities. Successfully led cross-functional teams in delivering complex mobile ecosystems and super applications with 500K+ combined downloads. Specialized in architecting secure, scalable mobile solutions with deep expertise in product strategy, technical leadership, and business-driven development.",
      experience: [
        {
          title: "Product Manager & Senior iOS Developer",
          company: "Unit Vietnam",
          duration: "7 years",
          current: false,
          leadership: [
            "Managed 5+ concurrent mobile projects simultaneously, delivering products across different market segments",
            "Led product strategy development for multiple iOS applications, from market research to post-launch optimization",
            "Coordinated cross-functional teams of 20+ developers, designers, QA, and business stakeholders",
            "Drove product roadmap decisions balancing technical feasibility with business objectives and user needs"
          ],
          technical: [
            "Successfully delivered 10+ iOS applications with 4.5+ App Store ratings",
            "Architected secure solutions handling 100K+ concurrent users with <0.5% crash rates",
            "Led technical decision-making for architecture choices, technology stack, and security implementations",
            "Established development best practices including coding standards, security protocols, and code review processes"
          ]
        },
        {
          title: "Senior iOS Developer",
          company: "CBTW",
          duration: "2+ years",
          current: true,
          responsibilities: [
            "Develop iOS application for Shahid streaming platform serving millions of users across the Middle East",
            "Collaborate in international environment with 10-person iOS team ensuring enterprise-grade quality",
            "Contribute to architectural decisions for scalable streaming solutions handling high-traffic loads",
            "Work with cross-functional teams (backend, QA, product, design) to deliver seamless user experiences"
          ]
        },
        {
          title: "iOS Developer",
          company: "LBPro Poland",
          duration: "1+ years",
          current: false,
          responsibilities: [
            "Developed and maintained multiple iOS applications from concept to App Store release",
            "Collaborated with cross-functional teams including backend, design, and product management",
            "Implemented security features including push notifications, location services, and background processing"
          ]
        }
      ],
      technicalSkills: {
        mobileDevArchitecture: {
          title: "Mobile Development & Architecture (10+ Years)",
          skills: {
            languages: "Swift, Objective-C, C/C++, JavaScript",
            modernIOS: "SwiftUI, Swift Concurrency, Combine",
            architecture: "MVVM, MVP, VIPER, Clean Architecture, Microservices",
            security: "iOS Security Framework, Data Encryption, Secure Networking",
            testing: "XCTest, XCUITest, Security Testing, Performance Optimization"
          }
        },
        aiMlTech: {
          title: "AI/ML & Advanced Technologies",
          skills: {
            appleIntelligence: "Vision Framework, Core ML, NLP",
            securityFeatures: "Biometric Authentication, Fraud Detection",
            imageProcessing: "Core Image, Metal Performance Shaders",
            crossPlatform: "Flutter with native iOS bridging"
          }
        },
        productManagement: {
          title: "Product Management & Leadership",
          skills: {
            productStrategy: "Market Analysis, Roadmap Planning, Feature Prioritization",
            projectManagement: "Multi-project coordination, Resource allocation",
            stakeholderManagement: "Cross-functional team leadership, Executive reporting",
            businessAnalysis: "User Experience Strategy, Business-Technical alignment"
          }
        }
      },
      keyDifferentiators: {
        leadership: [
          "Multi-project management with proven ability to prioritize and deliver concurrent initiatives",
          "Technical-business bridge with ability to translate complex technical concepts to stakeholders",
          "Team mentorship and development of junior to senior developers"
        ],
        productDriven: [
          "User-centric development with deep understanding of market needs and user experience",
          "Data-driven decision making using analytics and user feedback for product improvements",
          "Business strategy alignment ensuring technical solutions support overall business objectives"
        ],
        securityScale: [
          "Enterprise-grade security implementation for high-traffic applications",
          "Performance optimization for applications handling 100K+ concurrent users",
          "Scalable architecture design for future growth and feature expansion"
        ]
      },
      education: {
        degree: "Bachelor of Computer Science",
        institution: "Wyższa Szkoła Informatyki w Łodzi",
        specialization: "Engineer, Information Technology",
        period: "2013-2017",
        coursework: "Data Structures & Algorithms, Software Engineering, Mobile App Development, Computer Networks, Project Management, Business Analysis"
      },
      remoteWork: {
        experience: "3+ years remote development experience with proven track record",
        communication: "Fluent English with extensive international stakeholder management",
        tools: "Expert in asynchronous communication tools and distributed team coordination",
        collaboration: "Cross-cultural collaboration experience with teams across different time zones"
      },
      availability: {
        startDate: "Immediate",
        workSchedule: "Full-time, flexible hours",
        location: "Hanoi, Vietnam (Open to hybrid/remote arrangements)",
        languages: "Native Vietnamese, Fluent English"
      },
      metrics: {
        totalExperience: "10+ years",
        appsDelivered: "10+",
        averageRating: "4.5+",
        concurrentUsers: "100K+",
        crashRate: "<0.5%",
        teamSize: "20+",
        concurrentProjects: "5+",
        totalDownloads: "500K+"
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
  
  generateTraditionalPDFContent() {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quang Tran Minh - CV</title>
    <style>
        @page {
            margin: 0.8in;
            size: A4;
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background: white;
        }
        
        .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
        }
        
        .header {
            text-align: center;
            border-bottom: 3px solid #2c5aa0;
            padding-bottom: 20px;
            margin-bottom: 30px;
        }
        
        .header h1 {
            font-size: 2.5em;
            color: #2c5aa0;
            margin-bottom: 5px;
            font-weight: 700;
        }
        
        .header h2 {
            font-size: 1.3em;
            color: #666;
            font-weight: 400;
            margin-bottom: 15px;
        }
        
        .contact-info {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 20px;
            font-size: 0.95em;
        }
        
        .section {
            margin-bottom: 25px;
            page-break-inside: avoid;
        }
        
        .section-title {
            font-size: 1.4em;
            color: #2c5aa0;
            border-bottom: 2px solid #2c5aa0;
            padding-bottom: 5px;
            margin-bottom: 15px;
            font-weight: 600;
        }
        
        .subsection {
            margin-bottom: 20px;
        }
        
        .job-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 10px;
        }
        
        .job-title {
            font-size: 1.2em;
            font-weight: 600;
            color: #2c5aa0;
        }
        
        .company {
            font-weight: 600;
            color: #666;
        }
        
        .duration {
            font-style: italic;
            color: #666;
            font-size: 0.95em;
        }
        
        .highlight {
            font-weight: 600;
            color: #2c5aa0;
        }
        
        ul {
            margin-left: 20px;
            margin-bottom: 10px;
        }
        
        li {
            margin-bottom: 6px;
            line-height: 1.5;
        }
        
        .summary-box {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            border-left: 4px solid #2c5aa0;
            margin-bottom: 25px;
        }
        
        @media print {
            .container {
                max-width: none;
                padding: 0;
            }
            
            .section {
                page-break-inside: avoid;
            }
            
            .job-header {
                page-break-inside: avoid;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Quang Tran Minh</h1>
            <h2>Mobile Technical Leader & Product Management Expert</h2>
            <div class="contact-info">
                <span>📧 trmquang3103@gmail.com</span>
                <span>📱 84-969-993-103</span>
                <span>📍 Hanoi, Vietnam</span>
                <span>🕒 Flexible working hours</span>
            </div>
        </div>

        <div class="section">
            <div class="summary-box">
                <p><strong>Experienced Mobile Technical Leader with 10+ years of comprehensive mobile development expertise and proven product management capabilities.</strong> Successfully led cross-functional teams in delivering complex mobile ecosystems and super applications with 500K+ combined downloads. <strong>Specialized in architecting secure, scalable mobile solutions with deep expertise in product strategy, technical leadership, and business-driven development.</strong></p>
                
                <p style="margin-top: 10px;">Fluent in English with extensive experience leading international teams and delivering enterprise-grade applications for large-scale user bases.</p>
            </div>
        </div>

        <div class="section">
            <h3 class="section-title">Professional Experience</h3>
            
            <div class="subsection">
                <div class="job-header">
                    <div>
                        <div class="job-title">Product Manager & Senior iOS Developer</div>
                        <div class="company">Unit Vietnam</div>
                    </div>
                    <div class="duration">7 years</div>
                </div>
                
                <div class="job-content">
                    <h4>Leadership & Product Management:</h4>
                    <ul>
                        <li><span class="highlight">Managed 5+ concurrent mobile projects</span> simultaneously, delivering products across different market segments</li>
                        <li><span class="highlight">Led product strategy development</span> for multiple iOS applications, from market research to post-launch optimization</li>
                        <li><span class="highlight">Coordinated cross-functional teams</span> of 20+ developers, designers, QA, and business stakeholders</li>
                        <li><span class="highlight">Drove product roadmap decisions</span> balancing technical feasibility with business objectives and user needs</li>
                    </ul>
                    
                    <h4>Technical Leadership Achievements:</h4>
                    <ul>
                        <li>Successfully delivered <span class="highlight">10+ iOS applications with 4.5+ App Store ratings</span></li>
                        <li><span class="highlight">Architected secure solutions</span> handling 100K+ concurrent users with <0.5% crash rates</li>
                        <li><span class="highlight">Led technical decision-making</span> for architecture choices, technology stack, and security implementations</li>
                        <li><span class="highlight">Established development best practices</span> including coding standards, security protocols, and code review processes</li>
                    </ul>
                </div>
            </div>
            
            <div class="subsection">
                <div class="job-header">
                    <div>
                        <div class="job-title">Senior iOS Developer</div>
                        <div class="company">CBTW</div>
                    </div>
                    <div class="duration">2+ years</div>
                </div>
                
                <ul>
                    <li>Develop iOS application for <span class="highlight">Shahid streaming platform</span> serving millions of users across the Middle East</li>
                    <li><span class="highlight">Collaborate in international environment</span> with 10-person iOS team ensuring enterprise-grade quality</li>
                    <li><span class="highlight">Contribute to architectural decisions</span> for scalable streaming solutions handling high-traffic loads</li>
                </ul>
            </div>
            
            <div class="subsection">
                <div class="job-header">
                    <div>
                        <div class="job-title">iOS Developer</div>
                        <div class="company">LBPro Poland</div>
                    </div>
                    <div class="duration">1+ years</div>
                </div>
                
                <ul>
                    <li>Developed and maintained multiple iOS applications from <span class="highlight">concept to App Store release</span></li>
                    <li>Implemented <span class="highlight">security features</span> including push notifications, location services, and background processing</li>
                </ul>
            </div>
        </div>

        <div class="section">
            <h3 class="section-title">Core Technical Expertise</h3>
            
            <h4>Mobile Development & Architecture (10+ Years)</h4>
            <ul>
                <li><strong>Languages:</strong> Swift, Objective-C, C/C++, JavaScript</li>
                <li><strong>Modern iOS:</strong> SwiftUI, Swift Concurrency, Combine</li>
                <li><strong>Architecture:</strong> MVVM, MVP, VIPER, Clean Architecture, Microservices</li>
                <li><strong>Security:</strong> iOS Security Framework, Data Encryption, Secure Networking</li>
            </ul>
            
            <h4>AI/ML & Advanced Technologies</h4>
            <ul>
                <li><strong>Apple Intelligence:</strong> Vision Framework, Core ML, NLP</li>
                <li><strong>Security Features:</strong> Biometric Authentication, Fraud Detection</li>
                <li><strong>Cross-Platform:</strong> Flutter with native iOS bridging</li>
            </ul>
            
            <h4>Product Management & Leadership</h4>
            <ul>
                <li><strong>Product Strategy:</strong> Market Analysis, Roadmap Planning, Feature Prioritization</li>
                <li><strong>Project Management:</strong> Multi-project coordination, Resource allocation</li>
                <li><strong>Stakeholder Management:</strong> Cross-functional team leadership, Executive reporting</li>
            </ul>
        </div>

        <div class="section">
            <h3 class="section-title">Education & Remote Work Excellence</h3>
            
            <div class="subsection">
                <h4>Education</h4>
                <p><strong>Bachelor of Computer Science</strong><br>
                <em>Wyższa Szkoła Informatyki w Łodzi</em><br>
                Engineer, Information Technology • 2013-2017</p>
            </div>
            
            <div class="subsection">
                <h4>Remote Work & International Collaboration</h4>
                <ul>
                    <li><strong>3+ years remote development experience</strong> with proven track record</li>
                    <li><strong>Fluent English</strong> with extensive international stakeholder management</li>
                    <li><strong>Expert in asynchronous communication</strong> tools and distributed team coordination</li>
                </ul>
            </div>
        </div>

        <div class="section">
            <h3 class="section-title">Availability</h3>
            <ul>
                <li><strong>Start Date:</strong> Immediate</li>
                <li><strong>Work Schedule:</strong> Full-time, flexible hours</li>
                <li><strong>Location:</strong> Hanoi, Vietnam (Open to hybrid/remote arrangements)</li>
                <li><strong>Languages:</strong> Native Vietnamese, Fluent English</li>
            </ul>
            
            <p style="margin-top: 15px; text-align: center; font-style: italic;">
                <em>References and detailed project portfolio available upon request</em>
            </p>
        </div>
    </div>
</body>
</html>`;
  }

  generateModernPDFContent() {
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Quang Tran Minh - Modern CV</title>
    <style>
        body { font-family: 'Inter', sans-serif; line-height: 1.6; margin: 0; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
        .container { max-width: 800px; margin: 40px auto; background: white; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px; text-align: center; }
        .name { font-size: 32px; font-weight: 700; margin-bottom: 5px; }
        .title { font-size: 18px; opacity: 0.9; margin-bottom: 15px; }
        .contact { opacity: 0.8; }
        .content { padding: 40px; }
        .section { margin-bottom: 30px; }
        .section h2 { color: #667eea; font-size: 20px; margin-bottom: 20px; position: relative; }
        .section h2::after { content: ''; position: absolute; bottom: -5px; left: 0; width: 50px; height: 3px; background: #667eea; }
        .job { margin-bottom: 20px; padding: 20px; background: #f8f9ff; border-radius: 10px; border-left: 4px solid #667eea; }
        .job-title { font-weight: 600; color: #333; font-size: 16px; }
        .company { color: #667eea; font-weight: 500; margin: 5px 0; }
        .duration { color: #888; font-size: 14px; }
        .skills { display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 10px; }
        .skill { background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 8px 15px; border-radius: 20px; text-align: center; font-size: 14px; font-weight: 500; }
        @media print { body { background: white; } .container { box-shadow: none; margin: 0; } }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="name">Quang Tran Minh</div>
            <div class="title">Mobile Technical Leader & Product Management Expert</div>
            <div class="contact">trmquang3103@gmail.com | +84-969-993-103 | Hanoi, Vietnam</div>
        </div>
        <div class="content">
            <div class="section">
                <h2>Professional Summary</h2>
                <p>Experienced Mobile Technical Leader with 10+ years of comprehensive mobile development expertise and proven product management capabilities. Successfully led cross-functional teams in delivering complex mobile ecosystems.</p>
            </div>
            <div class="section">
                <h2>Work Experience</h2>
                <div class="job">
                    <div class="job-title">Senior iOS Developer</div>
                    <div class="company">CBTW</div>
                    <div class="duration">2024 - Present</div>
                    <p>Developed iOS application for Shahid streaming platform, collaborating with international teams.</p>
                </div>
                <div class="job">
                    <div class="job-title">Product Manager & Senior iOS Developer</div>
                    <div class="company">Unit Vietnam</div>
                    <div class="duration">2017 - 2024</div>
                    <p>Managed 5+ concurrent projects, led 20+ developers, delivered 10+ apps with 4.5+ ratings.</p>
                </div>
            </div>
            <div class="section">
                <h2>Technical Skills</h2>
                <div class="skills">
                    <div class="skill">Swift</div>
                    <div class="skill">SwiftUI</div>
                    <div class="skill">Combine</div>
                    <div class="skill">Core ML</div>
                    <div class="skill">MVVM</div>
                    <div class="skill">Product Management</div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>`;
  }

  generateInteractiveHTML() {
    // Get the current page HTML and make it standalone
    const currentHTML = document.documentElement.outerHTML;
    return currentHTML.replace(/<script[^>]*src[^>]*><\/script>/g, ''); // Remove external scripts for standalone version
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