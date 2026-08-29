/**
 * Personal Portfolio Website - Core Scripts
 * SRIKANTH SR - Digital Marketing Specialist & Growth Strategist
 * Vanilla ES6+ JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileMenu();
  initScrollSpy();
  initProjectFilters();
  initProjectModals();
  initStatsCounter();
  initContactForm();
  initBackToTop();
});

/* ==========================================================================
   1. Theme Management (Dark / Light Mode)
   ========================================================================== */
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  
  // Retrieve saved theme or fallback to system preference
  const savedTheme = localStorage.getItem('portfolio-theme');
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
  } else if (!prefersDark.matches) {
    document.documentElement.setAttribute('data-theme', 'light');
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
  }

  updateThemeIcon();

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('portfolio-theme', newTheme);
      updateThemeIcon();
      
      showToast(`Switched to ${newTheme} mode`);
    });
  }

  // Listen for system changes if user hasn't explicitly set preference
  prefersDark.addEventListener('change', (e) => {
    if (!localStorage.getItem('portfolio-theme')) {
      const newTheme = e.matches ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', newTheme);
      updateThemeIcon();
    }
  });
}

function updateThemeIcon() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  if (!themeToggleBtn) return;
  
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const sunIcon = themeToggleBtn.querySelector('.icon-sun');
  const moonIcon = themeToggleBtn.querySelector('.icon-moon');

  if (currentTheme === 'light') {
    if (sunIcon) sunIcon.style.display = 'none';
    if (moonIcon) moonIcon.style.display = 'block';
    themeToggleBtn.setAttribute('aria-label', 'Switch to Dark Mode');
  } else {
    if (sunIcon) sunIcon.style.display = 'block';
    if (moonIcon) moonIcon.style.display = 'none';
    themeToggleBtn.setAttribute('aria-label', 'Switch to Light Mode');
  }
}

/* ==========================================================================
   2. Mobile Navigation Drawer
   ========================================================================== */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.getElementById('nav-links');
  const links = document.querySelectorAll('.nav-link');

  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('active');
      menuBtn.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when a link is clicked
    links.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuBtn.setAttribute('aria-expanded', 'false');
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !menuBtn.contains(e.target) && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        menuBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }
}

/* ==========================================================================
   3. Scroll-Spy (Active Navigation Link Tracking)
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const currentId = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${currentId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, {
    rootMargin: '-30% 0px -60% 0px'
  });

  sections.forEach(section => observer.observe(section));
}

/* ==========================================================================
   4. Campaign & Project Filtering
   ========================================================================== */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* ==========================================================================
   5. Campaign & Project Modals Data & Logic (HTML5 <dialog>)
   ========================================================================== */
