(function() {

  var menubutton = document.querySelector('.menu-button');
  var menu = document.querySelector('.site-menu-list');

  function menuToggle() {
    menu.classList.toggle('site-menu-list--open');
    menubutton.classList.toggle('menu-button--menu-open');
  }

  menubutton.addEventListener('click', menuToggle);

  window.addEventListener('keydown', function(evt) {
    if (evt.keyCode === 27 && menubutton.classList.contains('menu-button--menu-open')) {
      evt.preventDefault();
      menuToggle();
    }
  });

})();
