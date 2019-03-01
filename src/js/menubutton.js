var menubutton = document.querySelector(".menu-button");
var menu = document.querySelector(".site-menu-list");

menubutton.classList.remove("menu-button--nojs");
menu.classList.remove("site-menu-list--nojs");

menubutton.addEventListener("click", function(evt) {
  evt.preventDefault();
  menu.classList.toggle("site-menu-list--open");
  menubutton.classList.toggle("menu-button--menu-open");
});
