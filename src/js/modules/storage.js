/*
модуль взаимодействия с хранилищем sessionStorage,
в котором хранятся данные корзины + ассортимент магазина
*/

(function() {

  const ID_LENGTH = 8;

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

  function getPrice(id) {
    let data = JSON.parse(sessionStorage.getItem('data'));
    return + data[id].price;
  }

  // изменяет содержимое корзины в хранилище
  function changeOrderInStorage(order, action) {
    let cart = getCartFromStorage();
    let orders = cart.orders;
    let id = order.slice(0, ID_LENGTH);
    let samplePrice = getPrice(id);
    let orderCount = + orders[order].quantity;
    let orderPrice = + orders[order].price;
    let totalCount = + cart.totalCount;
    let totalPrice = + cart.totalPrice;

    if (action === 'delete') {
      totalCount -= orderCount;
      totalPrice -= orderPrice;
    } else {
      let deltaQuantity = (action === 'minus') ? (- 1) : (+ 1);
      let deltaPrice = (action === 'minus') ? (- samplePrice) : (+ samplePrice);

      totalCount += deltaQuantity;
      totalPrice += deltaPrice;
      orders[order].quantity += deltaQuantity;
      orders[order].price += deltaPrice;
    }

    if (action === 'delete' || orders[order].quantity === 0) {
      delete orders[order];
    }

    setCartInStorage(orders, totalCount, totalPrice);

  }

  // возвращает булево значение - пуст ли данный заказ
  function canOrderBeDeleted(order, action) {
    let cart = getCartFromStorage();
    let orders = cart.orders;
    let orderCount = + orders[order].quantity;
    let newOrderCount = (action === 'minus') ? (orderCount - 1) : (orderCount + 1);
    let orderCanBeDeleted = false;

    if (newOrderCount < 0 || newOrderCount === 0) {
      orderCanBeDeleted = true;
    }

    return orderCanBeDeleted;
  }

  window.storage = {
    getPrice: getPrice,
    canOrderBeDeleted: canOrderBeDeleted,
    setCartInStorage: setCartInStorage,
    getCartFromStorage: getCartFromStorage,
    changeOrderInStorage: changeOrderInStorage,
    getCartTotalCountFromStorage: getCartTotalCountFromStorage,
    getCartTotalPriceFromStorage: getCartTotalPriceFromStorage
  };

})();
