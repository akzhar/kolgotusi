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
