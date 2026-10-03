(function () {
  const artFrame = document.getElementById('artFrame');
  const artCanvas = document.getElementById('artCanvas');
  const lens = document.getElementById('lens');
  const stripItems = document.querySelectorAll('.strip-item');
  const sizeOptions = document.querySelectorAll('#sizeOptions .swatch');
  const frameOptions = document.querySelectorAll('#frameOptions .material');
  const qtyValue = document.getElementById('qtyValue');
  const qtyMinus = document.getElementById('qtyMinus');
  const qtyPlus = document.getElementById('qtyPlus');
  const totalPrice = document.getElementById('totalPrice');
  const addToCart = document.getElementById('addToCart');
  const buyNow = document.getElementById('buyNow');
  const cartCount = document.getElementById('cartCount');
  const stickyBar = document.getElementById('stickyBar');
  const stickyAdd = document.getElementById('stickyAdd');
  const stickyPrice = document.getElementById('stickyPrice');
  const stickyTitle = document.getElementById('stickyTitle');

  let state = { sizeLabel: 'A2', size: 185, frame: 0, qty: 1 };
  let cart = 0;

  lens.style.backgroundImage = artCanvas.style.backgroundImage;

  function updateTotal() {
    const total = (state.size + state.frame) * state.qty;
    totalPrice.textContent = '$' + total;
    stickyPrice.textContent = '$' + total;
    stickyTitle.textContent = 'Wandering Light — ' + state.sizeLabel;
  }

  const finePointer = window.matchMedia('(pointer: fine)').matches;

  if (finePointer) {
    artFrame.addEventListener('mouseenter', () => artFrame.classList.add('hovering'));
    artFrame.addEventListener('mouseleave', () => artFrame.classList.remove('hovering'));
    artFrame.addEventListener('mousemove', (e) => {
      const rect = artFrame.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      lens.style.left = (e.clientX - rect.left) + 'px';
      lens.style.top = (e.clientY - rect.top) + 'px';
      lens.style.backgroundPosition = x + '% ' + y + '%';
    });
  }

  stripItems.forEach((btn) => {
    btn.addEventListener('click', () => {
      stripItems.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  sizeOptions.forEach((btn) => {
    btn.addEventListener('click', () => {
      sizeOptions.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      state.size = Number(btn.dataset.price);
      state.sizeLabel = btn.dataset.size;
      updateTotal();
    });
  });

  frameOptions.forEach((btn) => {
    btn.addEventListener('click', () => {
      frameOptions.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      state.frame = Number(btn.dataset.add);
      updateTotal();
    });
  });

  qtyMinus.addEventListener('click', () => {
    state.qty = Math.max(1, state.qty - 1);
    qtyValue.textContent = state.qty;
    updateTotal();
  });

  qtyPlus.addEventListener('click', () => {
    state.qty += 1;
    qtyValue.textContent = state.qty;
    updateTotal();
  });

  function doAddToCart() {
    cart += state.qty;
    cartCount.textContent = cart;
    const label = addToCart.querySelector('span');
    label.textContent = 'Added ✓';
    setTimeout(updateTotal, 1200);
  }

  addToCart.addEventListener('click', doAddToCart);
  stickyAdd.addEventListener('click', doAddToCart);

  buyNow.addEventListener('click', () => {
    alert('Checkout is not connected yet — this is a demo storefront.');
  });

  if (window.IntersectionObserver) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          stickyBar.classList.add('visible');
        } else {
          stickyBar.classList.remove('visible');
        }
      });
    }, { threshold: 0 });
    const priceRow = document.querySelector('.buy-row');
    if (priceRow) io.observe(priceRow);
  }

  updateTotal();
})();
