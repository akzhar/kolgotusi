var photoOpenBtns = document.querySelectorAll(".goods__show-btn");
var photoCloseBtns = document.querySelectorAll(".photo__close");

var photoBlock = {};

function setPhotoBlock(photoBlockId) {
  photoBlock = document.getElementById(photoBlockId);
}

function disableScrolling() {
  var x = window.scrollX;
  var y = window.scrollY;
  window.addEventListener("scroll", function() {
    window.scrollTo(x, y);
  });
}

function enableScrolling() {
  window.addEventListener("scroll", function() {

  });
}

function turnOnEscHandler() {
  window.addEventListener("keydown", function(evt) {
    if (evt.keyCode === 27 && photoBlock.classList.contains("photo--show")) {
        evt.preventDefault();
        closePhotoBlock();
    };
  });
}

function changeImgFromBigToSmall() {
  var phSmallSources = photoBlock.querySelectorAll(".photo__img-small-srcset");
  var phSmallId = this.getAttribute("data-id");
  var phBig = photoBlock.querySelector(".photo__img-large");
  var phBigSource = photoBlock.querySelector(".photo__img-large-srcset");
  var phBigTitle = photoBlock.querySelector(".photo__header");

  this.classList.add("photo__img-small--active");
  phBig.src = this.src;
  phBigSource.srcset = phSmallSources[phSmallId].srcset;
  phBigTitle.textContent = this.alt;
}

function renderImgs() {
  var photoImgs = photoBlock.getElementsByTagName("img");
  for (var i = 0; i < photoImgs.length; i ++) {
    photoImgs[i].setAttribute("src", photoImgs[i].getAttribute("data-img"));
  }
}

function renderSources() {
  var photoSources = photoBlock.getElementsByTagName("source");
  for (var i = 0; i < photoSources.length; i ++) {
    photoSources[i].setAttribute("srcset", photoSources[i].getAttribute("data-img"));
  }
}

function addClickHandlersToPhotosSmall() {
  var photosSmall = photoBlock.querySelectorAll(".photo__img-small");
  for (var i = 0; i < photosSmall.length; i ++) {
    photosSmall[i].addEventListener("click", changeImgFromBigToSmall);
    photosSmall[i].addEventListener("click", function() {
      for (var j = 0; j < photosSmall.length; j ++) {
        photosSmall[j].classList.remove("photo__img-small--active");
      }
    });
  }
}

function closePhotoBlock() {
  photoBlock.classList.remove("photo--show");
  enableScrolling();
}

function openPhotoBlock() {
  var photoBlockId = "photo" + this.getAttribute("data-index");
  setPhotoBlock(photoBlockId);
  renderImgs();
  renderSources();
  addClickHandlersToPhotosSmall();
  turnOnEscHandler();
  photoBlock.classList.add("photo--show");
  disableScrolling();
}

for (var i = 0; i < photoOpenBtns.length; i ++) {
  photoOpenBtns[i].addEventListener("click", openPhotoBlock);
}

for (var i = 0; i < photoCloseBtns.length; i ++) {
  photoCloseBtns[i].addEventListener("click", closePhotoBlock);
}
