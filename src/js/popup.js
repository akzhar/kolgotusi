(function() {

  var dependencies = {
    scroll: window.scroll
  };

  var popupOpenBtns = document.querySelectorAll('.popup__open');
  var photoOpenBtns = document.querySelectorAll('.goods__show-btn');
  var popupBlock;
  var popupCloseBtn;
  var photosSmall;

  function onWindowEscPress(evt) {
    if (evt.keyCode === 27 && popupBlock.classList.contains('popup--show')) {
      evt.preventDefault();
      closePopupBlock();
    }
    window.removeEventListener('keydown', onWindowEscPress);
  }

  function closePopupBlock() {
    popupBlock.classList.remove('popup--show');
    dependencies.scroll.enableScrolling();
    photosSmall.forEach(function(photo) {
      photo.removeEventListener('click', removePhotoActiveClass);
      photo.removeEventListener('click', changeImgFromBigToSmall);
    });
    popupCloseBtn.removeEventListener('click', closePopupBlock);
  }

  function openPopupBlock() {
    var popupBlockId = 'popup' + this.getAttribute('data-popup-id');
    popupBlock = document.getElementById(popupBlockId);
    photosSmall = popupBlock.querySelectorAll('.photo__img-small');
    popupCloseBtn = popupBlock.querySelector('.popup__close');

    popupBlock.classList.add('popup--show');
    dependencies.scroll.disableScrolling();
    photosSmall.forEach(function(photo) {
      photo.addEventListener('click', removePhotoActiveClass);
      photo.addEventListener('click', changeImgFromBigToSmall);
    });
    popupCloseBtn.addEventListener('click', closePopupBlock);
    window.addEventListener('keydown', onWindowEscPress);
  }

  function removePhotoActiveClass() {
    photosSmall.forEach(function(photoSmall) {
      photoSmall.classList.remove('photo__img-small--active');
    });
  }

  function changeImgFromBigToSmall() {
    var phSmallSources = popupBlock.querySelectorAll('.photo__img-small-srcset');
    var phSmallId = this.getAttribute('data-id');
    var phBig = popupBlock.querySelector('.photo__img-large');
    var phBigSource = popupBlock.querySelector('.photo__img-large-srcset');
    var phBigTitle = popupBlock.querySelector('.photo__header');

    this.classList.add('photo__img-small--active');
    phBig.src = this.src;
    phBigSource.srcset = phSmallSources[phSmallId].srcset;
    phBigTitle.textContent = this.alt;
  }

  function renderImgs() {
    var phImgs = popupBlock.querySelectorAll('img');
    phImgs.forEach(function(img) {
      img.setAttribute('src', img.getAttribute('data-img'));
    });
  }

  function renderSources() {
    var phSources = popupBlock.querySelectorAll('source');
    phSources.forEach(function(source) {
      source.setAttribute('srcset', source.getAttribute('data-img'));
    });
  }

  function renderAllImgs() {
    renderImgs();
    renderSources();
    this.removeEventListener('click', renderAllImgs);
  }

  popupOpenBtns.forEach(function(btn) {
    btn.addEventListener('click', openPopupBlock);
  });

  photoOpenBtns.forEach(function(btn) {
    btn.addEventListener('click', renderAllImgs);
  });

})();
