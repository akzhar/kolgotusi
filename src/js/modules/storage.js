(function() {

  var popup;
  var cartCounters = document.querySelectorAll('.user-menu-list__counter');
  var msg = document.querySelector('#msg');
  if (msg !== null) {
    var msgText = msg.querySelector('.msg__text');
  }

  updateCartCounters();

  function definePopup() {
    popup = window.popup;
  }

  function getCartTotalCountFromStorage() {
    return + sessionStorage.getItem('cartTotalCount');
  }

  function getCartTotalPriceFromStorage() {
    return + sessionStorage.getItem('cartTotalPrice');
  }

  function getCartFromStorage() {
    return {
      orders: JSON.parse(sessionStorage.getItem('cartOrders')),
      totalCount: + sessionStorage.getItem('cartTotalCount'),
      totalPrice: + sessionStorage.getItem('cartTotalPrice')
    };
  }

  function setCartInStorage(orders, totalCount, totalPrice) {
    sessionStorage.setItem('cartOrders', JSON.stringify(orders));
    sessionStorage.setItem('cartTotalCount', totalCount);
    sessionStorage.setItem('cartTotalPrice', totalPrice);
  }

  function changePrice() {
    var price = getPrice(popup.orderBtn.dataset.id);
    popup.priceBlock.textContent = price * (+ popup.quantityBlock.value);
  }

  function minusOne() {
    if (+ popup.quantityBlock.value === 0) {
      return;
    }
    popup.quantityBlock.value = + popup.quantityBlock.value - 1;
    changePrice();
  }

  function plusOne() {
    popup.quantityBlock.value = + popup.quantityBlock.value + 1;
    changePrice();
  }

  function removeOrderFromStorage(order) {
    var cart = getCartFromStorage();
    var orders = cart.orders;
    var orderQuantity = + orders[order].quantity;
    var orderPrice = + orders[order].price;

    var totalCount = + cart.totalCount - orderQuantity;
    var totalPrice = + cart.totalPrice - orderPrice;

    delete orders[order];
    setCartInStorage(orders, totalCount, totalPrice);
    return totalPrice;
  }

  function getPrice(id) {
    var data = JSON.parse(sessionStorage.getItem('data'));
    return + data[id].price;
  }

  function changeOrderInStorage(order, action) {
    var cart = getCartFromStorage();
    var orders = cart.orders;
    var id = order.slice(0, 3);
    var samplePrice = getPrice(id);
    var orderCount = + orders[order].quantity;
    var orderPrice = + orders[order].price;
    var newOrderCount = (action === 'minus') ? (orderCount - 1) : (orderCount + 1);
    var newOrderPrice = (action === 'minus') ? (orderPrice - samplePrice) : (orderPrice + samplePrice);
    var totalCount = + cart.totalCount - orderCount + newOrderCount;
    var totalPrice = + cart.totalPrice - orderPrice + newOrderPrice;
    var rowIsEmpty = false;

    if (newOrderCount == 0 || newOrderPrice == 0) {
      rowIsEmpty = true;
    }

    orders[order].quantity = newOrderCount;
    orders[order].price = newOrderPrice;
    setCartInStorage(orders, totalCount, totalPrice);

    return rowIsEmpty;
  }

  function addOrderToStorage() {
    var id = popup.orderBtn.dataset.id;
    var size = popup.sizeBlock.value;
    var color = popup.colorBlock.value;
    var quantity = + popup.quantityBlock.value;
    var price = + popup.priceBlock.textContent;
    var key = id+'-'+size+'-'+color;

    if (quantity === 0) {
      showMsgBlock('Сначала выберите количество товара!');
      return;
    }

    var cart = getCartFromStorage();
    var orders = cart.orders || {};
    var totalCount = + cart.totalCount + quantity;
    var totalPrice = + cart.totalPrice + price;

    if (Object.prototype.hasOwnProperty.call(orders, key)) {
      quantity += orders[key].quantity;
      price += orders[key].price;
    }

    orders[key] = {
      id: id,
      size: size,
      color: color,
      quantity: quantity,
      price: price
    };

    setCartInStorage(orders, totalCount, totalPrice);

    showMsgBlock('Товар добавлен в корзину!');
    updateCartCounters();
  }

  function updateCartCounters() {
    var cart = getCartFromStorage();
    if (cart.totalCount === 0) {
      cartCounters.forEach(function(cartCounter) {
        cartCounter.classList.remove('user-menu-list__counter--show');
        cartCounter.textContent = cart.totalCount;
      });
      return;
    }
    cartCounters.forEach(function(cartCounter) {
      cartCounter.classList.add('user-menu-list__counter--show');
      cartCounter.textContent = cart.totalCount;
    });
  }

  function showMsgBlock(text) {
    msgText.textContent = text;
    msg.classList.add('msg--show');
    setTimeout(function() {
      msg.classList.remove('msg--show');
    }, 1000);
  }

  window.storage = {
    definePopup: definePopup,
    addOrderToStorage: addOrderToStorage,
    minusOne: minusOne,
    plusOne: plusOne,
    changePrice: changePrice,
    showMsgBlock: showMsgBlock,
    updateCartCounters: updateCartCounters,
    removeOrderFromStorage: removeOrderFromStorage,
    getCartFromStorage: getCartFromStorage,
    changeOrderInStorage: changeOrderInStorage,
    getCartTotalCountFromStorage: getCartTotalCountFromStorage,
    getCartTotalPriceFromStorage: getCartTotalPriceFromStorage
  };

})();
