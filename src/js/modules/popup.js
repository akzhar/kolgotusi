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
    clearSelectedOptions();
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
    // внимательно: длина id фикс
    popup = {
      goodsId: id.slice(4),
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

    window.popup = popup;
    dependencies.storage.definePopup();
    dependencies.image.definePopup();
  }

  function listeners(method) {
    popup.popupBlock.classList[method]('popup--show');
    popup.photosSelector.forEach(function(selector) {
      selector[method+'EventListener']('click', onSelectorClick);
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

  function onSelectorClick(evt) {
    dependencies.image.removeSelectorActiveClass();
    dependencies.image.changeBigImage(evt.target);
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

  function clearSelectedOptions() {
    if (popup.orderBtn !== null) {
      popup.sizeBlock.selectedIndex = 0;
      popup.colorBlock.selectedIndex = 0;
      popup.quantityBlock.value = 1;
      popup.priceBlock.textContent = dependencies.storage.getPrice(popup.goodsId);
    }
  }

})();
