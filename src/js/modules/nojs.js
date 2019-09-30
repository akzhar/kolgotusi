/*
модуль для снятия классов --nojs
*/

(function() {

  let header = document.querySelector('.header');
  let pagewrapper = document.querySelector('.page-wrapper');
  let menubutton = document.querySelector('.menu-button');
  let menu = document.querySelector('.site-menu-list');
  let slideSelector = document.querySelector('.slide__selector');

  if (slideSelector) {
    slideSelector.classList.remove('slide__selector--nojs');
  }

  header.classList.remove('header--nojs');
  pagewrapper.classList.remove('page-wrapper--nojs');
  menubutton.classList.remove('menu-button--nojs');
  menu.classList.remove('site-menu-list--nojs');

})();
