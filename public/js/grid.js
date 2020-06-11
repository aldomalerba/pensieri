var GridPensieri = (function () {

  var DOM = {
    grid
  };

   /* =================== private methods ================= */

  // cache DOM elements
  function cacheDom() {
    DOM.grid = document.getElementById("grid");
  }
  // bind events
  function bindEvents() {
    DOM.grid.addEventListener("onload", fillGridPensieri());
  }
  
  function fillGridPensieri() {
    
    restSerive.getAllPensieriAsync(function(result){
      result.data.forEach((pensiero) => {

        
        let square = document.createElement('square-post');

        let userLiked = !!pensiero.userLike;
        square.backgroundColor = pensiero.backgroundColor;
        square.textColor = pensiero.textColor;
        square.text = pensiero.frase;
        square.userName = pensiero.User.username;
        square.usernameHref = "/profile/"+pensiero.User.username;
        square.avatar = pensiero.User.picture;
        square.likeText = pensiero.Likes.length + " likes";
        square.showHeader = userLiked;
        square.showFooter = userLiked;
        if(userLiked){
          square.likeSrc = "images/idea_like.png";
        }
        else  
          square.likeSrc = "images/idea.png";
  
  
        square.addEventListener('press-like', e => {
          if(square.likeSrc == "images/idea.png"){
            restSerive.addLike( { pensieroId: pensiero.id} ,function(response){
              square.likeSrc = "images/idea_like.png";
            });
          }
          else{
            restSerive.deleteLike( { pensieroId: pensiero.id} ,function(response){
              square.likeSrc = "images/idea.png";
            });
          }
        });
        
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
  
        DOM.grid.appendChild(square);
     });
    

    });
  }

  /* =================== public methods ================== */
  
  // main init method
  function init() {
    cacheDom();
    bindEvents();
  }

  /* =============== export public methods =============== */
  return {
    init: init
  };

})(GridPensieri || {});