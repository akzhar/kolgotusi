(function() {

  var dependencies = {
    backend: window.backend
  };

  dependencies.backend.load(onLoad, onError, 'GET');

  function onLoad(response) {
    sessionStorage.setItem('data', JSON.stringify(response.goods));
  }

  function onError(error) {
    console.log(error);
  }

})();
