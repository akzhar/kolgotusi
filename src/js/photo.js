var photoOpenBtn = document.querySelectorAll(".goods__show-btn");
var photoCloseBtn = document.querySelectorAll(".photo__close");


for (var j = 0; j < photoOpenBtn.length; j ++) {
  photoOpenBtn[j].onclick = function() {
    document.body.classList.add("body--scroll"); //запрет скрола
    var photoBlock = document.getElementById("photo"+this.getAttribute("data-index"));
    photoBlock.classList.add("photo--show");
    var photoImg = photoBlock.getElementsByTagName("img");
    for (var i = 0; i < photoImg.length; i ++) {
      photoImg[i].setAttribute("src",photoImg[i].getAttribute("data-img"));
    }
    var photoLarge = photoBlock.querySelector(".photo__img-large");
    var photoSmall = photoBlock.querySelectorAll(".photo__img-small");
    for (var k = 0; k < photoSmall.length; k ++) {
      photoSmall[k].onclick = function() {
        for (var x = 0; x < photoSmall.length; x ++) {
          photoSmall[x].classList.remove("photo__img-small--active");
        }
        this.classList.add("photo__img-small--active");
        photoLarge.setAttribute("src", this.getAttribute("src"))
      };
    };
  };
};

for (var j = 0; j < photoCloseBtn.length; j ++) {
  photoCloseBtn[j].onclick = function() {
    document.body.classList.remove("body--scroll"); //возврат скрола
    var photoBlock = document.getElementById("photo"+this.getAttribute("data-index"));
    photoBlock.classList.remove("photo--show");
  };
};

window.addEventListener("keydown", function(e) {
  document.body.classList.remove("body--scroll"); //возврат скрола
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
