/*
модуль для работы кнопки открытия/закрытия меню
*/

(function() {

  let menuButton = document.querySelector('.menu-button');
  let menu = document.querySelector('.site-menu-list');

  function menuToggle() {
    menu.classList.toggle('site-menu-list--open');
    menuButton.classList.toggle('menu-button--menu-open');
  }

  menuButton.addEventListener('click', menuToggle);

  window.addEventListener('keydown', function(evt) {
    if (evt.keyCode === 27 && menuButton.classList.contains('menu-button--menu-open')) {
      evt.preventDefault();
      menuToggle();
    }
  });

})();
