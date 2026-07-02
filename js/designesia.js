/*!
 * designesia.js - custom init / interactions for the Gardyn / GreenUp template.
 * Re-implements the original Designesia behaviour using modern vanilla JS + jQuery.
 *
 * Responsibilities:
 *   1. Hide the #de-loader preloader as soon as the page is ready.
 *   2. Initialise WOW.js so .wow elements become visible.
 *   3. Add / remove the `.smaller` class on <header> based on scroll position
 *      so the navbar gets a solid background once the user scrolls past the hero.
 *   4. Mobile menu toggle (#menu-btn -> #mainmenu and #mainmenu-container).
 *   5. Side-overlay (#btn-extra -> #extra-wrap, #btn-close).
 *   6. Back-to-top button (#back-to-top).
 *   7. Initialise Owl Carousel sliders.
 *   8. Initialise Magnific Popup lightboxes (.image-popup, .magnific).
 *   9. Initialise Jarallax parallax (.jarallax).
 *  10. data-bgimage support: <div data-bgimage="url(...) center"> -> inline background.
 *  11. Bootstrap dropdown hover (optional nicety on desktop).
 *  12. Active nav link highlighting based on current page.
 *  13. Contact form: prevent default submission, show success message (no PHP needed).
 */

(function ($) {
  "use strict";

  /* ------------------------------------------------------------------ */
  /* 0. Helpers                                                          */
  /* ------------------------------------------------------------------ */
  function debounce(fn, wait) {
    var t;
    return function () {
      var ctx = this, args = arguments;
      clearTimeout(t);
      t = setTimeout(function () { fn.apply(ctx, args); }, wait);
    };
  }

  /* ------------------------------------------------------------------ */
  /* 1. Preloader (#de-loader)                                           */
  /* ------------------------------------------------------------------ */
  function hidePreloader() {
    var loader = document.getElementById('de-loader');
    if (!loader) return;
    loader.style.transition = 'opacity .4s ease, visibility .4s ease';
    loader.style.opacity = '0';
    setTimeout(function () {
      loader.style.display = 'none';
    }, 450);
  }

  /* ------------------------------------------------------------------ */
  /* 2. WOW.js init                                                      */
  /* ------------------------------------------------------------------ */
  function initWow() {
    if (typeof WOW === 'undefined') {
      // WOW not loaded - force-show all .wow elements so they aren't hidden.
      document.querySelectorAll('.wow').forEach(function (el) {
        el.style.visibility = 'visible';
        el.style.opacity = '1';
        el.classList.add('animated');
      });
      return;
    }
    try {
      new WOW({
        boxClass: 'wow',
        animateClass: 'animated',
        offset: 90,
        mobile: true,
        live: true
      }).init();
    } catch (e) {
      console.warn('WOW init failed', e);
      document.querySelectorAll('.wow').forEach(function (el) {
        el.style.visibility = 'visible';
      });
    }
  }

  /* ------------------------------------------------------------------ */
  /* 3. Header scroll behaviour (.smaller)                               */
  /* ------------------------------------------------------------------ */
  function initHeaderScroll() {
    var header = document.querySelector('header');
    if (!header) return;

    function updateHeader() {
      var scrollY = window.scrollY || window.pageYOffset;
      var trigger = 60; // px from top

      if (scrollY > trigger) {
        header.classList.add('smaller');
      } else {
        header.classList.remove('smaller');
      }
    }

    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });
    window.addEventListener('resize', debounce(updateHeader, 100));
  }

  /* ------------------------------------------------------------------ */
  /* 4. Mobile menu toggle                                               */
  /* ------------------------------------------------------------------ */
  function initMobileMenu() {
    var menuBtn = document.getElementById('menu-btn');
    var header = document.querySelector('header');
    if (!menuBtn || !header) return;

    menuBtn.addEventListener('click', function (e) {
      e.preventDefault();
      header.classList.toggle('header-mobile');
      header.classList.toggle('open');
      document.body.classList.toggle('menu-open');
    });

    // Close on link click (mobile)
    document.querySelectorAll('#mainmenu a').forEach(function (a) {
      a.addEventListener('click', function () {
        if (window.innerWidth < 992) {
          header.classList.remove('header-mobile', 'open');
          document.body.classList.remove('menu-open');
        }
      });
    });
  }

  /* ------------------------------------------------------------------ */
  /* 5. Side overlay (#btn-extra -> #extra-wrap)                         */
  /* ------------------------------------------------------------------ */
  function initSideOverlay() {
    var btnExtra = document.getElementById('btn-extra');
    var extraWrap = document.getElementById('extra-wrap');
    var btnClose = document.getElementById('btn-close');
    if (!btnExtra || !extraWrap) return;

    btnExtra.addEventListener('click', function (e) {
      e.preventDefault();
      extraWrap.classList.add('open');
      document.body.classList.add('extra-open');
    });
    if (btnClose) {
      btnClose.addEventListener('click', function (e) {
        e.preventDefault();
        extraWrap.classList.remove('open');
        document.body.classList.remove('extra-open');
      });
    }
    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        extraWrap.classList.remove('open');
        document.body.classList.remove('extra-open');
      }
    });
  }

  /* ------------------------------------------------------------------ */
  /* 6. Back-to-top button                                               */
  /* ------------------------------------------------------------------ */
  function initBackToTop() {
    var btn = document.getElementById('back-to-top');
    if (!btn) return;

    function update() {
      if (window.scrollY > 400) {
        btn.classList.add('show');
      } else {
        btn.classList.remove('show');
      }
    }
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  /* ------------------------------------------------------------------ */
  /* 7. Owl Carousel sliders                                             */
  /* ------------------------------------------------------------------ */
  function initOwlCarousel() {
    if (typeof $ === 'undefined' || !$.fn.owlCarousel) return;

    // Default slider (multi-item)
    $('.owl-carousel.owl-default').each(function () {
      var $this = $(this);
      $this.owlCarousel({
        items: 1,
        loop: true,
        autoplay: true,
        autoplayTimeout: 6000,
        autoplayHoverPause: true,
        nav: false,
        dots: true,
        margin: 30
      });
    });

    // Single-item with dots
    $('.owl-single-dots').each(function () {
      $(this).owlCarousel({
        items: 1,
        loop: true,
        autoplay: true,
        autoplayTimeout: 7000,
        nav: false,
        dots: true,
        animateOut: 'fadeOut'
      });
    });

    // Generic - any .owl-carousel not yet initialised
    $('.owl-carousel:not(.owl-loaded)').each(function () {
      var $this = $(this);
      var items = $this.data('owl-items') || 1;
      var loop = $this.data('owl-loop') !== false;
      var nav = $this.data('owl-nav') === true;
      var dots = $this.data('owl-dots') !== false;
      var autoplay = $this.data('owl-autoplay') !== false;
      var margin = $this.data('owl-margin') || 30;
      $this.owlCarousel({
        items: items,
        loop: loop,
        nav: nav,
        dots: dots,
        autoplay: autoplay,
        autoplayTimeout: 6000,
        margin: margin,
        responsive: {
          0: { items: 1 },
          768: { items: items > 1 ? 2 : items },
          992: { items: items }
        }
      });
    });
  }

  /* ------------------------------------------------------------------ */
  /* 8. Magnific Popup                                                   */
  /* ------------------------------------------------------------------ */
  function initMagnific() {
    if (typeof $ === 'undefined' || !$.fn.magnificPopup) return;

    $('.image-popup').magnificPopup({
      type: 'image',
      gallery: { enabled: true, navigateByImgClick: true, preload: [0, 1] },
      titleSrc: 'title',
      removalDelay: 300,
      mainClass: 'mfp-fade'
    });

    $('.magnific').magnificPopup({
      type: 'image',
      gallery: { enabled: true }
    });
  }

  /* ------------------------------------------------------------------ */
  /* 9. Jarallax parallax                                                */
  /* ------------------------------------------------------------------ */
  function initJarallax() {
    if (typeof jarallax === 'undefined') {
      // Fallback: just use the jarallax-img as a cover background
      document.querySelectorAll('.jarallax').forEach(function (el) {
        var img = el.querySelector('.jarallax-img');
        if (img) {
          el.style.backgroundImage = 'url("' + img.src + '")';
          el.style.backgroundSize = 'cover';
          el.style.backgroundPosition = 'center';
          el.style.backgroundAttachment = 'fixed';
          img.style.opacity = '0';
        }
      });
      return;
    }
    try {
      jarallax(document.querySelectorAll('.jarallax'), { speed: 0.4 });
    } catch (e) {
      console.warn('jarallax init failed', e);
    }
  }

  /* ------------------------------------------------------------------ */
  /* 10. data-bgimage support                                            */
  /* ------------------------------------------------------------------ */
  function initDataBgimage() {
    document.querySelectorAll('[data-bgimage]').forEach(function (el) {
      var bg = el.getAttribute('data-bgimage');
      if (bg) {
        el.style.backgroundImage = bg;
        el.style.backgroundSize = el.style.backgroundSize || 'cover';
        el.style.backgroundPosition = el.style.backgroundPosition || 'center center';
        el.style.backgroundRepeat = 'no-repeat';
      }
    });
  }

  /* ------------------------------------------------------------------ */
  /* 11. Bootstrap dropdown hover (desktop nicety)                       */
  /* ------------------------------------------------------------------ */
  function initDropdownHover() {
    if (window.innerWidth < 992) return;
    document.querySelectorAll('#mainmenu li').forEach(function (li) {
      var submenu = li.querySelector('ul');
      if (!submenu) return;
      var timeout;
      li.addEventListener('mouseenter', function () {
        clearTimeout(timeout);
        submenu.style.display = 'block';
        submenu.style.opacity = '1';
        submenu.style.visibility = 'visible';
      });
      li.addEventListener('mouseleave', function () {
        timeout = setTimeout(function () {
          submenu.style.opacity = '0';
          submenu.style.visibility = 'hidden';
          setTimeout(function () {
            if (submenu.style.visibility === 'hidden') submenu.style.display = 'none';
          }, 200);
        }, 100);
      });
    });
  }

  /* ------------------------------------------------------------------ */
  /* 12. Active nav highlight                                            */
  /* ------------------------------------------------------------------ */
  function initActiveNav() {
    var path = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('#mainmenu a.menu-item').forEach(function (a) {
      var href = a.getAttribute('href');
      if (href === path) {
        a.classList.add('active');
      }
    });
  }

  /* ------------------------------------------------------------------ */
  /* 13. Contact form (no-PHP fallback)                                  */
  /* ------------------------------------------------------------------ */
  function initContactForm() {
    var form = document.getElementById('contact_form');
    if (!form) return;

    var successMsg = document.getElementById('success_message');
    var errorMsg = document.getElementById('error_message');
    var submitBtn = form.querySelector('#send_message');

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Basic validation
      var name = form.querySelector('#name').value.trim();
      var email = form.querySelector('#email').value.trim();
      var phone = form.querySelector('#phone').value.trim();
      var message = form.querySelector('#message').value.trim();

      if (!name || !email || !phone || !message) {
        if (errorMsg) errorMsg.style.display = 'block';
        if (successMsg) successMsg.style.display = 'none';
        return;
      }

      // Email format check
      var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRe.test(email)) {
        if (errorMsg) {
          errorMsg.style.display = 'block';
          errorMsg.textContent = 'Please enter a valid email address.';
        }
        return;
      }

      // Submit visual state
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.value = 'Sending...';
      }

      // Try PHP backend first; on failure, fallback to mailto.
      var action = form.getAttribute('action') || 'contact.php';
      var formData = new FormData(form);

      fetch(action, {
        method: 'POST',
        body: formData
      })
      .then(function (r) {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.text();
      })
      .then(function () {
        if (successMsg) {
          successMsg.style.display = 'block';
          successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        if (errorMsg) errorMsg.style.display = 'none';
        form.reset();
      })
      .catch(function () {
        // Fallback: open user's mail client with prefilled message.
        var subject = encodeURIComponent('Upit sa sajta - ' + name);
        var body = encodeURIComponent(
          'Ime: ' + name + '\n' +
          'Email: ' + email + '\n' +
          'Telefon: ' + phone + '\n\n' +
          'Poruka:\n' + message
        );
        window.location.href = 'mailto:kontakt@greenup.ba?subject=' + subject + '&body=' + body;
        if (successMsg) {
          successMsg.style.display = 'block';
          successMsg.textContent = 'Hvala! Vaš email klijent je otvoren sa vašom porukom.';
        }
      })
      .finally(function () {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.value = 'Send Message';
        }
      });
    });
  }

  /* ------------------------------------------------------------------ */
  /* 14. Active WOW fallback - make sure .wow becomes visible            */
  /*     even if WOW.js fails to load.                                  */
  /* ------------------------------------------------------------------ */
  function wowSafetyNet() {
    // After 3 seconds, force-show any still-hidden .wow elements.
    setTimeout(function () {
      document.querySelectorAll('.wow').forEach(function (el) {
        var cs = window.getComputedStyle(el);
        if (cs.visibility === 'hidden' || cs.opacity === '0') {
          el.style.visibility = 'visible';
          el.style.opacity = '1';
        }
      });
    }, 3000);
  }

  /* ------------------------------------------------------------------ */
  /* Init everything on DOM ready                                        */
  /* ------------------------------------------------------------------ */
  function initAll() {
    initWow();
    initHeaderScroll();
    initMobileMenu();
    initSideOverlay();
    initBackToTop();
    initOwlCarousel();
    initMagnific();
    initJarallax();
    initDataBgimage();
    initDropdownHover();
    initActiveNav();
    initContactForm();
    wowSafetyNet();
  }

  // DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }

  // Hide preloader on full window load (after images, etc.)
  window.addEventListener('load', function () {
    setTimeout(hidePreloader, 200);
    // Fallback: force-hide preloader after 4s no matter what.
    setTimeout(hidePreloader, 4000);
  });

  // Immediate fallback - if 'load' never fires (rare), still hide after 6s.
  setTimeout(hidePreloader, 6000);

})(window.jQuery || function () { return { fn: {} }; });
