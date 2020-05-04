var form = (function () {
    'use strict';
    
	var onInsertPost = function () {
    
        if(!validateForm())
            return false;
    
        let text = document.getElementById("txtPensiero").value;
        let backgroundcolor = pickrBackground.getColor().toHEXA().toString();
        let textcolor = pickrText.getColor().toHEXA().toString();
        debugger;
        let body = {
            text,
            backgroundcolor,
            textcolor
        };

        RestSerive.addPensiero( body ,function(response){});
    };

    var validateForm = function() {
        debugger;
        var elTextPensiero = document.getElementById('txtPensiero');
        var textPensiero = elTextPensiero.value;
        if(!textPensiero || textPensiero.length < 40 ){
            console.log("at least 10 characters");
            return false;
        }
        return true;
    };

    var onInputPensiero = function() {
        let elPreviewText = document.getElementById('previewText');
        let elTextPensiero = document.getElementById('txtPensiero');
        elPreviewText.innerText = elTextPensiero.value;
    };

    document.getElementById('txtPensiero').oninput = onInputPensiero;
    
	return {
        onInsertPost,
        onInputPensiero
    };

})();

