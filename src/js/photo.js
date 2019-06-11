var photoOpenBtns = document.querySelectorAll(".goods__show-btn");

function changeImgFromBigToSmall() {
  var phSmallSources = popupBlock.querySelectorAll(".photo__img-small-srcset");
  var phSmallId = this.getAttribute("data-id");
  var phBig = popupBlock.querySelector(".photo__img-large");
  var phBigSource = popupBlock.querySelector(".photo__img-large-srcset");
  var phBigTitle = popupBlock.querySelector(".photo__header");

  this.classList.add("photo__img-small--active");
  phBig.src = this.src;
  phBigSource.srcset = phSmallSources[phSmallId].srcset;
  phBigTitle.textContent = this.alt;
}

function renderImgs() {
  var phImgs = popupBlock.getElementsByTagName("img");
  for (var i = 0; i < phImgs.length; i ++) {
    phImgs[i].setAttribute("src", phImgs[i].getAttribute("data-img"));
  }
}

function renderSources() {
  var phSources = popupBlock.getElementsByTagName("source");
  for (var i = 0; i < phSources.length; i ++) {
    phSources[i].setAttribute("srcset", phSources[i].getAttribute("data-img"));
  }
}

function addClickHandlersToPhotosSmall() {
  var photosSmall = popupBlock.querySelectorAll(".photo__img-small");
  for (var i = 0; i < photosSmall.length; i ++) {
    photosSmall[i].addEventListener("click", function() {
      for (var j = 0; j < photosSmall.length; j ++) {
        photosSmall[j].classList.remove("photo__img-small--active");
      }
    });
    photosSmall[i].addEventListener("click", changeImgFromBigToSmall);
  }
}

for (var i = 0; i < photoOpenBtns.length; i ++) {
  photoOpenBtns[i].addEventListener("click", function() {
    renderImgs();
    renderSources();
    addClickHandlersToPhotosSmall();
  });
}
