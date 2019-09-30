(function() {

  var popup;

  function definePopup() {
    popup = window.popup;
  }

  function removeSelectorActiveClass() {
    popup.photosSelector.forEach(function(photo) {
      photo.classList.remove('photo__item--active');
    });
  }

  function changeBigImage(selector) {
    var phBig = popup.popupBlock.querySelector('.photo__img-large');
    var phBigSource = popup.popupBlock.querySelector('.photo__img-large-srcset');
    var phBigTitle = popup.popupBlock.querySelector('.photo__header');

    selector.classList.add('photo__item--active');
    phBig.src = selector.getAttribute('data-img');
    phBigSource.srcset = selector.getAttribute('data-srcset');
    phBigTitle.textContent = selector.getAttribute('data-alt');
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
    removeSelectorActiveClass: removeSelectorActiveClass,
    changeBigImage: changeBigImage,
    renderImgs : renderImgs,
    renderSources: renderSources
  };

})();
