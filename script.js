/**
 * IMMACULATE CONSULTANCY — INTERACTIVE JAVASCRIPT
 * Capabilities:
 * - Mobile Navigation Drawer & Backdrop Control
 * - Sticky Header Scroll Shadow
 * - ScrollSpy for Active Nav Links
 * - Interactive FAQ Accordion
 * - IntersectionObserver Scroll Reveal Animations
 * - Animated Statistics Counters
 * - Interactive Consultation Form with Instant Feedback & WhatsApp / Email Routing
 */

document.addEventListener('DOMContentLoaded', () => {

  // --------------------------------------------------------------------------
  // 1. Footer Year
  // --------------------------------------------------------------------------
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // --------------------------------------------------------------------------
  // 2. Mobile Drawer Navigation
  // --------------------------------------------------------------------------
  const menuToggle = document.getElementById('menuToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerOverlay = document.getElementById('drawerOverlay');
  const drawerClose = document.getElementById('drawerClose');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  const openDrawer = () => {
    menuToggle.classList.add('is-active');
    menuToggle.setAttribute('aria-expanded', 'true');
    mobileDrawer.classList.add('is-open');
    mobileDrawer.setAttribute('aria-hidden', 'false');
    drawerOverlay.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    menuToggle.classList.remove('is-active');
    menuToggle.setAttribute('aria-expanded', 'false');
    mobileDrawer.classList.remove('is-open');
    mobileDrawer.setAttribute('aria-hidden', 'true');
    drawerOverlay.classList.remove('is-active');
    document.body.style.overflow = '';
  };

  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.contains('is-open');
      isOpen ? closeDrawer() : openDrawer();
    });
  }

  if (drawerClose) {
    drawerClose.addEventListener('click', closeDrawer);
  }

  if (drawerOverlay) {
    drawerOverlay.addEventListener('click', closeDrawer);
  }

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer && mobileDrawer.classList.contains('is-open')) {
      closeDrawer();
    }
  });

  // --------------------------------------------------------------------------
  // 3. Sticky Header Scroll Effect
  // --------------------------------------------------------------------------
  const siteHeader = document.getElementById('siteHeader');
  const handleScroll = () => {
    if (!siteHeader) return;
    if (window.scrollY > 30) {
      siteHeader.classList.add('is-scrolled');
    } else {
      siteHeader.classList.remove('is-scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // --------------------------------------------------------------------------
  // 4. ScrollSpy for Navigation Links
  // --------------------------------------------------------------------------
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  const highlightNav = () => {
    const scrollPos = window.scrollY + 120;
    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');
      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };
  window.addEventListener('scroll', highlightNav, { passive: true });

  // --------------------------------------------------------------------------
  // 5. Interactive FAQ Accordion
  // --------------------------------------------------------------------------
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question');
    if (btn) {
      btn.addEventListener('click', () => {
        const isCurrentActive = item.classList.contains('active');
        
        // Close all items
        faqItems.forEach(otherItem => {
          otherItem.classList.remove('active');
          const otherBtn = otherItem.querySelector('.faq-question');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
        });

        // Toggle clicked item
        if (!isCurrentActive) {
          item.classList.add('active');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    }
  });

  // --------------------------------------------------------------------------
  // 6. IntersectionObserver Scroll Reveal Animations
  // --------------------------------------------------------------------------
  const revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('is-visible'));
  }

  // --------------------------------------------------------------------------
  // 7. Dynamic Counter Animation for Trust Metrics
  // --------------------------------------------------------------------------
  const counterEls = document.querySelectorAll('.metric-num[data-target]');
  let hasAnimated = false;

  const animateCounters = () => {
    if (hasAnimated) return;
    counterEls.forEach(el => {
      const target = parseInt(el.getAttribute('data-target'), 10);
      const isPercentage = el.textContent.includes('%');
      const isPlus = el.textContent.includes('+');
      const duration = 1600;
      const stepTime = 25;
      const totalSteps = duration / stepTime;
      const increment = target / totalSteps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
          el.textContent = `${target}${isPercentage ? '%' : (isPlus ? '+' : '')}`;
        } else {
          el.textContent = `${Math.floor(current)}${isPercentage ? '%' : (isPlus ? '+' : '')}`;
        }
      }, stepTime);
    });
    hasAnimated = true;
  };

  const metricsBar = document.querySelector('.metrics-bar');
  if (metricsBar && 'IntersectionObserver' in window) {
    const metricsObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        animateCounters();
      }
    }, { threshold: 0.3 });
    metricsObserver.observe(metricsBar);
  }

  // --------------------------------------------------------------------------
  // 8. Consultation Request Form Validation & Processing
  // --------------------------------------------------------------------------
  const consultForm = document.getElementById('consultationForm');
  const formStatus = document.getElementById('formStatus');
  const submitBtn = document.getElementById('submitBtn');

  if (consultForm) {
    consultForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('fullName');
      const emailInput = document.getElementById('emailAddr');
      const phoneInput = document.getElementById('phoneNum');
      const serviceSelect = document.getElementById('serviceSelect');
      const orgInput = document.getElementById('orgName');
      const msgInput = document.getElementById('messageText');

      let isValid = true;

      // Validate Name
      if (!nameInput.value.trim()) {
        nameInput.closest('.form-group').classList.add('has-error');
        isValid = false;
      } else {
        nameInput.closest('.form-group').classList.remove('has-error');
      }

      // Validate Email
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailInput.value.trim() || !emailPattern.test(emailInput.value.trim())) {
        emailInput.closest('.form-group').classList.add('has-error');
        isValid = false;
      } else {
        emailInput.closest('.form-group').classList.remove('has-error');
      }

      // Validate Phone
      if (!phoneInput.value.trim() || phoneInput.value.trim().length < 7) {
        phoneInput.closest('.form-group').classList.add('has-error');
        isValid = false;
      } else {
        phoneInput.closest('.form-group').classList.remove('has-error');
      }

      // Validate Message
      if (!msgInput.value.trim()) {
        msgInput.closest('.form-group').classList.add('has-error');
        isValid = false;
      } else {
        msgInput.closest('.form-group').classList.remove('has-error');
      }

      if (!isValid) {
        formStatus.className = 'form-status-alert is-error';
        formStatus.innerHTML = '<strong>Please correct the highlighted fields</strong> before submitting.';
        formStatus.style.display = 'block';
        return;
      }

      // Prepare submission payload
      const userName = encodeURIComponent(nameInput.value.trim());
      const userEmail = encodeURIComponent(emailInput.value.trim());
      const userPhone = encodeURIComponent(phoneInput.value.trim());
      const selectedService = encodeURIComponent(serviceSelect.value);
      const userOrg = encodeURIComponent(orgInput.value.trim() || 'Not specified');
      const userMessage = encodeURIComponent(msgInput.value.trim());

      // Prepare feedback button state
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Processing Consultation Request...</span>';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span>Submit Consultation Request</span><svg class="btn-arrow" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"/></svg>';

        // Show comprehensive success alert with direct WhatsApp and Email links
        const mailtoSubject = encodeURIComponent(`Consultation Inquiry: ${serviceSelect.value} - ${nameInput.value.trim()}`);
        const mailtoBody = encodeURIComponent(
          `Hello Immaculate Consultancy,\n\n` +
          `Name: ${nameInput.value.trim()}\n` +
          `Email: ${emailInput.value.trim()}\n` +
          `Phone: ${phoneInput.value.trim()}\n` +
          `Organization/Role: ${orgInput.value.trim() || 'N/A'}\n` +
          `Practice Area: ${serviceSelect.value}\n\n` +
          `Inquiry Details:\n${msgInput.value.trim()}\n\n` +
          `Sent from Immaculate Consultancy Website`
        );

        const waText = encodeURIComponent(
          `Hello Immaculate Consultancy, my name is ${nameInput.value.trim()}. ` +
          `I am interested in ${serviceSelect.value}. ` +
          `Overview: ${msgInput.value.trim()}`
        );

        formStatus.className = 'form-status-alert is-success';
        formStatus.innerHTML = `
          <strong>Thank you, ${nameInput.value.trim()}!</strong> Your consultation request has been drafted.<br>
          Our senior advisory desk will respond within 2 to 4 business hours.<br><br>
          <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-top: 8px;">
            <a href="mailto:abbeyance20@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}" class="btn btn-gold btn-sm" style="display:inline-flex;">Send Directly via Email &rarr;</a>
            <a href="https://wa.me/2347088109367?text=${waText}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm" style="display:inline-flex; border-color: rgba(255,255,255,0.4); color: #fff;">Open in WhatsApp &rarr;</a>
          </div>
        `;
        formStatus.style.display = 'block';

        // Reset form inputs after brief delay
        consultForm.reset();
      }, 700);

    });
  }

});
