/*
модуль управления слайдером
*/


(function() {

  const RADIOLABEL_CHECKED_CLASS = 'slide__radiolabel--checked';
  const SLIDE_SHOW_CLASS = 'slide__item--show';
  const SLIDE_INTERVAL = 4000;

  let slides = document.querySelectorAll('.slide__item');
  let radioLabels = document.querySelectorAll('.slide__radiolabel');
  let nextBtn = document.querySelector('.slider__btn-next');
  let previousBtn = document.querySelector('.slider__btn-prev');
  let currentSlideNo = 0;
  let troughLabel = false;
  let slideInterval;

  if (nextBtn !== null && previousBtn !== null) {
    activateSlider();
  }

  function activateSlider() {
    slideInterval = setInterval(goToNextSlide, SLIDE_INTERVAL); //интервал повторения

    nextBtn.addEventListener('click', function() { //при клике на вперед
      troughLabel = false;
      pauseSlideShow();
      goToNextSlide();
    });

    previousBtn.addEventListener('click', function() { // при клике на назад
      troughLabel = false;
      pauseSlideShow();
      goToPreviousSlide();
    });

    radioLabels.forEach(function(label) {
      label.addEventListener('click', function() {
        troughLabel = true;
        pauseSlideShow();
        goToSlide(+ this.getAttribute('data-id'));
      });
    });
  }

  function pauseSlideShow() {
    clearInterval(slideInterval); //очистка интервала повторения
  }

  function goToNextSlide() {
    goToSlide(currentSlideNo + 1);
  }

  function goToPreviousSlide() {
    goToSlide(currentSlideNo - 1);
  }

  function goToSlide(n) {
    radioLabels[currentSlideNo].classList.remove(RADIOLABEL_CHECKED_CLASS);
    slides[currentSlideNo].classList.remove(SLIDE_SHOW_CLASS);
    currentSlideNo = (troughLabel) ? n : (n + slides.length) % slides.length; // текущий слайд -1 или +1
    radioLabels[currentSlideNo].classList.add(RADIOLABEL_CHECKED_CLASS);
    slides[currentSlideNo].classList.add(SLIDE_SHOW_CLASS);
  }

})();
