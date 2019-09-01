(function() {

  var anchor = document.querySelector('.btn--up');
  var x;
  var y;

  anchor.addEventListener('click', function (evt) {
    evt.preventDefault();
    var blockID = anchor.getAttribute('href');
    document.querySelector('' + blockID).scrollIntoView(
      {
        behavior: 'smooth',
        block: 'start'
      }
    );
  });

  function setXY() {
    x = window.scrollX;
    y = window.scrollY;
  }

  function scrollToXY() {
    window.scrollTo(x, y);
  }

  function disableScrolling() {
    setXY();
    window.addEventListener('scroll', scrollToXY);
  }

  function enableScrolling() {
    window.removeEventListener('scroll', scrollToXY);
  }

  window.scroll = {
    disableScrolling: disableScrolling,
    enableScrolling: enableScrolling
  };

})();
