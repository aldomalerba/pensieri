var RestSerive = (function() {
var endpoint = '/api';


return {
  getAllPensieriAsync: getAllPensieriAsync,
  addPensiero: postPensiero,
  addLike: addLike,
  removeLike: removeLike
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
  body.frase = pensiero.text,
  body.backgroundColor = pensiero.backgroundcolor || '#008080';
  body.textColor = pensiero.textcolor || '#FFFFFF';

  var http = new XMLHttpRequest();
  http.open('POST', endpoint + "/pensieri", false);
  http.setRequestHeader('Content-type','application/json; charset=utf-8');
  http.onreadystatechange = function() {
    if (http.readyState === 4 && http.status === 200 && http.responseText) {
      callback(JSON.parse(http.response));
    }
  };

  http.send(JSON.stringify(body));
}

function addLike(like, callback){

  let body = {};
  body.pensieroId = like.pensieroId;

  var http = new XMLHttpRequest();
  http.open('POST', endpoint + "/like", false);
  http.setRequestHeader('Content-type','application/json; charset=utf-8');
  http.onreadystatechange = function() {
    if (http.readyState === 4 && http.status === 200 && http.responseText) {
      callback(JSON.parse(http.response));
    }
  };

  http.send(JSON.stringify(body));
}

function removeLike(like, callback){

  let body = {};
  body.pensieroId = like.pensieroId;

  var http = new XMLHttpRequest();
  http.open('DELETE', endpoint + "/like", false);
  http.setRequestHeader('Content-type','application/json; charset=utf-8');
  http.onreadystatechange = function() {
    if (http.readyState === 4 && http.status === 200 && http.responseText) {
      callback(JSON.parse(http.response));
    }
  };

  http.send(JSON.stringify(body));
}

})(RestSerive || {});
