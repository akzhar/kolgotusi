(function() {

  var header = document.querySelector('.header');
  var pagewrapper = document.querySelector('.page-wrapper');
  var menubutton = document.querySelector('.menu-button');
  var menu = document.querySelector('.site-menu-list');
  var slideSelector = document.querySelector('.slide__selector');

  if (slideSelector) {
    slideSelector.classList.remove('slide__selector--nojs');
  }

  header.classList.remove('header--nojs');
  pagewrapper.classList.remove('page-wrapper--nojs');
  menubutton.classList.remove('menu-button--nojs');
  menu.classList.remove('site-menu-list--nojs');

})();
