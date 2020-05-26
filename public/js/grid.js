var GridPensieri = (function () {

  return {
    fillGridPensieri: fillGridPensieri,
  };

  function fillGridPensieri(pensieri) {
    
    let grid = document.getElementById("grid");
    pensieri.forEach((pensiero) => {

      var square = document.createElement('square-post');

      square.setAttribute("backgroundcolor", pensiero.backgroundColor);
      square.setAttribute("textcolor", pensiero.textColor);
      square.setAttribute("text",pensiero.frase);
      square.setAttribute("username", pensiero.User.username);
      square.setAttribute("username-href", "/profile/"+pensiero.User.username);
      square.setAttribute("avatar", pensiero.User.picture);
      square.setAttribute("showheader", false);
      square.setAttribute("showfooter", false);

      var squareBody = square.shadowRoot.querySelector('.squareBody');
      squareBody.addEventListener('click', () => {
        var isHeaderVisible = square.showHeader;
        if(!isHeaderVisible){
          square.showHeader = true;
          square.showFooter = true;         
        }
        else{
          squareModal.setContent('<h4>'+pensiero.User.username+'</h4><p>'+pensiero.frase+'</p>');
          squareModal.open();
        }
      });
      grid.appendChild(square);

    });
  }

  function test(){
    alert("test");
  }

})(GridPensieri || {});