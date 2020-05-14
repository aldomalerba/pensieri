var GridPensieri = (function () {
  return {
    fillGridPensieri: fillGridPensieri,
  };

  function fillGridPensieri(pensieri) {

    let grid = document.getElementById("grid");
    pensieri.forEach((pensiero) => {

      var elSquare = document.createElement("div");
      var elContent = document.createElement("div");
      var elText = document.createElement("div");

      elSquare.classList.add("square");
      elContent.classList.add("content");
      elText.classList.add("text-inner");

      elSquare.style.backgroundColor = pensiero.backgroundColor;
      elSquare.style.color = pensiero.textColor;
      elText.textContent = pensiero.frase;

      elContent.appendChild(elText);
      elSquare.appendChild(elContent);

      grid.appendChild(elSquare);

    });
  }

})(GridPensieri || {});