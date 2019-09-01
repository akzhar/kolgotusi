(function() {

  var popup;
  var msg = document.querySelector('#msg');
  var cartCounter = document.querySelector('#cart-counter');

  updateCartIconCount();

  function definePopup() {
    popup = window.popup;
  }

  function changePrice() {
    var price = + window.data[popup.orderBtn.dataset.id].price;
    popup.priceBlock.textContent = price * (+ popup.quantityBlock.value);
  }

  function minusOne() {
    if (+ popup.quantityBlock.value === 0) return;
    popup.quantityBlock.value = + popup.quantityBlock.value - 1;
    changePrice();
  }

  function plusOne() {
    popup.quantityBlock.value = + popup.quantityBlock.value + 1;
    changePrice();
  }

  function addOrderToStorage() {
    var id = popup.orderBtn.dataset.id;
    var size = popup.sizeBlock.value;
    var color = popup.colorBlock.value;
    var quantity = + popup.quantityBlock.value;
    var price = + popup.priceBlock.textContent;
    var key = id+'-'+size+'-'+color;

    if (localStorage.getItem('cartCounter') === null) {
      localStorage.setItem('cart', JSON.stringify({}));
      localStorage.setItem('cartCounter', 0);
    }

    var cart = JSON.parse(localStorage.getItem('cart'));
    var totalQuantity = + localStorage.getItem('cartCounter') + quantity;

    if (Object.prototype.hasOwnProperty.call(cart, key)) {
      quantity += cart[key].quantity;
      price += cart[key].price;
    }

    cart[key] = {
      id: id,
      size: size,
      color: color,
      quantity: quantity,
      price: price
    };

    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('cartCounter', totalQuantity);

    console.log(localStorage);

    showMsgBlock();
    updateCartIconCount();
  }

  function updateCartIconCount() {
    if (localStorage.getItem('cartCounter') !== null) {
      cartCounter.classList.add('user-menu-list__counter--show');
    } else {
      cartCounter.classList.remove('user-menu-list__counter--show');
    }

    cartCounter.textContent = localStorage.getItem('cartCounter');
  }

  function showMsgBlock() {
    msg.classList.add('msg--show');
    setTimeout(function() {
      msg.classList.remove('msg--show');
    }, 2000);
  }

  window.storage = {
    definePopup: definePopup,
    addOrderToStorage: addOrderToStorage,
    minusOne: minusOne,
    plusOne: plusOne,
    changePrice: changePrice
  };

})();
