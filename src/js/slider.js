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

