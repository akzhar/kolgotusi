'use strict';

(function () {
  var MAX_RESPONSE_TIME = 5000;
  var MS_PER_SECOND = 1000;
  var JSON_TYPE = 'json';
  var TIME_UNIT = ' c';
  var OK_STATUS = 200;
  var Url = {
    GET: 'js/data.json'
  };

  function load(onLoad, onError, method, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = JSON_TYPE;
    xhr.timeout = MAX_RESPONSE_TIME;
    xhr.addEventListener('load', function () {
      if (xhr.status === OK_STATUS) {
        onLoad(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout / MS_PER_SECOND + TIME_UNIT);
    });
    xhr.open(method, Url[method]);
    xhr.send(data);
  }

  window.backend = {
    load: load
  };
})();


(function() {

  var dependencies = {
    backend: window.backend
  };

  dependencies.backend.load(onLoad, onError, 'GET');

  function onLoad(response) {
    sessionStorage.setItem('data', JSON.stringify(response.allItems));
  }

  function onError(error) {
    console.log(error);
  }

})();
 // backend

(function() {

  var header = document.querySelector('.header');
  var pagewrapper = document.querySelector('.page-wrapper');
  var menubutton = document.querySelector('.menu-button');
  var menu = document.querySelector('.site-menu-list');
  var slideSelector = document.querySelector('.slide__selector');

  if (slideSelector) {
    slideSelector.classList.remove('slide__selector--nojs');
  }

  header.classList.remove('header--nojs');
  pagewrapper.classList.remove('page-wrapper--nojs');
  menubutton.classList.remove('menu-button--nojs');
  menu.classList.remove('site-menu-list--nojs');

})();


(function() {

  var menubutton = document.querySelector('.menu-button');
  var menu = document.querySelector('.site-menu-list');

  function menuToggle() {
    menu.classList.toggle('site-menu-list--open');
    menubutton.classList.toggle('menu-button--menu-open');
  }

  menubutton.addEventListener('click', menuToggle);

  window.addEventListener('keydown', function(evt) {
    if (evt.keyCode === 27 && menubutton.classList.contains('menu-button--menu-open')) {
      evt.preventDefault();
      menuToggle();
    }
  });

})();


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


(function() {

  var popup;

  function definePopup() {
    popup = window.popup;
  }

  function removePhotoActiveClass() {
    popup.photosSmall.forEach(function(photo) {
      photo.classList.remove('photo__img-small--active');
    });
  }

  function changeImgFromBigToSmall(photo) {
    var phSmallSources = popup.popupBlock.querySelectorAll('.photo__img-small-srcset');
    var phSmallId = photo.getAttribute('data-id');
    var phBig = popup.popupBlock.querySelector('.photo__img-large');
    var phBigSource = popup.popupBlock.querySelector('.photo__img-large-srcset');
    var phBigTitle = popup.popupBlock.querySelector('.photo__header');

    photo.classList.add('photo__img-small--active');
    phBig.src = photo.src;
    phBigSource.srcset = phSmallSources[phSmallId].srcset;
    phBigTitle.textContent = photo.alt;
  }

  function renderImgs() {
    var phImgs = popup.popupBlock.querySelectorAll('img');
    phImgs.forEach(function(img) {
      img.setAttribute('src', img.getAttribute('data-img'));
    });
  }

  function renderSources() {
    var phSources = popup.popupBlock.querySelectorAll('source');
    phSources.forEach(function(source) {
      source.setAttribute('srcset', source.getAttribute('data-img'));
    });
  }

  window.image = {
    definePopup: definePopup,
    removePhotoActiveClass: removePhotoActiveClass,
    changeImgFromBigToSmall: changeImgFromBigToSmall,
    renderImgs: renderImgs,
    renderSources: renderSources
  };

})();


(function() {

  var anchor = document.querySelector('.btn--up');
  var x;
  var y;

  if (anchor !== null) {
    anchor.addEventListener('click', function (evt) {
      evt.preventDefault();
      var blockID = anchor.getAttribute('href');
      document.querySelector('' + blockID).scrollIntoView(
        {
          behavior: 'smooth',
          block: 'start'
        }
      );
    });
  }

  function setXY() {
    x = window.scrollX;
    y = window.scrollY;
  }

  function scrollToXY() {
    window.scrollTo(x, y);
  }

  function disableScrolling() {
    setXY();
    window.addEventListener('scroll', scrollToXY);
  }

  function enableScrolling() {
    window.removeEventListener('scroll', scrollToXY);
  }

  window.scroll = {
    disableScrolling: disableScrolling,
    enableScrolling: enableScrolling
  };

})();


(function() {

  var dependencies = {
    scroll: window.scroll,
    storage: window.storage,
    image: window.image
  };

  var popupOpenBtns = document.querySelectorAll('.popup__open');
  var photoOpenBtns = document.querySelectorAll('.goods__show-btn');
  var popup;

  popupOpenBtns.forEach(function(popupOpenBtn) {
    popupOpenBtn.addEventListener('click', onPopupOpenBtnClick);
  });

  photoOpenBtns.forEach(function(photoOpenBtn) {
    photoOpenBtn.addEventListener('click', onPhotoOpenBtnClick);
  });

  function onPopupOpenBtnClick(evt) {
    var id = evt.target.getAttribute('data-id');
    openPopupBlock(id);
  }

  function onPhotoOpenBtnClick(evt) {
    dependencies.image.renderImgs();
    dependencies.image.renderSources();
    evt.target.removeEventListener('click', onPhotoOpenBtnClick);
  }

  function closePopupBlock() {
    dependencies.scroll.enableScrolling();
    listeners('remove');
  }

  function openPopupBlock(id) {
    definePopup(id);

    dependencies.scroll.disableScrolling();
    listeners('add');
  }

  function definePopup(id) {
    var popupBlock = document.getElementById(id);
    popup = {
      popupBlock : popupBlock,
      photosSmall : popupBlock.querySelectorAll('.photo__img-small'),
      popupCloseBtn : popupBlock.querySelector('.popup__close'),
      orderBtn : popupBlock.querySelector('.preorder__order'),
      minusBtn : popupBlock.querySelector('.preorder__btn--minus'),
      plusBtn : popupBlock.querySelector('.preorder__btn--plus'),
      quantityBlock : popupBlock.querySelector('.preorder__input'),
      priceBlock : popupBlock.querySelector('.preorder__price'),
      sizeBlock : popupBlock.querySelector('.preorder__select--sizes'),
      colorBlock : popupBlock.querySelector('.preorder__select--colors')
    };

    window.popup = popup;
    dependencies.storage.definePopup();
    dependencies.image.definePopup();
  }

  function listeners(method) {
    popup.popupBlock.classList[method]('popup--show');
    popup.photosSmall.forEach(function(smallPhoto) {
      smallPhoto[method+'EventListener']('click', onSmallPhotoClick);
    });
    popup.popupCloseBtn[method+'EventListener']('click', onPopupCloseBtnClick);
    if (popup.orderBtn !== null) {
      popup.orderBtn[method+'EventListener']('click', dependencies.storage.addOrderToStorage);
      popup.minusBtn[method+'EventListener']('click', dependencies.storage.minusOne);
      popup.plusBtn[method+'EventListener']('click', dependencies.storage.plusOne);
      popup.quantityBlock[method+'EventListener']('change', dependencies.storage.changePrice);
    }
    window[method+'EventListener']('keydown', onWindowEscPress);
  }

  function onSmallPhotoClick(evt) {
    dependencies.image.removePhotoActiveClass();
    dependencies.image.changeImgFromBigToSmall(evt.target);
  }

  function onPopupCloseBtnClick() {
    closePopupBlock();
  }

  function onWindowEscPress(evt) {
    if (evt.keyCode === 27 && popup.popupBlock.classList.contains('popup--show')) {
      evt.preventDefault();
      closePopupBlock();
    }
    window.removeEventListener('keydown', onWindowEscPress);
  }

})();
 // scroll, storage, image

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
        addCellInARow(orders[order].color, row);

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

  function removeRow(order, row) {
    table.removeChild(row);
    dependencies.storage.showMsgBlock('Позиция удалена из корзины!');
    var totalPrice = dependencies.storage.removeOrderFromStorage(order);
    dependencies.storage.updateCartCounters();
    cartTotalOutput.textContent = totalPrice + '.00';
    if (totalPrice === 0) {
      hideCartTable();
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
 // storage

(function() {

  var RADIOLABEL_CHECKED_CLASS = 'slide__radiolabel--checked';
  var SLIDE_SHOW_CLASS = 'slide__item--show';
  var slides = document.querySelectorAll('.slide__item');
  var radioLabels = document.querySelectorAll('.slide__radiolabel');
  var nextBtn = document.querySelector('.slider__btn-next');
  var previousBtn = document.querySelector('.slider__btn-prev');
  var currentSlideNo = 0;
  var troughLabel = false;
  var slideInterval;

  if (nextBtn !== null && previousBtn !== null) {
    activateSlider();
  }

  function activateSlider() {
    slideInterval = setInterval(goToNextSlide, 4000); //интервал повторения

    nextBtn.addEventListener('click', function() { //при клике на вперед
      troughLabel = false;
      pauseSlideShow();
      goToNextSlide();
    });

    previousBtn.addEventListener('click', function() { // при клике на назад
      troughLabel = false;
      pauseSlideShow();
      goToPreviousSlide();
    });

    radioLabels.forEach(function(label) {
      label.addEventListener('click', function() {
        troughLabel = true;
        pauseSlideShow();
        goToSlide(this.getAttribute('data-id'));
      });
    });
  }

  function pauseSlideShow() {
    clearInterval(slideInterval); //очистка интервала повторения
  }

  function goToNextSlide() {
    goToSlide(currentSlideNo + 1);
  }

  function goToPreviousSlide() {
    goToSlide(currentSlideNo - 1);
  }

  function goToSlide(n) {
    radioLabels[currentSlideNo].classList.remove(RADIOLABEL_CHECKED_CLASS);
    slides[currentSlideNo].classList.remove(SLIDE_SHOW_CLASS);
    currentSlideNo = (troughLabel) ? n : (n + slides.length) % slides.length; // текущий слайд -1 или +1
    radioLabels[currentSlideNo].classList.add(RADIOLABEL_CHECKED_CLASS);
    slides[currentSlideNo].classList.add(SLIDE_SHOW_CLASS);
  }

})();



