(function () {
  const mainImage = document.getElementById('mainImage');
  const thumbs = document.querySelectorAll('.thumb');
  const sizeOptions = document.querySelectorAll('#sizeOptions .pill');
  const frameOptions = document.querySelectorAll('#frameOptions .pill');
  const qtyValue = document.getElementById('qtyValue');
  const qtyMinus = document.getElementById('qtyMinus');
  const qtyPlus = document.getElementById('qtyPlus');
  const totalPrice = document.getElementById('totalPrice');
  const addToCart = document.getElementById('addToCart');
  const buyNow = document.getElementById('buyNow');
  const cartCount = document.getElementById('cartCount');

  let state = { size: 185, frame: 0, qty: 1 };
  let cart = 0;

  function updateTotal() {
    const total = (state.size + state.frame) * state.qty;
    totalPrice.textContent = '$' + total;
  }

  thumbs.forEach((btn) => {
    btn.addEventListener('click', () => {
      thumbs.forEach((t) => t.classList.remove('active'));
      btn.classList.add('active');
      mainImage.src = btn.dataset.img;
    });
  });

  sizeOptions.forEach((btn) => {
    btn.addEventListener('click', () => {
      sizeOptions.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      state.size = Number(btn.dataset.price);
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

  addToCart.addEventListener('click', () => {
    cart += state.qty;
    cartCount.textContent = cart;
    addToCart.querySelector('span').textContent = 'Added ✓';
    setTimeout(updateTotal, 1200);
  });

  buyNow.addEventListener('click', () => {
    alert('Checkout is not connected yet — this is a demo storefront.');
  });

  updateTotal();
})();
