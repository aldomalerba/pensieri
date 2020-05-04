var GridPensieri = (function () {
  return {
    fillGridPensieri: fillGridPensieri,
  };

  function fillGridPensieri(pensieri) {

    let grid = document.getElementById("grid");
    pensieri.forEach((pensiero) => {

      var html = `
       <div class="square" style="background-color: ${pensiero.backgroundcolor}; color: ${pensiero.textcolor}">
         <div class="content"><div class="content"><div class="text-inner">${pensiero.pensiero}<div></div></div>
       </div>`;

      var node = document.createElement("div");
      node.innerHTML = html
      grid.appendChild(node);

    });
  }

})(GridPensieri || {});