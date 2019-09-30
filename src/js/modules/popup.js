/*
модуль для открытия/закрытия попапов
*/

// думаю, можно упростить данный модуль + image

(function() {

  let dependencies = {
    scroll: window.scroll,
    storage: window.storage,
    image: window.image,
    message: window.message,
    cart: window.cart
  };

  const ID_LENGTH = 4;

  let popupOpenBtns = document.querySelectorAll('.popup__open');
  let photoOpenBtns = document.querySelectorAll('.goods__show-btn');
  let popup;

  popupOpenBtns.forEach(function(popupOpenBtn) {
    popupOpenBtn.addEventListener('click', onPopupOpenBtnClick);
  });

  photoOpenBtns.forEach(function(photoOpenBtn) {
    photoOpenBtn.addEventListener('click', onPhotoOpenBtnClick);
  });

  function onPopupOpenBtnClick(evt) {
    openPopupBlock(evt.target.dataset.id);
  }

  function onPhotoOpenBtnClick(evt) {
    dependencies.image.renderImgs(popup);
    dependencies.image.renderSources(popup);
    evt.target.removeEventListener('click', onPhotoOpenBtnClick);
  }

  function closePopupBlock() {
    resetSelectedOptions();
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
      goodsId: id.slice(ID_LENGTH),
      popupBlock : popupBlock,
      photosSelector : popupBlock.querySelectorAll('.photo__item'),
      popupCloseBtn : popupBlock.querySelector('.popup__close'),
      orderBtn : popupBlock.querySelector('.preorder__order'),
      minusBtn : popupBlock.querySelector('.preorder__btn--minus'),
      plusBtn : popupBlock.querySelector('.preorder__btn--plus'),
      quantityBlock : popupBlock.querySelector('.preorder__input'),
      priceBlock : popupBlock.querySelector('.preorder__price'),
      sizeBlock : popupBlock.querySelector('.preorder__select--sizes'),
      colorBlock : popupBlock.querySelector('.preorder__select--colors')
    };
  }

  function listeners(method) {
    popup.popupBlock.classList[method]('popup--show');
    popup.photosSelector.forEach(function(selector) {
      selector[method+'EventListener']('click', onSelectorClick);
    });
    popup.popupCloseBtn[method+'EventListener']('click', onPopupCloseBtnClick);
    if (popup.orderBtn !== null) {
      popup.orderBtn[method + 'EventListener']('click', addOrderToStorage);
      popup.minusBtn[method + 'EventListener']('click', minusOne);
      popup.plusBtn[method + 'EventListener']('click', plusOne);
      popup.quantityBlock[method + 'EventListener']('change', changePrice);
    }
    window[method + 'EventListener']('keydown', onWindowEscPress);
  }

  function onSelectorClick(evt) {
    dependencies.image.removeSelectorActiveClass(popup);
    dependencies.image.changeBigImageToSelected(evt.target, popup);
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

  function resetSelectedOptions() {
    if (popup.orderBtn !== null) {
      popup.sizeBlock.selectedIndex = 0;
      popup.colorBlock.selectedIndex = 0;
      popup.quantityBlock.value = 1;
      popup.priceBlock.textContent = dependencies.storage.getPrice(popup.goodsId);
    }
  }

  function changePrice() {
    var price = dependencies.storage.getPrice(popup.orderBtn.dataset.id);
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

  function addOrderToStorage() {
    var id = popup.orderBtn.dataset.id;
    var size = popup.sizeBlock.value;
    var color = popup.colorBlock.value;
    var quantity = + popup.quantityBlock.value;
    var price = + popup.priceBlock.textContent;
    var key = id+'-'+size+'-'+color;

    if (quantity === 0) {
      dependencies.message.showMsgBlock('Сначала выберите количество товара!');
      return;
    }

    var cart = dependencies.storage.getCartFromStorage();
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

    dependencies.storage.setCartInStorage(orders, totalCount, totalPrice);

    dependencies.message.showMsgBlock('Товар добавлен в корзину!');
    dependencies.cart.updateCartCounters();
  }

})();
