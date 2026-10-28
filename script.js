/**
 * LAWSIGHT — OFFICIAL THEME SCRIPT
 * Reference: https://demo.casethemes.net/lawsight/
 *
 * Core Modules:
 * 1. Mobile Drawer Navigation Toggle & Backdrop
 * 2. Sticky Header Scroll Elevation
 * 3. ScrollSpy for Navigation Items
 * 4. Fun Fact Animated Number Counters (Intersection Observer)
 * 5. Portfolio Category Filtering (All, Business, Criminal, Civil, Personal, Financial)
 * 6. Testimonial Slider / Dots Carousel with Auto-Rotate
 * 7. Consultation Contact Form Validation & Instant Direct Dispatch (WhatsApp & Email)
 * 8. Smooth Scrolling with Fixed Header Offset
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================================================
  // 1. MOBILE DRAWER NAVIGATION
  // ==========================================================================
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileOverlay = document.getElementById('mobileOverlay');
  const drawerClose = document.getElementById('drawerClose');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  const openDrawer = () => {
    if (mobileDrawer) {
      mobileDrawer.classList.add('is-open');
      mobileDrawer.setAttribute('aria-hidden', 'false');
    }
    if (mobileOverlay) mobileOverlay.classList.add('is-active');
    if (mobileToggle) mobileToggle.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    if (mobileDrawer) {
      mobileDrawer.classList.remove('is-open');
      mobileDrawer.setAttribute('aria-hidden', 'true');
    }
    if (mobileOverlay) mobileOverlay.classList.remove('is-active');
    if (mobileToggle) mobileToggle.classList.remove('is-active');
    document.body.style.overflow = '';
  };

  if (mobileToggle) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      mobileDrawer && mobileDrawer.classList.contains('is-open') ? closeDrawer() : openDrawer();
    });
  }

  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  if (mobileOverlay) mobileOverlay.addEventListener('click', closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer && mobileDrawer.classList.contains('is-open')) {
      closeDrawer();
    }
  });


  // ==========================================================================
  // 2. STICKY HEADER SCROLL ELEVATION
  // ==========================================================================
  const siteHeader = document.getElementById('siteHeader');
  const handleHeaderScroll = () => {
    if (!siteHeader) return;
    if (window.scrollY > 30) {
      siteHeader.classList.add('is-scrolled');
    } else {
      siteHeader.classList.remove('is-scrolled');
    }
  };
  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll();


  // ==========================================================================
  // 3. SCROLLSPY NAVIGATION
  // ==========================================================================
  const navItems = document.querySelectorAll('.nav-item');
  const sections = document.querySelectorAll('section[id], header[id]');

  const handleScrollSpy = () => {
    const scrollPos = window.scrollY + 140;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollPos >= top && scrollPos < top + height) {
        navItems.forEach(item => {
          item.classList.remove('active');
          if (item.getAttribute('href') === `#${id}`) {
            item.classList.add('active');
          }
        });
      }
    });
  };
  window.addEventListener('scroll', handleScrollSpy, { passive: true });


  // ==========================================================================
  // 3B. HERO SLIDER CAROUSEL (Exact 3-Slide Revolution Slider Architecture)
  // ==========================================================================
  const heroSlides = document.querySelectorAll('.hero-slider-section .hero-slide');
  const heroDots = document.querySelectorAll('.hero-slider-dots .hero-slider-dot');
  const heroPrev = document.getElementById('heroPrev');
  const heroNext = document.getElementById('heroNext');
  const heroSection = document.getElementById('home');
  let currentHeroIndex = 0;
  let heroTimer = null;

  const goToHeroSlide = (idx) => {
    if (heroSlides.length === 0) return;
    currentHeroIndex = (idx + heroSlides.length) % heroSlides.length;

    heroSlides.forEach((slide, i) => {
      slide.classList.toggle('active', i === currentHeroIndex);
    });

    heroDots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentHeroIndex);
    });
  };

  const nextHeroSlide = () => goToHeroSlide(currentHeroIndex + 1);
  const prevHeroSlide = () => goToHeroSlide(currentHeroIndex - 1);

  const startHeroAutoplay = () => {
    stopHeroAutoplay();
    heroTimer = setInterval(nextHeroSlide, 6000);
  };

  const stopHeroAutoplay = () => {
    if (heroTimer) {
      clearInterval(heroTimer);
      heroTimer = null;
    }
  };

  const resetHeroAutoplay = () => {
    startHeroAutoplay();
  };

  if (heroNext) {
    heroNext.addEventListener('click', () => {
      nextHeroSlide();
      resetHeroAutoplay();
    });
  }

  if (heroPrev) {
    heroPrev.addEventListener('click', () => {
      prevHeroSlide();
      resetHeroAutoplay();
    });
  }

  heroDots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const targetSlide = parseInt(dot.getAttribute('data-slide'), 10) || 0;
      goToHeroSlide(targetSlide);
      resetHeroAutoplay();
    });
  });

  if (heroSection) {
    heroSection.addEventListener('mouseenter', stopHeroAutoplay);
    heroSection.addEventListener('mouseleave', startHeroAutoplay);

    // Touch Swipe Support
    let touchStartX = 0;
    let touchEndX = 0;

    heroSection.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    heroSection.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const diffX = touchEndX - touchStartX;
      if (Math.abs(diffX) > 45) {
        if (diffX < 0) {
          nextHeroSlide();
        } else {
          prevHeroSlide();
        }
        resetHeroAutoplay();
      }
    }, { passive: true });
  }

  // Kick off hero auto-rotation
  startHeroAutoplay();


  // ==========================================================================
  // 4. FUN FACT ANIMATED NUMBER COUNTERS
  // ==========================================================================
  const counterElements = document.querySelectorAll('.counter-val[data-target]');
  let countersDone = false;

  const startCounters = () => {
    if (countersDone) return;
    counterElements.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'), 10) || 0;
      const duration = 1600;
      const stepTime = 25;
      const steps = duration / stepTime;
      const increment = target / steps;
      let currentVal = 0;

      const timer = setInterval(() => {
        currentVal += increment;
        if (currentVal >= target) {
          counter.textContent = target;
          clearInterval(timer);
        } else {
          counter.textContent = Math.floor(currentVal);
        }
      }, stepTime);
    });
    countersDone = true;
  };

  const funfactSection = document.querySelector('.funfact-section');
  if (funfactSection && 'IntersectionObserver' in window) {
    const funObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        startCounters();
        funObserver.disconnect();
      }
    }, { threshold: 0.2 });
    funObserver.observe(funfactSection);
  } else {
    startCounters();
  }


  // ==========================================================================
  // 5. PORTFOLIO CATEGORY FILTERING
  // ==========================================================================
  const filterBtns = document.querySelectorAll('.portfolio-filter-bar .filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-grid .portfolio-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter') || 'all';

      portfolioItems.forEach(item => {
        if (filterVal === 'all' || item.classList.contains(filterVal)) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 10);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.95)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 250);
        }
      });
    });
  });


  // ==========================================================================
  // 6. TESTIMONIAL SLIDER & DOTS NAVIGATION
  // ==========================================================================
  const testiDots = document.querySelectorAll('.testi-dots .t-dot');
  const testiCards = document.querySelectorAll('.testi-card');
  const testiBox = document.querySelector('.testimonials-slider-box');
  let currentTestiIndex = 0;
  let testiTimer = null;

  const showTestimonial = (targetId) => {
    testiCards.forEach(card => {
      if (card.id === targetId) {
        card.classList.add('active');
      } else {
        card.classList.remove('active');
      }
    });

    testiDots.forEach(dot => {
      if (dot.getAttribute('data-target') === targetId) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  };

  testiDots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      currentTestiIndex = idx;
      const targetId = dot.getAttribute('data-target');
      showTestimonial(targetId);
    });
  });

  const nextTestimonial = () => {
    if (testiCards.length === 0) return;
    currentTestiIndex = (currentTestiIndex + 1) % testiCards.length;
    const targetId = testiCards[currentTestiIndex].id;
    showTestimonial(targetId);
  };

  const startTestiTimer = () => {
    if (testiTimer) clearInterval(testiTimer);
    testiTimer = setInterval(nextTestimonial, 5500);
  };

  const stopTestiTimer = () => {
    if (testiTimer) clearInterval(testiTimer);
  };

  if (testiBox) {
    testiBox.addEventListener('mouseenter', stopTestiTimer);
    testiBox.addEventListener('mouseleave', startTestiTimer);
    startTestiTimer();
  }


  // ==========================================================================
  // 7. CONSULTATION CONTACT FORM VALIDATION & DISPATCH
  // ==========================================================================
  const contactForm = document.getElementById('contactForm');
  const formAlert = document.getElementById('formAlert');
  const formSubmitBtn = document.getElementById('formSubmitBtn');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameVal = document.getElementById('formName')?.value.trim() || '';
      const emailVal = document.getElementById('formEmail')?.value.trim() || '';
      const phoneVal = document.getElementById('formPhone')?.value.trim() || '';
      const serviceVal = document.getElementById('formService')?.value || 'Legal Consultation';
      const msgVal = document.getElementById('formMessage')?.value.trim() || '';

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      // Validation
      if (!nameVal || nameVal.length < 2) {
        showFormAlert('Please enter your full name.', 'is-error');
        document.getElementById('formName')?.focus();
        return;
      }

      if (!emailVal || !emailRegex.test(emailVal)) {
        showFormAlert('Please enter a valid email address.', 'is-error');
        document.getElementById('formEmail')?.focus();
        return;
      }

      if (!phoneVal || phoneVal.length < 7) {
        showFormAlert('Please enter a valid phone number.', 'is-error');
        document.getElementById('formPhone')?.focus();
        return;
      }

      if (!msgVal || msgVal.length < 5) {
        showFormAlert('Please enter details about your case or legal inquiry.', 'is-error');
        document.getElementById('formMessage')?.focus();
        return;
      }

      // Submission state
      if (formSubmitBtn) {
        formSubmitBtn.disabled = true;
        formSubmitBtn.innerHTML = '<span>TRANSMITTING INQUIRY...</span>';
      }

      setTimeout(() => {
        if (formSubmitBtn) {
          formSubmitBtn.disabled = false;
          formSubmitBtn.innerHTML = '<span>SUBMIT NOW</span>';
        }

        const mailSubject = encodeURIComponent(`Consultation Inquiry: ${serviceVal} - ${nameVal}`);
        const mailBody = encodeURIComponent(
          `Dear Immaculate Consultancy Advisory Team,\n\n` +
          `Client Name: ${nameVal}\n` +
          `Email: ${emailVal}\n` +
          `Phone: ${phoneVal}\n` +
          `Requested Service: ${serviceVal}\n\n` +
          `Case / Inquiry Details:\n${msgVal}\n\n` +
          `Direct Lines: 0708 810 9367 / 0810 694 3942\n` +
          `Sent via Immaculate Consultancy Online Portal`
        );

        const waText = encodeURIComponent(
          `Hello Immaculate Consultancy, my name is ${nameVal}. I would like to request consultation regarding *${serviceVal}*.\n\nPhone: ${phoneVal}\nEmail: ${emailVal}\nDetails: ${msgVal}`
        );

        const successHtml = `
          <strong>Consultation Request Received!</strong> Thank you, ${nameVal}. Your brief regarding <em>${serviceVal}</em> has been registered with our senior advisory desk.<br>
          <div style="margin-top: 10px;">
            <a href="https://wa.me/2347088109367?text=${waText}" target="_blank" rel="noopener noreferrer" class="alert-action-btn">
              Chat on WhatsApp &rarr;
            </a>
            <a href="mailto:abbeyance20@gmail.com?subject=${mailSubject}&body=${mailBody}" class="alert-action-btn secondary">
              Send Direct Email &rarr;
            </a>
          </div>
        `;

        showFormAlert(successHtml, 'is-success', true);
        contactForm.reset();
      }, 700);

    });
  }

  // Preselect Service in Consultation Form
  window.preselectService = (serviceName) => {
    const serviceSelect = document.getElementById('formService');
    if (serviceSelect) {
      for (let i = 0; i < serviceSelect.options.length; i++) {
        if (serviceSelect.options[i].value === serviceName) {
          serviceSelect.selectedIndex = i;
          serviceSelect.style.borderColor = 'var(--primary-gold)';
          setTimeout(() => {
            serviceSelect.style.borderColor = '';
          }, 2000);
          break;
        }
      }
    }
  };

  function showFormAlert(message, typeClass, isHtml = false) {
    if (!formAlert) return;
    formAlert.className = `form-alert-msg ${typeClass}`;
    if (isHtml) {
      formAlert.innerHTML = message;
    } else {
      formAlert.textContent = message;
    }
    formAlert.style.display = 'block';
  }


  // ==========================================================================
  // 8. SMOOTH SCROLL FOR IN-PAGE ANCHOR LINKS
  // ==========================================================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerHeight = siteHeader ? siteHeader.offsetHeight : 80;
        const targetPos = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        window.scrollTo({
          top: targetPos,
          behavior: 'smooth'
        });
      }
    });
  });

});
