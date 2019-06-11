var popupOpenBtns = document.querySelectorAll(".popup__open");
var popupCloseBtns = document.querySelectorAll(".popup__close");

var popupBlock = {};
var x;
var y;

function setpopupBlock(popupBlockId) {
  popupBlock = document.getElementById(popupBlockId);
}

function setXY() {
  x = window.scrollX;
  y = window.scrollY;
}

function scrollToXY() {
  window.scrollTo(x, y);
}

function disableScrolling() {
  setXY();
  window.addEventListener("scroll", scrollToXY);
}

function enableScrolling() {
  window.removeEventListener("scroll", scrollToXY);
}

function addEsclHandler() {
  window.addEventListener("keydown", function(evt) {
    if (evt.keyCode === 27 && popupBlock.classList.contains("popup--show")) {
      evt.preventDefault();
      closepopupBlock();
    };
  });
}

function closepopupBlock() {
  popupBlock.classList.remove("popup--show");
  enableScrolling();
}

function openpopupBlock() {
  var popupBlockId = "popup" + this.getAttribute("data-popup-id");
  setpopupBlock(popupBlockId);

  addEsclHandler();
  popupBlock.classList.add("popup--show");
  disableScrolling();
}

for (var i = 0; i < popupOpenBtns.length; i ++) {
  popupOpenBtns[i].addEventListener("click", openpopupBlock);
}

for (var i = 0; i < popupCloseBtns.length; i ++) {
  popupCloseBtns[i].addEventListener("click", closepopupBlock);
}
