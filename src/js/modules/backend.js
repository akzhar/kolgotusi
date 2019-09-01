(function () {
  var MAX_RESPONSE_TIME = 5000;
  var MS_PER_SECOND = 1000;
  var JSON_TYPE = 'json';
  var TIME_UNIT = ' c';
  var OK_STATUS = 200;
  var Url = {
    GET: 'js/data.json'
  };

  function load(onLoad, onError, method, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = JSON_TYPE;
    xhr.timeout = MAX_RESPONSE_TIME;
    xhr.addEventListener('load', function () {
      if (xhr.status === OK_STATUS) {
        onLoad(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout / MS_PER_SECOND + TIME_UNIT);
    });
    xhr.open(method, Url[method]);
    xhr.send(data);
  }

  window.backend = {
    load: load
  };
})();
