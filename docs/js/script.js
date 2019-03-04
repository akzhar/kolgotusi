var menubutton = document.querySelector(".menu-button");
var menu = document.querySelector(".site-menu-list");

menubutton.classList.remove("menu-button--nojs");
menu.classList.remove("site-menu-list--nojs");

menubutton.addEventListener("click", function(evt) {
  evt.preventDefault();
  menu.classList.toggle("site-menu-list--open");
  menubutton.classList.toggle("menu-button--menu-open");
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


var slides = document.querySelectorAll(".slide__item"); //все слайды
var label = document.querySelectorAll(".slide__radiolabel"); //все лейблы радикнопок
var currentSlide = 0; //счетчик слайдов
var next = document.querySelector('.slider__btn-next'); //кнопка вперед
var previous = document.querySelector('.slider__btn-prev'); // кнопка назад
var slideInterval = setInterval(nextSlide,10000); //интервал повторения
const color = "#d1e44a";
var troughLabel = false;

const slideselector = document.querySelector(".slide__selector");
slideselector.classList.remove("slide__selector--nojs");

function pauseSlideshow() {
  clearInterval(slideInterval); //очистка интервала повторения
};

label[0].style.backgroundColor = color;

next.onclick = function() { //при клике на вперед
  troughLabel = false;
  pauseSlideshow(); //прекращение авто слайд шоу
  nextSlide(); //вызов функции
};

previous.onclick = function() { // при клике на назад
  troughLabel = false;
  pauseSlideshow(); //прекращение авто слайд шоу
  previousSlide(); //вызов функции
};

for (var i = 0; i < label.length; i ++) {
  label[i].onclick = function() {
    troughLabel = true;
    pauseSlideshow(); //прекращение авто слайд шоу
    goToSlide(this.id); //переход к слайду (по id input'а)
  };
};

function nextSlide() {
 goToSlide(Number(currentSlide)+1); //вызов функции и передача в нее № следующего слайда
};

function previousSlide() {
 goToSlide(Number(currentSlide)-1); //вызов функции и передача в нее № предыдущего слайда
};

function goToSlide(n) {
  label[currentSlide].style.backgroundColor=""; //снятие атрибута у текущей радио радио кнопки
  slides[currentSlide].classList.remove("slide__item--show"); //убираем класс с текущего слайда

  if (troughLabel == true) {
    currentSlide =  n;
  } else {
    currentSlide = (n+slides.length)%slides.length; // текущий слайд -1 или +1
  }

  label[currentSlide].style.backgroundColor= color; //установка атрибута у текущей радио радио кнопки
  slides[currentSlide].classList.add("slide__item--show"); //назначаем класс текущему слайду
};


