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


var photoOpenBtn = document.querySelectorAll(".goods__show-btn");
var photoCloseBtn = document.querySelectorAll(".photo__close");

function disableScrolling(){
    var x=window.scrollX;
    var y=window.scrollY;
    window.onscroll=function(){window.scrollTo(x, y);};
}

function enableScrolling(){
    window.onscroll=function(){};
}

for (var j = 0; j < photoOpenBtn.length; j ++) {
  photoOpenBtn[j].onclick = function() {

    // document.body.classList.add("body--noscroll"); //запрет скрола
    disableScrolling(); //запрет скрола

    var photoBlock = document.getElementById("photo"+this.getAttribute("data-index"));
    photoBlock.classList.add("photo--show");
    var photoImg = photoBlock.getElementsByTagName("img");
    for (var i = 0; i < photoImg.length; i ++) {
      photoImg[i].setAttribute("src",photoImg[i].getAttribute("data-img"));
    }
    var photoSource = photoBlock.getElementsByTagName("source");
    for (var i = 0; i < photoSource.length; i ++) {
      photoSource[i].setAttribute("srcset",photoSource[i].getAttribute("data-img"));
    }
    var photoLargeTitle = photoBlock.querySelector(".photo__header");
    var photoLarge = photoBlock.querySelector(".photo__img-large");
    var photoLargeSrcset = photoBlock.querySelector(".photo__img-large-srcset");
    var photoSmall = photoBlock.querySelectorAll(".photo__img-small");
    var photoSmallSrcset = photoBlock.querySelectorAll(".photo__img-small-srcset");
    for (var i = 0; i < photoSmall.length; i ++) {
      photoSmall[i].onclick = function() {
        for (var x = 0; x < photoSmall.length; x ++) {
          photoSmall[x].classList.remove("photo__img-small--active");
        }
        this.classList.add("photo__img-small--active");
        photoLarge.setAttribute("src", this.getAttribute("src"));
        photoLargeSrcset.setAttribute("srcset", photoSmallSrcset[this.getAttribute("data-id")].getAttribute("srcset"));
        photoLargeTitle.innerHTML = this.getAttribute("alt");
      };
    };
  };
};

for (var j = 0; j < photoCloseBtn.length; j ++) {
  photoCloseBtn[j].onclick = function() {

    // document.body.classList.remove("body--noscroll"); //возврат скрола
    enableScrolling(); //возврат скрола

    var photoBlock = document.getElementById("photo"+this.getAttribute("data-index"));
    photoBlock.classList.remove("photo--show");
  };
};

window.addEventListener("keydown", function(e) {

  // document.body.classList.remove("body--noscroll"); //возврат скрола
  enableScrolling(); //возврат скрола

  var photoBlock = document.querySelectorAll(".photo");
  if (e.keyCode === 27) {
    for (var j = 0; j < photoBlock.length; j ++) {
      if (photoBlock[j].classList.contains("photo--show")) {
        e.preventDefault();
        photoBlock[j].classList.remove("photo--show");
      };
    };
  };
});


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
