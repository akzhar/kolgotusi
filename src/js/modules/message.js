/*
модуль вывода сообщения
*/

(function() {

  const MESSAGE_DURATION = 1000;
  const MESSAGE_SHOW_CLASS = 'msg--show';

  let msg = document.querySelector('#msg');
  let msgText;

  if (msg !== null) {
    msgText = msg.querySelector('.msg__text');
  }

  function showMsgBlock(text) {
    msgText.textContent = text;
    msg.classList.add(MESSAGE_SHOW_CLASS);
    setTimeout(function () {
      msg.classList.remove(MESSAGE_SHOW_CLASS);
    }, MESSAGE_DURATION);
  }

  window.message = {
    showMsgBlock: showMsgBlock
  };

})();
