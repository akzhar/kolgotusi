"use strict";

var header = document.querySelector(".header");
var pagewrapper = document.querySelector(".page-wrapper");

header.classList.remove("header--nojs");
pagewrapper.classList.remove("page-wrapper--nojs");


var menubutton = document.querySelector(".menu-button");
var menu = document.querySelector(".site-menu-list");

menubutton.classList.remove("menu-button--nojs");
menu.classList.remove("site-menu-list--nojs");

function toggleMenu() {
  menu.classList.toggle("site-menu-list--open");
  menubutton.classList.toggle("menu-button--menu-open");
}

function addEscMenuHandler() {
  window.addEventListener("keydown", function(evt) {
    if (evt.keyCode === 27 && menubutton.classList.contains("menu-button--menu-open")) {
      evt.preventDefault();
      toggleMenu();
    };
  });
}

menubutton.addEventListener("click", toggleMenu);
addEscMenuHandler();


var anchor = document.querySelector('.btn--up');

anchor.addEventListener('click', function (evt) {
  evt.preventDefault();
  var blockID = anchor.getAttribute('href');
  document.querySelector('' + blockID).scrollIntoView(
  {
    behavior: 'smooth',
    block: 'start'
  }
  );
}
);


var popupOpenBtns = document.querySelectorAll(".popup__open");
var popupCloseBtns = document.querySelectorAll(".popup__close");

var popupBlock = {};
var x;
var y;

function setpopupBlock(popupBlockId) {
  popupBlock = document.getElementById(popupBlockId);
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
  window.addEventListener("scroll", scrollToXY);
}

function enableScrolling() {
  window.removeEventListener("scroll", scrollToXY);
}

function addEsclHandler() {
  window.addEventListener("keydown", function(evt) {
    if (evt.keyCode === 27 && popupBlock.classList.contains("popup--show")) {
      evt.preventDefault();
      closepopupBlock();
    };
  });
}

function closepopupBlock() {
  popupBlock.classList.remove("popup--show");
  enableScrolling();
}

function openpopupBlock() {
  var popupBlockId = "popup" + this.getAttribute("data-popup-id");
  setpopupBlock(popupBlockId);

  addEsclHandler();
  popupBlock.classList.add("popup--show");
  disableScrolling();
}

for (var i = 0; i < popupOpenBtns.length; i ++) {
  popupOpenBtns[i].addEventListener("click", openpopupBlock);
}

for (var i = 0; i < popupCloseBtns.length; i ++) {
  popupCloseBtns[i].addEventListener("click", closepopupBlock);
}


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


var slides = document.querySelectorAll(".slide__item"); //все слайды
var label = document.querySelectorAll(".slide__radiolabel"); //все лейблы радикнопок
var currentSlide = 0; //счетчик слайдов
var next = document.querySelector('.slider__btn-next'); //кнопка вперед
var previous = document.querySelector('.slider__btn-prev'); // кнопка назад
var slideInterval = setInterval(nextSlide,4000); //интервал повторения
var troughLabel = false;
var slideselector = document.querySelector(".slide__selector");

slideselector.classList.remove("slide__selector--nojs");

function pauseSlideshow() {
  clearInterval(slideInterval); //очистка интервала повторения
};

next.addEventListener("click", function() { //при клике на вперед
  troughLabel = false;
  pauseSlideshow();
  nextSlide();
});

previous.addEventListener("click", function() { // при клике на назад
  troughLabel = false;
  pauseSlideshow();
  previousSlide();
});

for (var i = 0; i < label.length; i ++) {
  label[i].addEventListener("click", function() {
    troughLabel = true;
    pauseSlideshow();
    goToSlide(this.getAttribute("data-id"));
  });
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



// var tableRowTemplate = document.getElementById('table-row').content.querySelector('.cart__table-row');


// function createTableRow() {
//   var tableRow = tableRowTemplate.cloneNode(true);
//   var goodId = tableRow.querySelector('.cart__table-cell--id');
//   var goodName = tableRow.querySelector('.cart__table-cell--name');
//   var goodSize = tableRow.querySelector('.cart__table-cell--size');
//   var goodColor = tableRow.querySelector('.cart__table-cell--color');
//   var goodNumber = tableRow.querySelector('.cart__table-cell--number');
//   var goodPrice = tableRow.querySelector('.cart__table-cell--price');

//   goodId.textContent = this.getAttribute('data-id');
//   goodName.textContent = this.getAttribute('data-name');
//   goodPrice.textContent = this.getAttribute('data-price');

//   console.log(tableRow);

// }

