var photoOpenBtn = document.querySelectorAll(".goods__show-btn");
var photoCloseBtn = document.querySelectorAll(".photo__close");

function disableScrolling(){
    var x=window.scrollX;
    var y=window.scrollY;
    window.onscroll=function(){window.scrollTo(x, y);};
}

function enableScrolling(){
    window.onscroll=function(){};
}

for (var j = 0; j < photoOpenBtn.length; j ++) {
  photoOpenBtn[j].onclick = function() {

    // document.body.classList.add("body--noscroll"); //запрет скрола
    disableScrolling(); //запрет скрола

    var photoBlock = document.getElementById("photo"+this.getAttribute("data-index"));
    photoBlock.classList.add("photo--show");
    var photoImg = photoBlock.getElementsByTagName("img");
    for (var i = 0; i < photoImg.length; i ++) {
      photoImg[i].setAttribute("src",photoImg[i].getAttribute("data-img"));
    }
    var photoSource = photoBlock.getElementsByTagName("source");
    for (var i = 0; i < photoSource.length; i ++) {
      photoSource[i].setAttribute("srcset",photoSource[i].getAttribute("data-img"));
    }
    var photoLargeTitle = photoBlock.querySelector(".photo__header");
    var photoLarge = photoBlock.querySelector(".photo__img-large");
    var photoLargeSrcset = photoBlock.querySelector(".photo__img-large-srcset");
    var photoSmall = photoBlock.querySelectorAll(".photo__img-small");
    var photoSmallSrcset = photoBlock.querySelectorAll(".photo__img-small-srcset");
    for (var i = 0; i < photoSmall.length; i ++) {
      photoSmall[i].onclick = function() {
        for (var x = 0; x < photoSmall.length; x ++) {
          photoSmall[x].classList.remove("photo__img-small--active");
        }
        this.classList.add("photo__img-small--active");
        photoLarge.setAttribute("src", this.getAttribute("src"));
        photoLargeSrcset.setAttribute("srcset", photoSmallSrcset[this.getAttribute("data-id")].getAttribute("srcset"));
        photoLargeTitle.innerHTML = this.getAttribute("alt");
      };
    };
  };
};

for (var j = 0; j < photoCloseBtn.length; j ++) {
  photoCloseBtn[j].onclick = function() {

    // document.body.classList.remove("body--noscroll"); //возврат скрола
    enableScrolling(); //возврат скрола

    var photoBlock = document.getElementById("photo"+this.getAttribute("data-index"));
    photoBlock.classList.remove("photo--show");
  };
};

window.addEventListener("keydown", function(e) {

  // document.body.classList.remove("body--noscroll"); //возврат скрола
  enableScrolling(); //возврат скрола

  var photoBlock = document.querySelectorAll(".photo");
  if (e.keyCode === 27) {
    for (var j = 0; j < photoBlock.length; j ++) {
      if (photoBlock[j].classList.contains("photo--show")) {
        e.preventDefault();
        photoBlock[j].classList.remove("photo--show");
      };
    };
  };
});
