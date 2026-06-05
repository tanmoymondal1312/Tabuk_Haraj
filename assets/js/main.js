/* ============================================================
   حراج تبوك | main.js
   ============================================================ */
(function () {
  'use strict';

  /* ── Mobile Menu ── */
  var toggle  = document.getElementById('mobile-toggle');
  var drawer  = document.getElementById('mobile-drawer');
  var overlay = document.getElementById('drawer-overlay');

  function openDrawer() {
    drawer.classList.add('open');
    overlay && overlay.classList.add('open');
    toggle.classList.add('active');
    toggle.setAttribute('aria-expanded', 'true');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function closeDrawer() {
    drawer.classList.remove('open');
    overlay && overlay.classList.remove('open');
    toggle && toggle.classList.remove('active');
    toggle && toggle.setAttribute('aria-expanded', 'false');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (toggle && drawer) {
    toggle.addEventListener('click', function () {
      drawer.classList.contains('open') ? closeDrawer() : openDrawer();
    });
    overlay && overlay.addEventListener('click', closeDrawer);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && drawer.classList.contains('open')) closeDrawer();
    });
  }

  /* ── Sticky Header Shadow ── */
  var masthead = document.getElementById('masthead');
  if (masthead) {
    var onScroll = function () {
      if (window.scrollY > 10) masthead.classList.add('scrolled');
      else masthead.classList.remove('scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── Scroll-to-Top Button ── */
  var scrollBtn = document.getElementById('scroll-top');
  if (scrollBtn) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 420) scrollBtn.classList.add('visible');
      else scrollBtn.classList.remove('visible');
    }, { passive: true });
    scrollBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ── Active Nav Highlight ── */
  var path = window.location.pathname;
  document.querySelectorAll('.primary-nav a, #mobile-drawer a').forEach(function (a) {
    var href = a.getAttribute('href') || '';
    if (href && href !== '/' && href !== '../' && href !== '../../' && path.indexOf(href.replace(/^\.\.\//, '/')) !== -1) {
      a.classList.add('active');
    }
  });

  /* ── Video Fallback ── */
  var vid  = document.querySelector('.video-wrap video');
  var vph  = document.querySelector('.video-placeholder');
  if (vid && vph) {
    function showPlaceholder() {
      vid.style.display = 'none';
      vph.style.display = 'block';
    }
    vid.addEventListener('error', showPlaceholder);
    /* If src resolves back to the page URL, video isn't set */
    setTimeout(function () {
      if (!vid.src || vid.src === window.location.href || vid.networkState === 3) {
        showPlaceholder();
      }
    }, 500);
  }

})();
