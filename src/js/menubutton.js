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
