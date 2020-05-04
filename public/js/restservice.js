var RestSerive = (function() {
var endpoint = '/api';


return {
  getAllPensieriAsync: getAllPensieriAsync,
  addPensiero: postPensiero,
}

function getAllPensieriAsync(callback){

    var http = new XMLHttpRequest();
    http.open('GET', endpoint + "/pensieri", true);
    http.onreadystatechange = function() {
      if (http.readyState === 4 && http.status === 200 && http.responseText) {
        callback(JSON.parse(http.response));
      }
    };

    http.send();

}

function postPensiero(pensiero, callback){

  let body = {};
  body.pensiero = pensiero.text,
  body.backgroundcolor = pensiero.backgroundcolor || '#008080';
  body.textcolor = pensiero.textcolor || '#FFFFFF';
  body.igUsername = pensiero.igUsername || '';

  var http = new XMLHttpRequest();
  http.open('POST', endpoint + "/pensieri", true);
  http.setRequestHeader('Content-type','application/json; charset=utf-8');
  http.onreadystatechange = function() {
    if (http.readyState === 4 && http.status === 200 && http.responseText) {
      callback(JSON.parse(http.response));
    }
  };

  http.send(JSON.stringify(body));
}

})(RestSerive || {});
