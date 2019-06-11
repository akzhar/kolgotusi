var anchor = document.querySelector('.btn--up');

anchor.addEventListener('click', function (evt) {
  evt.preventDefault();
  var blockID = anchor.getAttribute('href');
  document.querySelector('' + blockID).scrollIntoView(
  {
    behavior: 'smooth',
    block: 'start'
  }
  );
}
);
