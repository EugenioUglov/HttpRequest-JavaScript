class HttpRequest {
    sendData(url, onSuccessCallback, onFailCallback, isRepeatRequestOnConnectionFail = true) {
        let isFail = false;

        sendPostRequest(url, onSuccessCallback, onFailCallback);

        function sendPostRequest(url, onSuccessCallback, onFailCallback) {
            const xhttp = new XMLHttpRequest();
            
            xhttp.open('POST', url, true);
            xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            
            xhttp.onreadystatechange = function () {
                if (xhttp.status == 200 && xhttp.readyState == 4) {
                    // Success!
                    if (onSuccessCallback) onSuccessCallback();
                }
            };
            
            xhttp.onerror = function () {
                if (isFail === false) {
                    if (onFailCallback) onFailCallback();

                    isFail = true;
                }

                if (isRepeatRequestOnConnectionFail) {
                    setTimeout(function() {
                        sendPostRequest(url, onSuccessCallback, onFailCallback);
                    }, 1000);
                }
            };
            
            xhttp.send(dati_finali);
        }
    }

    getData(url) {
        const xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                return this.responseText;
            }
        };

        xhttp.open("GET", url);
        
        xhttp.send();
    }
}



/*
var pauseXML = new XMLHttpRequest();
pauseXML.open('GET', "."+frame.xmlpause, true);

pauseXML.onload = function(){ 
 
}

pauseXML.onloadend = function(){

}

pauseXML.send(null);
*/