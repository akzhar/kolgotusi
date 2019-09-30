/*
модуль для работы с корзиной магазина
*/

(function() {

  let dependencies = {
    storage: window.storage,
    message: window.message
  };

  const TABLE_HIDE_CLASS ='cart__table--hide';
  const TOTAL_HIDE_CLASS ='cart__total--hide';
  const SUBMIT_BTN_HIDE_CLASS ='cart__btn--order--hide';
  const NOTIFICATION_HIDE_CLASS = 'cart__notification--hide';
  const CENTS_POSTFIX = '.00';
  const BTN_CLASS = 'cart__btn';

  let FunctionByAction = {
    'delete': removeOrderFromCartTable,
    'minus': changeQuantityInOrder,
    'plus': changeQuantityInOrder
  };

  let IconByAction = {
    'delete': 'X',
    'minus': '-',
    'plus': '+'
  };

  let table = document.querySelector('.cart__table');
  let totalBlock = document.querySelector('.cart__total');
  let notification = document.querySelector('.cart__notification');
  let cartSubmitBtn = document.querySelector('.cart__btn--order');
  let cartData = dependencies.storage.getCartFromStorage();
  let cartCounters = document.querySelectorAll('.user-menu-list__counter');
  let totalOutput;

  updateCartCounters();

  if (totalBlock !== null) {
    totalOutput = totalBlock.querySelector('output');
  }

  if (table !== null && cartData.totalCount !== 0) {
    drawCartTable();
    showCartTable();
  }

  function cleanCartTable() {
    let rows = table.children;
    for(let i = 0; i < rows.length; i++) {
      if (rows[i].nodeName !== 'CAPTION' && rows[i].nodeName !== 'THEAD') {
        table.removeChild(rows[i]);
        i--;
      }
    }
  }

  function showCartTable() {
    table.classList.remove(TABLE_HIDE_CLASS);
    totalBlock.classList.remove(TOTAL_HIDE_CLASS);
    cartSubmitBtn.classList.remove(SUBMIT_BTN_HIDE_CLASS);
    notification.classList.add(NOTIFICATION_HIDE_CLASS);
  }

  function hideCartTable() {
    table.classList.add(TABLE_HIDE_CLASS);
    totalBlock.classList.add(TOTAL_HIDE_CLASS);
    cartSubmitBtn.classList.add(SUBMIT_BTN_HIDE_CLASS);
    notification.classList.remove(NOTIFICATION_HIDE_CLASS);
  }

  function removeOrderFromCartTable(order, row) {
    if (confirm('Удалить позицию из корзины?')) {
      table.removeChild(row);
      dependencies.message.showMsgBlock('Позиция удалена из корзины!');
      let totalPrice = dependencies.storage.removeOrderFromStorage(order);
      updateCartCounters();
      totalOutput.textContent = totalPrice + CENTS_POSTFIX;
      if (totalPrice === 0) {
        hideCartTable();
      }
    }
  }

  function changeQuantityInOrder(order, row, action) {
    let orderCanBeDeleted = dependencies.storage.changeOrderInStorage(order, action);
    if (orderCanBeDeleted === true) {
      removeOrderFromCartTable(order, row);
      return;
    }
    updateCartCounters();
    let totalPrice = dependencies.storage.getCartTotalPriceFromStorage();
    totalOutput.textContent = totalPrice + CENTS_POSTFIX;
    if (totalPrice === 0) {
      hideCartTable();
    } else {
      drawCartTable();
    }
  }

  function drawCartTable() {
    cleanCartTable();
    let fragment = document.createDocumentFragment();
    let cartData = dependencies.storage.getCartFromStorage();
    let data = JSON.parse(sessionStorage.getItem('data'));
    let orders = cartData.orders;
    for (let order in orders) {
      if (Object.prototype.hasOwnProperty.call(orders, order)) {
        let id = orders[order].id;
        let row = document.createElement('tr');
        addDataInARow(orders[order].id, row);
        addDataInARow(data[id].name, row);
        addDataInARow(orders[order].size, row);
        addСolorInARow(orders[order].color, row);
        addActionBtnInARow('minus', order, row);
        addDataInARow(orders[order].quantity, row);
        addActionBtnInARow('plus', order, row);
        addDataInARow(orders[order].price + CENTS_POSTFIX, row);
        addActionBtnInARow('delete', order, row);
        fragment.appendChild(row);
      }
    }
    table.appendChild(fragment);
    totalOutput.textContent = cartData.totalPrice + CENTS_POSTFIX;
  }

  function addDataInARow(data, row) {
    let td = document.createElement('td');
    td.textContent = data;
    row.appendChild(td);
  }

  function addСolorInARow(color, row) {
    let td = document.createElement('td');
    td.innerHTML = `<div style="width:15px;height:15px;margin:0 auto;border-radius:50%;" class="color--${color}" title="${color}"></div>`;
    row.appendChild(td);
  }

  function addActionBtnInARow(action, order, row) {
    let td = document.createElement('td');
    if (action !== 'delete') {
      td.style.width = '20px';
    }
    td.style.padding = '0';
    td.innerHTML = `<button class="${BTN_CLASS} ${BTN_CLASS}--${action} btn" title="${action}">${IconByAction[action]}</button>`;
    let btn = td.querySelector('button');
    btn.addEventListener('click', function() {
      FunctionByAction[action](order, row, action);
    });
    row.appendChild(td);
  }

  // обновление общего счетчика товара в корзине
  function updateCartCounters() {
    let cart = dependencies.storage.getCartFromStorage();
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

  window.cart = {
    updateCartCounters: updateCartCounters
  };

})();
