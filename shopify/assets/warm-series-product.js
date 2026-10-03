(function () {
  'use strict';

  function moneyFormat(cents, format) {
    // Minimal fallback formatter; Shopify.formatMoney (from money_format) is preferred when available.
    if (window.Shopify && typeof window.Shopify.formatMoney === 'function') {
      return window.Shopify.formatMoney(cents, format);
    }
    return '$' + (cents / 100).toFixed(2);
  }

  function initBandDots(root) {
    root.querySelectorAll('.band-track').forEach(function (track) {
      var dotsWrap = root.querySelector('.band-dots[data-for="' + track.id + '"]');
      if (!dotsWrap || dotsWrap.dataset.initialized) return;
      dotsWrap.dataset.initialized = 'true';
      var slides = track.querySelectorAll('.slide');
      slides.forEach(function (_, i) {
        var d = document.createElement('span');
        d.className = 'dot' + (i === 0 ? ' active' : '');
        dotsWrap.appendChild(d);
      });
      var dots = dotsWrap.querySelectorAll('.dot');
      track.addEventListener('scroll', function () {
        var idx = Math.round(track.scrollLeft / track.clientWidth);
        dots.forEach(function (d, i) { d.classList.toggle('active', i === idx); });
      }, { passive: true });
    });
  }

  function initCollectorCounter(root, sectionId) {
    var line = root.querySelector('#ratingLine-' + sectionId);
    if (!line) return;
    var el = root.querySelector('#collectorCount-' + sectionId);
    var target = parseInt(line.dataset.target, 10) || 0;
    if (!target) return;
    var done = false;

    function run() {
      if (done) return;
      done = true;
      line.classList.add('in');
      var duration = 1800, start = null;
      function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }
      function step(ts) {
        if (!start) start = ts;
        var t = Math.min(1, (ts - start) / duration);
        el.textContent = Math.round(easeOutCubic(t) * target).toLocaleString('en-US');
        if (t < 1) {
          requestAnimationFrame(step);
        } else {
          el.textContent = target.toLocaleString('en-US');
          el.classList.add('pop');
          setTimeout(function () { el.classList.remove('pop'); }, 450);
        }
      }
      requestAnimationFrame(step);
    }

    function checkVisible() {
      var r = line.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.92 && r.bottom > 0) run();
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.textContent = target.toLocaleString('en-US');
      line.classList.add('in');
    } else if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) { if (entry.isIntersecting) { run(); io.disconnect(); } });
      }, { threshold: 0.15 });
      io.observe(line);
      window.addEventListener('scroll', checkVisible, { passive: true });
      checkVisible();
    } else {
      run();
    }
  }

  function initVariantPicker(root, sectionId) {
    var jsonEl = root.querySelector('#variants-json-' + sectionId);
    if (!jsonEl) return;
    var variants;
    try { variants = JSON.parse(jsonEl.textContent); } catch (e) { return; }

    var form = root.querySelector('#product-form-' + sectionId);
    var variantInput = root.querySelector('#variant-id-' + sectionId);
    var amountEl = root.querySelector('#amount-' + sectionId);
    var compareEl = root.querySelector('#compare-' + sectionId);
    var saveEl = root.querySelector('#save-' + sectionId);
    var totalPriceEl = root.querySelector('#totalPrice-' + sectionId);
    var addBtn = root.querySelector('#addToCart-' + sectionId);
    var buyNowBtn = root.querySelector('#buyNow-' + sectionId);

    var selected = [];
    root.querySelectorAll('.variant-row').forEach(function (row) {
      var idx = parseInt(row.dataset.optionIndex, 10);
      var active = row.querySelector('.swatch.active');
      selected[idx] = active ? active.dataset.value : row.querySelector('.swatch').dataset.value;
    });

    function findVariant() {
      return variants.find(function (v) {
        return selected.every(function (val, i) { return v.options[i] === val; });
      });
    }

    function updateAvailability() {
      root.querySelectorAll('.variant-row').forEach(function (row) {
        var idx = parseInt(row.dataset.optionIndex, 10);
        row.querySelectorAll('.swatch').forEach(function (btn) {
          var trial = selected.slice();
          trial[idx] = btn.dataset.value;
          var match = variants.find(function (v) {
            return trial.every(function (val, i) { return v.options[i] === val; });
          });
          btn.classList.toggle('unavailable', !!match && !match.available);
        });
      });
    }

    function render() {
      var variant = findVariant();
      if (!variant) return;
      variantInput.value = variant.id;
      amountEl.textContent = moneyFormat(variant.price);
      totalPriceEl.textContent = moneyFormat(variant.price);
      if (variant.compare_at_price && variant.compare_at_price > variant.price) {
        compareEl.textContent = moneyFormat(variant.compare_at_price);
        var pct = Math.round(((variant.compare_at_price - variant.price) / variant.compare_at_price) * 100);
        saveEl.textContent = pct + '% below list';
        if (compareEl.closest('.sub')) compareEl.closest('.sub').hidden = false;
      } else if (compareEl.closest('.sub')) {
        compareEl.closest('.sub').hidden = true;
      }
      if (variant.available) {
        addBtn.disabled = false;
        addBtn.firstChild.textContent = 'Add — ';
      } else {
        addBtn.disabled = true;
        addBtn.firstChild.textContent = 'Sold Out — ';
      }
      updateAvailability();
    }

    root.querySelectorAll('.variant-row').forEach(function (row) {
      var idx = parseInt(row.dataset.optionIndex, 10);
      row.querySelectorAll('.swatch').forEach(function (btn) {
        btn.addEventListener('click', function () {
          if (btn.classList.contains('unavailable')) return;
          row.querySelectorAll('.swatch').forEach(function (b) { b.classList.remove('active'); });
          btn.classList.add('active');
          selected[idx] = btn.dataset.value;
          render();
        });
      });
    });

    render();

    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var formData = new FormData(form);
        fetch('/cart/add.js', {
          method: 'POST',
          headers: { 'Accept': 'application/json' },
          body: formData
        }).then(function (res) {
          if (!res.ok) throw new Error('Add to cart failed');
          return res.json();
        }).then(function () {
          var label = addBtn.firstChild;
          var original = label.textContent;
          label.textContent = 'Added ✓ ';
          document.dispatchEvent(new CustomEvent('cart:updated'));
          setTimeout(function () { label.textContent = original; }, 1200);
        }).catch(function () {
          addBtn.firstChild.textContent = 'Error — try again — ';
          setTimeout(render, 1500);
        });
      });
    }

    if (buyNowBtn) {
      buyNowBtn.addEventListener('click', function () {
        var variant = findVariant();
        if (!variant) return;
        fetch('/cart/add.js', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({ id: variant.id, quantity: 1 })
        }).then(function (res) {
          if (!res.ok) throw new Error('Add to cart failed');
          window.location.href = '/checkout';
        }).catch(function () {
          buyNowBtn.textContent = 'Error — try again';
        });
      });
    }
  }

  function initAll(root) {
    initBandDots(root);
    root.querySelectorAll('[id^="variants-json-"]').forEach(function (el) {
      var sectionId = el.id.replace('variants-json-', '');
      initVariantPicker(root, sectionId);
      initCollectorCounter(root, sectionId);
    });
  }

  document.querySelectorAll('.ws-root').forEach(initAll);

  // Re-init when the theme editor re-renders this section
  if (window.Shopify && window.Shopify.designMode) {
    document.addEventListener('shopify:section:load', function (e) {
      var root = e.target.querySelector('.ws-root');
      if (root) initAll(root);
    });
  }
})();
