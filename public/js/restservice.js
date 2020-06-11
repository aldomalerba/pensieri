var restSerive = (function() {

var endpoint = '/api';

/* =================== private methods ================= */

async function postData(url = '', data = {}) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data) 
  });
  return response.json(); 
}

async function deleteData(url = '', item) {
  const response = await fetch(url + '/' + item, {
    method: 'delete'
  });

  return response.json();
}

/* =================== public methods ================== */
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
let url = endpoint + "/like";

postData(url, body)
.then(data => callback(data));

}

function deleteLike(like, callback){

let url = endpoint + "/like";

deleteData(url, like.pensieroId)
.then(data => callback(data));

}

/* =============== export public methods =============== */

return {
  getAllPensieriAsync: getAllPensieriAsync,
  addPensiero: postPensiero,
  addLike: addLike,
  deleteLike: deleteLike
};

})(restSerive || {});