const projectsData = {
  'project-1': {
    title: '6thLoom - Brand Launch & Social Media Growth',
    category: 'Digital Marketing',
    description: 'Set up and engineered end-to-end brand social media presence for 6thLoom at CyberBix Technologies. Built a high-velocity content calendar and executed interactive giveaway campaigns.',
    features: [
      'Set up and established the brand Facebook and Instagram presence from day zero',
      'Built a structured multi-format content calendar (reels, carousel breakdowns, lifestyle visuals)',
      'Planned and executed a targeted viral giveaway campaign that generated ~5,000 active followers',
      'Maintained consistent post-campaign audience engagement, direct messaging, and community retention'
    ],
    tech: ['SMM Strategy', 'Facebook Business Suite', 'Content Calendars', 'Viral Campaign Funnels', 'Canva/Design Direction']
  },
  'project-2': {
    title: 'Orderbix & Storebix - Go-To-Market & Creative Direction',
    category: 'Digital Marketing',
    description: 'Comprehensive marketing research and go-to-market positioning for innovative social commerce and eCommerce platforms at CyberBix Technologies.',
    features: [
      'Researched Instagram/social-seller storefront market fit and competitor positioning for Orderbix',
      'Engineered structured trial-offer outreach workflows and testimonial-driven conversion campaigns',
      'Created strategic marketing messaging aligned with tier-based pricing features for Storebix',
      'Designed complete visual brand hierarchy (color palette, logo lockups, carousel guidelines) for the Bix Ecom sub-brand',
      'Authored AI-assisted image generation prompts and compelling copywriting for multi-channel poster & ad creatives'
    ],
    tech: ['GTM Strategy', 'Brand Identity', 'AI Image Prompt Engineering', 'Copywriting', 'Pricing Tier Alignment']
  },
  'project-3': {
    title: 'Multi-Website Search Engine Ranking & Social Scaling',
    category: 'SEO & SEM',
    description: 'Spearheaded technical and on-page SEO optimization and multi-account social media management at Markwizard Global.',
    features: [
      'Successfully ranked 4 client websites at top search engine positions by identifying high-intent target keywords',
      'Executed on-page SEO (meta tags, internal linking, header hierarchy) and technical optimizations (crawlability, page speed)',
      'Managed 7 client social media accounts simultaneously with consistent brand tone, visuals, and scheduling',
      'Planned and launched high-converting Meta (Facebook & Instagram) ad campaigns to generate qualified inbound leads'
    ],
    tech: ['SEO Optimization', 'Google Keyword Planner', 'Semrush', 'Ahrefs', 'MOZ', 'Meta Ads Manager']
  },
  'project-4': {
    title: 'Healthcare, Real Estate & Educational Paid Campaigns',
    category: 'SEO & SEM',
    description: 'Executed high-impact lead generation and brand awareness campaigns across healthcare, real estate, and technical education sectors at Bluepin Digital.',
    features: [
      'Assisted in complete digital marketing strategy (SEO, SEM, and social media) for Unigrandt Institute (Leading Oil & Gas Institute in Kochi)',
      'Authored high-converting content for blogs, social channels, and search ads boosting organic engagement',
      'Managed live Meta ad campaigns with custom audience targeting for Shajina Medical Centre',
      'Orchestrated live Google Search Ads campaigns driving qualified buyer inquiries for Foreway Realtors'
    ],
    tech: ['Google Ads (PPC)', 'Meta Ads', 'Lead Generation', 'Keyword Research', 'Google Analytics']
  },
  'project-5': {
    title: 'Machine Learning & Deep Learning Identification Suite',
    category: 'Software Development',
    description: 'Designed, trained, and deployed desktop machine learning and computer vision applications with intuitive graphical interfaces at Higs Software Solutions.',
    features: [
      'Developed a Green Plants Infection Identifier utilizing Deep Learning image classification models',
      'Built a multi-lingual Language Identifier capable of classifying English and Kannada text samples with high accuracy',
      'Created an interactive Weather Identifier and prediction tool using historical meteorology datasets',
      'Engineered interactive desktop GUIs using Python Tkinter and modern custom Tkinter styling modules'
    ],
    tech: ['Python', 'Machine Learning', 'Deep Learning', 'Computer Vision', 'Tkinter GUI', 'NumPy / Pandas']
  },
  'project-6': {
    title: 'Enterprise Scalable Web Applications & REST APIs',
    category: 'Software Development',
    description: 'Architected and maintained robust full-stack enterprise web platforms and backends at Suffix E Solutions.',
    features: [
      'Developed modular and secure web applications using Python, Django, C#, and ASP.NET MVC architectures',
      'Engineered RESTful APIs for seamless data interchange between frontends and backend services',
      'Implemented relational database modeling, query optimization, and secure user authentication systems',
      'Collaborated in Agile sprints to ensure high performance, code maintainability, and clean architecture'
    ],
    tech: ['Python', 'Django', 'C#', 'ASP.NET MVC', 'REST APIs', 'SQL Database Design']
  }
};

