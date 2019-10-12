/*
модуль для работы с попапом просмотра фото товара
*/

(function() {

  function removeSelectorActiveClass(popup) {
    popup.photosSelector.forEach(function(photo) {
      photo.classList.remove('photo__item--active');
    });
  }

  function changeBigImageToSelected(selector, popup) {
    let bigImg = popup.popupBlock.querySelector('.photo__img-large');
    let bigImgSource = popup.popupBlock.querySelector('.photo__img-large-srcset');
    let bigImgTitle = popup.popupBlock.querySelector('.photo__header');

    selector.classList.add('photo__item--active');
    bigImg.src = selector.dataset.img;
    bigImgSource.srcset = selector.dataset.srcset;
    bigImgTitle.textContent = selector.dataset.alt;
  }

  function renderImgs(popup) {
    let imgs = popup.popupBlock.querySelectorAll('img');
    imgs.forEach(function (img) {
      img.setAttribute('src', img.dataset.img);
    });
  }

  function renderSources(popup) {
    let sources = popup.popupBlock.querySelectorAll('source');
    sources.forEach(function (source) {
      source.setAttribute('srcset', source.dataset.img);
    });
  }

  window.image = {
    removeSelectorActiveClass: removeSelectorActiveClass,
    changeBigImageToSelected: changeBigImageToSelected,
    renderImgs : renderImgs,
    renderSources: renderSources
  };

})();
