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

  // удаляет 1 позицию из корзины в хранилище и возвращает суммарную стоимость корзины
  function removeOrderFromStorage(order) {
    let cart = getCartFromStorage();
    let orders = cart.orders;
    let orderQuantity = + orders[order].quantity;
    let orderPrice = + orders[order].price;
    let totalCount = + cart.totalCount - orderQuantity;
    let totalPrice = + cart.totalPrice - orderPrice;

    delete orders[order];
    setCartInStorage(orders, totalCount, totalPrice);
    return totalPrice;
  }

  function getPrice(id) {
    let data = JSON.parse(sessionStorage.getItem('data'));
    return + data[id].price;
  }

  // изменяет кол-во товара в заказе из корзины и возвращает булево значение - пуст ли данный заказ
  function changeOrderInStorage(order, action) {
    let cart = getCartFromStorage();
    let orders = cart.orders;
    let id = order.slice(0, ID_LENGTH);
    let samplePrice = getPrice(id);
    let orderCount = + orders[order].quantity;
    let orderPrice = + orders[order].price;
    let newOrderCount = (action === 'minus') ? (orderCount - 1) : (orderCount + 1);
    let newOrderPrice = (action === 'minus') ? (orderPrice - samplePrice) : (orderPrice + samplePrice);
    let totalCount = + cart.totalCount - orderCount + newOrderCount;
    let totalPrice = + cart.totalPrice - orderPrice + newOrderPrice;
    let orderCanBeDeleted = false;

    if (newOrderCount == 0 || newOrderPrice == 0) {
      orderCanBeDeleted = true;
    }

    orders[order].quantity = newOrderCount;
    orders[order].price = newOrderPrice;
    setCartInStorage(orders, totalCount, totalPrice);

    return orderCanBeDeleted;
  }

  window.storage = {
    getPrice: getPrice,
    setCartInStorage: setCartInStorage,
    removeOrderFromStorage: removeOrderFromStorage,
    getCartFromStorage: getCartFromStorage,
    changeOrderInStorage: changeOrderInStorage,
    getCartTotalCountFromStorage: getCartTotalCountFromStorage,
    getCartTotalPriceFromStorage: getCartTotalPriceFromStorage
  };

})();
