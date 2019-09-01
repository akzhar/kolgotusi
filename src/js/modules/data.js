(function() {

  var dependencies = {
    backend: window.backend
  };

  dependencies.backend.load(onLoad, onError, 'GET');

  function onLoad(response) {
    window.data = response.allItems;
  }

  function onError(error) {
    console.log(error);
  }

})();
