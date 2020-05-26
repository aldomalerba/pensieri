var form = (function () {
    'use strict';
    
	var onInsertPost = function () {
    
        if(!validateForm())
            return false;
    
        let text = document.getElementById("txtPensiero").value;
        let backgroundcolor = pickrBackground.getColor().toHEXA().toString();
        let textcolor = pickrText.getColor().toHEXA().toString();
        
        let body = {
            text,
            backgroundcolor,
            textcolor
        };

        RestSerive.addPensiero( body ,function(response){});
    };

    var validateForm = function() {
        var elTextPensiero = document.getElementById('txtPensiero');
        var textPensiero = elTextPensiero.value;
        if(!textPensiero){
            return false;
        }
        return true;
    };

    var onInputPensiero = function() {
        let square = document.getElementById('preview');
        let elTextPensiero = document.getElementById('txtPensiero');
        square.setAttribute("text", elTextPensiero.value);
    };

    document.getElementById('txtPensiero').oninput = onInputPensiero;
    
	return {
        onInsertPost,
        onInputPensiero
    };

})();

