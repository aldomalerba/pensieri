window.onload = function(){
    debugger;
    RestSerive.getAllPensieriAsync(function(result){
        GridPensieri.fillGridPensieri(result.data);
    });
};

