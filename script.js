// ===== MOBILE MENU FUNCTIONALITY =====
class MobileMenu {
  constructor() {
    this.toggle = document.querySelector('.mobile-menu-toggle');
    this.menu = document.querySelector('.mobile-menu');
    this.menuLinks = document.querySelectorAll('.mobile-nav-link');
    this.isOpen = false;
    
    this.init();
  }
  
  init() {
    this.toggle.addEventListener('click', () => this.toggleMenu());
    this.menuLinks.forEach(link => {
      link.addEventListener('click', () => this.closeMenu());
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.closeMenu();
      }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (this.isOpen && !this.menu.contains(e.target) && !this.toggle.contains(e.target)) {
        this.closeMenu();
      }
    });
  }
  
  toggleMenu() {
    if (this.isOpen) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  }
  
  openMenu() {
    this.isOpen = true;
    this.toggle.setAttribute('aria-expanded', 'true');
    this.menu.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    
    // Focus management
    const firstLink = this.menu.querySelector('.mobile-nav-link');
    if (firstLink) {
      firstLink.focus();
    }
  }
  
  closeMenu() {
    this.isOpen = false;
    this.toggle.setAttribute('aria-expanded', 'false');
    this.menu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    this.toggle.focus();
  }
}

// ===== SMOOTH SCROLLING =====
class SmoothScroll {
  constructor() {
    this.init();
  }
  
  init() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href === '#') return;
        
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }
}

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
class ScrollAnimations {
  constructor() {
    this.observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    this.init();
  }
  
  init() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, this.observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.hero-image, .bio-content');
    animatedElements.forEach(el => observer.observe(el));
  }
}

// ===== PERFORMANCE OPTIMIZATION =====
class PerformanceOptimizer {
  constructor() {
    this.init();
  }
  
  init() {
    // Preload critical images
    this.preloadImages();
    
    // Optimize font loading
    this.optimizeFonts();
  }
  
  preloadImages() {
    const criticalImages = [
      'images/IMG_1707.JPG'
    ];
    
    criticalImages.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    });
  }
  
  optimizeFonts() {
    // Add font-display: swap to Google Fonts
    if ('fonts' in document) {
      document.fonts.ready.then(() => {
        document.body.classList.add('fonts-loaded');
      });
    }
  }
}

// ===== ACCESSIBILITY ENHANCEMENTS =====
class AccessibilityEnhancer {
  constructor() {
    this.init();
  }
  
  init() {
    // Skip link functionality
    this.setupSkipLink();
    
    // Focus management
    this.setupFocusManagement();
  }
  
  setupSkipLink() {
    const skipLink = document.querySelector('.skip-link');
    if (skipLink) {
      skipLink.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(skipLink.getAttribute('href'));
        if (target) {
          target.focus();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
  }
  
  setupFocusManagement() {
    // Store the last focused element before opening modal/menu
    let lastFocusedElement;
    
    document.addEventListener('focusin', (e) => {
      lastFocusedElement = e.target;
    });
  }
}

// ===== UTILITY FUNCTIONS =====
const Utils = {
  // Debounce function for performance
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
  },
  
  // Throttle function for scroll events
  throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },
  
  // Check if element is in viewport
  isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
};

// ===== MOBILE HAMBURGER MENU =====
class MobileHamburgerMenu {
  constructor() {
    console.log('🔍 MobileHamburgerMenu constructor called');
    this.hamburger = document.getElementById('mobileHamburger');
    this.overlay = document.getElementById('mobileNavOverlay');
    this.isOpen = false;
    
    console.log('🍔 Hamburger element:', this.hamburger);
    console.log('📱 Overlay element:', this.overlay);
    
    if (!this.hamburger) {
      console.error('❌ Mobile hamburger element not found!');
    }
    if (!this.overlay) {
      console.error('❌ Mobile nav overlay element not found!');
    }
    
    this.init();
  }
  
  init() {
    console.log('🔧 MobileHamburgerMenu init called');
    if (this.hamburger && this.overlay) {
      console.log('✅ Both elements found, adding event listeners');
      this.hamburger.addEventListener('click', () => this.toggle());
      
      // Close menu when clicking on overlay
      this.overlay.addEventListener('click', (e) => {
        if (e.target === this.overlay) {
          this.close();
        }
      });
      
      // Close menu when clicking on nav links
      const navLinks = this.overlay.querySelectorAll('.tab');
      navLinks.forEach(link => {
        link.addEventListener('click', () => this.close());
      });
      
      // Close menu on escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.isOpen) {
          this.close();
        }
      });
    } else {
      console.error('❌ Cannot initialize - missing elements:', {
        hamburger: !!this.hamburger,
        overlay: !!this.overlay
      });
    }
  }
  
  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }
  
  open() {
    console.log('🍔 Opening mobile menu...');
    this.isOpen = true;
    this.hamburger.classList.add('active');
    this.overlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
    console.log('✅ Mobile menu opened');
  }
  
  close() {
    console.log('🍔 Closing mobile menu...');
    this.isOpen = false;
    this.hamburger.classList.remove('active');
    this.overlay.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
    console.log('❌ Mobile menu closed');
  }
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
  // Initialize all classes
  // new MobileMenu(); // Disabled - not used in this design
  new MobileHamburgerMenu();
  new SmoothScroll();
  new ScrollAnimations();
  new PerformanceOptimizer();
  new AccessibilityEnhancer();
  
  // Add loading class to body
  document.body.classList.add('loaded');
  
  // Console log for development
  console.log('🚀 Personal website loaded successfully!');
}); 