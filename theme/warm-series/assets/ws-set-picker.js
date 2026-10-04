(function () {
  'use strict';

  function formatMoney(cents, format) {
    format = format || '${{amount}}';
    function delimit(number, decimals, thousands, decimal) {
      var parts = (number / 100).toFixed(decimals).split('.');
      var whole = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousands);
      return parts[1] ? whole + decimal + parts[1] : whole;
    }
    return format.replace(/\{\{\s*(\w+)\s*\}\}/, function (_, key) {
      if (key === 'amount_no_decimals') return delimit(cents, 0, ',', '.');
      if (key === 'amount_with_comma_separator') return delimit(cents, 2, '.', ',');
      if (key === 'amount_no_decimals_with_comma_separator') return delimit(cents, 0, '.', ',');
      return delimit(cents, 2, ',', '.');
    });
  }

  function discountFor(tiers, count) {
    var eligible = Object.keys(tiers)
      .map(Number)
      .filter(function (min) { return count >= min && Number(tiers[min]) > 0; })
      .sort(function (a, b) { return b - a; });
    return eligible.length ? Number(tiers[eligible[0]]) : 0;
  }

  function initSetPicker(el) {
    if (el.dataset.initialized) return;
    el.dataset.initialized = 'true';

    var config = JSON.parse(el.querySelector('.ws-set-config').textContent);
    var sectionId = el.dataset.sectionId;
    var root = el.closest('.ws-root') || document;
    var pieceButtons = Array.prototype.slice.call(el.querySelectorAll('.ws-piece'));
    var totalEl = el.querySelector('.ws-set-total');
    var subEl = el.querySelector('.ws-set-sub');
    var compareEl = el.querySelector('.ws-set-compare');
    var saveEl = el.querySelector('.ws-set-save');
    var countEl = el.querySelector('.ws-set-count');
    var addBtn = el.querySelector('.ws-set-add');
    var addLabel = el.querySelector('.ws-set-add-label');
    var addPrice = el.querySelector('.ws-set-add-price');
    var buyBtn = el.querySelector('.ws-set-buy');
    var errorEl = el.querySelector('.ws-set-error');
    var meterFill = el.querySelector('.ws-meter-fill');
    var meterValue = el.querySelector('.ws-meter-value');
    var meterHint = el.querySelector('.ws-meter-hint');
    var meterSteps = Array.prototype.slice.call(el.querySelectorAll('.ws-meter-step'));

    function selectedOptions() {
      var values = [];
      el.querySelectorAll('.ws-set-option').forEach(function (row) {
        var active = row.querySelector('.swatch.active') || row.querySelector('.swatch');
        values[Number(row.dataset.optionIndex)] = active.dataset.value;
      });
      return values;
    }

    function selection() {
      var options = selectedOptions();
      return pieceButtons
        .filter(function (btn) { return btn.classList.contains('active'); })
        .map(function (btn) {
          var piece = config.pieces[Number(btn.dataset.pieceIndex)];
          var variant = piece.variants.find(function (v) {
            return options.every(function (value, i) { return v.options[i] === value; });
          });
          return { piece: piece, variant: variant };
        });
    }

    function setError(message) {
      errorEl.textContent = message || '';
      errorEl.hidden = !message;
    }

    function render() {
      var items = selection();
      var count = items.length;
      var unavailable = items.some(function (item) { return !item.variant || !item.variant.available; });
      var subtotal = items.reduce(function (sum, item) { return sum + (item.variant ? item.variant.price : 0); }, 0);
      var pct = discountFor(config.tiers, count);
      var total = subtotal - Math.round((subtotal * pct) / 100);

      totalEl.textContent = formatMoney(total, config.moneyFormat);
      addPrice.textContent = formatMoney(total, config.moneyFormat);
      subEl.hidden = pct === 0;
      compareEl.textContent = formatMoney(subtotal, config.moneyFormat);
      saveEl.textContent = 'Set discount −' + pct + '%';
      countEl.textContent = count === 1 ? '1 piece' : count + ' pieces';

      renderMeter(count, pct);

      var disabled = count === 0 || unavailable;
      addBtn.disabled = disabled;
      buyBtn.disabled = disabled;
      setError(unavailable ? 'This size is unavailable for one of the selected pieces.' : '');
    }

    // Savings meter: fills as pieces are added and says what the next piece unlocks.
    function renderMeter(count, pct) {
      if (!meterFill) return;
      var totalPieces = pieceButtons.length;
      meterFill.style.width = (totalPieces ? (count / totalPieces) * 100 : 0) + '%';
      meterSteps.forEach(function (step) {
        step.classList.toggle('reached', Number(step.dataset.step) <= count);
      });
      meterValue.textContent = pct > 0 ? pct + '% off unlocked' : 'No discount yet';

      var nextPct = 0;
      var nextCount = count;
      for (var n = count + 1; n <= totalPieces; n++) {
        var candidate = discountFor(config.tiers, n);
        if (candidate > pct) { nextPct = candidate; nextCount = n; break; }
      }
      if (nextPct > 0) {
        var more = nextCount - count;
        meterHint.textContent = 'Add ' + more + ' more piece' + (more === 1 ? '' : 's') + ' to save ' + nextPct + '%.';
      } else if (count === totalPieces && pct > 0) {
        meterHint.textContent = 'Full set selected — best price unlocked.';
      } else {
        meterHint.textContent = '';
      }
    }

    // Piece N shows Print N in the gallery, wherever the gallery was scrolled to.
    function showPiece(index) {
      var thumb = root.querySelector('#thumb-strip-' + sectionId + ' .thumb[data-print="' + index + '"]');
      var track = root.querySelector('#hero-track-' + sectionId);
      if (!track) return;
      var rect = track.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) {
        track.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      if (thumb) {
        thumb.click();
        return;
      }
      var slide = track.querySelector('.hero-slide[data-print="' + index + '"]');
      if (slide) track.scrollTo({ left: slide.offsetLeft, behavior: 'smooth' });
    }

    pieceButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var active = !btn.classList.contains('active');
        btn.classList.toggle('active', active);
        btn.setAttribute('aria-pressed', String(active));
        showPiece(btn.dataset.pieceIndex);
        render();
      });
    });

    el.querySelectorAll('.ws-set-option').forEach(function (row) {
      row.querySelectorAll('.swatch').forEach(function (btn) {
        btn.addEventListener('click', function () {
          row.querySelectorAll('.swatch').forEach(function (b) { b.classList.remove('active'); });
          btn.classList.add('active');
          render();
        });
      });
    });

    function addToCart() {
      var items = selection()
        .filter(function (item) { return item.variant; })
        .map(function (item) {
          return {
            id: item.variant.id,
            quantity: 1,
            properties: { Set: el.dataset.setTitle, Piece: item.piece.label, _set_id: el.dataset.setId }
          };
        });
      return fetch('/cart/add.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ items: items })
      }).then(function (res) {
        return res.json().then(function (data) {
          if (!res.ok) throw new Error(data.description || data.message || 'Could not add the set to your cart.');
          document.dispatchEvent(new CustomEvent('cart:updated'));
          return data;
        });
      });
    }

    addBtn.addEventListener('click', function () {
      addBtn.disabled = true;
      setError('');
      addToCart()
        .then(function () {
          addLabel.textContent = 'Added ✓ — ';
          setTimeout(function () { window.location.href = '/cart'; }, 500);
        })
        .catch(function (error) {
          setError(error.message);
          render();
        });
    });

    buyBtn.addEventListener('click', function () {
      buyBtn.disabled = true;
      setError('');
      addToCart()
        .then(function () { window.location.href = '/checkout'; })
        .catch(function (error) {
          setError(error.message);
          render();
        });
    });

    render();
  }

  function initAll(scope) {
    scope.querySelectorAll('.ws-set').forEach(initSetPicker);
  }

  initAll(document);

  if (window.Shopify && window.Shopify.designMode) {
    document.addEventListener('shopify:section:load', function (e) { initAll(e.target); });
  }
})();