function initProjectModals() {
  const modal = document.getElementById('project-modal');
  const closeBtn = document.getElementById('modal-close-btn');
  const detailButtons = document.querySelectorAll('.project-btn-detail');

  if (!modal) return;

  detailButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const card = e.target.closest('.project-card');
      const projectId = card ? card.getAttribute('data-project-id') : null;
      const data = projectsData[projectId];

      if (data) {
        populateModalData(data);
        modal.showModal();
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.close();
    });
  }

  modal.addEventListener('close', () => {
    document.body.style.overflow = 'auto';
  });

  // Close when clicking outside dialog content
  modal.addEventListener('click', (e) => {
    const dialogDimensions = modal.getBoundingClientRect();
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      modal.close();
    }
  });
}

function populateModalData(data) {
  const titleEl = document.getElementById('modal-project-title');
  const descEl = document.getElementById('modal-project-desc');
  const featuresList = document.getElementById('modal-project-features');
  const techStackContainer = document.getElementById('modal-project-tech');

  if (titleEl) titleEl.textContent = data.title;
  if (descEl) descEl.textContent = data.description;
  
  if (featuresList) {
    featuresList.innerHTML = '';
    data.features.forEach(feat => {
      const li = document.createElement('li');
      li.innerHTML = `
        <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>
        <span>${feat}</span>
      `;
      featuresList.appendChild(li);
    });
  }

  if (techStackContainer) {
    techStackContainer.innerHTML = '';
    data.tech.forEach(t => {
      const span = document.createElement('span');
      span.className = 'project-tech-badge';
      span.textContent = t;
      techStackContainer.appendChild(span);
    });
  }
}

/* ==========================================================================
   6. Statistics Counter Animation
   ========================================================================== */
function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.stat-number');
  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        statNumbers.forEach(numEl => {
          const target = parseInt(numEl.getAttribute('data-target'), 10) || 0;
          const suffix = numEl.getAttribute('data-suffix') || '';
          animateNumber(numEl, target, suffix);
        });
      }
    });
  }, { threshold: 0.3 });

  const aboutSection = document.getElementById('about');
  if (aboutSection) observer.observe(aboutSection);
}

function animateNumber(element, target, suffix) {
  let current = 0;
  const duration = 1500;
  const stepTime = 25;
  const totalSteps = duration / stepTime;
  const increment = target / totalSteps;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    element.textContent = Math.floor(current) + suffix;
  }, stepTime);
}

/* ==========================================================================
   7. Contact Form Validation & Toast Message
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    // Name Validation
    if (!nameInput.value.trim()) {
      setError(nameInput, 'Please enter your name.');
      isValid = false;
    } else {
      clearError(nameInput);
    }

    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
      setError(emailInput, 'Please enter a valid email address.');
      isValid = false;
    } else {
      clearError(emailInput);
    }

    // Message Validation
    if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
      setError(messageInput, 'Please provide a message with at least 10 characters.');
      isValid = false;
    } else {
      clearError(messageInput);
    }

    if (isValid) {
      // Simulate form submission
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = 'Sending Message...';
      submitBtn.disabled = true;

      setTimeout(() => {
        form.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        showToast('🎉 Thank you! Your inquiry has been sent to Srikanth SR.');
      }, 1000);
    }
  });
}

function setError(inputEl, message) {
  const group = inputEl.closest('.form-group');
  if (group) {
    group.classList.add('has-error');
    const errorMsg = group.querySelector('.form-error-msg');
    if (errorMsg) errorMsg.textContent = message;
  }
}

function clearError(inputEl) {
  const group = inputEl.closest('.form-group');
  if (group) {
    group.classList.remove('has-error');
  }
}

/* ==========================================================================
   8. Toast Notification Utility
   ========================================================================== */
function showToast(message) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast-notification toast-success';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
    <span>${message}</span>
  `;

  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

/* ==========================================================================
   9. Back to Top Button
   ========================================================================== */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
