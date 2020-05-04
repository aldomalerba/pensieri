window.onload = function(){
    RestSerive.getAllPensieriAsync(function(result){
        GridPensieri.fillGridPensieri(result.data);
    });
};

