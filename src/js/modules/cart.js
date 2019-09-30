(function() {

  var dependencies = {
    storage: window.storage
  };

  var table = document.querySelector('.cart__table');
  var cartTotal = document.querySelector('.cart__total');
  var emptyNotify = document.querySelector('.cart__emptynotify');

  if (cartTotal !== null) {
    var cartTotalOutput = cartTotal.querySelector('output');
  }

  var cart = dependencies.storage.getCartFromStorage();

  if (table !== null && cart.totalCount !== 0) {
    drawTheTable();
    showCartTable();
  }

  function clearTheTable() {
    var rows = table.children;
    for(var i = 0; i < rows.length; i++) {
      if (rows[i].nodeName !== 'CAPTION' && rows[i].nodeName !== 'THEAD') {
        table.removeChild(rows[i]);
        i--;
      }
    }
  }

  function drawTheTable() {
    clearTheTable();
    var cart = dependencies.storage.getCartFromStorage();
    var data = JSON.parse(sessionStorage.getItem('data'));
    var orders = cart.orders;
    for (var order in orders) {
      if (Object.prototype.hasOwnProperty.call(orders, order)) {
        var id = orders[order].id;
        var row = document.createElement('tr');
        addCellInARow(orders[order].id, row);
        addCellInARow(data[id].name, row);
        addCellInARow(orders[order].size, row);

        addСolorInARow(orders[order].color, row);

        addMinusBtnInARow(order, row);

        addCellInARow(orders[order].quantity, row);

        addPlusBtnInARow(order, row);

        addCellInARow(orders[order].price + '.00', row);
        addDeleteBtnInARow(order, row);
        table.appendChild(row);
      }
    }
    cartTotalOutput.textContent = cart.totalPrice + '.00';
  }

  function addCellInARow(content, row) {
    var td = document.createElement('td');
    td.textContent = content;
    row.appendChild(td);
  }

  function addСolorInARow(color, row) {
    var td = document.createElement('td');
    var innerH = '<div style="width:15px;height:15px;margin:0 auto;border-radius:50%;" class="color--' + color + '" title="' + color + '"></div>';
    td.innerHTML = innerH;
    row.appendChild(td);
  }

  function removeRow(order, row) {
    if (confirm('Удалить позицию из корзины?')) {
      table.removeChild(row);
      dependencies.storage.showMsgBlock('Позиция удалена из корзины!');
      var totalPrice = dependencies.storage.removeOrderFromStorage(order);
      dependencies.storage.updateCartCounters();
      cartTotalOutput.textContent = totalPrice + '.00';
      if (totalPrice === 0) {
        hideCartTable();
      }
    }
  }

  function showCartTable() {
    table.classList.remove('cart__table--hide');
    cartTotal.classList.remove('cart__total--hide');
    emptyNotify.classList.add('cart__emptynotify--hide');
  }

  function hideCartTable() {
    table.classList.add('cart__table--hide');
    cartTotal.classList.add('cart__total--hide');
    emptyNotify.classList.remove('cart__emptynotify--hide');
  }

  function addDeleteBtnInARow(order, row) {
    var td = document.createElement('td');
    td.style.padding = '0';
    td.innerHTML = '<button class="cart__btn cart__btn--delete btn" title="Удалить">X</button>';
    var btn = td.querySelector('button');
    btn.addEventListener('click', function() {
      removeRow(order, row);
    });
    row.appendChild(td);
  }

  function changeQuantityInOrder(order, row, action) {
    var rowIsEmpty = dependencies.storage.changeOrderInStorage(order, action);
    if (rowIsEmpty === true) {
      removeRow(order, row);
      return;
    }
    dependencies.storage.updateCartCounters();
    var totalPrice = dependencies.storage.getCartTotalPriceFromStorage();
    cartTotalOutput.textContent = totalPrice + '.00';
    if (totalPrice === 0) {
      hideCartTable();
    } else {
      drawTheTable();
    }
  }

  function addPlusBtnInARow(order, row) {
    var td = document.createElement('td');
    td.style.width = '20px';
    td.style.padding = '0';
    td.innerHTML = '<button class="cart__btn cart__btn--plus btn" title="Плюс 1">+</button>';
    var btn = td.querySelector('button');
    btn.addEventListener('click', function() {
      changeQuantityInOrder(order, row, 'plus');
    });
    row.appendChild(td);
  }

  function addMinusBtnInARow(order, row) {
    var td = document.createElement('td');
    td.style.width = '20px';
    td.style.padding = '0';
    td.innerHTML = '<button class="cart__btn cart__btn--minus btn" title="Минус 1">-</button>';
    var btn = td.querySelector('button');
    btn.addEventListener('click', function() {
      changeQuantityInOrder(order, row, 'minus');
    });
    row.appendChild(td);
  }

})();
