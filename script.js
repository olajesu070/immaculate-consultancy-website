/**
 * IMMACULATE CONSULTANCY — OFFICIAL SCRIPT
 * Reference: https://demo.casethemes.net/lawsight/
 *
 * Core Features:
 * - Mobile Navigation Drawer Toggle & Backdrop
 * - Header Scroll Elevation
 * - ScrollSpy for Main Navigation
 * - Classic Accordion (+ / - Toggle)
 * - Statistics Number Counter Animation
 * - Consultation Request Validation & Immediate WhatsApp / Email Dispatch
 */

document.addEventListener('DOMContentLoaded', () => {

  // --------------------------------------------------------------------------
  // 1. Footer Year
  // --------------------------------------------------------------------------
  const currentYearEl = document.getElementById('currentYear');
  if (currentYearEl) {
    currentYearEl.textContent = new Date().getFullYear();
  }

  // --------------------------------------------------------------------------
  // 2. Mobile Drawer Navigation
  // --------------------------------------------------------------------------
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileBackdrop = document.getElementById('mobileBackdrop');
  const mobileClose = document.getElementById('mobileClose');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  const openMobileNav = () => {
    mobileToggle.classList.add('is-active');
    mobileToggle.setAttribute('aria-expanded', 'true');
    mobileMenu.classList.add('is-open');
    mobileMenu.setAttribute('aria-hidden', 'false');
    mobileBackdrop.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  };

  const closeMobileNav = () => {
    mobileToggle.classList.remove('is-active');
    mobileToggle.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.remove('is-open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    mobileBackdrop.classList.remove('is-active');
    document.body.style.overflow = '';
  };

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      mobileMenu.classList.contains('is-open') ? closeMobileNav() : openMobileNav();
    });
  }

  if (mobileClose) mobileClose.addEventListener('click', closeMobileNav);
  if (mobileBackdrop) mobileBackdrop.addEventListener('click', closeMobileNav);

  mobileLinks.forEach(link => link.addEventListener('click', closeMobileNav));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('is-open')) {
      closeMobileNav();
    }
  });

  // --------------------------------------------------------------------------
  // 3. Header Scroll Elevation
  // --------------------------------------------------------------------------
  const siteHeader = document.getElementById('siteHeader');
  const onScroll = () => {
    if (!siteHeader) return;
    if (window.scrollY > 30) {
      siteHeader.classList.add('is-scrolled');
    } else {
      siteHeader.classList.remove('is-scrolled');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // --------------------------------------------------------------------------
  // 4. ScrollSpy for Navigation Items
  // --------------------------------------------------------------------------
  const navItems = document.querySelectorAll('.nav-item');
  const pageSections = document.querySelectorAll('section[id]');

  const updateActiveNav = () => {
    const scrollPosition = window.scrollY + 140;
    pageSections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollPosition >= top && scrollPosition < top + height) {
        navItems.forEach(item => {
          item.classList.remove('active');
          if (item.getAttribute('href') === `#${id}`) {
            item.classList.add('active');
          }
        });
      }
    });
  };
  window.addEventListener('scroll', updateActiveNav, { passive: true });

  // --------------------------------------------------------------------------
  // 5. Classic Corporate Accordion (Lawsight Style)
  // --------------------------------------------------------------------------
  const accItems = document.querySelectorAll('.acc-item');
  accItems.forEach(item => {
    const btn = item.querySelector('.acc-btn');
    const sign = item.querySelector('.acc-sign');

    if (btn) {
      btn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close all other panels
        accItems.forEach(otherItem => {
          otherItem.classList.remove('active');
          const otherBtn = otherItem.querySelector('.acc-btn');
          const otherSign = otherItem.querySelector('.acc-sign');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
          if (otherSign) otherSign.innerHTML = '&plus;';
        });

        // Toggle the current panel
        if (!isActive) {
          item.classList.add('active');
          btn.setAttribute('aria-expanded', 'true');
          if (sign) sign.innerHTML = '&minus;';
        }
      });
    }
  });

  // --------------------------------------------------------------------------
  // 6. Statistics Counter Animation
  // --------------------------------------------------------------------------
  const counters = document.querySelectorAll('.counter-number[data-target]');
  let countersAnimated = false;

  const triggerCounters = () => {
    if (countersAnimated) return;
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'), 10);
      const duration = 1600;
      const step = 25;
      const steps = duration / step;
      const inc = target / steps;
      let val = 0;

      const interval = setInterval(() => {
        val += inc;
        if (val >= target) {
          counter.textContent = target;
          clearInterval(interval);
        } else {
          counter.textContent = Math.floor(val);
        }
      }, step);
    });
    countersAnimated = true;
  };

  const counterStrip = document.querySelector('.counter-strip');
  if (counterStrip && 'IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        triggerCounters();
        counterObserver.disconnect();
      }
    }, { threshold: 0.25 });
    counterObserver.observe(counterStrip);
  }

  // --------------------------------------------------------------------------
  // 7. Consultation Form Validation & Instant Dispatch
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
        nameInput.closest('.form-field-group').classList.add('has-error');
        isValid = false;
      } else {
        nameInput.closest('.form-field-group').classList.remove('has-error');
      }

      // Validate Email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
        emailInput.closest('.form-field-group').classList.add('has-error');
        isValid = false;
      } else {
        emailInput.closest('.form-field-group').classList.remove('has-error');
      }

      // Validate Phone
      if (!phoneInput.value.trim() || phoneInput.value.trim().length < 7) {
        phoneInput.closest('.form-field-group').classList.add('has-error');
        isValid = false;
      } else {
        phoneInput.closest('.form-field-group').classList.remove('has-error');
      }

      // Validate Message
      if (!msgInput.value.trim()) {
        msgInput.closest('.form-field-group').classList.add('has-error');
        isValid = false;
      } else {
        msgInput.closest('.form-field-group').classList.remove('has-error');
      }

      if (!isValid) {
        formStatus.className = 'form-feedback-alert is-error';
        formStatus.innerHTML = '<strong>Please fill in all required fields marked with an asterisk (*).</strong>';
        formStatus.style.display = 'block';
        return;
      }

      // Processing state
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Processing Consultation Request...</span>';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span>SUBMIT CONSULTATION REQUEST</span><span class="btn-icon">&rarr;</span>';

        const mailtoSubject = encodeURIComponent(`Consultation Request: ${serviceSelect.value} - ${nameInput.value.trim()}`);
        const mailtoBody = encodeURIComponent(
          `Hello Immaculate Consultancy,\n\n` +
          `Client Name: ${nameInput.value.trim()}\n` +
          `Email: ${emailInput.value.trim()}\n` +
          `Phone: ${phoneInput.value.trim()}\n` +
          `Organization/Role: ${orgInput.value.trim() || 'N/A'}\n` +
          `Practice Area: ${serviceSelect.value}\n\n` +
          `Inquiry Summary:\n${msgInput.value.trim()}\n\n` +
          `Sent via Immaculate Consultancy Consultation Portal`
        );

        const waText = encodeURIComponent(
          `Hello Immaculate Consultancy, my name is ${nameInput.value.trim()}. ` +
          `I would like to request a consultation regarding ${serviceSelect.value}. ` +
          `Details: ${msgInput.value.trim()}`
        );

        formStatus.className = 'form-feedback-alert is-success';
        formStatus.innerHTML = `
          <strong>Thank you, ${nameInput.value.trim()}!</strong> Your consultation inquiry has been recorded.<br>
          Our senior advisory desk will follow up within 2 to 4 business hours.<br><br>
          <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-top: 6px;">
            <a href="mailto:abbeyance20@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}" class="btn btn-gold btn-sm" style="display:inline-flex;">Send Direct Email &rarr;</a>
            <a href="https://wa.me/2347088109367?text=${waText}" target="_blank" rel="noopener noreferrer" class="btn btn-outline-white btn-sm" style="display:inline-flex; border-color: rgba(255,255,255,0.4);">Chat on WhatsApp &rarr;</a>
          </div>
        `;
        formStatus.style.display = 'block';

        consultForm.reset();
      }, 600);

    });
  }

});
