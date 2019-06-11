var menubutton = document.querySelector(".menu-button");
var menu = document.querySelector(".site-menu-list");

menubutton.classList.remove("menu-button--nojs");
menu.classList.remove("site-menu-list--nojs");

menubutton.addEventListener("click", function(evt) {
  evt.preventDefault();
  menu.classList.toggle("site-menu-list--open");
  menubutton.classList.toggle("menu-button--menu-open");
});

window.addEventListener("keydown", function(e) {
  if (e.keyCode === 27) {
    if (menubutton.classList.contains("menu-button--menu-open")) {
      e.preventDefault();
      menubutton.classList.remove("menu-button--menu-open");
      menu.classList.remove("site-menu-list--open");
    };
  };
});


const header = document.querySelector(".header");
const pagewrapper = document.querySelector(".page-wrapper");

header.classList.remove("header--nojs");
pagewrapper.classList.remove("page-wrapper--nojs");


const anchor = document.querySelector('.btn--up');

anchor.addEventListener('click', function (e) {
  e.preventDefault();

  const blockID = anchor.getAttribute('href');

  document.querySelector('' + blockID).scrollIntoView(
  {
    behavior: 'smooth',
    block: 'start'
  }
  );
}
);


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


{var slides = document.querySelectorAll(".slide__item"); //все слайды
var label = document.querySelectorAll(".slide__radiolabel"); //все лейблы радикнопок
var currentSlide = 0; //счетчик слайдов
var next = document.querySelector('.slider__btn-next'); //кнопка вперед
var previous = document.querySelector('.slider__btn-prev'); // кнопка назад
var slideInterval = setInterval(nextSlide,4000); //интервал повторения
var troughLabel = false;

const slideselector = document.querySelector(".slide__selector");
slideselector.classList.remove("slide__selector--nojs");

function pauseSlideshow() {
  clearInterval(slideInterval); //очистка интервала повторения
};

next.onclick = function() { //при клике на вперед
  troughLabel = false;
  pauseSlideshow();
  nextSlide();
};

previous.onclick = function() { // при клике на назад
  troughLabel = false;
  pauseSlideshow();
  previousSlide();
};

for (var i = 0; i < label.length; i ++) {
  label[i].onclick = function() {
    troughLabel = true;
    pauseSlideshow();
    goToSlide(this.getAttribute("data-id"));
  };
};

function nextSlide() {
 goToSlide(Number(currentSlide)+1);
};

function previousSlide() {
 goToSlide(Number(currentSlide)-1);
};

function goToSlide(n) {
  label[currentSlide].classList.remove("slide__radiolabel--checked");
  slides[currentSlide].classList.remove("slide__item--show");

  if (troughLabel == true) {
    currentSlide =  n;
  } else {
    currentSlide = (n+slides.length)%slides.length; // текущий слайд -1 или +1
  }

  label[currentSlide].classList.add("slide__radiolabel--checked");
  slides[currentSlide].classList.add("slide__item--show");
};

}
